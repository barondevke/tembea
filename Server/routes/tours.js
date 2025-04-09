const express = require("express");
const router = express.Router();
const dbConnection = require("../db");

// GET all tours
router.get("/", async (req, res) => {
  try {
    const conn = await dbConnection;
    const [rows] = await conn.query("SELECT * FROM products");
    res.json(rows);
  } catch (err) {
    console.error("GET /api/tours error:", err);
    res.status(500).json({ error: err.message });
  }
});



router.get("/summary", async (req, res) => {
    const conn = await dbConnection;
  
    try {
      const [tours] = await conn.query(`
        SELECT 
          p.id,
          p.title,
          p.location,
          p.duration,
          p.price,
          p.rating,
          p.discount,
          p.featured
          (
            SELECT COUNT(*) 
            FROM reviews r 
            WHERE r.product_id = p.id
          ) AS reviews,
          (
            SELECT image_url 
            FROM product_images pi 
            WHERE pi.product_id = p.id 
            LIMIT 1
          ) AS image
        FROM products p
      `);
  
      const formatted = tours.map(tour => ({
        id: tour.id,
        title: tour.title,
        location: tour.location,
        duration: tour.duration,
        price: tour.price,
        rating: tour.rating,
        reviews: tour.reviews,
        image: tour.image || "/placeholder.jpg",
        ...(tour.discount && { discount: tour.discount }),
        ...(tour.featured && { featured: true })
      }));
  
      res.json(formatted);
  
    } catch (err) {
      console.error("GET /api/tours/summary error:", err);
      res.status(500).json({ error: "Could not fetch tours", details: err.message });
    }
  });

router.get("/:id", async (req, res) => {
  const tourId = req.params.id;
  const conn = await dbConnection;

  try {
    // Get main product
    const [productRows] = await conn.query("SELECT * FROM products WHERE id = ?", [tourId]);
    if (productRows.length === 0) return res.status(404).json({ error: "Tour not found" });

    const product = productRows[0];

    // Get related data
    const [images] = await conn.query("SELECT image_url FROM product_images WHERE product_id = ?", [tourId]);
    const [reviews] = await conn.query("SELECT name, date, rating, comment, avatar FROM reviews WHERE product_id = ?", [tourId]);
    const [highlights] = await conn.query("SELECT highlight FROM product_highlights WHERE product_id = ?", [tourId]);
    const [included] = await conn.query("SELECT item FROM product_included WHERE product_id = ?", [tourId]);
    const [notIncluded] = await conn.query("SELECT item FROM product_not_included WHERE product_id = ?", [tourId]);
    const [itinerary] = await conn.query("SELECT day, title, description FROM product_itinerary WHERE product_id = ?", [tourId]);

    res.json({
      ...product,
      images: images.map(i => i.image_url),
      reviews,
      highlights: highlights.map(h => h.highlight),
      included: included.map(i => i.item),
      notIncluded: notIncluded.map(i => i.item),
      itinerary
    });

  } catch (err) {
    console.error("GET /api/tours/:id error:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});


// POST new tour
router.post("/", async (req, res) => {
  const {
    title, location, duration, price, discount_price, discount, rating, description,featured,
    reviews = [], images = [], highlights = [], included = [], notIncluded = [], itinerary = []
  } = req.body;

  const conn = await dbConnection;

  try {
    await conn.beginTransaction();

    const [productResult] = await conn.execute(
      `INSERT INTO products (title, location, duration, price, discount_price, discount, rating, description,featured)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, location, duration, price, discount_price, discount, rating, description,featured]
    );
    const productId = productResult.insertId;

    const insertPromises = [];

    for (const review of reviews) {
      insertPromises.push(
        conn.execute(
          `INSERT INTO reviews (product_id, name, date, rating, comment, avatar)
           VALUES (?, ?, ?, ?, ?, ?)`,
          [productId, review.name, review.date, review.rating, review.comment, review.avatar]
        )
      );
    }

    for (const url of images) {
      insertPromises.push(conn.execute(
        `INSERT INTO product_images (product_id, image_url) VALUES (?, ?)`,
        [productId, url]
      ));
    }

    for (const text of highlights) {
      insertPromises.push(conn.execute(
        `INSERT INTO product_highlights (product_id, highlight) VALUES (?, ?)`,
        [productId, text]
      ));
    }

    for (const item of included) {
      insertPromises.push(conn.execute(
        `INSERT INTO product_included (product_id, item) VALUES (?, ?)`,
        [productId, item]
      ));
    }

    for (const item of notIncluded) {
      insertPromises.push(conn.execute(
        `INSERT INTO product_not_included (product_id, item) VALUES (?, ?)`,
        [productId, item]
      ));
    }

    for (const day of itinerary) {
      insertPromises.push(conn.execute(
        `INSERT INTO product_itinerary (product_id, day, title, description)
         VALUES (?, ?, ?, ?)`,
        [productId, day.day, day.title, day.description]
      ));
    }

    await Promise.all(insertPromises);
    await conn.commit();

    res.status(201).json({ message: "Tour created", productId });

  } catch (err) {
    await conn.rollback();
    console.error("POST /api/tours error:", err);
    res.status(500).json({ error: "Insert failed", details: err.message });
  }
});

module.exports = router;

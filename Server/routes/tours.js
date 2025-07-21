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
          p.featured,
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

router.get("/tours-page", async (req, res) => {
    const conn = await dbConnection;
  
    // Get page & limit from query params, fallback to defaults
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
  
    try {
      // Get total count first
      const [[{ total }]] = await conn.query(`SELECT COUNT(*) as total FROM products`);
  
      // Fetch paginated tours
      const [tours] = await conn.query(`
        SELECT 
          p.id,
          p.title,
          p.location,
          p.duration,
          p.price,
          p.rating,
          p.discount,
          p.featured,
          p.category,
          p.continent,
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
        LIMIT ? OFFSET ?
      `, [limit, offset]);
  
      // Format the response
      const formatted = tours.map(tour => ({
        id: tour.id,
        title: tour.title,
        location: tour.location,
        duration: tour.duration,
        price: tour.price,
        rating: tour.rating,
        reviews: tour.reviews,
        image: tour.image || "/placeholder.jpg",
        category: tour.category,
        continent: tour.continent,
        discount: tour.discount !== null ? tour.discount : undefined,
        featured: tour.featured === 1 ? true : undefined,
      }));
  
      // Send paginated response
      res.json({
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        tours: formatted,
      });
  
    } catch (err) {
      console.error("GET /api/tours-page error:", err);
      res.status(500).json({ error: "Could not fetch tours", details: err.message });
    }
  });
router.get("/filter", async (req, res) => {
    const conn = await dbConnection;
  
    const {
      tour,
      minPrice = 0,
      maxPrice = 10000,
      categories,
      durations,
      continents,
      rating = 0,
      sort = "recommended",
      page = 1,
      limit = 6,
    } = req.query;
  
    const offset = (parseInt(page) - 1) * parseInt(limit);
  
    try {
      // Base WHERE clause
      const whereClauses = [`price BETWEEN ? AND ?`, `rating >= ?`];
      const params = [parseFloat(minPrice), parseFloat(maxPrice), parseFloat(rating)];
  
      // Tour name search (title or location)
      if (tour) {
        const q = tour.toLowerCase();
        whereClauses.push(`(LOWER(title) LIKE ? OR LOWER(location) LIKE ?)`);
        params.push(`%${q}%`, `%${q}%`);
      }
  
      // Categories
      if (categories) {
        const cats = categories.split(",");
        whereClauses.push(`category IN (${cats.map(() => "?").join(",")})`);
        params.push(...cats);
      }
  
      // Continents
      if (continents) {
        const conts = continents.split(",");
        whereClauses.push(`continent IN (${conts.map(() => "?").join(",")})`);
        params.push(...conts);
      }
  
      // Duration ranges (e.g., "1-3", "4-7", "15+")
      if (durations) {
        const durationConditions = durations.split(",").map((range) => {
          if (range === "15+") return `(CAST(SUBSTRING_INDEX(duration, ' ', 1) AS UNSIGNED) >= 15)`;
          const [min, max] = range.split("-").map(Number);
          return `(CAST(SUBSTRING_INDEX(duration, ' ', 1) AS UNSIGNED) BETWEEN ${min} AND ${max})`;
        });
        whereClauses.push(`(${durationConditions.join(" OR ")})`);
      }
  
      // Build full WHERE clause
      const where = whereClauses.length ? `WHERE ${whereClauses.join(" AND ")}` : "";
  
      // Sorting options
      const sortMap = {
        "price-low": "price ASC",
        "price-high": "price DESC",
        "rating": "rating DESC",
        "duration-short": "CAST(SUBSTRING_INDEX(duration, ' ', 1) AS UNSIGNED) ASC",
        "duration-long": "CAST(SUBSTRING_INDEX(duration, ' ', 1) AS UNSIGNED) DESC",
        "recommended": "featured DESC, rating DESC",
      };
      const orderBy = `ORDER BY ${sortMap[sort] || sortMap["recommended"]}`;
  
      // Total count for pagination
      const [[{ total }]] = await conn.query(
        `SELECT COUNT(*) as total FROM products ${where}`,
        params
      );
  
      // Main query

      // Ensure the base filter includes only active tours
const statusFilter = "p.status = 'active'";
const finalWhere = where ? `${where} AND ${statusFilter}` : `WHERE ${statusFilter}`;

const [tours] = await conn.query(
  `
  SELECT 
    p.id,
    p.title,
    p.location,
    p.duration,
    p.price,
    p.rating,
    p.discount,
    p.featured,
    p.category,
    p.continent,
    (
      SELECT COUNT(*) FROM reviews r WHERE r.product_id = p.id
    ) AS reviews,
    (
      SELECT image_url FROM product_images pi WHERE pi.product_id = p.id LIMIT 1
    ) AS image
  FROM products p
  ${finalWhere}
  ${orderBy}
  LIMIT ? OFFSET ?
  `,
  [...params, parseInt(limit), offset]
);

  
      // Format results
      const formatted = tours.map((tour) => ({
        id: tour.id,
        title: tour.title,
        location: tour.location,
        duration: tour.duration,
        price: tour.price,
        rating: tour.rating,
        reviews: tour.reviews,
        image: tour.image || "/placeholder.jpg",
        category: tour.category,
        continent: tour.continent,
        discount: tour.discount !== null ? tour.discount : undefined,
        featured: tour.featured === 1 ? true : undefined,
      }));
  
      res.json({
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        tours: formatted,
      });
    } catch (err) {
      console.error("GET /api/tours/filter error:", err);
      res.status(500).json({ error: "Filtering failed", details: err.message });
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
  
      // Get seller's subaccount_code
      // Replace the subaccount_code section with this:
const [sellerRows] = await conn.query(
  `SELECT s.name AS seller_name,s.subaccount_code 
   FROM sellers s 
   JOIN products p ON p.seller_id = s.id 
   WHERE p.id = ?`,
  [tourId]
);

const seller_name = sellerRows[0]?.seller_name || null;
const subaccount_code = sellerRows[0]?.subaccount_code || null;


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
        itinerary,
        subaccount_code, 
        seller_name// 🔑 Add this field to the final response
      });
  
    } catch (err) {
      console.error("GET /api/tours/:id error:", err);
      res.status(500).json({ error: "Server error", details: err.message });
    }
  });
  





// POST new tour
router.post("/", async (req, res) => {
  const {
    title, location, duration, price, discount_price, discount, rating, description,
    featured, continent, category, seller_id, // 🆕 added seller_id
     images = [], highlights = [], included = [], notIncluded = [], itinerary = []
  } = req.body;

  const conn = await dbConnection;

  try {
    await conn.beginTransaction();
    console.log(req.body)

    const [productResult] = await conn.execute(
      `INSERT INTO products (title, location, duration, price, discount_price, discount, rating, description, featured, category, continent, seller_id)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, location, duration, price, discount_price, discount, rating, description, featured, category, continent, seller_id]
    );
    const productId = productResult.insertId;

    const insertPromises = [];

   

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

// routes/products.js (or wherever your product routes are)
router.put("/:id", async (req, res) => {
  const productId = req.params.id
  const {
    title,
    status,
    location,
    duration,
    price,
    discount_price,
    discount,
    rating,
    description,
    featured,
    continent,
    category,
    images = [],
    reviews = [], // optional, usually not edited here
    highlights = [],
    included = [],
    notIncluded = [],
    itinerary = []
  } = req.body

  const conn = await dbConnection

  try {
    await conn.beginTransaction()

    // Update main product
    await conn.query(
      `UPDATE products SET 
        status = ?,title = ?, location = ?, duration = ?, price = ?, 
        discount_price = ?, discount = ?, rating = ?, description = ?, 
        featured = ?, continent = ?, category = ?
       WHERE id = ?`,
      [
        status,title, location, duration, price,
        discount_price, discount, rating, description,
        featured, continent, category, productId
      ]
    )

    // Delete & re-insert product_images
    await conn.query("DELETE FROM product_images WHERE product_id = ?", [productId])
    for (const img of images) {
      await conn.query("INSERT INTO product_images (product_id, image_url) VALUES (?, ?)", [productId, img])
    }

    // Delete & re-insert highlights
    await conn.query("DELETE FROM product_highlights WHERE product_id = ?", [productId])
    for (const h of highlights) {
      await conn.query("INSERT INTO product_highlights (product_id, highlight) VALUES (?, ?)", [productId, h])
    }

    // Included items
    await conn.query("DELETE FROM product_included WHERE product_id = ?", [productId])
    for (const i of included) {
      await conn.query("INSERT INTO product_included (product_id, item) VALUES (?, ?)", [productId, i])
    }

    // Not included items
    await conn.query("DELETE FROM product_not_included WHERE product_id = ?", [productId])
    for (const ni of notIncluded) {
      await conn.query("INSERT INTO product_not_included (product_id, item) VALUES (?, ?)", [productId, ni])
    }

    // Itinerary
    await conn.query("DELETE FROM product_itinerary WHERE product_id = ?", [productId])
    for (const day of itinerary) {
      await conn.query(
        "INSERT INTO product_itinerary (product_id, day, title, description) VALUES (?, ?, ?, ?)",
        [productId, day.day, day.title, day.description]
      )
    }

    await conn.commit()
    res.json({ message: "Product updated successfully" })
  } catch (err) {
    console.error("PUT /api/products/:id error:", err)
    await conn.rollback()
    res.status(500).json({ error: "Server error", details: err.message })
  }
})

// DELETE /api/products/:id
router.delete("/:id", async (req, res) => {
  const productId = req.params.id;
  const conn = await dbConnection;

  try {
    const [result] = await conn.query(
      "UPDATE products SET status = 'inactive' WHERE id = ?",
      [productId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Product marked as deleted" });
  } catch (err) {
    console.error("DELETE /products/:id error:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});








module.exports = router;

// lib/api/getTour.ts

export type Review = {
  id:number;
    name: string;
    date: string;
    rating: number;
    comment: string;
    avatar: string;
  };
  
  export type ItineraryItem = {
    day: number;
    title: string;
    description: string;
  };
  
  export type Tour = {
    id: number | null;
    title: string | null;
    description: string | null;
    price: number | null;
    location: string | null;
    duration: string | null;
    images: string[];
    reviews: Review[];
    highlights: string[];
    included: string[];
    rating:number | null;
    discount:number | null;
    discount_price:number | null;
    notIncluded: string[];
    itinerary: ItineraryItem[];
  };

  type Params = {
    id: number; // usually from router or props
  };
  
 
  
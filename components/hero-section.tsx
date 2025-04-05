import Link from "next/link";

import { Button } from "@/components/ui/button";
import SearchForm from "@/components/search-form";

export default function HeroSection() {
  return (
    <section className="relative bg-purple-900 text-white">
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] bg-cover bg-center opacity-30" />
      <div className="container relative z-10 py-20 md:py-32 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Discover Your Perfect Adventure
        </h1>
        <p className="text-xl md:text-2xl max-w-3xl mb-8">
          Explore the world with handpicked tour packages and unforgettable
          experiences
        </p>
        <div className="w-full max-w-4xl bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8">
          <SearchForm />
        </div>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Link href="/tours">Explore All Tours</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

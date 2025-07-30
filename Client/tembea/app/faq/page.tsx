import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function FAQPage() {
  // FAQ categories and questions
  const faqCategories = [
    {
      category: "Booking & Reservations",
      questions: [
        {
          question: "How do I book a tour on Tembezi?",
          answer:
            "Booking a tour on Tembezi is simple. Browse our available tours, select the one you're interested in, choose your preferred date and number of travelers, and click 'Book Now'. Follow the checkout process to complete your booking. You'll receive a confirmation email with all the details of your tour.",
        },
        {
          question: "Can I book a tour for someone else?",
          answer:
            "Yes, you can book a tour for someone else. During the booking process, you'll have the option to enter the traveler's details. Just make sure to provide accurate information for all travelers.",
        },
        {
          question: "How far in advance should I book my tour?",
          answer:
            "We recommend booking your tour as early as possible, especially for popular destinations during peak seasons. Most tours can be booked up to 12 months in advance. For high-demand tours, we suggest booking at least 3-6 months ahead to secure your spot.",
        },
        {
          question: "Is my booking confirmed immediately?",
          answer:
            "Yes, once you complete the payment process, your booking is confirmed immediately. You'll receive a booking confirmation email with all the details. In rare cases where a tour becomes unavailable after booking, we'll contact you promptly to offer alternatives or a full refund.",
        },
      ],
    },
    {
      category: "Payments & Pricing",
      questions: [
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for certain bookings. All payments are processed securely through our payment gateway.",
        },
        {
          question: "Are there any hidden fees?",
          answer:
            "No, we believe in transparent pricing. The price you see includes all applicable taxes and fees. Any additional costs, such as optional activities or services not included in the tour package, will be clearly indicated on the tour details page.",
        },
        {
          question: "Can I pay in installments?",
          answer:
            "For certain tours with departure dates more than 60 days away, we offer a deposit payment option. You can pay a deposit (typically 20-30% of the total) to secure your booking and pay the remaining balance 45 days before the tour start date. This option will be available during checkout if applicable to your selected tour.",
        },
        {
          question: "What currency are the prices listed in?",
          answer:
            "All prices on Tembezi are listed in US Dollars (USD). If you're paying with a different currency, your bank or credit card provider will convert the amount at their current exchange rate.",
        },
      ],
    },
    {
      category: "Tour Details",
      questions: [
        {
          question: "What's included in the tour price?",
          answer:
            "Each tour has a detailed 'What's Included' section that specifies exactly what's covered in the price. Generally, this includes accommodation, transportation during the tour, guided activities, and some meals as specified. The 'What's Not Included' section will list items like international flights, travel insurance, and personal expenses.",
        },
        {
          question: "How many people will be on my tour?",
          answer:
            "Group sizes vary depending on the tour type. Most of our standard tours have a maximum of 12-16 travelers. Our small group tours are limited to 8-10 people, while private tours can be customized to your preferred group size. The maximum group size is always indicated on the tour details page.",
        },
        {
          question: "Are flights included in the tour price?",
          answer:
            "International flights to and from the tour destination are typically not included in the tour price. However, some tours may include domestic flights or transportation within the itinerary. Check the 'What's Included' section of your specific tour for details.",
        },
        {
          question: "Do I need travel insurance?",
          answer:
            "Yes, comprehensive travel insurance is mandatory for all Tembezi tours. Your policy should cover medical expenses, emergency evacuation, trip cancellation, and loss or theft of personal belongings. We recommend purchasing insurance as soon as you book your tour.",
        },
      ],
    },
    {
      category: "Cancellations & Changes",
      questions: [
        {
          question: "What is your cancellation policy?",
          answer:
            "Our standard cancellation policy provides a full refund if canceled 60 days or more before the tour start date, a 50% refund if canceled 30-59 days before, and no refund for cancellations less than 30 days before the tour. Some tours may have different policies, which will be clearly indicated during booking. Please refer to our Cancellation Policy page for complete details.",
        },
        {
          question: "Can I change my booking dates after confirming?",
          answer:
            "Yes, you can request to change your booking dates, subject to availability. Changes requested 60 days or more before departure typically incur no fee. Changes requested 30-59 days before departure may incur a change fee. Changes less than 30 days before departure are treated as a cancellation and rebooking, subject to our cancellation policy.",
        },
        {
          question: "What happens if Tembezi cancels my tour?",
          answer:
            "In the rare event that we need to cancel a tour (due to unforeseen circumstances, safety concerns, or insufficient participants), you'll be offered either a full refund, credit toward a future tour, or an alternative tour of similar value. We'll also assist with reasonable flight change fees if applicable.",
        },
        {
          question: "Is my booking protected if the tour operator goes out of business?",
          answer:
            "Yes, Tembezi has financial protection measures in place to safeguard customer payments. In the unlikely event that a tour operator cannot fulfill their obligations, we'll either arrange an alternative tour or provide a full refund.",
        },
      ],
    },
    {
      category: "Account & Technical",
      questions: [
        {
          question: "Do I need to create an account to book a tour?",
          answer:
            "Yes, you need to create a Tembezi account to book a tour. This allows you to manage your bookings, save favorite tours, and access special offers. Creating an account is free and only takes a minute.",
        },
        {
          question: "How do I reset my password?",
          answer:
            "To reset your password, click on the 'Sign In' button, then select 'Forgot password?' Enter your email address, and we'll send you a link to reset your password. If you don't receive the email, check your spam folder or contact our support team.",
        },
        {
          question: "Can I use Tembezi on my mobile device?",
          answer:
            "Yes, Tembezi is fully responsive and works on all devices, including smartphones and tablets. You can browse tours, make bookings, and manage your account from any device with an internet connection.",
        },
        {
          question: "How do I contact customer support?",
          answer:
            "You can contact our customer support team through the 'Contact' page on our website, by emailing support@Tembezi.com, or by calling +1 (234) 567-8900 during our business hours (Monday-Friday, 9:00 AM - 6:00 PM GMT+0).",
        },
      ],
    },
  ]

  return (
    <div className="container py-12">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Frequently Asked Questions</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Find answers to common questions about booking tours, payments, cancellations, and more.
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-8">
        {/* Categories sidebar */}
        <div className="md:col-span-1">
          <div className="sticky top-24 space-y-6">
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <h2 className="font-semibold text-lg mb-4">Categories</h2>
              <ul className="space-y-2">
                {faqCategories.map((category, index) => (
                  <li key={index}>
                    <a
                      href={`#${category.category.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-purple-600 hover:text-purple-800 block py-1"
                    >
                      {category.category}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg border shadow-sm">
              <h2 className="font-semibold text-lg mb-4">Still have questions?</h2>
              <p className="text-muted-foreground mb-4">
                If you couldn't find the answer to your question, please contact our support team.
              </p>
              <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* FAQ content */}
        <div className="md:col-span-3 space-y-10">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} id={category.category.toLowerCase().replace(/\s+/g, "-")} className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-6 border-b pb-2">{category.category}</h2>
              <Accordion type="single" collapsible className="w-full">
                {category.questions.map((faq, faqIndex) => (
                  <AccordionItem key={faqIndex} value={`item-${categoryIndex}-${faqIndex}`}>
                    <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


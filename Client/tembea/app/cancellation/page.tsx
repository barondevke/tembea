import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CancellationPolicyPage() {
  return (
    <div className="container py-12">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Cancellation Policy</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Our guidelines for cancellations, refunds, and booking changes.
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-8">
        {/* Table of contents sidebar */}
        <div className="md:col-span-1">
          <div className="sticky top-24 space-y-6">
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <h2 className="font-semibold text-lg mb-4">Contents</h2>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#standard" className="text-purple-600 hover:text-purple-800 block py-1">
                    1. Standard Cancellation Policy
                  </a>
                </li>
                <li>
                  <a href="#special" className="text-purple-600 hover:text-purple-800 block py-1">
                    2. Special Circumstances
                  </a>
                </li>
                <li>
                  <a href="#changes" className="text-purple-600 hover:text-purple-800 block py-1">
                    3. Booking Changes
                  </a>
                </li>
                <li>
                  <a href="#operator" className="text-purple-600 hover:text-purple-800 block py-1">
                    4. Tour Operator Cancellations
                  </a>
                </li>
                <li>
                  <a href="#refunds" className="text-purple-600 hover:text-purple-800 block py-1">
                    5. Refund Process
                  </a>
                </li>
                <li>
                  <a href="#insurance" className="text-purple-600 hover:text-purple-800 block py-1">
                    6. Travel Insurance
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-purple-600 hover:text-purple-800 block py-1">
                    7. Contact Information
                  </a>
                </li>
              </ul>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg border shadow-sm">
              <h2 className="font-semibold text-lg mb-4">Need Help?</h2>
              <p className="text-muted-foreground mb-4">
                If you need to cancel or modify your booking, our customer support team is here to help.
              </p>
              <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
                <Link href="/contact">Contact Support</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Cancellation Policy content */}
        <div className="md:col-span-3 space-y-10">
          <section id="standard" className="scroll-mt-24">
            <h2 className="text-2xl font-bold mb-4">1. Standard Cancellation Policy</h2>
            <p className="mb-4">
              Our standard cancellation policy applies to most tour bookings unless otherwise specified in the tour
              details. The refund amount depends on how far in advance you cancel your booking:
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-purple-100">
                    <th className="border p-3 text-left">Cancellation Timeframe</th>
                    <th className="border p-3 text-left">Refund Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-3">60+ days before departure</td>
                    <td className="border p-3">100% refund (minus processing fees)</td>
                  </tr>
                  <tr>
                    <td className="border p-3">30-59 days before departure</td>
                    <td className="border p-3">50% refund</td>
                  </tr>
                  <tr>
                    <td className="border p-3">15-29 days before departure</td>
                    <td className="border p-3">25% refund</td>
                  </tr>
                  <tr>
                    <td className="border p-3">0-14 days before departure</td>
                    <td className="border p-3">No refund</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mb-4">
              Please note that all refunds are subject to a processing fee of $50 per person. This fee covers
              administrative costs associated with processing your cancellation.
            </p>
            <p className="mb-4">
              The cancellation date is determined based on the date we receive your written cancellation request. All
              cancellation requests must be submitted in writing via email to cancellations@Tembezi.com or through your
              account dashboard.
            </p>
          </section>

          <section id="special" className="scroll-mt-24">
            <h2 className="text-2xl font-bold mb-4">2. Special Circumstances</h2>
            <p className="mb-4">
              We understand that sometimes cancellations are unavoidable due to circumstances beyond your control. In
              the following special circumstances, we may offer more flexible cancellation terms:
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">2.1 Medical Emergencies</h3>
            <p className="mb-4">
              If you or a travel companion experiences a serious medical emergency that prevents travel, we may offer a
              more flexible refund policy or the option to reschedule your tour without additional fees. Documentation
              from a medical professional will be required.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">2.2 Natural Disasters & Political Unrest</h3>
            <p className="mb-4">
              If a natural disaster, political unrest, or other significant event occurs at your destination that makes
              travel unsafe or impossible, we will work with you to reschedule your tour or provide a credit for future
              travel. In some cases, a full refund may be offered.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">2.3 COVID-19 Related Cancellations</h3>
            <p className="mb-4">For cancellations related to COVID-19, our policy is as follows:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>
                If government travel restrictions prevent you from reaching your destination, you may reschedule your
                tour without a change fee or receive a credit valid for 24 months.
              </li>
              <li>
                If you test positive for COVID-19 within 14 days of your departure date, you may reschedule your tour or
                receive a credit valid for 24 months (documentation required).
              </li>
              <li>
                Cancellations due to general concerns about COVID-19 without specific restrictions or positive tests are
                subject to our standard cancellation policy.
              </li>
            </ul>
          </section>

          <section id="changes" className="scroll-mt-24">
            <h2 className="text-2xl font-bold mb-4">3. Booking Changes</h2>
            <p className="mb-4">
              If you need to change your booking rather than cancel it entirely, the following policies apply:
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">3.1 Date Changes</h3>
            <p className="mb-4">Changes to your tour date are subject to availability and the following fees:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>60+ days before departure: $25 per person</li>
              <li>30-59 days before departure: $50 per person</li>
              <li>15-29 days before departure: $100 per person</li>
              <li>0-14 days before departure: Treated as a cancellation and new booking</li>
            </ul>
            <p className="mb-4">
              If the new tour date is more expensive than your original booking, you will need to pay the difference. If
              it is less expensive, the difference will be provided as a credit for future travel.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">3.2 Traveler Changes</h3>
            <p className="mb-4">
              You may change the names of travelers in your booking up to 30 days before departure for a fee of $25 per
              person. Within 30 days of departure, traveler changes may not be possible or may incur higher fees
              depending on the tour operator's policies.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">3.3 Tour Changes</h3>
            <p className="mb-4">
              If you wish to change to a different tour, this will be treated as a cancellation of your original booking
              (subject to our standard cancellation policy) and a new booking for the new tour.
            </p>
          </section>

          <section id="operator" className="scroll-mt-24">
            <h2 className="text-2xl font-bold mb-4">4. Tour Operator Cancellations</h2>
            <p className="mb-4">
              In rare cases, a tour may be canceled by the tour operator due to insufficient participants, safety
              concerns, or other unforeseen circumstances. If this occurs:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>You will be offered an alternative tour of equal or greater value at no additional cost.</li>
              <li>
                If no suitable alternative is available or acceptable to you, you will receive a full refund, including
                any processing fees.
              </li>
              <li>
                If the cancellation occurs after your journey has begun, we will work with the tour operator to provide
                the best possible solution, which may include a partial refund for unused services.
              </li>
            </ul>
            <p className="mb-4">
              Please note that Tembezi is not responsible for additional expenses incurred as a result of a tour operator
              cancellation, such as non-refundable flights, accommodation, or other travel arrangements not booked
              through Tembezi. This is why we strongly recommend comprehensive travel insurance.
            </p>
          </section>

          <section id="refunds" className="scroll-mt-24">
            <h2 className="text-2xl font-bold mb-4">5. Refund Process</h2>
            <p className="mb-4">When a refund is approved, the following process applies:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Refunds will be processed back to the original payment method used for booking.</li>
              <li>
                Processing time for refunds is typically 7-14 business days, although it may take longer depending on
                your financial institution.
              </li>
              <li>You will receive an email confirmation when your refund has been processed.</li>
              <li>
                Partial refunds for unused services during a tour must be requested within 30 days of your tour end
                date.
              </li>
            </ul>
          </section>

          <section id="insurance" className="scroll-mt-24">
            <h2 className="text-2xl font-bold mb-4">6. Travel Insurance</h2>
            <p className="mb-4">
              We strongly recommend purchasing comprehensive travel insurance for all bookings. A good travel insurance
              policy can provide coverage for:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Trip cancellation due to covered reasons</li>
              <li>Emergency medical expenses and evacuation</li>
              <li>Travel delays and missed connections</li>
              <li>Lost, damaged, or delayed baggage</li>
              <li>Other unforeseen circumstances that may disrupt your travel plans</li>
            </ul>
            <p className="mb-4">
              Travel insurance can provide peace of mind and financial protection in situations where our cancellation
              policy would not provide a refund. We recommend purchasing insurance as soon as you book your tour, as
              some benefits (like pre-existing condition waivers) are only available when insurance is purchased shortly
              after booking.
            </p>
          </section>

          <section id="contact" className="scroll-mt-24">
            <h2 className="text-2xl font-bold mb-4">7. Contact Information</h2>
            <p className="mb-4">
              If you need to cancel or modify your booking, or if you have questions about our cancellation policy,
              please contact us at:
            </p>
            <address className="not-italic mb-6">
              <p>Tembezi Customer Support</p>
              <p>Email: cancellations@Tembezi.com</p>
              <p>Phone: +1 (234) 567-8900</p>
              <p>Hours: Monday-Friday, 9:00 AM - 6:00 PM GMT+0</p>
            </address>
            <p className="mb-4">
              You can also manage your bookings and submit cancellation requests through your account dashboard on our
              website or mobile app.
            </p>
          </section>

          <div className="bg-gray-50 p-6 rounded-lg border mt-10">
            <p className="text-center text-muted-foreground">
              This cancellation policy was last updated on April 3, 2023. The policy in effect at the time of your
              booking will apply to your reservation.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}


import Link from "next/link"

export default function TermsPage() {
  return (
    <div className="container py-12">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Terms & Conditions</h1>
        <p className="text-muted-foreground max-w-3xl mx-auto">Last updated: April 3, 2023</p>
      </div>

      <div className="grid md:grid-cols-4 gap-8">
        {/* Table of contents sidebar */}
        <div className="md:col-span-1">
          <div className="sticky top-24 space-y-6">
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <h2 className="font-semibold text-lg mb-4">Contents</h2>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#introduction" className="text-purple-600 hover:text-purple-800 block py-1">
                    1. Introduction
                  </a>
                </li>
                <li>
                  <a href="#definitions" className="text-purple-600 hover:text-purple-800 block py-1">
                    2. Definitions
                  </a>
                </li>
                <li>
                  <a href="#account" className="text-purple-600 hover:text-purple-800 block py-1">
                    3. Account Registration
                  </a>
                </li>
                <li>
                  <a href="#booking" className="text-purple-600 hover:text-purple-800 block py-1">
                    4. Booking & Payments
                  </a>
                </li>
                <li>
                  <a href="#cancellation" className="text-purple-600 hover:text-purple-800 block py-1">
                    5. Cancellation & Refunds
                  </a>
                </li>
                <li>
                  <a href="#conduct" className="text-purple-600 hover:text-purple-800 block py-1">
                    6. User Conduct
                  </a>
                </li>
                <li>
                  <a href="#intellectual" className="text-purple-600 hover:text-purple-800 block py-1">
                    7. Intellectual Property
                  </a>
                </li>
                <li>
                  <a href="#liability" className="text-purple-600 hover:text-purple-800 block py-1">
                    8. Limitation of Liability
                  </a>
                </li>
                <li>
                  <a href="#indemnification" className="text-purple-600 hover:text-purple-800 block py-1">
                    9. Indemnification
                  </a>
                </li>
                <li>
                  <a href="#modifications" className="text-purple-600 hover:text-purple-800 block py-1">
                    10. Modifications
                  </a>
                </li>
                <li>
                  <a href="#governing" className="text-purple-600 hover:text-purple-800 block py-1">
                    11. Governing Law
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-purple-600 hover:text-purple-800 block py-1">
                    12. Contact Information
                  </a>
                </li>
              </ul>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg border shadow-sm">
              <h2 className="font-semibold text-lg mb-4">Related Policies</h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy" className="text-purple-600 hover:text-purple-800 block py-1">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/cancellation" className="text-purple-600 hover:text-purple-800 block py-1">
                    Cancellation Policy
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-purple-600 hover:text-purple-800 block py-1">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Terms content */}
        <div className="md:col-span-3 space-y-10">
          <section id="introduction" className="scroll-mt-24">
            <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
            <p className="mb-4">
              Welcome to Tembea. These Terms and Conditions govern your use of the Tembea website, mobile applications,
              and services (collectively, the "Services"). By accessing or using our Services, you agree to be and
              services (collectively, the "Services"). By accessing or using our Services, you agree to be bound by
              these Terms and Conditions. If you do not agree to these terms, please do not use our Services. These
              Terms and Conditions constitute a legally binding agreement between you and Tembea. We reserve the right
              to update or modify these terms at any time without prior notice. Your continued use of our Services
              following any changes indicates your acceptance of the revised terms.
            </p>
          </section>

          <section id="definitions" className="scroll-mt-24">
            <h2 className="text-2xl font-bold mb-4">2. Definitions</h2>
            <p className="mb-4">
              Throughout these Terms and Conditions, the following terms shall have the meanings defined below:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>
                <strong>"Tembea"</strong> refers to our company, including our website, mobile applications, and
                services.
              </li>
              <li>
                <strong>"User"</strong> refers to any individual who accesses or uses our Services, whether registered
                or not.
              </li>
              <li>
                <strong>"Account"</strong> refers to a registered user profile on our platform.
              </li>
              <li>
                <strong>"Booking"</strong> refers to a reservation made through our Services for any tour or travel
                package.
              </li>
              <li>
                <strong>"Tour Operator"</strong> refers to the third-party provider of the tour or travel service.
              </li>
              <li>
                <strong>"Content"</strong> refers to all information, text, images, data, links, software, or other
                material accessible through our Services.
              </li>
            </ul>
          </section>

          <section id="account" className="scroll-mt-24">
            <h2 className="text-2xl font-bold mb-4">3. Account Registration</h2>
            <p className="mb-4">
              To access certain features of our Services, you may be required to register for an account. When you
              register, you agree to provide accurate, current, and complete information about yourself. You are
              responsible for maintaining the confidentiality of your account credentials and for all activities that
              occur under your account.
            </p>
            <p className="mb-4">
              You agree to notify us immediately of any unauthorized use of your account or any other breach of
              security. Tembea will not be liable for any loss or damage arising from your failure to protect your
              account credentials.
            </p>
            <p className="mb-4">
              We reserve the right to suspend or terminate your account at our discretion, without notice, if we believe
              you have violated these Terms and Conditions or if your use of the Services poses a risk to Tembea or
              other users.
            </p>
          </section>

          <section id="booking" className="scroll-mt-24">
            <h2 className="text-2xl font-bold mb-4">4. Booking & Payments</h2>
            <p className="mb-4">
              When you make a booking through our Services, you enter into a contract with the Tour Operator, not with
              Tembea. We act as an intermediary between you and the Tour Operator. By making a booking, you agree to the
              specific terms and conditions of the Tour Operator, in addition to these Terms and Conditions.
            </p>
            <p className="mb-4">
              You agree to provide accurate and complete information for all travelers included in your booking. You are
              responsible for ensuring that all travelers meet the requirements for the tour, including but not limited
              to visa requirements, health conditions, and age restrictions.
            </p>
            <p className="mb-4">
              All payments made through our Services are processed by secure third-party payment processors. By making a
              payment, you authorize us to charge the specified amount to your selected payment method. All prices are
              displayed in US Dollars unless otherwise specified.
            </p>
          </section>

          <section id="cancellation" className="scroll-mt-24">
            <h2 className="text-2xl font-bold mb-4">5. Cancellation & Refunds</h2>
            <p className="mb-4">
              Cancellation and refund policies vary by Tour Operator and are specified in the tour details before
              booking. By making a booking, you agree to the cancellation and refund policy applicable to your selected
              tour.
            </p>
            <p className="mb-4">In general, our standard cancellation policy provides:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Full refund if canceled 60 days or more before the tour start date</li>
              <li>50% refund if canceled 30-59 days before the tour start date</li>
              <li>No refund for cancellations less than 30 days before the tour start date</li>
            </ul>
            <p className="mb-4">
              For detailed information, please refer to our{" "}
              <Link href="/cancellation" className="text-purple-600 hover:text-purple-800">
                Cancellation Policy
              </Link>
              .
            </p>
          </section>

          <section id="conduct" className="scroll-mt-24">
            <h2 className="text-2xl font-bold mb-4">6. User Conduct</h2>
            <p className="mb-4">When using our Services, you agree not to:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe upon the rights of others, including intellectual property rights</li>
              <li>Submit false or misleading information</li>
              <li>Engage in unauthorized framing, linking, or scraping of our content</li>
              <li>Interfere with or disrupt the operation of our Services</li>
              <li>Attempt to gain unauthorized access to our systems or user accounts</li>
              <li>Use our Services for any illegal or unauthorized purpose</li>
              <li>Harass, abuse, or harm another person</li>
              <li>Distribute viruses or other malicious code</li>
            </ul>
            <p className="mb-4">
              We reserve the right to remove any content that violates these terms and to suspend or terminate the
              accounts of users who engage in prohibited conduct.
            </p>
          </section>

          <section id="intellectual" className="scroll-mt-24">
            <h2 className="text-2xl font-bold mb-4">7. Intellectual Property</h2>
            <p className="mb-4">
              All content on our Services, including but not limited to text, graphics, logos, images, audio clips,
              digital downloads, and software, is the property of Tembea or its content suppliers and is protected by
              international copyright, trademark, and other intellectual property laws.
            </p>
            <p className="mb-4">
              You may access, download, and print content from our Services for your personal, non-commercial use only.
              You may not reproduce, distribute, modify, create derivative works from, publicly display, publicly
              perform, republish, download, store, or transmit any content from our Services without our express written
              consent.
            </p>
          </section>

          <section id="liability" className="scroll-mt-24">
            <h2 className="text-2xl font-bold mb-4">8. Limitation of Liability</h2>
            <p className="mb-4">
              To the maximum extent permitted by law, Tembea shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages, including but not limited to loss of profits, data, use, goodwill, or
              other intangible losses, resulting from:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Your access to or use of or inability to access or use our Services</li>
              <li>Any conduct or content of any third party on our Services</li>
              <li>Any content obtained from our Services</li>
              <li>Unauthorized access, use, or alteration of your transmissions or content</li>
            </ul>
            <p className="mb-4">
              In no event shall our total liability to you for all claims exceed the amount paid by you, if any, for
              accessing our Services during the 12 months preceding your claim.
            </p>
          </section>

          <section id="indemnification" className="scroll-mt-24">
            <h2 className="text-2xl font-bold mb-4">9. Indemnification</h2>
            <p className="mb-4">
              You agree to indemnify, defend, and hold harmless Tembea, its officers, directors, employees, agents, and
              affiliates from and against any and all claims, liabilities, damages, losses, costs, expenses, or fees
              (including reasonable attorneys' fees) arising from:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Your use of our Services</li>
              <li>Your violation of these Terms and Conditions</li>
              <li>Your violation of any rights of another</li>
              <li>Your conduct in connection with our Services</li>
            </ul>
          </section>

          <section id="modifications" className="scroll-mt-24">
            <h2 className="text-2xl font-bold mb-4">10. Modifications</h2>
            <p className="mb-4">
              We reserve the right to modify or replace these Terms and Conditions at any time. The most current version
              will always be posted on our website. By continuing to access or use our Services after any revisions
              become effective, you agree to be bound by the revised terms.
            </p>
          </section>

          <section id="governing" className="scroll-mt-24">
            <h2 className="text-2xl font-bold mb-4">11. Governing Law</h2>
            <p className="mb-4">
              These Terms and Conditions shall be governed by and construed in accordance with the laws of the United
              States, without regard to its conflict of law provisions. You agree to submit to the personal and
              exclusive jurisdiction of the courts located within the United States for the resolution of any disputes.
            </p>
          </section>

          <section id="contact" className="scroll-mt-24">
            <h2 className="text-2xl font-bold mb-4">12. Contact Information</h2>
            <p className="mb-4">If you have any questions about these Terms and Conditions, please contact us at:</p>
            <address className="not-italic mb-6">
              <p>Tembea</p>
              <p>1234 Tourism Road</p>
              <p>Travel City, TC 56789</p>
              <p>United States</p>
              <p>Email: legal@tembea.com</p>
              <p>Phone: +1 (234) 567-8900</p>
            </address>
          </section>

          <div className="bg-gray-50 p-6 rounded-lg border mt-10">
            <p className="text-center text-muted-foreground">
              By using our Services, you acknowledge that you have read, understood, and agree to be bound by these
              Terms and Conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}


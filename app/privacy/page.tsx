import Link from "next/link"

export default function PrivacyPolicyPage() {
  return (
    <div className="container py-12">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
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
                  <a href="#information" className="text-purple-600 hover:text-purple-800 block py-1">
                    2. Information We Collect
                  </a>
                </li>
                <li>
                  <a href="#use" className="text-purple-600 hover:text-purple-800 block py-1">
                    3. How We Use Your Information
                  </a>
                </li>
                <li>
                  <a href="#sharing" className="text-purple-600 hover:text-purple-800 block py-1">
                    4. Information Sharing
                  </a>
                </li>
                <li>
                  <a href="#cookies" className="text-purple-600 hover:text-purple-800 block py-1">
                    5. Cookies & Tracking
                  </a>
                </li>
                <li>
                  <a href="#security" className="text-purple-600 hover:text-purple-800 block py-1">
                    6. Data Security
                  </a>
                </li>
                <li>
                  <a href="#rights" className="text-purple-600 hover:text-purple-800 block py-1">
                    7. Your Rights
                  </a>
                </li>
                <li>
                  <a href="#international" className="text-purple-600 hover:text-purple-800 block py-1">
                    8. International Transfers
                  </a>
                </li>
                <li>
                  <a href="#children" className="text-purple-600 hover:text-purple-800 block py-1">
                    9. Children's Privacy
                  </a>
                </li>
                <li>
                  <a href="#changes" className="text-purple-600 hover:text-purple-800 block py-1">
                    10. Changes to This Policy
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-purple-600 hover:text-purple-800 block py-1">
                    11. Contact Us
                  </a>
                </li>
              </ul>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg border shadow-sm">
              <h2 className="font-semibold text-lg mb-4">Related Policies</h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/terms" className="text-purple-600 hover:text-purple-800 block py-1">
                    Terms & Conditions
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

        {/* Privacy Policy content */}
        <div className="md:col-span-3 space-y-10">
          <section id="introduction" className="scroll-mt-24">
            <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
            <p className="mb-4">
              At Tembea, we are committed to protecting your privacy and ensuring the security of your personal
              information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information
              when you visit our website, use our mobile application, or use any of our services (collectively, the
              "Services").
            </p>
            <p className="mb-4">
              Please read this Privacy Policy carefully. By accessing or using our Services, you acknowledge that you
              have read, understood, and agree to be bound by all the terms of this Privacy Policy. If you do not agree
              with our policies and practices, please do not use our Services.
            </p>
          </section>

          <section id="information" className="scroll-mt-24">
            <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
            <p className="mb-4">
              We collect several types of information from and about users of our Services, including:
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">2.1 Personal Information</h3>
            <p className="mb-4">
              Personal information is data that can be used to identify you individually. This may include:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Name, email address, postal address, and phone number</li>
              <li>Date of birth and gender</li>
              <li>Payment information (credit card details, billing address)</li>
              <li>Passport or ID information (when required for booking)</li>
              <li>Travel preferences and special requirements</li>
              <li>Account login credentials</li>
              <li>Profile picture (if provided)</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">2.2 Non-Personal Information</h3>
            <p className="mb-4">
              We also collect non-personal information that does not directly identify you, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>IP address</li>
              <li>Device information</li>
              <li>Usage data (pages visited, time spent, clicks)</li>
              <li>Referring website or application</li>
              <li>Search terms used to reach our Services</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">2.3 Information Collection Methods</h3>
            <p className="mb-4">We collect information through:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Direct interactions (when you create an account, make a booking, contact us)</li>
              <li>Automated technologies (cookies, web beacons, tracking pixels)</li>
              <li>Third parties (social media platforms, payment processors, tour operators)</li>
            </ul>
          </section>

          <section id="use" className="scroll-mt-24">
            <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
            <p className="mb-4">We use the information we collect for various purposes, including:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Processing and managing your bookings</li>
              <li>Creating and maintaining your account</li>
              <li>Providing customer support</li>
              <li>Sending transactional emails (booking confirmations, updates)</li>
              <li>Sending marketing communications (if you've opted in)</li>
              <li>Personalizing your experience</li>
              <li>Improving our Services</li>
              <li>Analyzing usage patterns and trends</li>
              <li>Detecting and preventing fraud</li>
              <li>Complying with legal obligations</li>
            </ul>
          </section>

          <section id="sharing" className="scroll-mt-24">
            <h2 className="text-2xl font-bold mb-4">4. Information Sharing</h2>
            <p className="mb-4">We may share your information with:</p>

            <h3 className="text-xl font-semibold mt-6 mb-3">4.1 Service Providers</h3>
            <p className="mb-4">
              We share information with third-party service providers who perform services on our behalf, such as:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Tour operators and travel suppliers</li>
              <li>Payment processors</li>
              <li>Customer support services</li>
              <li>Email and communication providers</li>
              <li>Analytics providers</li>
              <li>IT and cloud service providers</li>
            </ul>
            <p className="mb-4">
              These service providers are contractually obligated to use your information only as necessary to provide
              services to us and in accordance with our Privacy Policy.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">4.2 Legal Requirements</h3>
            <p className="mb-4">
              We may disclose your information if required to do so by law or in response to valid requests by public
              authorities (e.g., court orders, government requests).
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">4.3 Business Transfers</h3>
            <p className="mb-4">
              If Tembea is involved in a merger, acquisition, or sale of all or a portion of its assets, your
              information may be transferred as part of that transaction. We will notify you via email and/or a
              prominent notice on our website of any change in ownership or uses of your personal information.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">4.4 With Your Consent</h3>
            <p className="mb-4">
              We may share your information with third parties when you have given us your consent to do so.
            </p>
          </section>

          <section id="cookies" className="scroll-mt-24">
            <h2 className="text-2xl font-bold mb-4">5. Cookies & Tracking</h2>
            <p className="mb-4">
              We use cookies and similar tracking technologies to track activity on our Services and to hold certain
              information. Cookies are files with a small amount of data that may include an anonymous unique
              identifier.
            </p>
            <p className="mb-4">We use the following types of cookies:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>
                <strong>Essential cookies:</strong> Necessary for the operation of our Services
              </li>
              <li>
                <strong>Analytical/performance cookies:</strong> Allow us to recognize and count visitors and see how
                they move around our Services
              </li>
              <li>
                <strong>Functionality cookies:</strong> Enable us to personalize content for you
              </li>
              <li>
                <strong>Targeting cookies:</strong> Record your visit to our Services, the pages you visit, and the
                links you follow
              </li>
            </ul>
            <p className="mb-4">
              You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However,
              if you do not accept cookies, you may not be able to use some portions of our Services.
            </p>
          </section>

          <section id="security" className="scroll-mt-24">
            <h2 className="text-2xl font-bold mb-4">6. Data Security</h2>
            <p className="mb-4">
              We implement appropriate technical and organizational measures to protect the security of your personal
              information. However, please be aware that no method of transmission over the internet or electronic
              storage is 100% secure, and we cannot guarantee absolute security.
            </p>
            <p className="mb-4">Our security measures include:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Encryption of sensitive data</li>
              <li>Secure socket layer (SSL) technology</li>
              <li>Regular security assessments</li>
              <li>Access controls and authentication procedures</li>
              <li>Data minimization practices</li>
              <li>Employee training on data protection</li>
            </ul>
          </section>

          <section id="rights" className="scroll-mt-24">
            <h2 className="text-2xl font-bold mb-4">7. Your Rights</h2>
            <p className="mb-4">
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>
                <strong>Access:</strong> You can request a copy of the personal information we hold about you.
              </li>
              <li>
                <strong>Rectification:</strong> You can request that we correct inaccurate or incomplete information.
              </li>
              <li>
                <strong>Erasure:</strong> You can request that we delete your personal information in certain
                circumstances.
              </li>
              <li>
                <strong>Restriction:</strong> You can request that we restrict the processing of your information in
                certain circumstances.
              </li>
              <li>
                <strong>Data portability:</strong> You can request a copy of your information in a structured, commonly
                used, machine-readable format.
              </li>
              <li>
                <strong>Objection:</strong> You can object to our processing of your information in certain
                circumstances.
              </li>
              <li>
                <strong>Withdraw consent:</strong> You can withdraw consent where we process your information based on
                consent.
              </li>
            </ul>
            <p className="mb-4">
              To exercise any of these rights, please contact us using the information provided in the "Contact Us"
              section below.
            </p>
          </section>

          <section id="international" className="scroll-mt-24">
            <h2 className="text-2xl font-bold mb-4">8. International Transfers</h2>
            <p className="mb-4">
              Your information may be transferred to and processed in countries other than the country in which you
              reside. These countries may have data protection laws that are different from the laws of your country.
            </p>
            <p className="mb-4">
              When we transfer your information to other countries, we will take appropriate measures to ensure that
              your personal information remains protected in accordance with this Privacy Policy and applicable law.
            </p>
          </section>

          <section id="children" className="scroll-mt-24">
            <h2 className="text-2xl font-bold mb-4">9. Children's Privacy</h2>
            <p className="mb-4">
              Our Services are not intended for children under the age of 16. We do not knowingly collect personal
              information from children under 16. If you are a parent or guardian and you believe your child has
              provided us with personal information, please contact us, and we will take steps to delete such
              information.
            </p>
          </section>

          <section id="changes" className="scroll-mt-24">
            <h2 className="text-2xl font-bold mb-4">10. Changes to This Policy</h2>
            <p className="mb-4">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
              Privacy Policy on this page and updating the "Last updated" date at the top of this policy.
            </p>
            <p className="mb-4">
              You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy
              are effective when they are posted on this page.
            </p>
          </section>

          <section id="contact" className="scroll-mt-24">
            <h2 className="text-2xl font-bold mb-4">11. Contact Us</h2>
            <p className="mb-4">If you have any questions about this Privacy Policy, please contact us at:</p>
            <address className="not-italic mb-6">
              <p>Tembea</p>
              <p>1234 Tourism Road</p>
              <p>Travel City, TC 56789</p>
              <p>United States</p>
              <p>Email: privacy@tembea.com</p>
              <p>Phone: +1 (234) 567-8900</p>
            </address>
          </section>
        </div>
      </div>
    </div>
  )
}


"use client";
import Header from '@/components/global/Header';
import Link from 'next/link';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Header */}
          <Header heading="Privacy Policy" subheading="Last Updated: January 8, 2025" />

          {/* Content */}
          <div className="p-8 space-y-8">
            {/* Introduction */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800">Introduction</h2>
              <p className="text-gray-600 leading-relaxed">
                Welcome to Meme Generator. We respect your privacy and are committed to protecting your personal data. 
                This privacy policy explains how we handle your information when you use our meme generation service.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800">Information We Collect</h2>
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <h3 className="text-lg font-medium text-gray-700">Automatically Collected Information:</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>Access times and dates</li>
                  <li>Pages viewed</li>
                  <li>IP address</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <h3 className="text-lg font-medium text-gray-700">User-Provided Information:</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>Images uploaded for meme creation</li>
                  <li>Text added to memes</li>
                  <li>Custom templates created</li>
                </ul>
              </div>
            </section>

            {/* How We Use Information */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800">How We Use Your Information</h2>
              <p className="text-gray-600 leading-relaxed">
                We use the collected information to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Provide and maintain our meme generation service</li>
                <li>Improve and optimize our website performance</li>
                <li>Analyze usage patterns and trends</li>
                <li>Prevent fraud and ensure security</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            {/* Data Storage and Security */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800">Data Storage and Security</h2>
              <p className="text-gray-600 leading-relaxed">
                We implement appropriate technical and organizational measures to protect your data. 
                However, no method of transmission over the internet is 100% secure, and we cannot 
                guarantee absolute security.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <p className="text-blue-700">
                  Note: Generated memes are temporarily stored and automatically deleted when you refresh the page or close your browser.
                </p>
              </div>
            </section>

            {/* Your Rights */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800">Your Rights</h2>
              <p className="text-gray-600 leading-relaxed">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Access your personal data</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to processing of your data</li>
                <li>Request data portability</li>
              </ul>
            </section>

            {/* Cookies */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800">Cookies</h2>
              <p className="text-gray-600 leading-relaxed">
                We use essential cookies to ensure the basic functionality of our website. 
                These cookies do not track personal information and are used only to enhance 
                your meme creation experience.
              </p>
            </section>

            {/* Contact Information */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800">Contact Us</h2>
              <p className="text-gray-600 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700">
                  Email: <a href="mailto:robinnayak86@gmail.com" className="text-blue-600 hover:underline">robinnayak86@gmail.com</a>
                </p>
              </div>
            </section>

            {/* Footer */}
            <footer className="pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 text-center">
                By using Meme Generator, you agree to this privacy policy and our{' '}
                <Link href="/terms" className="text-blue-600 hover:underline">
                  Terms of Service
                </Link>
              </p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
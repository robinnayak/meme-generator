import Header from '@/components/global/Header';
import Link from 'next/link';

export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Header heading="Contact Us" subheading="Get in Touch with Our Team" />
      <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold mb-6 underline">Robin Nayak</h2>
          <p className="text-gray-700 mb-6">
            Meet Robin Nayak, a developer with a knack for turning data into laughs.
            With a creative twist, he’s crafted a meme generator that brings humor to life,
            proving that coding and fun go hand in hand!
          </p>

          <div className="flex items-center space-x-2">
            <span className="text-gray-600">📧</span>
            <a href="mailto:robinnayak86@gmail.com" className="text-blue-600 hover:underline">
              robinnayak86@gmail.com
            </a>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-gray-600">📱</span>
            <a href="tel:+9779815823670" className="text-blue-600 hover:underline">
              +977 9815823670
            </a>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-gray-600">🌐</span>
            <a href="https://www.robinnayak.com.np" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              www.robinnayak.com.np
            </a>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-gray-600">💼</span>
            <a href="https://www.linkedin.com/in/robinnayak" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              LinkedIn
            </a>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-gray-600">🐱</span>
            <a href="https://github.com/robinnayak" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              GitHub
            </a>
          </div>
        </div>
      </div>


    </div>
  );
}
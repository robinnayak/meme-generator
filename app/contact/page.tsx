import Link from 'next/link';

export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Contact Us</h1>
      
      <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold mb-6">Robin Nayak</h2>
          
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

      <div className="bg-white rounded-lg shadow-sm p-8">
        <h2 className="text-2xl font-semibold mb-6">Send a Message</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input 
              type="text" 
              id="name" 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" 
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input 
              type="email" 
              id="email" 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" 
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
            <textarea 
              id="message" 
              rows={4} 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            ></textarea>
          </div>
          <button 
            type="submit" 
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
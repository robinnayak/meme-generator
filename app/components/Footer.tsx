const Footer = () => {
  return (
    <footer className="bg-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <p className="text-center text-gray-600">
          © {new Date().getFullYear()} Robin Nayak. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

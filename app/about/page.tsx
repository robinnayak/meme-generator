import Header from "@/components/global/Header";

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Header heading="About Our Meme Generator" subheading=" Learn More About Our Meme Generator" />
      <div className="prose max-w-none">
        <p className="text-lg mb-4">
          Welcome to our Meme Generator - a powerful and intuitive tool designed to bring your creative ideas to life! Our platform allows you to easily create, customize, and share memes that stand out from the crowd.
        </p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-4">What Makes Us Special</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Easy-to-use text editor for adding and customizing text</li>
          <li>Real-time canvas preview of your meme</li>
          <li>Multiple text boxes with customizable positions</li>
          <li>Font customization options</li>
          <li>Download your created memes instantly</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Our Mission</h2>
        <p className="text-lg mb-4">
          Our mission is to provide a seamless and enjoyable meme creation experience for everyone, whether you're a meme enthusiast or creating your very first meme. We believe in making creativity accessible and fun!
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Get Started</h2>
        <p className="text-lg">
          Ready to create your own memes? Head over to our home page and start creating! If you need any help, check out our FAQ section for detailed guides and tips.
        </p>
      </div>
    </div>
  );
}


const AboutBuilding = () => {
  return (
    <section className="bg-gray-100 py-10 px-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-gray-800 uppercase mb-6">
        About the Building
      </h1>
      <div className="text-gray-700 leading-relaxed">
        <p className="text-lg mb-4">
          Welcome to <span className="font-semibold text-gray-900">The Skyline Tower</span>, an architectural marvel located in the heart of the city. This 50-story structure combines modern design with sustainable living, offering breathtaking views and state-of-the-art amenities.
        </p>
        <p className="text-lg mb-4">
          The building features luxury apartments, office spaces, and a rooftop garden that spans over 5,000 square feet. Residents enjoy access to a fitness center, infinity pool, and dedicated coworking spaces, making it perfect for urban professionals and families alike.
        </p>
        <p className="text-xl font-semibold text-blue-600 mt-6">
          Key Features:
        </p>
        <ul className="list-disc list-inside mt-4 space-y-2">
          <li>LEED-certified green construction</li>
          <li>High-speed elevators</li>
          <li>24/7 security and concierge services</li>
          <li>Close proximity to public transportation</li>
        </ul>
      </div>
    </section>
  );
};

export default AboutBuilding;

"use client";
const NewsLetter = () => {
  return (
    <div className="bg-gray-100 py-12 md:mb-20 mb-10">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-4">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-center mb-6">
          Stay updated with our latest news and offers.
        </p>
        <div className="flex justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 border  border-gray-300 rounded-l-lg focus:outline-none font-mono w-full max-w-xs"
          />
          <button
            className="bg-black text-white px-6 py-2 rounded-r-lg hover:bg-gray-800 transition duration-300"
            onClick={() => {
              alert("Thank You");
            }}
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;

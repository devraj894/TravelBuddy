import React from "react";
import { motion } from "framer-motion";

const destinations = [
    {
      id: 1,
      name: "Mussoorie",
      description: "Referred to be the most suitable and affordable holiday destinations of India, Mussoorie is a perfect weekend destination. Located in Dehradun district of Uttarakhand.",
      image: "https://media.easemytrip.com/media/Blog/India/637762882335748573/637762882335748573cZj25v.jpg",
    },
    {
      id: 2,
      name: "Kashmir",
      description: "The list of the top holiday destinations in India will remain incomplete if you don’t talk about the paradise on earth – Kashmir. Charming destination of Kashmir appeals a number of tourists for experiencing heaven on the earth.",
      image: "https://media.easemytrip.com/media/Blog/India/637762882335748573/637762882335748573B3VYdV.jpg",
    },
    {
      id: 3,
      name: "Manali",
      description: "Situated at an elevation of 2050 meters above the sea level, Manali is a beautiful tourist destination of India offering a number of adventure activities.",
      image: "https://media.easemytrip.com/media/Blog/India/637762882335748573/637762882335748573GiFXRY.jpg",
    },
    {
      id: 4,
      name: "Goa",
      description: "Situated on the western coast of India, Goa is primarily known for being the hub of partying and indulging into exciting water sports and activities.",
      image: "https://media.easemytrip.com/media/Blog/India/637762882335748573/6377628823357485734Aqaal.jpg",
    },
  ];
  
const PopularDestinations = () => {
  return (
    <section className="py-16">
      <div className=" px-10">
        {/* Section Title */}
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-10">
          🌍 Popular Destinations
        </h2>

        {/* Destinations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: destination.id * 0.1 }}
              viewport={{ once: true }}
              className="relative group overflow-hidden rounded-xl shadow-lg"
            >
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-64 object-cover transform group-hover:scale-110 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-5 group-hover:bg-opacity-60 transition-all duration-500">
                <h3 className="text-white text-xl font-semibold">
                  {destination.name}
                </h3>
                <p className="text-gray-200 text-sm">{destination.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const testimonials = [
  {
    name: "Md. Rahim Ullah",
    review:
      "I had an amazing experience traveling to Cox’s Bazar! The arrangements were fantastic, and everything was seamless. Highly recommended!",
    location: "Dhaka, Bangladesh",
    image: "https://randomuser.me/api/portraits/men/15.jpg",
  },
  {
    name: "Fatima Akter",
    review:
      "The Sundarbans tour was a dream come true! The guides were knowledgeable, and the trip was well-organized. Will book again!",
    location: "Chattogram, Bangladesh",
    image: "https://randomuser.me/api/portraits/women/25.jpg",
  },
  {
    name: "Asif Hasan",
    review:
      "A truly wonderful experience at Sajek Valley! The booking process was smooth, and everything was well arranged. Highly satisfied!",
    location: "Sylhet, Bangladesh",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    name: "Nusrat Jahan",
    review:
      "The Bandarban tour was breathtaking! Everything was well planned, and the views were unforgettable. Thank you for an incredible trip!",
    location: "Khulna, Bangladesh",
    image: "https://randomuser.me/api/portraits/women/32.jpg",
  },
  {
    name: "Tanvir Ahmed",
    review:
      "St. Martin’s Island was beyond my expectations! The tour was well-executed, and I enjoyed every moment. 10/10 service!",
    location: "Barishal, Bangladesh",
    image: "https://randomuser.me/api/portraits/men/50.jpg",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 px-5 lg:px-10">
      <div>
        {/* Heading */}
        <motion.h2
          className="text-3xl font-bold text-blue-900 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          🌟 What Our Travelers Say
        </motion.h2>
        <p className="text-gray-600 mt-3 mb-10 text-center">
          Real reviews from our happy tourists in Bangladesh.
        </p>

        {/* Swiper Slider */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{ delay: 4000 }}
          pagination={{ clickable: true }}
        //   navigation
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-20"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <motion.div
                className="bg-white p-4 shadow-lg rounded-lg flex flex-col min-h-[300px]"
                whileHover={{ scale: 1.05 }}
              >
                {/* Profile Image */}
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-20 h-20 rounded-full border-4 border-blue-500 mx-auto mb-4"
                />

                {/* Name & Location */}
                <div>
                  <h3 className="text-xl font-semibold text-blue-900 text-center">
                    {testimonial.name}
                  </h3>
                  <p className="text-gray-500 text-sm text-center">{testimonial.location}</p>
                </div>

                {/* Review Text */}
                <p className="mt-3 text-gray-700 px-2 overflow-hidden">
                  {testimonial.review}
                </p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;

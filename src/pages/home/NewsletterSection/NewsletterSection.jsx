import React, { useState } from "react";
import { motion } from "framer-motion";

const Newsletter = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            alert(`🎉 Thank you for subscribing, ${email}!`);
            setEmail(""); // Clear input field after submission
        }
    };

    return (
        <section className="py-16">
            <div  className="bg-sky-900 text-white py-16 px-5 lg:mx-20 ">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Heading */}
                    <motion.h2
                        className="text-3xl font-bold mb-3"
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        📩 Subscribe to Our Newsletter
                    </motion.h2>
                    <p className="text-gray-300 mb-6">
                        Stay updated with the best travel deals, tips, and exclusive offers in Bangladesh!
                    </p>

                    {/* Input Form */}
                    <motion.form
                        onSubmit={handleSubmit}
                        className="flex flex-col md:flex-row items-center justify-center gap-4  md:w-2/3 mx-auto"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 rounded-md text-black focus:outline-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button
                            type="submit"
                            className="bg-yellow-500 text-black px-6 py-3 rounded-md hover:bg-yellow-600 transition-all duration-300"
                        >
                            Subscribe
                        </button>
                    </motion.form>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;

import { useState } from 'react';
import { AiFillStar, AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO, TechStart Inc.",
    image: "/laxmancroy.png",
    content: "Laxman delivered exceptional work on our WordPress plugin. His attention to detail and technical expertise exceeded our expectations. Highly recommended!",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Founder, Ecommerce Pro",
    image: "/laxmancroy.png",
    content: "Working with Laxman was a game-changer for our business. The custom WooCommerce solution he built increased our conversions by 40%.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Marketing Director",
    image: "/laxmancroy.png",
    content: "Professional, responsive, and incredibly skilled. Laxman transformed our outdated website into a modern, high-performing platform.",
    rating: 5,
  },
  {
    id: 4,
    name: "David Kim",
    role: "Startup Founder",
    image: "/laxmancroy.png",
    content: "The AI integration Laxman built for our content management system saved us countless hours. His innovative approach is truly impressive.",
    rating: 5,
  },
];

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Client Testimonials</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't just take my word for it. Here's what my clients have to say about working with me.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300"
            >
              {/* Stars */}
              <div className="flex space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <AiFillStar key={i} className="text-yellow-400" size={20} />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center space-x-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto text-center">
          <div className="p-6">
            <p className="text-4xl font-bold text-blue-600 mb-2">400+</p>
            <p className="text-gray-600">Happy Clients</p>
          </div>
          <div className="p-6">
            <p className="text-4xl font-bold text-blue-600 mb-2">2,400+</p>
            <p className="text-gray-600">Projects Done</p>
          </div>
          <div className="p-6">
            <p className="text-4xl font-bold text-blue-600 mb-2">4.9/5</p>
            <p className="text-gray-600">Average Rating</p>
          </div>
          <div className="p-6">
            <p className="text-4xl font-bold text-blue-600 mb-2">95%</p>
            <p className="text-gray-600">Repeat Clients</p>
          </div>
        </div>
      </div>
    </section>
  );
};

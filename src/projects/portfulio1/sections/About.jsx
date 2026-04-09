import { AiFillCheckCircle } from 'react-icons/ai';

const highlights = [
  "10+ years of professional experience",
  "Expert in WordPress plugin & theme development",
  "AI integration specialist",
  "Full-stack JavaScript developer",
  "WooCommerce solutions expert",
  "Remote work specialist",
];

export const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">About Me</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/laxmancroy.png"
                  alt="Laxman Chandra Roy"
                  className="w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>

              {/* Experience Card */}
              <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white rounded-2xl p-6 shadow-xl">
                <p className="text-4xl font-bold">10+</p>
                <p className="text-blue-100">Years of Experience</p>
              </div>
            </div>

            {/* Right - Content */}
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Your Full Stack Developer
              </h3>

              <div className="space-y-4 text-gray-600 leading-relaxed mb-8">
                <p>
                  Hello! I'm Laxman Chandra Roy, a passionate Full Stack Developer with over 10 years
                  of experience in web development. I specialize in creating custom WordPress plugins,
                  themes, and integrating AI solutions into web applications.
                </p>
                <p>
                  Throughout my career, I've successfully delivered 2,400+ projects for clients
                  worldwide, ranging from small businesses to enterprise-level applications. My
                  expertise spans across PHP, JavaScript, React, Node.js, and various modern web
                  technologies.
                </p>
                <p>
                  I'm passionate about writing clean, optimized code and creating solutions that
                  help businesses grow. Whether you need a custom plugin, a complete website overhaul,
                  or AI integration, I'm here to help you achieve your goals.
                </p>
              </div>

              {/* Highlights */}
              <div className="grid sm:grid-cols-2 gap-4">
                {highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <AiFillCheckCircle className="text-green-500 flex-shrink-0" size={20} />
                    <span className="text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Get in Touch
                </a>
                <a
                  href="#projects"
                  className="inline-flex items-center px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition-colors"
                >
                  View Projects
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

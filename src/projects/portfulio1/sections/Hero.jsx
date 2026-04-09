import { AiFillGithub, AiFillLinkedin, AiFillTwitterCircle, AiOutlineArrowDown } from 'react-icons/ai';

const stats = [
  { value: "10+", label: "Years Experience" },
  { value: "2,400+", label: "Projects Completed" },
  { value: "400+", label: "Happy Clients" },
];

const socialLinks = [
  { icon: AiFillGithub, href: "https://github.com/laxmancr", label: "GitHub" },
  { icon: AiFillLinkedin, href: "https://linkedin.com/in/laxmancr", label: "LinkedIn" },
  { icon: AiFillTwitterCircle, href: "https://twitter.com/laxmancr", label: "Twitter" },
];

export const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center pt-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
              👋 Welcome to my portfolio
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Hi, I'm <span className="text-blue-600">Laxman Chandra Roy</span>
            </h1>

            <h2 className="text-xl md:text-2xl text-gray-600 mb-6 font-medium">
              Full Stack Developer & WordPress Expert
            </h2>

            <p className="text-gray-600 text-lg mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              I specialize in building custom WordPress plugins, themes, and full-stack web applications.
              With over 10 years of experience, I help businesses create powerful digital solutions.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
              >
                Order a Service
              </a>
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Message on WhatsApp
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center lg:justify-start space-x-4">
              <span className="text-gray-500">Follow me:</span>
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="flex-1 flex justify-center">
            <div className="relative">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-blue-200 rounded-full blur-3xl opacity-30 scale-110"></div>

              {/* Profile Image */}
              <div className="relative w-72 h-72 md:w-96 md:h-96">
                <img
                  src="/laxmancroy.png"
                  alt="Laxman Chandra Roy"
                  className="w-full h-full object-cover rounded-full border-4 border-white shadow-2xl"
                />

                {/* Floating badge */}
                <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-lg p-4 flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Available</p>
                    <p className="text-sm text-gray-500">for work</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 pt-16 border-t border-gray-200">
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center mt-12">
          <a href="#about" className="animate-bounce text-gray-400 hover:text-blue-600 transition-colors">
            <AiOutlineArrowDown size={32} />
          </a>
        </div>
      </div>
    </section>
  );
};

import {
  AiFillCode,
  AiFillLayout,
  AiFillShopping,
  AiFillRobot,
  AiFillDatabase,
  AiFillApi
} from 'react-icons/ai';

const services = [
  {
    icon: AiFillCode,
    title: "Custom Plugin Development",
    description: "Expert in building bespoke WordPress plugins from scratch with clean, optimized code and comprehensive documentation tailored to your needs.",
    color: "bg-blue-500",
  },
  {
    icon: AiFillLayout,
    title: "Theme Development",
    description: "Creating responsive, high-performance WordPress themes with advanced customizer options and modern design principles.",
    color: "bg-purple-500",
  },
  {
    icon: AiFillShopping,
    title: "WooCommerce Solutions",
    description: "Custom WooCommerce plugins, payment gateway integrations, and complete e-commerce functionality development.",
    color: "bg-green-500",
  },
  {
    icon: AiFillRobot,
    title: "AI Integration",
    description: "Cutting-edge AI solutions integrated with WordPress including OpenAI API, chatbots, and custom AI workflows.",
    color: "bg-orange-500",
  },
  {
    icon: AiFillDatabase,
    title: "Database Optimization",
    description: "Performance tuning, database architecture design, and optimization for high-traffic WordPress sites.",
    color: "bg-red-500",
  },
  {
    icon: AiFillApi,
    title: "API Development",
    description: "RESTful API design and integration, connecting WordPress with third-party services and mobile applications.",
    color: "bg-cyan-500",
  },
];

export const Expert = () => {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">My Services</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            I offer a wide range of WordPress and web development services tailored to help your business succeed online.
          </p>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full mt-4"></div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 group"
            >
              {/* Icon */}
              <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <service.icon className="text-white" size={32} />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

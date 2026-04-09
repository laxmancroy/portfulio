import { ProjectCard } from "../components/ProjectCard";
import { useState } from 'react';

const projectList = [
  {
    title: "WooCommerce Payment Gateway",
    img: "/laxmancroy.png",
    description:
      "Custom payment gateway integration for an international e-commerce brand, supporting multi-currency transactions and seamless checkout flow with PCI compliance.",
    tags: ["PHP", "WooCommerce", "Payment API"],
    category: "E-Commerce",
    demoUrl: "#",
    codeUrl: "#",
  },
  {
    title: "AI Content Generator",
    img: "/laxmancroy.png",
    description:
      "WordPress plugin integrating with OpenAI API for automated content generation, SEO optimization, and image creation with custom workflows.",
    tags: ["PHP", "OpenAI", "React"],
    category: "AI Integration",
    demoUrl: "#",
    codeUrl: "#",
  },
  {
    title: "Multi-vendor Marketplace",
    img: "/laxmancroy.png",
    description:
      "Complete marketplace solution with vendor management, commission systems, front-end submission, and comprehensive seller dashboard.",
    tags: ["PHP", "WooCommerce", "JavaScript"],
    category: "E-Commerce",
    demoUrl: "#",
    codeUrl: "#",
  },
  {
    title: "Membership Portal Plugin",
    img: "/laxmancroy.png",
    description:
      "Custom membership levels, content restriction, and payment integration for a premium education site with automated subscription management.",
    tags: ["PHP", "WordPress", "Stripe"],
    category: "Membership",
    demoUrl: "#",
    codeUrl: "#",
  },
  {
    title: "Appointment Booking System",
    img: "/laxmancroy.png",
    description:
      "WordPress booking plugin with calendar integration, email notifications, SMS alerts, and payment processing for service businesses.",
    tags: ["PHP", "JavaScript", "REST API"],
    category: "Booking",
    demoUrl: "#",
    codeUrl: "#",
  },
  {
    title: "Custom WordPress Theme",
    img: "/laxmancroy.png",
    description:
      "Responsive, high-performance theme built from scratch with advanced customizer options, page builder integration, and WooCommerce support.",
    tags: ["PHP", "SASS", "Webpack"],
    category: "Theme",
    demoUrl: "#",
    codeUrl: "#",
  },
];

const categories = ["All", "E-Commerce", "AI Integration", "Membership", "Booking", "Theme"];

export const Project = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All"
    ? projectList
    : projectList.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A selection of my recent work. Each project represents a unique challenge and solution.
          </p>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full mt-4"></div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                activeCategory === category
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {filteredProjects.map((item) => (
            <ProjectCard
              key={item.title}
              title={item.title}
              img={item.img}
              description={item.description}
              tags={item.tags}
              demoUrl={item.demoUrl}
              codeUrl={item.codeUrl}
            />
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <a
            href="https://github.com/laxmancr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 border-2 border-gray-900 text-gray-900 rounded-lg font-semibold hover:bg-gray-900 hover:text-white transition-all"
          >
            View All Projects on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

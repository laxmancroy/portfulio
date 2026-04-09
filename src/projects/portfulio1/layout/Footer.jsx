import { AiFillCaretUp, AiFillGithub, AiFillLinkedin, AiFillTwitterCircle } from "react-icons/ai";

const socialLinks = [
  { icon: AiFillGithub, href: "https://github.com/laxmancr", label: "GitHub" },
  { icon: AiFillLinkedin, href: "https://linkedin.com/in/laxmancr", label: "LinkedIn" },
  { icon: AiFillTwitterCircle, href: "https://twitter.com/laxmancr", label: "Twitter" },
];

const footerLinks = [
  {
    title: "Services",
    links: [
      { label: "Plugin Development", href: "#services" },
      { label: "Theme Development", href: "#services" },
      { label: "WooCommerce", href: "#services" },
      { label: "AI Integration", href: "#services" },
    ],
  },
  {
    title: "Quick Links",
    links: [
      { label: "About", href: "#about" },
      { label: "Projects", href: "#projects" },
      { label: "Experience", href: "#experience" },
      { label: "Contact", href: "#contact" },
    ],
  },
];

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#home" className="text-2xl font-bold text-white mb-4 inline-block">
              laxmancr
            </a>
            <p className="text-gray-400 mb-6 max-w-md">
              Full Stack Developer specializing in WordPress plugin development,
              theme creation, AI integrations, and WooCommerce solutions worldwide.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-white font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © 2026 Laxman Chandra Roy. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="mt-4 md:mt-0 flex items-center space-x-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <span className="text-sm">Back to Top</span>
            <AiFillCaretUp />
          </button>
        </div>
      </div>
    </footer>
  );
};

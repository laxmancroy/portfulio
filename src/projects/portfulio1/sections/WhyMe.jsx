import {
  AiFillClockCircle,
  AiFillStar,
  AiFillMessage,
  AiFillDollarCircle,
  AiFillCustomerService,
  AiFillSafetyCertificate
} from 'react-icons/ai';

const reasons = [
  {
    icon: AiFillClockCircle,
    title: "10+ Years Experience",
    description: "Deep expertise in WordPress and web development with a proven track record of successful projects.",
  },
  {
    icon: AiFillStar,
    title: "Top Rated Developer",
    description: "4.9/5 average client rating with 2,400+ successfully completed projects worldwide.",
  },
  {
    icon: AiFillMessage,
    title: "Clear Communication",
    description: "Fast, transparent communication throughout the project with regular updates and progress reports.",
  },
  {
    icon: AiFillDollarCircle,
    title: "Competitive Pricing",
    description: "High-quality work at fair rates. No hidden costs or surprise fees.",
  },
  {
    icon: AiFillCustomerService,
    title: "95% Repeat Client Rate",
    description: "Clients keep coming back because I deliver consistent, high-quality results every time.",
  },
  {
    icon: AiFillSafetyCertificate,
    title: "Quality Guaranteed",
    description: "Clean, well-documented code that meets industry standards and best practices.",
  },
];

export const WhyMe = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Me?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Partner with a developer who has proven expertise, reliable delivery, and a track record of exceptional results.
            </p>
            <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full mt-4"></div>
          </div>

          {/* Reasons Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-6 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <reason.icon className="text-blue-600" size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {reason.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <a
              href="#contact"
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Start Your Project
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

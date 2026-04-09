import { AiFillCalendar, AiFillCheckCircle } from 'react-icons/ai';

const experiences = [
  {
    id: 1,
    title: "Senior WordPress Developer",
    company: "Freelance / Self-employed",
    location: "Remote",
    period: "2018 - Present",
    type: "work",
    description: "Specializing in custom WordPress plugin development, theme creation, and AI integrations for clients worldwide.",
    achievements: [
      "Delivered 2,400+ successful projects",
      "Maintained 4.9/5 client satisfaction rating",
      "Developed 50+ custom plugins from scratch",
      "Integrated AI solutions for 100+ websites",
    ],
  },
  {
    id: 2,
    title: "Full Stack Developer",
    company: "Tech Solutions Agency",
    location: "Remote",
    period: "2015 - 2018",
    type: "work",
    description: "Led development of web applications and e-commerce solutions for enterprise clients.",
    achievements: [
      "Built scalable web applications using PHP and JavaScript",
      "Implemented custom payment gateway solutions",
      "Mentored junior developers",
      "Reduced page load times by 60% on average",
    ],
  },
  {
    id: 3,
    title: "Web Developer",
    company: "Digital Creative Studio",
    location: "On-site",
    period: "2013 - 2015",
    type: "work",
    description: "Developed responsive websites and custom WordPress themes for small to medium businesses.",
    achievements: [
      "Created 200+ custom WordPress themes",
      "Optimized websites for SEO performance",
      "Collaborated with design team on UI/UX",
      "Maintained 100+ client websites",
    ],
  },
];

const education = [
  {
    id: 1,
    title: "Bachelor of Computer Science",
    institution: "University of Technology",
    location: "",
    period: "2009 - 2013",
    type: "education",
    description: "Focus on Software Engineering and Web Development",
    achievements: [
      "Graduated with Honors",
      "President of Coding Club",
      "Published research paper on web optimization",
    ],
  },
];

export const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Experience & Education</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            My professional journey and educational background in web development.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Work Experience */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
              <span className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white text-sm">💼</span>
              </span>
              Work Experience
            </h3>

            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div
                  key={exp.id}
                  className="bg-white rounded-2xl shadow-sm p-8 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-1">{exp.title}</h4>
                      <p className="text-blue-600 font-medium">{exp.company}</p>
                    </div>
                    <div className="flex items-center text-gray-500 mt-2 md:mt-0">
                      <AiFillCalendar className="mr-2" />
                      <span className="text-sm">{exp.period}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 leading-relaxed">{exp.description}</p>

                  <div className="space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <div key={i} className="flex items-start">
                        <AiFillCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
              <span className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white text-sm">🎓</span>
              </span>
              Education
            </h3>

            <div className="space-y-8">
              {education.map((edu) => (
                <div
                  key={edu.id}
                  className="bg-white rounded-2xl shadow-sm p-8 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-1">{edu.title}</h4>
                      <p className="text-purple-600 font-medium">{edu.institution}</p>
                    </div>
                    <div className="flex items-center text-gray-500 mt-2 md:mt-0">
                      <AiFillCalendar className="mr-2" />
                      <span className="text-sm">{edu.period}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 leading-relaxed">{edu.description}</p>

                  <div className="space-y-2">
                    {edu.achievements.map((achievement, i) => (
                      <div key={i} className="flex items-start">
                        <AiFillCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

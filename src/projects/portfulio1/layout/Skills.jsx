const skillCategories = [
  {
    title: "Frontend Development",
    skills: [
      { name: "React.js", level: 95 },
      { name: "JavaScript (ES6+)", level: 95 },
      { name: "HTML5 & CSS3", level: 98 },
      { name: "Tailwind CSS", level: 90 },
      { name: "TypeScript", level: 85 },
    ],
  },
  {
    title: "Backend Development",
    skills: [
      { name: "PHP", level: 98 },
      { name: "Node.js", level: 88 },
      { name: "MySQL", level: 92 },
      { name: "RESTful APIs", level: 90 },
      { name: "GraphQL", level: 75 },
    ],
  },
  {
    title: "WordPress Expert",
    skills: [
      { name: "Plugin Development", level: 98 },
      { name: "Theme Development", level: 95 },
      { name: "WooCommerce", level: 92 },
      { name: "Custom Post Types", level: 90 },
      { name: "WordPress REST API", level: 88 },
    ],
  },
  {
    title: "Tools & Technologies",
    skills: [
      { name: "Git & GitHub", level: 90 },
      { name: "Docker", level: 80 },
      { name: "CI/CD", level: 85 },
      { name: "AWS/VPS", level: 82 },
      { name: "AI Integration", level: 88 },
    ],
  },
];

export const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">My Skills</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and expertise across various technologies and platforms.
          </p>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full mt-4"></div>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                {category.title}
              </h3>
              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-700">
                        {skill.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

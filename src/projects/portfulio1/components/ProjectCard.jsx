import { AiFillGithub, AiFillEye } from 'react-icons/ai';

export const ProjectCard = ({ title, img, description, tags, demoUrl, codeUrl }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 group">
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={img}
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
          <a
            href={demoUrl}
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-900 hover:bg-blue-600 hover:text-white transition-colors"
            aria-label="View Demo"
          >
            <AiFillEye size={20} />
          </a>
          <a
            href={codeUrl}
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-900 hover:bg-blue-600 hover:text-white transition-colors"
            aria-label="View Code"
          >
            <AiFillGithub size={20} />
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

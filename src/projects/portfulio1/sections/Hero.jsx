export const Hero = () => {
  return (
    <div className="flex flex-col justify-center align-middle text-center sm:flex-row-reverse sm:justify-between mt-10 *:bg-amber-400 *:m-2">
      <div className="flex justify-center sm:block">
        <img
          src="/public/laxmancroy.png"
          alt="laxmancr"
          className="w-50 h-50 rounded-full"
        />
      </div>
      <div>
        <span className="text-2xl font-bold my-8">
          Hi, I'm <span className="text-blue-500">Laxman Chandra Roy</span>
        </span>
        <span className="block text-xl my-5 text-gray-700">
          Full Stack Developer
        </span>
        <p className="text-gray-500">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex
          voluptatem quidem, obcaecati iusto odio saepe, veritatis eaque modi
          velit harum ab. Praesentium, vel.
        </p>
        <div className="flex flex-wrap justify-center">
          <button className="bg-blue-500 text-white px-5 py-2 rounded-md mt-5">
            Order a Service
          </button>
          <button className="border border-blue-500 text-blue-500 px-5 py-2 rounded-md mt-5 ml-5">
            Message on Whatsapp
          </button>
        </div>
        <div className="flex justify-around mt-10">
          <div className="*:block">
            <span className="text-blue-600 font-bold text-xl">10+</span>
            <span className="text-gray-500">Years Experience</span>
          </div>
          <div className="*:block">
            <span className="text-blue-600 font-bold text-xl">2400+</span>
            <span className="text-gray-500">Projects</span>
          </div>
          <div className="*:block">
            <span className="text-blue-600 font-bold text-xl">400+</span>
            <span className="text-gray-500">Happy Clients</span>
          </div>
        </div>
      </div>
    </div>
  );
};

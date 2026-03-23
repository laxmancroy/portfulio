import { Button } from "../components/Button";
import { BsArrowRight, BsDownload } from "react-icons/bs";
export const Hero = () => {
  return (
    <section className="">
      {/* Bg */}
      <div className="absolute inset-0">
        <img
          src="../../../../public/portfulio/projects/Hero-background.png"
          alt="Hero image"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-linear-to-b from-background/20 via-background to-background"></div>
        {/* Green Dots */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div key={ i }
              className="absolute w-1.5 h-1.5 rounded-full opacity-60"
              style={{
                backgroundColor: "#20B2A6",
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `slow-drift ${15 + Math.random() * 20}s ease-in-out infinite`,
                anitmationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
      </div>
      {/* Content */}
      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Text content */}
          <div className="space-y-8">
            <div className="animate-fade-in">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-primary">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                Software Engineer . React Specialist
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fade-in animation-delay-100">
                Crafting <span className="text-primary glow-text">digital</span>
                <br />
                experiences with
                <br />
                <span className="font-serif italic font-normal text-white">
                  precision.
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg animate-fade-in animation-delay-200">
                Hi, I'm Laxman Chandra Roy - a software engineer specializing in
                React, Next.js, and TypeScript. I build scalable, performant web
                applications that users love.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex">
              <Button size="lg">
                Contact Me <BsArrowRight className="w-5 h-5" />
              </Button>
              <button className="bg-secondary transparent cursor-pointer border border-primary px-8 rounded-full flex ml-8 items-center justify-center">
                <BsDownload />
                <span className="ml-3">Download CV</span>
              </button>
            </div>
          </div>
          {/* Right Column - Profile Image */}
        </div>
      </div>
    </section>
  );
};

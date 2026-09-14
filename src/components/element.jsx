
import Image from "next/image";
import React from "react";

const Element = () => {
  return (
    <section className="w-full overflow-hidden bg-darkBlue py-12">
      
      {/* First Section */}
      <div className="w-full bg-fuchsia-50">
        <div className="container mx-auto flex flex-col items-center gap-8 px-4 py-10 md:flex-row md:px-6 lg:py-16">
          
          <div className="w-full text-center md:w-1/2 md:text-left">
            <h3 className="mb-2 text-lg font-semibold text-blue-600">
              Fast-track your learning
            </h3>

            <h2 className="mb-4 text-4xl font-bold text-gray-800 md:text-5xl">
              Learn By Doing
            </h2>

            <p className="leading-7 text-gray-600">
              Learn programming skills, from absolute beginner to advanced
              mastery. We try to create project-based courses which help you
              learn professionally and make you feel like a complete developer.
            </p>
          </div>

          <div className="flex w-full justify-center md:w-1/2">
            <Image
              src="/assets/images/two.png"
              alt="Learning by doing"
              width={500}
              height={400}
              className="h-auto max-w-full rounded-lg"
            />
          </div>

        </div>
      </div>

      {/* Second Section */}
      <div className="w-full bg-blue-50">
        <div className="container mx-auto flex flex-col items-center gap-8 px-4 py-10 md:flex-row md:px-6 lg:py-16">
          
          <div className="flex w-full justify-center md:w-1/2">
            <Image
              src="/assets/images/one.png"
              alt="Put Your Learning Into Practice"
              width={500}
              height={400}
              className="h-auto max-w-full rounded-lg"
            />
          </div>

          <div className="w-full text-center md:w-1/2 md:text-left">
            <h3 className="mb-2 text-lg font-semibold text-green-600">
              Step-by-step lessons
            </h3>

            <h2 className="mb-4 text-4xl font-bold text-gray-800 md:text-5xl">
              Put Your Learning
              <br />
              Into Practice
            </h2>

            <p className="leading-7 text-gray-600">
              Apply your learning with real-world projects and learn
              everything you need to take your career to the next level.
            </p>
          </div>

        </div>
      </div>

    </section>
  );
};

export default Element;


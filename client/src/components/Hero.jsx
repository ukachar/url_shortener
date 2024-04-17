import React from "react";
import { ReactTyped } from "react-typed";

const Hero = () => {
  return (
    <section>
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        <img src="logo.svg" alt="logo" className="m-auto max-w-48 pb-16" />

        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Your new, simple url&nbsp;
          <ReactTyped
            className="text-red-500"
            strings={["shortener", "reducer", "minifier", "shrinker"]}
            typeSpeed={75}
            backSpeed={50}
            loop
          />
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
          Explore the simplest yet app for turning long urls into something much
          shorter.
        </p>
      </div>
    </section>
  );
};

export default Hero;

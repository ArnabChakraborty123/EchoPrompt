import Feed from "@components/Feed";

function Home() {
  return (
    <section className="w-full flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="font-extrabold text-5xl leading-[1.15] text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-blue-500 drop-shadow-xl">
          Discover , Listen & Generate
        </h1>
        <span className="block mt-2 text-2xl text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">
          Voice-Enhanced Prompts
        </span>
        <p className="mt-6 text-lg text-gray-700">
          Explore our innovative prompt platform where you can create, listen
          to, and share AI-powered prompts. Convert text to speech with a click,
          download your audio, and interact with others' prompts effortlessly.
          Start amplifying your creativity today!{" "}
        </p>{" "}
        <Feed />
      </div>
    </section>
  );
}

export default Home;

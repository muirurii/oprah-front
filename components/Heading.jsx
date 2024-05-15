const Heading = ({ text }) => {
  return (
    <h1
      className="text-3xl md:text-5xl py-16 px-4 font-sec uppercase font-bol text-center
    relative after:absolute after:right-0 after:w-full after:bg-gradient-to-r after:from-slate-500 after:opacity-30  after:via-transparent after:to-slate-500 after:h-[1px]
      after:top-1/2"
    >
      {text}
    </h1>
  );
};

export default Heading;

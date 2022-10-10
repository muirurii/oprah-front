import Meta from "./Meta";

const Loader = () => {
  return (
    <div className="fixed top-0 bg-white left-0 w-screen h-screen flex items-center justify-center">
      <Meta />
      <span className="loader"></span>
    </div>
  );
};

export default Loader;

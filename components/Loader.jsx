import Meta from "./Meta";

const Loader = () => {
  return (
    <div className="left-0 w-screen h-loader flex items-center justify-center">
      <Meta />
      <span className="block loader"></span>
    </div>
  );
};

export default Loader;

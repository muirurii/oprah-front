import { useContext, useState, useEffect } from "react";
import { Context } from "../context";

const FormFields = ({ initial, buttonText, submitHandler }) => {
  const [data, setData] = useState({
    title: initial.title || "",
    image: initial.image || "",
    category: "",
    body: initial.body || "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) =>{

  }

  return (
    <section className="my-8 flex justify-center w-screen">
      <form onSubmit={handleSubmit} className="grid gap-1">
        <div className="flex flex-col gap-y-1 w-[320px] sm:w-[500px]">
          <label htmlFor="title">Title</label>
          <input
            className="h-10 border border-secondary outline-none rounded pl-1"
            type="text"
            id="title"
            placeholder="post title"
            name="title"
            value={data.title}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-y-1 w-[320px] sm:w-[500px]">
          <label htmlFor="image">Image</label>
          <input
            className="h-10 border border-secondary outline-none rounded pl-1"
            type="text"
            id="image"
            placeholder="image url"
            name="image"
            value={data.image}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-y-1 w-[320px] sm:w-[500px]">
          <label htmlFor="category">Category</label>
          <select
            className="h-10 border border-secondary outline-none rounded pl-1"
            name="category"
            id="category"
            value={data.category}
            onChange={handleChange}
          >
            <option value="fashion">Fashion</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="technology">Tech</option>
          </select>
        </div>
        <div className="flex flex-col gap-y-1 w-[320px] sm:w-[500px]">
          <label htmlFor="body">Body</label>
          <textarea
            className="border border-secondary outline-none rounded pl-1"
            rows="7"
            id="body"
            placeholder="post body"
            name="body"
            value={data.body}
            onChange={handleChange}
          ></textarea>
        </div>
        <button
          className="p-2 bg-secondary rounded w-[320px] sm:w-[500px] text-white mt-2"
          type="submit"
        >
          {buttonText}
        </button>
      </form>
    </section>
  );
};

export default FormFields;

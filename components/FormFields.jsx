import { useContext, useState, useEffect } from "react";
import { Context } from "../context";

const FormFields = ({ initial, buttonText, submitHandler,message }) => {
  const [data, setData] = useState({
    title: initial.title || "",
    image: initial.image || "",
    categories: initial.category ? initial.category[0] : "",
    body: initial.body || "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) =>{
    e.preventDefault();
    if(data.categories.length < 1) return;
    submitHandler(data);
  }

  return (
    <section className="my-8 flex justify-center w-screen">
      <form onSubmit={handleSubmit} className="grid gap-1">
        {message.length ? <p className="text-center text-red-600">{message}</p> : null}
        <div className="flex flex-col gap-y-1 w-[320px] sm:w-[500px]">
          <label htmlFor="title">Title</label>
          <input
            required
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
            required
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
            required
            className="h-10 border border-secondary outline-none rounded pl-1"
            name="categories"
            id="category"
            value={data.category}
            onChange={handleChange}
          >
            <option>---</option>
            <option value="fashion">Fashion</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="technology">Tech</option>
          </select>
        </div>
        <div className="flex flex-col gap-y-1 w-[320px] sm:w-[500px]">
          <label htmlFor="body">Body</label>
          <textarea
            required
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

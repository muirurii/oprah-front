import { useState } from "react";
import MdEditor from "md-editor-rt";
import "md-editor-rt/lib/style.css";

// MdEditor.ModalToolbar({key:Math.random()})
// console.log(MdEditor.NormalToolbar)
// MdEditor.NormalToolbar({onClick:(e)=> console.log(e.target)})

// MdEditor.config({
//   markedRenderer(renderer) {
//     renderer.link = (href, title, text) => {
//       return `<a href="${href}" title="${title}" target="_blank">${text}</a>`;
//     };

//     return renderer;
//   },
// });

const FormFields = ({
  initial,
  buttonText,
  submitHandler,
  message,
  isSubmitting,
}) => {
  const [body, setBody] = useState(initial.body || "");
  const [data, setData] = useState({
    title: initial.title || "",
    categories: initial.category ? initial.category[0] : "",
    excerpt: initial.excerpt || "",
  });

  const [previewState, setPreviewState] = useState(initial.image || "");
  const [selectedFile, setSelectedFile] = useState("");

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewState(reader.result);
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.categories.length < 1 || !previewState) return;
    submitHandler({
      ...data,
      body,
      image: previewState,
    });
  };

  return (
    <section className="my-8 flex justify-start px-4 w-screen">
      <form onSubmit={handleSubmit} className="grid gap-y-1">
        {message.length ? (
          <p className="text-center text-red-600">{message}</p>
        ) : null}
        <div className="flex flex-col gap-y-2 mt-1 w-[300px] sm:w-[500px]">
          <label htmlFor="title">Title</label>
          <input
            required
            className="h-10 border border-black focus:border-secondary outline-none rounded pl-1"
            type="text"
            id="title"
            placeholder="post title"
            name="title"
            value={data.title}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-y-2 mt-1 w-[300px] sm:w-[500px]">
          <label htmlFor="image">Image</label>
          <div className="flex items-start justify-start gap-x-2">
            <input
              className="cursor-pointer w-24 file:w-full file:text-white file:h-full border rounded file:bg-black file:border-none file:rounded file:text-xs outline-none h-10 mt-1"
              type="file"
              name="picUrl"
              value={selectedFile}
              placeholder="enter a url for your profile pic"
              onChange={handleFileInputChange}
            />
            {previewState ? (
              <img
                className="rounded h-32 w-40"
                src={previewState}
                alt="PREVIEW"
              />
            ) : (
              <p className="text-sm my-auto text-center">No file choosen</p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-y-2 mt-1 w-[300px] sm:w-[500px]">
          <label htmlFor="category">Category</label>
          <select
            required
            className="h-10 border border-black focus:border-secondary outline-none rounded pl-1"
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
        <div className="flex flex-col gap-y-2 mt-1 w-[300px] sm:w-[500px]">
          <label htmlFor="excerpt">Excerpt</label>
          <input
            type="text"
            className="h-10 border border-black focus:border-secondary
          outline-none rounded pl-1"
            id="excerpt"
            placeholder="post excerpt"
            name="excerpt"
            value={data.excerpt}
            onChange={handleChange}
            minLength={100}
            maxLength={120}
          />
        </div>
        <div className="flex flex-col gap-y-2 mt-1">
          <label htmlFor="body">Body</label>
          {/* <textarea
            required
            className="border border-black focus:border-secondary outline-none rounded pl-1"
            rows="7"
            id="body"
            placeholder="post body"
            name="body"
            value={data.body}
            onChange={handleChange}
          ></textarea> */}
          <div className="
          overflow-x-scroll lg:overflow-x-hidden w-screen
          ">
            <div className="w-fit py-2 mr-6">
              <MdEditor
                language="en-US"
                toolbarsExclude={[
                  "github",
                  "catalog",
                  "htmlPreview",
                  "prettier",
                ]}
                noUploadImg={true}
                modelValue={body}
                onChange={setBody}
              />
            </div>
          </div>
        </div>
        <button
          className={`p-2 ${
            isSubmitting ? "bg-red-300" : "bg-secondary"
          } rounded-full w-[300px] sm:w-[500px] text-white mt-2`}
          type="submit"
        >
          {isSubmitting ? "Preparing post" : buttonText}
        </button>
      </form>
    </section>
  );
};

export default FormFields;

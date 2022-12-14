import Link from "next/link";
import { useContext, useState, useEffect } from "react";
import Meta from "../components/Meta";
import UserPosts from "../components/UserPosts";
import { Context } from "../context";
import { setUser } from "../context/actions/userActions";
import fetchData from "../customFunctions/fetch";

let timeout;

const Profile = () => {
  const {
    state: { user },
    dispatch,
  } = useContext(Context);
  const [updateForm, setUpdateForm] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [updateDetails, setUpdateDetails] = useState({
    newUsername: user.username,
    newPass: "",
    picUrl: user.profilePic,
  });

  const [previewState, setPreviewState] = useState(user.profilePic);
  const [selectedFile, setSelectedFile] = useState("");

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewState(reader.result);
    };
  };

  const [message, setMessage] = useState({
    content: "",
    type: "",
  });



  const toggleMessage = (content, type) => {
    clearTimeout(timeout);
    setMessage({
      content,
      type,
    });
    timeout = setTimeout(() => {
      setMessage({
        content: "",
        type: "",
      });
    }, 5000);
  };

  useEffect(() => {
    if (!user.isLogged) return;

    const getUserData = async () => {
      try {
        const res = await fetchData(
          `users/user/u/${user._id}`,
          "GET",
          {},
          user.token
        );

        if (res.status === 200) {
          const data = await res.json();
          setUser(dispatch, data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getUserData();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const details = {
      username: user.username,
      newUsername: updateDetails.newUsername,
      newPass: updateDetails.newPass,
      picUrl: previewState,
    };
    if (updateDetails.newUsername.length < 2) {
      return toggleMessage("Please enter a username", "error");
    }

    if (updating) return;
    setUpdating(true);

    try {
      const res = await fetchData(`users/update`, "PUT", details, user.token);
      const data = await res.json();

      setUpdating(false);

      if (res.status === 200) {
        setUser(dispatch, data);
        setSelectedFile("");
        toggleMessage("updated", "success");
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toggleMessage(error.message || "Unable to update", "error");
      setUpdating(false);
      setSelectedFile("");
      console.log(error);
    }
  };

  const handleDetailsChange = (e) => {
    setUpdateDetails({
      ...updateDetails,
      [e.target.name]: e.target.value,
    });
  };

  return user.isLogged ? (
    <main className="mb-8 text-sm">
      <Meta title={user.username} />
      <h1 className="text-3xl py-8 px-4">Profile</h1>
      <section className="grid gap-8 lg:grid-cols-2">
        <section className="h-fit min-h-[100px] pb-4 relative">
          <section className="flex items-center justify-center flex-col py-4">
            <div className="h-14 w-14 flex items-center justify-center gap-x-4">
              {user.profilePic.length ? (
                <img
                  src={user.profilePic}
                  alt={user.username}
                  className="h-14 w-14 rounded-full"
                />
              ) : (
                <svg
                  className="h-14 w-14"
                  x="0px"
                  y="0px"
                  viewBox="0 0 512 512"
                  style={{ enableBackground: "new 0 0 512 512" }}
                  xmlSpace="preserve"
                >
                  <g>
                    <g>
                      <path d="M256,0C114.608,0,0,114.608,0,256s114.608,256,256,256s256-114.608,256-256S397.392,0,256,0z M256,496    C123.664,496,16,388.336,16,256S123.664,16,256,16s240,107.664,240,240S388.336,496,256,496z" />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path d="M257.408,106.256c-32.704,0-59.296,26.608-59.296,59.312s26.592,59.296,59.296,59.296    c32.704,0,59.312-26.592,59.312-59.296C316.72,132.864,290.112,106.256,257.408,106.256z M257.408,208.864    c-23.872,0-43.296-19.424-43.296-43.296s19.424-43.312,43.296-43.312s43.312,19.44,43.312,43.312S281.28,208.864,257.408,208.864z    " />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path d="M314.112,252.256l-56.704,42.752l-56.704-42.752c-69.792,20.944-68.912,91.6-68.912,91.6h125.616h125.616    C383.024,343.856,383.904,273.2,314.112,252.256z M257.392,327.84H149.824c3.888-17.408,15.2-44.688,48.048-57.68l49.904,37.616    c2.848,2.144,6.24,3.216,9.632,3.216c3.392,0,6.784-1.072,9.632-3.216l49.904-37.632c33.008,13.024,44.256,40.272,48.096,57.696    H257.392z" />
                    </g>
                  </g>
                </svg>
              )}
            </div>
            <p>{user.username}</p>
            <button
              className="flex items-center relative justify-center p-2 gap-x-4 sm:w-2/3 w-[300px] bg-gray-100 mt-2"
              onClick={() => setUpdateForm(!updateForm)}
            >
              <span>Update your details</span>
              <svg
                className="h-8 w-8"
                version="1.1"
                id="Capa_1"
                x="0px"
                y="0px"
                viewBox="0 0 485.106 485.106"
                style={{ enableBackground: "new 0 0 485.106 485.106" }}
                xmlSpace="preserve"
              >
                <g>
                  <g>
                    <path d="M475.306,137.101l-30.3-5.2c-3-11.7-7.4-22.6-13.4-32.8l17.9-25c3.3-4.6,2.8-11-1.2-14.9l-10.6-10.7l-10.6-10.8    c-2.2-2.3-5.2-3.4-8.2-3.4c-2.3,0-4.7,0.7-6.7,2.1l-25.2,17.7c-10.3-6.2-21.5-10.9-33.5-13.8l-5-30c-0.9-5.6-5.7-9.8-11.5-9.8    l-15.2-0.1l-15.2-0.1l0,0c-5.6,0-10.5,4.1-11.5,9.7l-5.3,30.5c-11.7,3-22.6,7.7-32.7,13.6l-24.6-18c-2.1-1.5-4.4-2.2-6.8-2.2    c-3,0-5.9,1.1-8.2,3.3l-10.7,10.6l-10.7,10.6c-4,4-4.6,10.3-1.3,14.9l17.9,25.3c-5.9,10.1-10.5,21.1-13.4,32.7l-30,5    c-5.6,0.9-9.8,5.7-9.8,11.5l-0.1,15.2l-0.1,15.2c0,5.6,4.1,10.6,9.7,11.6l30.5,5.3c3,11.7,7.7,22.6,13.6,32.7l-17.8,24.7    c-3.3,4.6-2.8,11,1.2,14.9l10.6,10.7l10.6,10.7c2.2,2.3,5.2,3.4,8.2,3.4c2.3,0,4.7-0.7,6.7-2.1l25.3-17.9    c9.8,5.8,20.7,10.4,31.9,13.3l4.9,30.3c0.9,5.6,5.7,9.8,11.5,9.8l15.2,0.1l15.2,0.1l0,0c5.6,0,10.5-4.1,11.5-9.7l5.2-30.3    c11.7-3,22.6-7.4,32.8-13.4l25,17.9c2.1,1.5,4.4,2.2,6.8,2.2c3,0,5.9-1.1,8.2-3.3l10.7-10.6l10.7-10.6c4-4,4.6-10.3,1.3-14.9    l-17.7-25.2c6.1-10.1,10.6-21.1,13.7-32.7l30.3-4.9c5.6-0.9,9.8-5.7,9.8-11.5l0.1-15.2l0.1-15.2    C484.906,142.901,480.806,138.101,475.306,137.101z M345.006,262.701c-7.7,1.8-15.4,2.6-23,2.6c-46.6,0-88.7-32-99.6-79.4    c-12.6-55,21.7-109.9,76.8-122.6c7.7-1.8,15.4-2.6,23-2.6c46.6,0,88.7,32,99.6,79.4    C434.406,195.201,400.006,250.101,345.006,262.701z" />
                    <path d="M380.606,198.201c-18.1-4.6-32.8-14.9-32.8-14.9l-11.5,36.2l-2.2,6.8v-0.1l-1.9,5.8l-6-17.1c15.3-21.3-4-20.5-4-20.5    s-19.3-0.8-4,20.5l-6.1,17.3l-1.9-5.8l-13.6-43c0,0-14.7,10.3-32.8,14.9c-9,2.3-12.3,10-13.3,17.2c16.2,22.3,42.3,36.2,71.5,36.2    c6.7,0,13.4-0.8,19.9-2.3c21.1-4.9,39.4-17,51.9-34.4C392.706,207.901,389.406,200.401,380.606,198.201z" />
                    <path d="M163.606,352.901c2.8-2,3.7-5.7,2.2-8.8l-8.1-16.8c4.6-5.5,8.4-11.6,11.4-18.2h18.6c3.5,0,6.4-2.5,7-5.9l1.5-9.1l1.5-9.1    c0.4-3.3-1.6-6.6-4.8-7.7l-17.6-6.1c-0.6-7.3-2.2-14.3-4.8-20.9l13.2-13.2c2.4-2.5,2.7-6.3,0.8-9l-5.3-7.5l-5.3-7.5    c-1.1-1.6-2.8-2.6-4.6-2.8c-1.4-0.2-2.9,0-4.2,0.6l-16.8,8.1c-5.5-4.7-11.8-8.6-18.7-11.6v-18.4c0-3.5-2.5-6.4-5.9-7l-9.1-1.5    l-9.1-1.5l0,0c-3.3-0.5-6.7,1.4-7.8,4.7l-6.2,17.7c-7.3,0.6-14.3,2.4-20.9,4.9l-12.9-13.2c-1.1-1.1-2.4-1.7-3.8-2    c-1.8-0.3-3.7,0.1-5.2,1.2l-7.5,5.3l-7.5,5.3c-2.8,2-3.7,5.7-2.2,8.8l8.2,16.9c-4.5,5.5-8.3,11.6-11.2,18.2h-18.4    c-3.5,0-6.4,2.5-7,5.9l-1.5,9.1l-1.5,9.1c-0.6,3.4,1.4,6.7,4.7,7.9l17.7,6.2c0.6,7.3,2.4,14.3,4.9,20.9l-13,13.1    c-2.4,2.5-2.7,6.3-0.8,9l5.3,7.5l5.3,7.5c1.1,1.6,2.8,2.6,4.6,2.8c1.4,0.2,2.9,0,4.2-0.6l16.9-8.2c5.3,4.4,11.3,8.2,17.8,11.1    v18.6c0,3.5,2.5,6.4,5.9,7l9.1,1.5l9.1,1.5l0,0c3.3,0.5,6.7-1.4,7.8-4.7l6.1-17.6c7.3-0.6,14.3-2.2,20.9-4.8l13.2,13.2    c1.1,1.1,2.4,1.7,3.8,2c1.8,0.3,3.7-0.1,5.2-1.2l7.5-5.3L163.606,352.901z M139.006,281.201c-1.8,22.2-21.3,38.7-43.5,36.9    s-38.7-21.3-36.9-43.5c1.8-22.2,21.3-38.7,43.5-36.9S140.806,259.001,139.006,281.201z" />
                    <path d="M305.106,413.401l-13.7-6.5c0.2-5.8-0.5-11.6-2-17.4l11.8-9.5c2.2-1.8,2.8-4.8,1.4-7.3l-3.7-6.5l-3.7-6.5    c-1.4-2.3-4.4-3.4-6.9-2.5l-14.3,5.1c-4.1-4.3-8.7-7.9-13.7-10.8l1.6-15.1c0.3-2.8-1.5-5.4-4.1-6.1l-7.2-2l-7.2-2    c-1.5-0.4-3.1-0.2-4.4,0.5c-1,0.6-1.8,1.4-2.4,2.5l-6.5,13.7c-5.9-0.2-11.9,0.5-17.7,2.2l-9.4-11.7c-1.8-2.2-4.8-2.8-7.3-1.4    l-6.5,3.7l-6.5,3.7l0,0c-2.4,1.4-3.5,4.3-2.6,6.9l5.1,14.4c-4.3,4.1-7.9,8.8-10.7,13.7l-14.9-1.8c-1.2-0.1-2.4,0.1-3.4,0.7    c-1.3,0.7-2.3,1.9-2.7,3.4l-2,7.2l-2,7.2c-0.8,2.7,0.5,5.5,3.1,6.7l13.8,6.5c-0.1,5.8,0.6,11.6,2.2,17.3l-11.7,9.4    c-2.2,1.8-2.8,4.8-1.4,7.3l3.7,6.5l3.7,6.5c1.4,2.4,4.3,3.6,7,2.6l14.4-5.1c4.1,4.3,8.8,7.9,13.7,10.7l-1.6,14.9    c-0.3,2.8,1.5,5.4,4.1,6.1l7.2,2l7.2,2c1.5,0.4,3.1,0.2,4.4-0.5c1-0.6,1.8-1.4,2.4-2.5l6.5-13.8c5.6,0.1,11.4-0.6,16.9-2l9.5,11.8    c1.8,2.2,4.8,2.8,7.3,1.4l6.5-3.7l6.5-3.7l0,0c2.4-1.4,3.5-4.3,2.6-6.9l-5.1-14.3c4.3-4.1,7.9-8.7,10.8-13.7l15.1,1.6    c1.2,0.1,2.4-0.1,3.4-0.7c1.3-0.7,2.3-1.9,2.7-3.4l2-7.2l2-7.2C308.906,417.501,307.606,414.601,305.106,413.401z     M247.206,432.701c-15,10.1-35.4,6.2-45.6-8.8c-10.1-15-6.2-35.4,8.8-45.6s35.4-6.2,45.6,8.8    C266.206,402.101,262.206,422.501,247.206,432.701z" />
                    <path d="M291.506,159.201c1.6,10.2,9.4,23.1,22.3,27.6c5.3,1.9,11.1,1.9,16.4,0c12.7-4.6,20.8-17.5,22.4-27.6    c1.7-0.1,4-2.5,6.4-11.1c3.3-11.7-0.2-13.4-3.2-13.1c0.6-1.6,1-3.2,1.3-4.8c5-30.3-9.9-31.3-9.9-31.3s-2.5-4.8-9-8.3    c-4.4-2.6-10.4-4.6-18.4-3.9c-2.6,0.1-5,0.6-7.3,1.4l0,0c-2.9,1-5.6,2.4-8.1,4.1c-3,1.9-5.8,4.2-8.3,6.9c-3.9,4-7.5,9.3-9,15.8    c-1.3,4.9-1,9.9,0.1,15.4l0,0c0.3,1.6,0.7,3.2,1.3,4.8c-3-0.3-6.5,1.4-3.2,13.1C287.506,156.601,289.806,159.001,291.506,159.201z    " />
                  </g>
                </g>
              </svg>
              <div className="absolute top-1/2 -translate-y-1/2 right-4">
                <svg
                  className={`h-8 w-4 transition-all duration-300 ${
                    updateForm ? "fill-secondary rotate-180" : "fill-black"
                  }`}
                  x="0px"
                  y="0px"
                  viewBox="0 0 512 512"
                  style={{ enableBackground: "new 0 0 512 512" }}
                  xmlSpace="preserve"
                >
                  <path d="M505.183,123.179c-9.087-9.087-23.824-9.089-32.912,0.002l-216.266,216.27L39.729,123.179  c-9.087-9.087-23.824-9.089-32.912,0.002c-9.089,9.089-9.089,23.824,0,32.912L239.55,388.82c4.364,4.364,10.283,6.816,16.455,6.816  c6.172,0,12.092-2.453,16.455-6.817l232.721-232.727C514.272,147.004,514.272,132.268,505.183,123.179z" />
                </svg>
              </div>
            </button>
          </section>
          <form
            onSubmit={handleUpdate}
            className={`flex flex-col transition-all origin-top overflow-hidden duration-300 ${
              updateForm ? "" : "h-0 scale-y-0"
            } items-center justify-center gap-y-3`}
            encType="multipart/form-data"
          >
              <p
                className={`text-center h-5 ${
                  message.type === "error" ? "text-red-600" : "text-secondary"
                }`}
              >
                {message.content}
              </p>
            <div className="w-[300px] sm:w-2/3">
              <label htmlFor="">username</label>
              <input
                className="border rounded border-black focus:border-secondary outline-none h-10 mt-1 w-full pl-1"
                type="text"
                name="newUsername"
                value={updateDetails.newUsername}
                placeholder="enter new username"
                onChange={handleDetailsChange}
              />
            </div>
            <div className="w-[300px] sm:w-2/3">
              <label htmlFor="">password</label>
              <input
                className="border rounded border-black focus:border-secondary outline-none h-10 mt-1 w-full pl-1"
                type="password"
                name="newPass"
                value={updateDetails.newPass}
                placeholder="enter new password"
                onChange={handleDetailsChange}
              />
            </div>
            <div className="w-[300px] sm:w-2/3">
              <label className="block" htmlFor="">
                profile picture
              </label>
              <div className="flex justify-start items-start mt-1 gap-x-8">
                <input
                  className="cursor-pointer w-24 file:w-full file:text-white file:h-full border rounded file:bg-black file:border-none file:rounded file:text-xs outline-none h-10 mt-1"
                  type="file"
                  name="picUrl"
                  value={selectedFile}
                  placeholder="e"
                  onChange={handleFileInputChange}
                />
                {previewState ? (
                  <img
                    className="w-16 h-16 rounded"
                    src={previewState}
                    alt="PREVIEW"
                  />
                ) : (
                  <p className="text-sm my-auto text-center">No file choosen</p>
                )}
              </div>
            </div>
            <button
              disabled={updating}
              className={`${
                updating ? "bg-red-200 text-black" : "bg-secondary text-white"
              } w-[300px] sm:w-2/3 py-2 mt-4 rounded-full`}
              type="submit"
            >
              {updating ? "Updating..." : "Update"}
            </button>
          </form>
        </section>
        <UserPosts />
      </section>
    </main>
  ) : (
    <div className="h-[400px] flex items-center justify-center">
      <Meta title="You are not logged in" />
      <Link href="/login">
        <a className="border-secondary border-b text-secondary">Log in</a>
      </Link>
      <span className="inline-block ml-1"> to view your account</span>
    </div>
  );
};

export default Profile;

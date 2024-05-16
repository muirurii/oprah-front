import Link from "next/link";
import { useContext, useState, useEffect } from "react";
import Meta from "../components/Meta";
import UserPosts from "../components/UserPosts";
import { Context } from "../context";
import { setUser } from "../context/actions/userActions";
import fetchData from "../customFunctions/fetch";
import Heading from "../components/Heading";

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
    <main className="mb-8">
      <Meta title={user.username} />
      <Heading text={"Profile"} />
      <section className="grid gap-8 lg:grid-cols-2">
        <section className="h-fit min-h-[100px] pb-4 relative flex flex-col w-full items-center">
          <section className="flex items-center justify-center flex-col py-4">
            <div className="h-48 w-48 flex items-center justify-center gap-x-4">
              {user.profilePic.length ? (
                <img
                  src={user.profilePic}
                  alt={user.username}
                  className="h-48 w-48 object-cover rounded-full"
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
            <p className="font-sec py-4 text-xl text-secondary">
              @{user.username}
            </p>
          </section>
          <form
            onSubmit={handleUpdate}
            className={`flex flex-col gap-y-3 px-4 w-full max-w-[600px]`}
            encType="multipart/form-data"
          >
            <p
              className={`text-center h-5 ${
                message.type === "error" ? "text-red-600" : "text-secondary"
              }`}
            >
              {message.content}
            </p>
            <div className="">
              <label className="pb-4 block" htmlFor="">
                Username
              </label>
              <input
                className="border rounded border-black focus:border-secondary outline-none h-12 mt-1 w-full pl-2"
                type="text"
                name="newUsername"
                value={updateDetails.newUsername}
                placeholder="enter new username"
                onChange={handleDetailsChange}
              />
            </div>
            <div className="">
              <label className="pb-4 block" htmlFor="">
                Password
              </label>
              <input
                className="border rounded border-black focus:border-secondary outline-none h-12 mt-1 w-full pl-2"
                type="password"
                name="newPass"
                value={updateDetails.newPass}
                placeholder="enter new password"
                onChange={handleDetailsChange}
              />
            </div>
            <div className="">
              <label className="pb-4 block" htmlFor="">
                Profile Picture
              </label>
              <div className="flex justify-start items-start mt-1 gap-x-8">
                <input
                  className="cursor-pointer w-24 file:w-full file:text-white file:h-full border rounded file:bg-black file:font-sec
                  file:border-none file:rounded file:text-xs outline-none h-10 mt-1"
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
              } py-3 sm:py-4 px-7 sm:px-8 mt-4 w rounded`}
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

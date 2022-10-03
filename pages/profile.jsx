import { useRouter } from "next/router";
import { useContext, useState, useEffect } from "react";
import Meta from "../components/Meta";
import UserPosts from "../components/UserPosts";
import { Context } from "../context";
import { setUser } from "../context/actions/userActions";
import fetchData from "../customFunctions/fetch";

const Profile = () => {
  const {
    state: { user },
    dispatch,
  } = useContext(Context);
  const [updateForm, setUpdateForm] = useState(false);
  const [updateDetails, setUpdateDetails] = useState({
    newUsername:user.username,
    newPass:"",
    picUrl:user.profilePic
  });

  const router = useRouter();

  useEffect(() => {
    if (!user.isLogged) return;

    const getUserData = async () => {
      try {
        const res = await fetchData(
          `users/user/${user._id}`,
          "POST",
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

  const handleUpdate = async (e)=>{
    e.preventDefault();

    const details = {
        username:user.username,
        newUsername:updateDetails.newUsername,
        newPass:updateDetails.newPass,
        picUrl:updateDetails.picUrl
    }

    try {
        const res = await fetchData(`users/update`,"PUT",details,user.token);
        if(res.status === 200){
        const data = await res.json();  
        setUser(dispatch,data);
        }else{
            throw new Error("unable to update")
        }
    } catch (error) {
        console.log(error);        
    }
  }

  const handleDetailsChange = (e)=>{
    setUpdateDetails({
        ...updateDetails,
        [e.target.name]:e.target.value
    });
  }

  return user.isLogged ? (
    <main className="px-4 mb-8">
      <Meta title={user.username} />
      <h1 className="text-3xl py-8">Profile</h1>
      <section className="h- grid gap-8 grid-cols-2">
        <section className="h-fit min-h-[300px] pb-4">
          <section className="flex items-center justify-center flex-col py-4">
            <div className="h-14 w-14 rounded-full bg-gray-100 border border-gray-400 flex items-center justify-center gap-x-4">
              <span className="text-xs">no photo</span>
            </div>
            <p>{user.username}</p>
            <button className="text-right w-2/3 bg-red-300" onClick={() => setUpdateForm(!updateForm)}>Settings</button>
          </section>
          {updateForm ? (
            <form onSubmit={handleUpdate} className="flex flex-col items-center justify-center gap-y-2">
              <input
                className="border-b border-secondary outline-none h-10 w-2/3"
                type="text"
                name="newUsername"
                value={updateDetails.newUsername}
                placeholder="enter new username"
                onChange={handleDetailsChange}
              />
              <input
                className="border-b border-secondary outline-none h-10 w-2/3"
                type="text"
                name="newPass"
                value={updateDetails.newPass}
                placeholder="enter new password"
                onChange={handleDetailsChange}
              />
              <input
                className="border-b border-secondary outline-none h-10 w-2/3"
                type="text"
                name="picUrl"
                value={updateDetails.picUrl}
                placeholder="enter a url for your profile pic"
                onChange={handleDetailsChange}
              />
              <button
                className="bg-secondary w-2/3 py-2 text-white mt-4 rounded"
                type="submit"
              >
                Update
              </button>
            </form>
          ) : null}
        </section>
        <UserPosts/>
      </section>
    </main>
  ) : (
    "verifying"
  );
};

// export const getServerSideProps  = async (context)=>{
//     // const res =
//     // console.log(user);
//     return{
//         props:{}
//     }
// }

export default Profile;

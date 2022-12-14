import Link from "next/link";
import Meta from "../components/Meta";
import { useState } from "react";
import fetchData from "../customFunctions/fetch";
import { setUser } from "../context/actions/userActions";
import { useContext } from "react";
import { Context } from "../context";
import { useRouter } from "next/router";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    repeatPassword: "",
  });

  const { dispatch } = useContext(Context);
  const [err, setErr] = useState("");
  const [creatingAccount, setCreatingAccount] = useState(false);
  const router = useRouter();

  const handleFormChange = (value) => {
    setFormData({ ...formData, ...value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.username < 2 ||
      formData.password.length < 2 ||
      formData.repeatPassword.length < 2
    ) {
      return setErr("Please fill in all fields");
    }
    if (formData.password !== formData.repeatPassword) {
      return setErr("Passwords don't match!");
    }
    setErr("");
    setCreatingAccount(true);
    const details = {
      username: formData.username,
      password: formData.password,
      repeatPassword: formData.repeatPassword,
    };
    try {
      const res = await fetchData("users/register", "POST", details);
      const data = await res.json();
      if (res.status === 200) {
        setUser(dispatch, data);
        setErr("");
        router.push("/");
        setCreatingAccount(false);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setErr(error.message);
      setCreatingAccount(false);
    }
  };

  return (
    <div className="w-full h-screenLessHeader flex items-center justify-center">
      <Meta title="Signup" />
      <form
        className="w-full max-w-[500px] rounded-lg"
        onSubmit={handleFormSubmit}
      >
        <h2 className="text-2xl text-center mb-8">Create account</h2>
        <div className="px-2 pb-10">
          {err.length ? (
            <p className="text-sm text-red-600 text-center pb-2">{err}</p>
          ) : null}
          <div className="w-full mb-4">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="username"
                className="
                    w-full
                    border
                    rounded
                    px-3
                    py-2
                    focus:outline-none
                    border-black focus:border-secondary"
                onChange={(e) => handleFormChange({ username: e.target.value })}
              />
            </div>
          </div>
          <div className="w-full mb-4">
            <div className="flex items-center">
              <input
                type="password"
                placeholder="enter a password"
                className="
                    w-full
                    border
                    rounded
                    px-3
                    py-2
                    focus:outline-none
                    border-black focus:border-secondary
                  "
                onChange={(e) => handleFormChange({ password: e.target.value })}
              />
            </div>
          </div>
          <div className="w-full mb-4">
            <div className="flex items-center">
              <input
                type="password"
                placeholder="repeat password"
                className="
                    w-full
                    border
                    rounded
                    px-3
                    py-2
                    focus:outline-none
                    border-black focus:border-secondary"
                onChange={(e) =>
                  handleFormChange({ repeatPassword: e.target.value })
                }
              />
            </div>
          </div>
          <p className="text-sm">
            Log in
            <Link href={"/login"}>
              <a className="mx-1 inline-block border-b border-secondary text-secondary">
                here
              </a>
            </Link>
            if you have an account
          </p>
          <button
            type="submit"
            className={`
                w-full
                py-2
                mt-8
                rounded-full
                ${
                  creatingAccount
                    ? "bg-red-300 pointer-events-none"
                    : "bg-secondary"
                }
                text-white
                focus:outline-none
              `}
          >
            {creatingAccount ? "Creating..." : "Create Account"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;

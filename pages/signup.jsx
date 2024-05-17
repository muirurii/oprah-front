import Link from "next/link";
import Meta from "../components/Meta";
import { useState } from "react";
import fetchData from "../customFunctions/fetch";
import { setUser } from "../context/actions/userActions";
import { useContext } from "react";
import { Context } from "../context";
import { useRouter } from "next/router";
import Heading from "../components/Heading";

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
    <main className="pb-16">
      <Meta title="Signup" />
      <Heading text={"Create Account"} />
      <div className="flex flex-col items-center justify-center">
        <form
          className="w-full max-w-[500px] rounded-lg"
          onSubmit={handleFormSubmit}
        >
          <div className="px-2 pb-10">
            {err.length ? (
              <p className="text-sm text-red-600 text-center pb-2">{err}</p>
            ) : null}
            <div className="w-full mb-4">
              <label htmlFor="username" className="block pb-2">
                Username
              </label>
              <div className="flex items-center">
                <input
                  id="username"
                  type="text"
                  placeholder="Enter a username"
                  className="
                    w-full
                    h-12
                    border
                    rounded
                    px-3
                    py-2
                    outline-none
                    focus:border-2
                    border-black focus:border-secondary"
                  onChange={(e) =>
                    handleFormChange({ username: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="w-full mb-4">
              <label htmlFor="password" className="block pb-2">
                Password
              </label>
              <div className="flex items-center">
                <input
                  type="password"
                  id="password"
                  placeholder="Enter a password"
                  className="
                    w-full
                    h-12
                    border
                    rounded
                    px-3
                    py-2
                    outline-none
                    focus:border-2
                    border-black focus:border-secondary
                  "
                  onChange={(e) =>
                    handleFormChange({ password: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="w-full mb-4">
              <label htmlFor="repeat-password" className="block pb-2">
                Repeat password
              </label>
              <div className="flex items-center">
                <input
                  type="password"
                  placeholder="Repeat password"
                  id="repeat-password"
                  className="
                   w-full
                    h-12
                    border
                    rounded
                    px-3
                    py-2
                    outline-none
                    focus:border-2
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
                py-3
                mt-8
                rounded
                ${
                  creatingAccount
                    ? "bg-red-300 pointer-events-none"
                    : "bg-secondary"
                }
                text-white
                outline-none
                focus:ringborder-2         `}
            >
              {creatingAccount ? "Creating..." : "Create Account"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SignUp;

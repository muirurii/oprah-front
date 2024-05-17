import Link from "next/link";
import Meta from "../components/Meta";
import { useState } from "react";
import fetchData from "../customFunctions/fetch";
import { setUser } from "../context/actions/userActions";
import { Context } from "../context";
import { useContext } from "react";
import { useRouter } from "next/router";
import Heading from "../components/Heading";

const LogIn = () => {
  const { dispatch } = useContext(Context);
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [err, setErr] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  const handleLogIn = async (e) => {
    e.preventDefault();

    if (formData.username.length < 2 || formData.password < 2) {
      return setErr("Please fill in all fields");
    }

    const details = {
      username: formData.username.trim(),
      password: formData.password,
    };

    setErr("");
    setLoggingIn(true);
    try {
      const res = await fetchData("users/login", "POST", details);
      const data = await res.json();

      if (res.status === 200) {
        setUser(dispatch, data);
        setLoggingIn(false);
        setErr("");
        router.push("/");
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setLoggingIn(false);
      setErr(error.message);
    }
  };

  return (
    <main className="pb-16">
      <Meta title="Log in" />
      <Heading text="Log in" />
      <div className="w-full flex items-center justify-center">
        <form
          className="w-full max-w-[500px] rounded-lg"
          onSubmit={handleLogIn}
        >
          {err.length ? (
            <p className="text-sm text-red-600 text-center pb-2">{err}</p>
          ) : null}
          <div className="px-2 pb-10">
            <div className="w-full mb-4">
              <label htmlFor="username" className="py-2 block">
                Username
              </label>
              <div className="flex items-center">
                <input
                  type="text"
                  id="username"
                  placeholder="Enter your username"
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
                    setFormData({ ...formData, username: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="w-full mb-4">
              <label htmlFor="password" className="py-2 block">
                Password
              </label>
              <div className="flex items-center">
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
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
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
            </div>
            <p className="text-sm">
              Create account
              <Link href={"/signup"}>
                <a className="mx-1 inline-block border-b border-secondary text-secondary">
                  here
                </a>
              </Link>
              if you do not have one
            </p>
            <button
              type="submit"
              className={`
                w-full
                py-3
                mt-8
                rounded
                ${loggingIn ? "bg-red-300 pointer-events-none" : "bg-secondary"}
                text-gray-100
                focus:outline-none
              `}
            >
              {loggingIn ? "Logging in.." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default LogIn;

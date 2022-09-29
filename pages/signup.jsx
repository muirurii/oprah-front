import React from 'react'

const SignUp = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
        <form className="w-full md:w-1/3 rounded-lg">
          <h2 className="text-2xl text-center text-black mb-8">Login</h2>
          <div className="px-12 pb-10">
            <div className="w-full mb-2">
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Email Address"
                  className="
                    w-full
                    border
                    rounded
                    px-3
                    py-2
                    text-black
                    focus:outline-none
                  "
                />
              </div>
            </div>
            <div className="w-full mb-2">
              <div className="flex items-center">
                <input
                  type="password"
                  placeholder="Password"
                  className="
                    w-full
                    border
                    rounded
                    px-3
                    py-2
                    text-black
                    focus:outline-none
                  "
                />
              </div>
            </div>
            <button
              type="submit"
              className="
                w-full
                py-2
                mt-8
                rounded-full
                bg-secondary
                text-white
                focus:outline-none
              "
            >
              Login
            </button>
          </div>
        </form>
      </div>
  )
}

export default SignUp;
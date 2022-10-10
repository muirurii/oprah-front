import Link from 'next/link';
import Meta from "../components/Meta";
import { useState } from 'react';
import fetchData from '../customFunctions/fetch';
import {setUser} from "../context/actions/userActions";
import { Context } from '../context';
import { useContext } from 'react';
import { useRouter } from 'next/router';

const LogIn = () => {
  const {dispatch} = useContext(Context);
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [err,setErr] = useState("");

  const handleLogIn = async(e)=>{
    e.preventDefault();

    if(formData.username.length < 2 || formData.password < 2){
      return setErr("Please fill in all fields")
    }

    const details = {
      username:formData.username,
      password:formData.password
    }

    setErr("");

    const res = await fetchData('users/login',"POST",details);
    const data = await res.json();

    if(res.status === 200){
      setUser(dispatch,data);
      setErr("");
      router.push("/")
    }else{
      setErr(data.message)
    }
  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Meta title="Log in" />
        <form className="max-w-[400px] sm:w-[500px] rounded-lg" onSubmit={handleLogIn}>
          <h2 className="text-2xl text-center mb-8">Login</h2>
          {err.length ? <p className="text-sm text-red-600 text-center pb-2">{err}</p> : null} 
          <div className="px-2 pb-10">
            <div className="w-full mb-4">
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="username"
                  className="
                    w-full
                    border
                    border-black
                    focus:border-secondary
                    rounded
                    px-3
                    py-2
                    focus:outline-none
                  "
                  onChange={(e)=> setFormData({...formData,username:e.target.value})}
                />
              </div>
            </div>
            <div className="w-full mb-4">
              <div className="flex items-center">
                <input
                  type="password"
                  placeholder="password"
                  className="
                    w-full
                    border
                    border-black
                    focus:border-secondary
                    rounded
                    px-3
                    py-2
                    focus:outline-none
                  "
                  onChange={(e)=> setFormData({...formData,password:e.target.value})}
                />
              </div>
            </div>
            <p className='text-sm'>Create account
           <Link href={"/signup"}><a className='mx-1 inline-block border-b border-secondary text-secondary'>here</a></Link>  
            if you do not have one</p>
            <button
              type="submit"
              className="
                w-full
                py-2
                mt-8
                rounded-full
                bg-secondary
                text-gray-100
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

export default LogIn;
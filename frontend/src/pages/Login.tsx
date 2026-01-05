import axios from "axios";
import { Film, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// aakashsaini948585@gmail.com
export default function Login() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate()
  const [userData, setuserData] = useState({
    email: "",
    password: "",
  })
  const loginFunction = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(userData.email.length <= 5){
      return alert("Enter a valid email")
    }
    if(userData.password.length <= 7){
      return alert("Password must be 8 character long")
    }
    try {
      const res = await axios.post(`${backendUrl}/auth/login`, userData)
      const { token } = res.data;
      localStorage.setItem('token', token);
        alert(res.data.message)
        console.log(res)
        navigate('/mainpage');
    } catch (error) {
  if (axios.isAxiosError(error) && error.response?.data) {
    const { message, action } = error.response.data;

    alert(message);

    if (action === "RESEND_VERIFICATION") {
      const confirmResend = window.confirm(
        "Do you want us to resend the verification email?"
      );

      if (confirmResend) {
        await axios.post(`${backendUrl}/auth/resend-verification`, {
          email: userData.email
        });
        alert("Verification email resent. Check your inbox.");
      }
    }
  } else {
    console.log("Unexpected error:", error);
  }
}
  }
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setuserData((prevData) => ({
            ...prevData,
            [name]: value
      }))
      }
  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-black h-screen">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative">
                <Film className="w-10 h-10 text-pink-500 group-hover:rotate-12 transition-transform duration-300" />
                <Sparkles className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <span className="text-3xl font-black bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                CineConnect
              </span>
            </div>
          <h2 className="mt-4 text-center text-2xl/9 font-bold tracking-tight bg-linear-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">Sign in to your account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={loginFunction} className="space-y-6">
             <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-100">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={userData.email}
                  onInput={handleChange}
                  required
                  autoComplete="off"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-gray-500 placeholder:text-gray-600 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-700">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  type="password"
                  value={userData.password}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-gray-500 placeholder:text-gray-600 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="cursor-pointer flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-400">
            Haven't Sign-up?{' '}
            <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
              Click here to Signup
            </a>
          </p>
        </div>
      </div>
    </>
  )
}

import { Film, Sparkles } from "lucide-react";
import axios from 'axios'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function SignUp() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate()
  const cities = ["Delhi", "Mumbai", "Bengaluru", "Chennai", "Kolkata", "Hyderabad"];
  const [userData, setuserData] = useState({
    name: "",
    email: "",
    password: "",
    city: ""
  })
  const SignupFunction = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(userData.name.length <= 3){
      return alert("Enter a valid name")
    }
    if(userData.email.length <= 5){
      return alert("Enter a valid email")
    }
    if(userData.password.length <= 4){
      return alert("password must be 8 character long")
    }
    try {
      const res = await axios.post(`${backendUrl}/auth/signup`, userData)
        alert(res.data.message)
        navigate('/login');
    } catch (error) {
      console.log("Error: ", error)
      if(axios.isAxiosError(error) && error.response?.data?.message){
        alert(error.response.data.message)
      }
    }
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setuserData((prevData) =>({
      ...prevData,
      [name]: value
    }))
  }
  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-black h-screen bg-fixed">
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

        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={SignupFunction} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm/6 font-medium text-gray-100">
                Full Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your Name"
                  value={userData.name}
                  onChange={handleChange}
                  autoComplete="off"
                  required
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-gray-500 placeholder:text-gray-600 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="city" className="block text-sm/6 font-medium text-gray-100">
                Your City
              </label>
              <div className="mt-2">
                <input
                  id="city"
                  name="city"
                  list="cities"
                  value={userData.city}
                  onChange={handleChange}
                  // placeholder="Enter your city"
                  required
                  autoComplete="city"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-gray-500 placeholder:text-gray-600 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
                <datalist id="cities">
                {cities.map((c, index) => (
                  <option key={index} value={c} />
                ))}
              </datalist>
              </div>
            </div>

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
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-black hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-400">
            Already have an account?{' '}
            <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
              Click for Login
            </a>
          </p>
        </div>
      </div>
    </>
  )
}

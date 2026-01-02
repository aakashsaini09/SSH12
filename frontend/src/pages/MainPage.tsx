import axios from "axios"
import { useEffect } from "react";

const MainPage = () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const getAllEvents = async () => {
    const token = localStorage.getItem('token')
    try {
      const res = await axios.get(`${backendUrl}/events`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
    });
    console.log("resposne is: ", res)
    } catch (error) {
      console.error("Error: ", error)
    }
  }
  useEffect(() => {
    getAllEvents()
  }, [])
  return (
    <div className="h-screen w-full bg-black text-white">
      Mainpage
    </div>
  )
}

export default MainPage

import React, { useState } from "react";
import { Film, Users, MapPin, Calendar, X, Clock } from "lucide-react";

interface CreateEventProps {
  onClose: () => void;
}

const CreateEvent = ({ onClose }: CreateEventProps) => {
  const cities = ["Delhi", "Mumbai", "Bengaluru", "Kolkata", "Hyderabad", "Pune", "Jaipur", "Lucknow"];
  const maxPeopleOptions = [2, 3, 4, 5, 6, 7, 8, 9, 10];
  
  const [eventInformation, setEventInformation] = useState({
    movieName: "",
    theaterName: "",
    city: "",
    showTime: "",
    showDate: "",
    maxPeople: ""
  });

  const [errors, setErrors] = useState({
    movieName: "",
    theaterName: "",
    city: "",
    showTime: "",
    showDate: "",
    maxPeople: ""
  });

  const createEventFunction = (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;
    const newErrors = {
      movieName: "",
      theaterName: "",
      city: "",
      showTime: "",
      showDate: "",
      maxPeople: ""
    };

    if (!eventInformation.movieName.trim()) {
      newErrors.movieName = "Movie name is requigreen";
      hasError = true;
    }
    if (!eventInformation.theaterName.trim()) {
      newErrors.theaterName = "Theater name is requigreen";
      hasError = true;
    }
    if (!eventInformation.city) {
      newErrors.city = "Please select a city";
      hasError = true;
    }
    if (!eventInformation.showDate) {
      newErrors.showDate = "Show date is requigreen";
      hasError = true;
    }
    if (!eventInformation.showTime) {
      newErrors.showTime = "Show time is requigreen";
      hasError = true;
    }
    if (!eventInformation.maxPeople) {
      newErrors.maxPeople = "Please select max people";
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      console.log("Event Information:", eventInformation);
      // TODO: API call to create event
      alert("Event created successfully!");
      onClose();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEventInformation((prev) => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    setErrors((prev) => ({
      ...prev,
      [name]: ""
    }));
  };

  return (
    <div className="h-screen w-full bg-transparent">
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="relative bg-linear-to-r from-blue-600/20 to-blue-600/20 px-8 py-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Film className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-white">Create Movie Event</h2>
                <p className="text-sm text-gray-400">Fill in the details to create your event</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 cursor-pointer flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="px-8 py-6 space-y-5 max-h-[calc(90vh-200px)] overflow-y-auto">
          {/* Movie Name */}
          <div className="space-y-2">
            <label htmlFor="movieName" className="flex items-center space-x-2 text-sm font-semibold text-gray-300">
              <Film className="w-4 h-4 text-blue-400" />
              <span>Movie Name</span>
            </label>
            <input
              type="text"
              id="movieName"
              name="movieName"
              placeholder="e.g., Dune Part Two"
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-pink-500/50 focus:bg-white/10 transition-all"
              value={eventInformation.movieName}
              onChange={handleChange}
            />
            {errors.movieName && <p className="text-green-400 text-xs">{errors.movieName}</p>}
          </div>

          {/* Theater Name */}
          <div className="space-y-2">
            <label htmlFor="theaterName" className="flex items-center space-x-2 text-sm font-semibold text-gray-300">
              <MapPin className="w-4 h-4 text-purple-400" />
              <span>Theater Name</span>
            </label>
            <input
              type="text"
              id="theaterName"
              name="theaterName"
              placeholder="e.g., PVR Phoenix"
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all"
              value={eventInformation.theaterName}
              onChange={handleChange}
            />
            {errors.theaterName && <p className="text-green-400 text-xs">{errors.theaterName}</p>}
          </div>

          {/* City Dropdown */}
          <div className="space-y-2">
            <label htmlFor="city" className="flex items-center space-x-2 text-sm font-semibold text-gray-300">
              <MapPin className="w-4 h-4 text-blue-400" />
              <span>City</span>
            </label>
            <select
              id="city"
              name="city"
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all appearance-none cursor-pointer"
              value={eventInformation.city}
              onChange={handleChange}
            >
              <option value="" className="bg-black">Select a city</option>
              {cities.map((city, index) => (
                <option key={index} value={city} className="bg-black">
                  {city}
                </option>
              ))}
            </select>
            {errors.city && <p className="text-green-400 text-xs">{errors.city}</p>}
          </div>

          {/* Date and Time Row */}
          <div className="grid grid-cols-2 gap-4">
            {/* Show Date */}
            <div className="space-y-2">
              <label htmlFor="showDate" className="flex items-center space-x-2 text-sm font-semibold text-gray-300">
                <Calendar className="w-4 h-4 text-green-400" />
                <span>Show Date</span>
              </label>
              <input
                type="date"
                id="showDate"
                name="showDate"
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-all"
                value={eventInformation.showDate}
                onChange={handleChange}
              />
              {errors.showDate && <p className="text-green-400 text-xs">{errors.showDate}</p>}
            </div>

            {/* Show Time */}
            <div className="space-y-2">
              <label htmlFor="showTime" className="flex items-center space-x-2 text-sm font-semibold text-gray-300">
                <Clock className="w-4 h-4 text-yellow-400" />
                <span>Show Time</span>
              </label>
              <input
                type="time"
                id="showTime"
                name="showTime"
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-yellow-500/50 focus:bg-white/10 transition-all"
                value={eventInformation.showTime}
                onChange={handleChange}
              />
              {errors.showTime && <p className="text-green-400 text-xs">{errors.showTime}</p>}
            </div>
          </div>

          {/* Max People Dropdown */}
          <div className="space-y-2">
            <label htmlFor="maxPeople" className="flex items-center space-x-2 text-sm font-semibold text-gray-300">
              <Users className="w-4 h-4 text-orange-400" />
              <span>Maximum People</span>
            </label>
            <select
              id="maxPeople"
              name="maxPeople"
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-all appearance-none cursor-pointer"
              value={eventInformation.maxPeople}
              onChange={handleChange}
            >
              <option value="" className="bg-black">Select max people</option>
              {maxPeopleOptions.map((num) => (
                <option key={num} value={num} className="bg-black">
                  {num} {num === 1 ? 'Person' : 'People'}
                </option>
              ))}
            </select>
            {errors.maxPeople && <p className="text-green-400 text-xs">{errors.maxPeople}</p>}
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 bg-white/5 border-t border-white/10 flex items-center justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 cursor-pointer bg-white/10 hover:bg-white/20 rounded-xl font-semibold text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={createEventFunction}
            className="px-6 py-3 bg-blue-700 cursor-pointer rounded-xl font-semibold text-white transition-all shadow-lg"
          >
            Create Event
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        /* Custom scrollbar */
        .overflow-y-auto::-webkit-scrollbar {
          width: 8px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        /* Custom date/time input styling */
        input[type="date"]::-webkit-calendar-picker-indicator,
        input[type="time"]::-webkit-calendar-picker-indicator {
          filter: invert(1);
          cursor: pointer;
        }
      `}</style>
    </div>
    </div>
  );
};

export default CreateEvent;
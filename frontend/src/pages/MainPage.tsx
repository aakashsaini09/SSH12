import { useState, useEffect } from 'react';
import { Film, Users, MapPin, Calendar, Clock, Plus, Search, Filter, ChevronDown, Ticket } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import img from '../dune.jpg'
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import CreateEvent from  '../../components/createEvent.tsx'
interface Event {
  _id: string;
  movieTitle: string;
  theaterName: string;
  city: string;
  showTime: string;
  currentPeople: number;
  maxPeople: number;
  status: 'OPEN' | 'FULL' | 'EXPIRED';
  createdBy: {
    _id: string;
    name: string;
    city: string;
  };
  createdAt: string;
}

export default function MainPage() {
  const navigate = useNavigate()
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [searchQuery, setSearchQuery] = useState('');
  const [popupState, setpopupState] = useState(false)
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [selectedCity] = useState('Mumbai');
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [createEventPopup, setcreateEventPopup] = useState(false)
  const getAllEvents = async () => {
    const token = localStorage.getItem('token');
    if(!token){
      navigate('/');
    }
    try {
      setLoading(true);
      const res = await fetch(`${backendUrl}/events`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!res.ok) {
        throw new Error('Failed to fetch events');
      }
      
      const data = await res.json();
      console.log("response is: ", data);
      
      // Handle different response structures
      if (Array.isArray(data)) {
        setEvents(data);
      } else if (data.events && Array.isArray(data.events)) {
        setEvents(data.events);
      } else if (typeof data === 'object') {
        // If response is a single object, wrap it in an array
        setEvents([data]);
      }
    } catch (error) {
      console.error("Error: ", error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };
const requestToJoinEvent = async (eId: string): Promise<void> => {
  const token = localStorage.getItem('token');
  if (!token) {
    navigate('/');
    return;
  }
  try {
    setLoading(true);
    const res: AxiosResponse = await axios.post(`${backendUrl}/join/${eId}/request`,{}, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );
    const data = res.data;
    console.log("response is: ", data);
    alert(res.data.message)
  } catch (error) {
    console.error("Error: ", error);
    if (axios.isAxiosError(error)) {
      alert(error.response?.data?.message);
    }
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    getAllEvents();
  }, []);
  const changePopupfunction =() => {
    if(popupState == true){
      setpopupState(false)
    }else{
      setpopupState(true)
    }
  }
  function logOut() {
     localStorage.removeItem("token");
     navigate('/');
  }
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPEN': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'FULL': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'EXPIRED': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.movieTitle.toLowerCase().includes(searchQuery.toLowerCase()) || event.theaterName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'ALL' || event.status === filterStatus;
    return matchesSearch && matchesStatus;
  });
  console.log(createEventPopup)
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/10">
        <div className="w-full px-6 lg:px-12 xl:px-20 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Film className="w-8 h-8 text-purple-500" />
              <span className="text-2xl font-black bg-linear-to-r from-purple-500 via-purple-500 to-gray-500 bg-clip-text text-transparent">
                CineConnect
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="hidden md:flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-white transition-colors">
                <MapPin className="w-4 h-4" />
                <span>{selectedCity}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              <button onClick={()=> setcreateEventPopup(true)} className="flex items-center cursor-pointer space-x-2 px-6 py-2.5 bg-linear-to-r from-purple-500 via-purple-500 to-gray-500 rounded-full font-semibold hover:opacity-90 transition-opacity">
                <Plus className="w-5 h-5" />
                <span >Create Event</span>
              </button>
              {createEventPopup ? (<CreateEvent onClose={() => setcreateEventPopup(false)}/>) : (<></>)}
              <button onClick={changePopupfunction} className="flex items-center border border-white w-16 h-16 mx-3 cursor-pointer rounded-full font-semibold hover:opacity-90 transition-opacity">
                {popupState ? (<div className='fixed bg-gray-800 top-22 right-10 flex flex-col text-xl rounded-2xl'>
                  <Link to={'/profile'} className='py-2 px-4 flex items-center justify-center border-b border-gray-400 w-full'>Profile</Link>
                  <div className='py-2 px-4 flex items-center justify-center w-full' onClick={logOut}>LogOut</div>
                </div>) : (<></>)}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative px-6 lg:px-12 xl:px-20 py-12 bg-linear-to-b from-purple-900/20 to-transparent">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4">
            Discover Movie Events in{' '}
            <span className="bg-linear-to-r from-purple-400 to-purple-400 bg-clip-text text-transparent">
              {selectedCity}
            </span>
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Join fellow movie enthusiasts or create your own screening event
          </p>

          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search movies or theaters..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
              />
            </div>
            
            <div className="flex gap-2">
              <button className="flex items-center space-x-2 px-6 py-3.5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors">
                <Filter className="w-5 h-5" />
                <span className="hidden md:inline">Filter</span>
              </button>
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-6 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-purple-500/50 transition-colors appearance-none cursor-pointer"
              >
                <option value="ALL" className="bg-black">All Status</option>
                <option value="OPEN" className="bg-black">Open</option>
                <option value="FULL" className="bg-black">Full</option>
                <option value="EXPIRED" className="bg-black">Expired</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="px-6 lg:px-12 xl:px-20 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">
              {filteredEvents.length} {filteredEvents.length === 1 ? 'Event' : 'Events'} Available
            </h2>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 mx-auto mb-4 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-400">Loading events...</p>
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="text-center py-20">
              <Film className="w-16 h-16 mx-auto mb-4 text-gray-600" />
              <h3 className="text-2xl font-bold mb-2">No events found</h3>
              <p className="text-gray-400 mb-6">Try adjusting your search or filters</p>
              <button className="px-6 py-3 bg-linear-to-r from-purple-500 to-purple-600 rounded-full font-semibold hover:opacity-90 transition-opacity">
                Create Your Own Event
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <div
                  key={event._id}
                  className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-[1.02]"
                >
                  {/* Movie Image Placeholder */}
                  <div className="relative h-64 bg-black flex items-center justify-center overflow-hidden">
                    {/* <Film className="w-20 h-20 text-white/30" /> */}
                    <img src={img}/>
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>
                    
                    {/* Status Badge */}
                    <div className={`absolute top-4 right-4 px-3 py-1.5 rounded-full border text-xs font-bold uppercase ${getStatusColor(event.status)}`}>
                      {event.status}
                    </div>

                    {/* People Count Badge */}
                    <div className="absolute bottom-4 left-4 flex items-center space-x-2 bg-black/60 backdrop-blur-sm px-3 py-2 rounded-full">
                      <Users className="w-4 h-4 text-purple-400" />
                      <span className="text-sm font-semibold">
                        {event.currentPeople}/{event.maxPeople}
                      </span>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
                      {event.movieTitle}
                    </h3>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center space-x-2 text-gray-400 text-sm">
                        <MapPin className="w-4 h-4 shrink-0" />
                        <span className="truncate">{event.theaterName}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-gray-400 text-sm">
                        <Calendar className="w-4 h-4 shrink-0" />
                        <span>{formatDate(event.showTime)}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-gray-400 text-sm">
                        <Clock className="w-4 h-4 shrink-0" />
                        <span>{formatTime(event.showTime)}</span>
                      </div>
                    </div>

                    {/* Host Info */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-linear-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-sm font-bold">
                          {event.createdBy.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-semibold">Hosted by</div>
                          <div className="text-xs text-gray-400">{event.createdBy.name}</div>
                        </div>
                      </div>

                      {event.status === 'OPEN' && (
                        <button onClick={() => requestToJoinEvent(event._id)} className="px-4 py-2 bg-linear-to-r from-purple-500 to-purple-600 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity flex items-center space-x-1 cursor-pointer">
                          <Ticket className="w-4 h-4" />
                          <span>Join</span>
                        </button>
                      )}
                      
                      {event.status === 'FULL' && (
                        <div className="px-4 py-2 bg-orange-500/20 rounded-full text-sm font-semibold text-orange-400">
                          Full
                        </div>
                      )}
                      
                      {event.status === 'EXPIRED' && (
                        <div className="px-4 py-2 bg-gray-500/20 rounded-full text-sm font-semibold text-gray-400">
                          Ended
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="absolute inset-0 bg-linear-to-r from-purple-500/10 via-purple-500/10 to-gray-500/10 rounded-3xl"></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Floating Action Button for Mobile */}
      <button className="fixed bottom-6 right-6 md:hidden w-14 h-14 bg-linear-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-40">
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}
import { useState, useEffect } from 'react';
import { Film, Users, MapPin, Calendar, Clock, ChevronDown, ChevronUp, X, Check, UserPlus, Trash2, Edit } from 'lucide-react';

interface JoinRequest {
  _id: string;
  eventId: {
    _id: string;
    movieTitle: string;
    showTime: string;
  };
  fromUser: {
    _id: string;
    name: string;
    city: string;
  };
  toUser: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  createdAt: string;
  updatedAt: string;
}

interface MyEvent {
  _id: string;
  movieTitle: string;
  theaterName: string;
  city: string;
  showTime: string;
  currentPeople: number;
  maxPeople: number;
  status: 'OPEN' | 'FULL' | 'EXPIRED';
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

interface UserProfile {
  _id: string;
  name: string;
  city: string;
  email: string;
}

export default function ProfilePage() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'requests' | 'members'>('requests');
  const [myEvents, setMyEvents] = useState<MyEvent[]>([]);
  const [allRequests, setAllRequests] = useState<JoinRequest[]>([]);
  const [eventMembers, setEventMembers] = useState<{ [eventId: string]: Array<{ _id: string; userId: {name: string; city: string} }> }>({});
  const [loading, setLoading] = useState(true);

  // Hardcoded user data - Replace with actual user data from auth context
  const user: UserProfile = {
    _id: '694ebbf681e0ddf71d0bc895',
    name: 'Aakash',
    city: 'Mumbai',
    email: 'aakash@example.com'
  };
  const getMyEvents = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${backendUrl}/events/mine`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!res.ok) {
        throw new Error('Failed to fetch events');
      }

      const data = await res.json();
      console.log("My events response: ", data);

      // Handle different response structures
      if (Array.isArray(data)) {
        setMyEvents(data);
        // Fetch members for each event
        data.forEach((event: MyEvent) => {
          fetchEventMembers(event._id);
        });
      } else if (data.events && Array.isArray(data.events)) {
        setMyEvents(data.events);
        data.events.forEach((event: MyEvent) => {
          fetchEventMembers(event._id);
        });
      } else if (typeof data === 'object') {
        setMyEvents([data]);
        fetchEventMembers(data._id);
      }
    } catch (error) {
      console.error("Error fetching events: ", error);
      setMyEvents([]);
    }
  };

  const fetchEventMembers = async (eventId: string) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${backendUrl}/join/${eventId}/members`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!res.ok) {
        throw new Error('Failed to fetch members');
      }
      const data = await res.json();
      console.log(`Members for event ${eventId}: `, data);
      
      // Store members in state by eventId
      setEventMembers(prev => ({
        ...prev,
        [eventId]: Array.isArray(data) ? data : (data.members || [])
      }));
    } catch (error) {
      console.error(`Error fetching members for event ${eventId}: `, error);
    }
  };

  const getAllRequests = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${backendUrl}/join/requests/incoming`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!res.ok) {
        throw new Error('Failed to fetch requests');
      }

      const data = await res.json();
      console.log("All requests response: ", data);

      // Handle different response structures
      if (Array.isArray(data)) {
        setAllRequests(data);
      } else if (data.requests && Array.isArray(data.requests)) {
        setAllRequests(data.requests);
      } else if (typeof data === 'object') {
        setAllRequests([data]);
      }
    } catch (error) {
      console.error("Error fetching requests: ", error);
      setAllRequests([]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([getMyEvents(), getAllRequests()]);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleAcceptRequest = async (eventId: string, requestId: string) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${backendUrl}/join/requests/${requestId}/accept`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!res.ok) {
        throw new Error('Failed to accept request');
      }
      
      const data = await res.json();
      alert(data.message || 'Request accepted successfully');
      
      // Refresh requests and members
      await Promise.all([getAllRequests(), fetchEventMembers(eventId)]);
    } catch (error) {
      console.error("Error accepting request: ", error);
      alert("Something went wrong");
    }
  };

  const handleRejectRequest = async (eventId: string, requestId: string) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${backendUrl}/join/requests/${requestId}/reject`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!res.ok) {
        throw new Error('Failed to reject request');
      }
      
      const data = await res.json();
      alert(data.message || 'Request rejected successfully');
      
      // Refresh requests
      await getAllRequests();
    } catch (error) {
      console.error("Error rejecting request: ", error);
      alert("Something went wrong");
    }
  };

  const handleRemoveMember = (eventId: string, memberId: string) => {
    console.log(`Removing member ${memberId} from event ${eventId}`);
    // TODO: API call to remove member
  };

  const handleDeleteEvent = (eventId: string) => {
    console.log(`Deleting event ${eventId}`);
    // TODO: API call to delete event
  };

  const toggleEventExpand = (eventId: string) => {
    setExpandedEventId(expandedEventId === eventId ? null : eventId);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPEN': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'FULL': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'EXPIRED': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  // Get join requests for a specific event
  const getEventJoinRequests = (eventId: string): JoinRequest[] => {
    return allRequests.filter(request => 
      request.eventId._id === eventId && request.status === 'PENDING'
    );
  };

  const getEventMembersList = (eventId: string) => {
    return eventMembers[eventId] || [];
  };

  // Calculate total pending requests across all events
  const totalRequests = allRequests.filter(req => req.status === 'PENDING').length;
  
  // Calculate total members from all events
  const totalMembers = Object.values(eventMembers).reduce((acc, members) => acc + members.length, 0);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/10">
        <div className="w-full px-6 lg:px-12 xl:px-20 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Film className="w-8 h-8 text-pink-500" />
              <span className="text-2xl font-black bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                CineConnect
              </span>
            </div>
            <button className="px-6 py-2 text-gray-400 hover:text-white transition-colors">
              Back to Events
            </button>
          </div>
        </div>
      </header>

      {loading ? (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="px-6 lg:px-12 xl:px-20 py-12">
          <div className="max-w-7xl mx-auto">
            {/* User Info Card */}
            <div className="bg-linear-to-r from-purple-900/30 to-pink-900/30 rounded-3xl p-8 mb-12 border border-white/10">
              <div className="flex items-center space-x-6">
                <div className="w-24 h-24 bg-linear-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-4xl font-black">
                  {user.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h1 className="text-4xl font-black mb-2">{user.name}</h1>
                  <div className="flex items-center space-x-4 text-gray-400">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{user.city}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Film className="w-4 h-4" />
                      <span>{myEvents.length} Events Created</span>
                    </div>
                    {totalRequests > 0 && (
                      <div className="flex items-center space-x-2">
                        <UserPlus className="w-4 h-4 text-pink-400" />
                        <span className="text-pink-400 font-semibold">{totalRequests} Pending Requests</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="text-3xl font-bold mb-2">{myEvents.filter(e => e.status === 'OPEN').length}</div>
                <div className="text-gray-400">Active Events</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="text-3xl font-bold mb-2">{totalRequests}</div>
                <div className="text-gray-400">Pending Requests</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="text-3xl font-bold mb-2">{totalMembers}</div>
                <div className="text-gray-400">Total Members</div>
              </div>
            </div>

            {/* My Events Section */}
            <div>
              <h2 className="text-3xl font-black mb-6">My Events</h2>

              {myEvents.length === 0 ? (
                <div className="text-center py-20 bg-white/5 rounded-3xl">
                  <Film className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                  <h3 className="text-2xl font-bold mb-2">No events created yet</h3>
                  <p className="text-gray-400 mb-6">Start creating movie events and connect with others</p>
                  <button className="px-6 py-3 bg-linear-to-r from-pink-500 to-purple-600 rounded-full font-semibold">
                    Create Your First Event
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {myEvents.map((event) => {
                    const eventRequests = getEventJoinRequests(event._id);
                    const eventMembersList = getEventMembersList(event._id);

                    return (
                      <div
                        key={event._id}
                        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden hover:border-pink-500/30 transition-all"
                      >
                        {/* Event Header */}
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h3 className="text-2xl font-bold">{event.movieTitle}</h3>
                                <div className={`px-3 py-1 rounded-full border text-xs font-bold uppercase ${getStatusColor(event.status)}`}>
                                  {event.status}
                                </div>
                              </div>

                              <div className="grid sm:grid-cols-2 gap-3 text-gray-400">
                                <div className="flex items-center space-x-2">
                                  <MapPin className="w-4 h-4 shrink-0" />
                                  <span>{event.theaterName}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Calendar className="w-4 h-4 shrink-0" />
                                  <span>{formatDate(event.showTime)}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Clock className="w-4 h-4 shrink-0" />
                                  <span>{formatTime(event.showTime)}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Users className="w-4 h-4 shrink-0" />
                                  <span className="font-semibold">
                                    {event.currentPeople}/{event.maxPeople} Slots Filled
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center space-x-2">
                              {event.status !== 'EXPIRED' && (
                                <>
                                  <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                                    <Edit className="w-5 h-5" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteEvent(event._id)}
                                    className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                                  >
                                    <Trash2 className="w-5 h-5" />
                                  </button>
                                </>
                              )}
                              <button
                                onClick={() => toggleEventExpand(event._id)}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                              >
                                {expandedEventId === event._id ? (
                                  <ChevronUp className="w-5 h-5" />
                                ) : (
                                  <ChevronDown className="w-5 h-5" />
                                )}
                              </button>
                            </div>
                          </div>

                          {/* Request & Member Count Badges */}
                          <div className="flex items-center space-x-4">
                            {eventRequests.length > 0 && (
                              <div className="inline-flex items-center space-x-2 bg-pink-500/20 text-pink-400 px-4 py-2 rounded-full">
                                <UserPlus className="w-4 h-4" />
                                <span className="text-sm font-semibold">
                                  {eventRequests.length} New {eventRequests.length === 1 ? 'Request' : 'Requests'}
                                </span>
                              </div>
                            )}
                            {eventMembersList.length > 0 && (
                              <div className="inline-flex items-center space-x-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full">
                                <Users className="w-4 h-4" />
                                <span className="text-sm font-semibold">
                                  {eventMembersList.length} {eventMembersList.length === 1 ? 'Member' : 'Members'}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Expanded Section - Requests & Members */}
                        {expandedEventId === event._id && (
                          <div className="border-t border-white/10 bg-white/5">
                            {/* Tabs */}
                            <div className="flex border-b border-white/10">
                              <button
                                onClick={() => setActiveTab('requests')}
                                className={`flex-1 px-6 py-4 font-semibold transition-colors relative ${
                                  activeTab === 'requests' ? 'text-pink-400' : 'text-gray-400 hover:text-white'
                                }`}
                              >
                                Join Requests ({eventRequests.length})
                                {activeTab === 'requests' && (
                                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-pink-500 to-purple-500"></div>
                                )}
                              </button>
                              <button
                                onClick={() => setActiveTab('members')}
                                className={`flex-1 px-6 py-4 font-semibold transition-colors relative ${
                                  activeTab === 'members' ? 'text-pink-400' : 'text-gray-400 hover:text-white'
                                }`}
                              >
                                Accepted Members ({eventMembersList.length})
                                {activeTab === 'members' && (
                                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-pink-500 to-purple-500"></div>
                                )}
                              </button>
                            </div>

                            {/* Tab Content */}
                            <div className="p-6">
                              {activeTab === 'requests' ? (
                                <div className="space-y-3">
                                  {eventRequests.length === 0 ? (
                                    <div className="text-center py-8 text-gray-400">
                                      No pending requests
                                    </div>
                                  ) : (
                                    eventRequests.map((request) => (
                                      <div
                                        key={request._id}
                                        className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                                      >
                                        <div className="flex items-center space-x-4">
                                          <div className="w-12 h-12 bg-linear-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center font-bold">
                                            {request.fromUser.name.charAt(0)}
                                          </div>
                                          <div>
                                            <div className="font-semibold">{request.fromUser.name}</div>
                                            <div className="text-sm text-gray-400 flex items-center space-x-2">
                                              <MapPin className="w-3 h-3" />
                                              <span>{request.fromUser.city}</span>
                                              <span>•</span>
                                              <span>{formatDate(request.createdAt)}</span>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                          <button
                                            onClick={() => handleAcceptRequest(event._id, request._id)}
                                            className="p-2 bg-green-500/20 text-green-400 hover:bg-green-500/30 rounded-lg transition-colors"
                                          >
                                            <Check className="w-5 h-5" />
                                          </button>
                                          <button
                                            onClick={() => handleRejectRequest(event._id, request._id)}
                                            className="p-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg transition-colors"
                                          >
                                            <X className="w-5 h-5" />
                                          </button>
                                        </div>
                                      </div>
                                    ))
                                  )}
                                </div>
                              ) : (
                                <div className="space-y-3">
                                  {eventMembersList.length === 0 ? (
                                    <div className="text-center py-8 text-gray-400">
                                      No members yet
                                    </div>
                                  ) : (
                                    eventMembersList.map((member) => (
                                      <div
                                        key={member._id}
                                        className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                                      >
                                        <div className="flex items-center space-x-4">
                                          <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center font-bold">
                                            {member.userId?.name.charAt(0)}
                                          </div>
                                          <div>
                                            <div className="font-semibold">{member.userId.name}</div>
                                            <div className="text-sm text-gray-400 flex items-center space-x-2">
                                              <MapPin className="w-3 h-3" />
                                              <span>{member.userId.city}</span>
                                            </div>
                                          </div>
                                        </div>
                                        {event.status !== 'EXPIRED' && (
                                          <button
                                            onClick={() => handleRemoveMember(event._id, member._id)}
                                            className="p-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg transition-colors"
                                          >
                                            <X className="w-5 h-5" />
                                          </button>
                                        )}
                                      </div>
                                    ))
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
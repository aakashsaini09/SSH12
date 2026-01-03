import { useState } from 'react';
import { Film, Users, MapPin, Calendar, Clock, ChevronDown, ChevronUp, X, Check, UserPlus, Trash2, Edit } from 'lucide-react';
import { Link } from 'react-router-dom';

interface JoinRequest {
  _id: string;
  userId: {
    _id: string;
    name: string;
    city: string;
  };
  requestedAt: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
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
  joinRequests: JoinRequest[];
  acceptedMembers: {
    _id: string;
    name: string;
    city: string;
  }[];
  createdAt: string;
}

interface UserProfile {
  _id: string;
  name: string;
  city: string;
  email: string;
}

export default function Profile() {
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'requests' | 'members'>('requests');

  // Sample user data
  const user: UserProfile = {
    _id: '694ebbf681e0ddf71d0bc895',
    name: 'Aakash',
    city: 'Mumbai',
    email: 'aakash@example.com'
  };

  // Sample events created by user
  const myEvents: MyEvent[] = [
    {
  //   {
  //   "_id": "694fda1d7ec9aa80dfe56eb9",
  //   "movieTitle": "Dune Part Two",
  //   "theaterName": "PVR Phoenix",
  //   "showTime": "2026-02-02T18:30:00.000Z",
  //   "city": "Mumbai",
  //   "createdBy": "694ebbf681e0ddf71d0bc895",
  //   "maxPeople": 2,
  //   "currentPeople": 1,
  //   "status": "OPEN",
  //   "createdAt": "2025-12-27T13:07:41.548Z",
  //   "updatedAt": "2025-12-27T13:07:41.548Z",
  //   "__v": 0
  // },
      _id: "1",
      movieTitle: "Dune Part Two",
      theaterName: "PVR Phoenix",
      city: "Mumbai",
      showTime: "2026-02-02T18:30:00.000Z",
      currentPeople: 3,
      maxPeople: 5,
      status: "OPEN",
      joinRequests: [
        {
          _id: "req1",
          userId: { _id: "u1", name: "Priya Sharma", city: "Mumbai" },
          requestedAt: "2025-12-28T10:00:00.000Z",
          status: "PENDING"
        },
        {
          _id: "req2",
          userId: { _id: "u2", name: "Rahul Kumar", city: "Mumbai" },
          requestedAt: "2025-12-28T11:30:00.000Z",
          status: "PENDING"
        }
      ],
      acceptedMembers: [
        { _id: "m1", name: "Sneha Patel", city: "Mumbai" },
        { _id: "m2", name: "Vikram Singh", city: "Mumbai" }
      ],
      createdAt: "2025-12-27T13:07:41.548Z"
    },
    {
      _id: "2",
      movieTitle: "Oppenheimer",
      theaterName: "INOX Megaplex",
      city: "Mumbai",
      showTime: "2026-02-05T20:00:00.000Z",
      currentPeople: 4,
      maxPeople: 4,
      status: "FULL",
      joinRequests: [],
      acceptedMembers: [
        { _id: "m3", name: "Anita Roy", city: "Mumbai" },
        { _id: "m4", name: "Karan Mehta", city: "Mumbai" },
        { _id: "m5", name: "Divya Shah", city: "Mumbai" }
      ],
      createdAt: "2025-12-26T09:00:00.000Z"
    },
    {
      _id: "3",
      movieTitle: "The Batman",
      theaterName: "Cinepolis Andheri",
      city: "Mumbai",
      showTime: "2025-12-29T19:00:00.000Z",
      currentPeople: 2,
      maxPeople: 3,
      status: "EXPIRED",
      joinRequests: [],
      acceptedMembers: [
        { _id: "m6", name: "Rohan Das", city: "Mumbai" }
      ],
      createdAt: "2025-12-20T14:00:00.000Z"
    }
  ];

  const handleAcceptRequest = (eventId: string, requestId: string) => {
    console.log(`Accepting request ${requestId} for event ${eventId}`);
    // API call to accept request
  };

  const handleRejectRequest = (eventId: string, requestId: string) => {
    console.log(`Rejecting request ${requestId} for event ${eventId}`);
    // API call to reject request
  };

  const handleRemoveMember = (eventId: string, memberId: string) => {
    console.log(`Removing member ${memberId} from event ${eventId}`);
    // API call to remove member
  };

  const handleDeleteEvent = (eventId: string) => {
    console.log(`Deleting event ${eventId}`);
    // API call to delete event
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

  const totalRequests = myEvents.reduce((acc, event) => acc + event.joinRequests.length, 0);

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
            <Link to={'/mainpage'} className="px-6 py-2 text-gray-400 hover:text-white transition-colors">
              Back to Events
            </Link>
          </div>
        </div>
      </header>

      {/* Profile Section */}
      <div className="px-6 lg:px-12 xl:px-20 py-12">
        <div className="max-w-7xl mx-auto">
          {/* User Info Card */}
          <div className="bg-linear-to-r from-slate-900/30 to-gray-900/30 rounded-3xl p-8 mb-12 border border-white/10">
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
              <div className="text-3xl font-bold mb-2">
                {myEvents.reduce((acc, e) => acc + e.acceptedMembers.length, 0)}
              </div>
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
                {myEvents.map((event) => (
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
                        {event.joinRequests.length > 0 && (
                          <div className="inline-flex items-center space-x-2 bg-pink-500/20 text-pink-400 px-4 py-2 rounded-full">
                            <UserPlus className="w-4 h-4" />
                            <span className="text-sm font-semibold">
                              {event.joinRequests.length} New {event.joinRequests.length === 1 ? 'Request' : 'Requests'}
                            </span>
                          </div>
                        )}
                        {event.acceptedMembers.length > 0 && (
                          <div className="inline-flex items-center space-x-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full">
                            <Users className="w-4 h-4" />
                            <span className="text-sm font-semibold">
                              {event.acceptedMembers.length} {event.acceptedMembers.length === 1 ? 'Member' : 'Members'}
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
                            Join Requests ({event.joinRequests.length})
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
                            Accepted Members ({event.acceptedMembers.length})
                            {activeTab === 'members' && (
                              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-pink-500 to-purple-500"></div>
                            )}
                          </button>
                        </div>

                        {/* Tab Content */}
                        <div className="p-6">
                          {activeTab === 'requests' ? (
                            <div className="space-y-3">
                              {event.joinRequests.length === 0 ? (
                                <div className="text-center py-8 text-gray-400">
                                  No pending requests
                                </div>
                              ) : (
                                event.joinRequests.map((request) => (
                                  <div
                                    key={request._id}
                                    className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                                  >
                                    <div className="flex items-center space-x-4">
                                      <div className="w-12 h-12 bg-linear-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center font-bold">
                                        {request.userId.name.charAt(0)}
                                      </div>
                                      <div>
                                        <div className="font-semibold">{request.userId.name}</div>
                                        <div className="text-sm text-gray-400 flex items-center space-x-2">
                                          <MapPin className="w-3 h-3" />
                                          <span>{request.userId.city}</span>
                                          <span>•</span>
                                          <span>{formatDate(request.requestedAt)}</span>
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
                              {event.acceptedMembers.length === 0 ? (
                                <div className="text-center py-8 text-gray-400">
                                  No members yet
                                </div>
                              ) : (
                                event.acceptedMembers.map((member) => (
                                  <div
                                    key={member._id}
                                    className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                                  >
                                    <div className="flex items-center space-x-4">
                                      <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center font-bold">
                                        {member.name.charAt(0)}
                                      </div>
                                      <div>
                                        <div className="font-semibold">{member.name}</div>
                                        <div className="text-sm text-gray-400 flex items-center space-x-2">
                                          <MapPin className="w-3 h-3" />
                                          <span>{member.city}</span>
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
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
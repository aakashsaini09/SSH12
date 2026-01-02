import { useState, useEffect } from 'react';
import { Film, Users, MapPin, Calendar, Star, ArrowRight, Menu, X, Sparkles, Popcorn, Ticket, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MovieMeetupLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const features = [
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Find Local Events",
      description: "Discover movie meetups happening in your city right now",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Film className="w-8 h-8" />,
      title: "Create Your Own",
      description: "Host a movie event and invite others to join you",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Meet New People",
      description: "Connect with fellow movie enthusiasts in your area",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Easy Scheduling",
      description: "Browse showtimes and plan your perfect movie night",
      color: "from-green-500 to-emerald-500"
    }
  ];

  const movies = [
    { title: "Action Night", attendees: 5, time: "7:00 PM" },
    { title: "Sci-Fi Marathon", attendees: 8, time: "6:30 PM" },
    { title: "Classic Cinema", attendees: 3, time: "8:00 PM" },
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-125 h-125 bg-purple-600/20 rounded-full blur-[120px] transition-all duration-1000"
          style={{
            left: `${mousePosition.x - 250}px`,
            top: `${mousePosition.y - 250}px`,
          }}
        />
        <div className="absolute top-0 left-1/4 w-150 h-150 bg-pink-600/10 rounded-full blur-[150px] animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-175 h-175 bg-blue-600/10 rounded-full blur-[150px] animate-pulse-slower" />
      </div>

      {/* Navigation - Full Width */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'}`}>
        <div className="w-full px-6 lg:px-12 xl:px-20">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative">
                <Film className="w-10 h-10 text-pink-500 group-hover:rotate-12 transition-transform duration-300" />
                <Sparkles className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <span className="text-3xl font-black bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                CineConnect
              </span>
            </div>
            
            <div className="hidden lg:flex space-x-10">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors relative group">
                Features
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-pink-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors relative group">
                How It Works
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-pink-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#events" className="text-gray-300 hover:text-white transition-colors relative group">
                Events
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-pink-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
              </a>
            </div>

            <div className="hidden lg:flex items-center space-x-4">
              <button className="px-6 py-2.5 text-white hover:text-pink-400 transition-colors font-medium">
                <Link to={'/login'}>Sign In</Link>
              </button>
              <button className="relative px-6 py-2.5 bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full font-semibold overflow-hidden group">
                <Link to={'/signup'} className="relative z-10">Get Started</Link>
                <div className="absolute inset-0 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>

            <button 
              className="lg:hidden relative z-50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 bg-black/98 backdrop-blur-xl z-40 pt-24">
            <div className="px-6 space-y-6">
              <a href="#features" className="block text-2xl font-semibold py-3 hover:text-pink-400 transition-colors">Features</a>
              <a href="#how-it-works" className="block text-2xl font-semibold py-3 hover:text-pink-400 transition-colors">How It Works</a>
              <a href="#events" className="block text-2xl font-semibold py-3 hover:text-pink-400 transition-colors">Events</a>
              <button className="w-full py-4 mt-6 rounded-full bg-white/10 text-lg font-semibold">Sign In</button>
              <button className="w-full py-4 bg-linear-to-r from-pink-500 to-purple-600 rounded-full text-lg font-semibold">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section - Full Width */}
      <div className="relative pt-32 pb-24 px-6 lg:px-12 xl:px-20 min-h-screen flex items-center">
        <div className="w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-sm">Join 10,000+ movie lovers</span>
            </div>
            
            <h1 className="text-6xl sm:text-7xl xl:text-8xl font-black leading-tight">
              Never Watch
              <br />
              <span className="bg-linear-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-gradient">
                Alone Again
              </span>
            </h1>
            
            <div className="text-xl text-gray-400 max-w-xl leading-relaxed">
              Connect with fellow movie lovers in your city. Create events, join screenings, 
              and make new friends over your favorite films.
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group relative px-8 py-4 bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full text-lg font-bold overflow-hidden">
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <span>Start Your Journey</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <button className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-lg font-semibold hover:bg-white/10 transition-all">
                Watch Demo
              </button>
            </div>

            <div className="flex items-center space-x-8 pt-4">
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full bg-linear-to-br from-pink-500 to-purple-600 border-2 border-black flex justify-center items-center">
                    <User size={30}/>
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <div className="font-semibold">2,847 people</div>
                <div className="text-gray-500">joined this week</div>
              </div>
            </div>
          </div>

          {/* Floating Cards */}
          <div className="relative h-150 hidden lg:block">
            <div className="absolute top-0 right-0 w-80 p-6 bg-linear-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl animate-float">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-linear-to-br from-pink-500 to-purple-600 rounded-full"></div>
                  <div>
                    <div className="font-semibold">Sarah Chen</div>
                    <div className="text-sm text-gray-400">@sarahc</div>
                  </div>
                </div>
                <Ticket className="w-6 h-6 text-pink-400" />
              </div>
              <div className="text-2xl font-bold mb-2">Dune: Part Two</div>
              <div className="text-gray-400 mb-4">Tonight at 7:30 PM</div>
              <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full bg-linear-to-br from-blue-500 to-cyan-500 border-2 border-black" />
                  ))}
                </div>
                <div className="text-sm text-gray-400">3/5 spots filled</div>
              </div>
            </div>

            <div className="absolute top-40 left-0 w-72 p-5 bg-linear-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl animate-float-delayed">
              <div className="flex items-center space-x-3 mb-3">
                <Popcorn className="w-8 h-8 text-yellow-400" />
                <div className="font-bold text-lg">Movie Marathon</div>
              </div>
              <div className="text-gray-400 text-sm mb-3">This Weekend</div>
              <div className="flex space-x-2">
                <div className="flex-1 h-2 bg-linear-to-r from-pink-500 to-purple-500 rounded-full"></div>
                <div className="flex-1 h-2 bg-white/20 rounded-full"></div>
                <div className="flex-1 h-2 bg-white/20 rounded-full"></div>
              </div>
            </div>

            <div className="absolute bottom-20 right-10 w-64 p-5 bg-linear-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl animate-float-slow">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold">247</div>
                  <div className="text-gray-400 text-sm">Active Events</div>
                </div>
                <Star className="w-10 h-10 text-yellow-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section - Full Width */}
      <div id="features" className="relative py-32 px-6 lg:px-12 xl:px-20">
        <div className="w-full">
          <div className="text-center mb-20">
            <div className="inline-block text-sm font-semibold text-pink-400 bg-pink-400/10 px-4 py-2 rounded-full mb-6">
              FEATURES
            </div>
            <h2 className="text-5xl lg:text-6xl font-black mb-6">
              Everything You Need for the
              <br />
              <span className="bg-linear-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                Perfect Movie Night
              </span>
            </h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group relative p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-500 hover:transform hover:scale-105 overflow-hidden"
              >
                <div className="absolute inset-0 bg-linear-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500" style={{backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))`}}></div>
                <div className={`relative w-16 h-16 bg-linear-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="relative text-2xl font-bold mb-3">{feature.title}</h3>
                <div className="relative text-gray-400 leading-relaxed">{feature.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works - Full Width */}
      <div id="how-it-works" className="relative py-32 px-6 lg:px-12 xl:px-20 bg-white/5">
        <div className="w-full max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-black mb-6">How It Works</h2>
            <div className="text-xl text-gray-400">Three simple steps to your next movie adventure</div>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Select Your City", desc: "Tell us where you are and discover what's happening nearby", icon: <MapPin className="w-8 h-8" /> },
              { step: "02", title: "Browse or Create", desc: "Join existing events or host your own screening", icon: <Film className="w-8 h-8" /> },
              { step: "03", title: "Connect & Enjoy", desc: "Meet your new friends and enjoy the show together", icon: <Users className="w-8 h-8" /> }
            ].map((item, index) => (
              <div key={index} className="relative group">
                <div className="absolute -inset-0.5 bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 rounded-3xl opacity-0 group-hover:opacity-100 blur transition duration-500"></div>
                <div className="relative bg-black border border-white/10 rounded-3xl p-8 h-full">
                  <div className="text-6xl font-black text-transparent bg-clip-text bg-linear-to-br from-pink-400 to-purple-600 mb-4">
                    {item.step}
                  </div>
                  <div className="w-14 h-14 bg-linear-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <div className="text-gray-400 leading-relaxed">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live Events Preview */}
      <div id="events" className="relative py-32 px-6 lg:px-12 xl:px-20">
        <div className="w-full">
          <div className="text-center mb-16">
            <h2 className="text-5xl lg:text-6xl font-black mb-6">
              Happening <span className="text-pink-400">Right Now</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {movies.map((movie, index) => (
              <div key={index} className="group p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-pink-500/50 transition-all duration-300 hover:transform hover:scale-105">
                <div className="w-full h-48 bg-linear-to-br from-pink-500/20 to-purple-600/20 rounded-xl mb-4 flex items-center justify-center">
                  <Film className="w-16 h-16 text-white/50" />
                </div>
                <h3 className="text-xl font-bold mb-2">{movie.title}</h3>
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{movie.attendees} going</span>
                  </span>
                  <span>{movie.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section - Full Width */}
      <div className="relative py-32 px-6 lg:px-12 xl:px-20">
        <div className="relative w-full max-w-5xl mx-auto text-center bg-linear-to-r from-pink-600/10 via-purple-600/10 to-blue-600/10 rounded-[3rem] p-16 border border-white/20">
          <Star className="w-20 h-20 mx-auto mb-8 text-yellow-400 animate-pulse" />
          <h2 className="text-5xl lg:text-6xl font-black mb-6">
            Ready to Start Your Movie Adventure?
          </h2>
          <div className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join thousands of movie enthusiasts already making new connections in their cities
          </div>
          <button className="px-10 py-5 bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full text-xl font-bold hover:scale-105 transition-transform">
            Get Started Free
          </button>
        </div>
      </div>

      {/* Footer - Full Width */}
      <footer className="relative py-16 px-6 lg:px-12 xl:px-20 border-t border-white/10">
        <div className="w-full">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="flex items-center space-x-3">
              <Film className="w-8 h-8 text-pink-500" />
              <span className="text-2xl font-black">CineConnect</span>
            </div>
            <div className="flex space-x-8 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">About</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          <div className="text-center text-gray-500 mt-8">
            © 2025 CineConnect. Never watch alone again.
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-30px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.2; }
        }
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.15; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 10s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 8s ease-in-out infinite; }
        .animate-pulse-slower { animation: pulse-slower 12s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
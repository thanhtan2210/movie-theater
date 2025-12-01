
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MOVIES, PROMOTIONS, MOCK_NOTIFICATIONS } from '../constants';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAuth } from '../context/AuthContext';

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'now_showing' | 'coming_soon'>('now_showing');
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const featuredMovie = MOVIES[0];

  const filteredMovies = MOVIES.filter(movie => 
    activeTab === 'now_showing' ? movie.status === 'Now Showing' : movie.status === 'Coming Soon'
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const getIconForType = (type: string) => {
      switch(type) {
          case 'booking': return { icon: 'confirmation_number', color: 'text-primary', bg: 'bg-primary/20' };
          case 'promo': return { icon: 'redeem', color: 'text-green-500', bg: 'bg-green-500/20' };
          case 'info': return { icon: 'movie', color: 'text-yellow-500', bg: 'bg-yellow-500/20' };
          default: return { icon: 'notifications', color: 'text-white', bg: 'bg-white/10' };
      }
  };

  const handleViewAllNotifications = () => {
      navigate('/profile', { state: { tab: 'notifications' } });
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-1 flex-col">
      {/* Hero Section */}
      <section className="relative w-full h-[500px] lg:h-[600px] overflow-hidden">
        <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ backgroundImage: `url(${featuredMovie.backdrop})` }}
        >
             <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/60 to-transparent"></div>
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-end pb-12 sm:pb-24">
            <div className="max-w-2xl animate-fade-in-up">
                <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider text-white uppercase bg-primary rounded-full">
                    Đang chiếu
                </span>
                <h1 className="text-4xl sm:text-6xl font-black text-white mb-4 leading-tight">
                    {featuredMovie.title}
                </h1>
                <p className="text-lg text-white/80 mb-6 line-clamp-3">
                    {featuredMovie.synopsis}
                </p>
                <div className="flex gap-4">
                    <Link to={`/movie/${featuredMovie.id}`} className="px-8 py-3 bg-primary hover:bg-primary-hover text-white font-bold rounded-lg transition-colors flex items-center gap-2">
                         <span className="material-symbols-outlined">confirmation_number</span>
                         Đặt Vé Ngay
                    </Link>
                    <Link to={`/movie/${featuredMovie.id}`} className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors flex items-center gap-2 backdrop-blur-md">
                         <span className="material-symbols-outlined">info</span>
                         Chi Tiết
                    </Link>
                </div>
            </div>
        </div>
      </section>

      {/* Notifications Section (Auth Only) */}
      {isAuthenticated && (
        <section className="py-8 bg-surface-dark border-b border-white/5">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">notifications</span>
                        <h2 className="text-xl font-bold text-white">Thông Báo Mới</h2>
                    </div>
                    <button onClick={handleViewAllNotifications} className="text-sm text-white/60 hover:text-primary transition-colors flex items-center gap-1">
                        Xem tất cả <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {MOCK_NOTIFICATIONS.slice(0, 3).map((notif) => {
                        const style = getIconForType(notif.type);
                        return (
                            <div key={notif.id} onClick={handleViewAllNotifications} className="bg-white/5 hover:bg-white/10 transition-colors p-4 rounded-xl border border-white/10 cursor-pointer flex gap-4 items-start">
                                <div className={`w-10 h-10 rounded-full ${style.bg} flex items-center justify-center ${style.color} shrink-0`}>
                                    <span className="material-symbols-outlined text-xl">{style.icon}</span>
                                </div>
                                <div>
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="font-bold text-white text-sm line-clamp-1">{notif.title}</h4>
                                        <span className="text-[10px] text-white/40 whitespace-nowrap ml-2">{notif.time}</span>
                                    </div>
                                    <p className="text-white/60 text-xs line-clamp-2">{notif.message}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
      )}

      {/* Movies List */}
      <section className="py-12 container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
             <div className="flex items-center gap-6">
                <button 
                    onClick={() => setActiveTab('now_showing')}
                    className={`text-2xl font-bold transition-colors ${activeTab === 'now_showing' ? 'text-white' : 'text-white/40 hover:text-white/70'}`}
                >
                    Đang Chiếu
                </button>
                <div className="w-px h-6 bg-white/20"></div>
                <button 
                    onClick={() => setActiveTab('coming_soon')}
                    className={`text-2xl font-bold transition-colors ${activeTab === 'coming_soon' ? 'text-white' : 'text-white/40 hover:text-white/70'}`}
                >
                    Sắp Chiếu
                </button>
             </div>
             <Link to="/schedule" className="text-primary hover:text-primary-hover font-medium flex items-center gap-1">
                Xem tất cả <span className="material-symbols-outlined text-lg">arrow_forward</span>
             </Link>
        </div>
        
        {filteredMovies.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {filteredMovies.map((movie) => (
                    <Link to={`/movie/${movie.id}`} key={movie.id} className="group flex flex-col gap-3">
                        <div className="relative w-full aspect-[2/3] rounded-xl overflow-hidden bg-white/5 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/40 group-hover:-translate-y-2">
                            <img 
                                src={movie.poster} 
                                alt={movie.title} 
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <span className="px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-lg">
                                    {activeTab === 'now_showing' ? 'Mua Vé' : 'Xem Chi Tiết'}
                                </span>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-lg truncate group-hover:text-primary transition-colors">{movie.title}</h3>
                            <p className="text-white/50 text-sm truncate">{movie.genre}</p>
                            <div className="flex items-center gap-1 mt-1">
                                <span className="material-symbols-outlined text-yellow-500 text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                <span className="text-white/80 text-sm font-medium">{movie.imdb}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        ) : (
            <div className="text-center py-12">
                <p className="text-white/40 text-lg">Chưa có phim nào trong danh mục này.</p>
            </div>
        )}
      </section>

      {/* Promotions Section */}
      <section className="py-12 bg-surface-dark/50">
           <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-white">Ưu Đãi & Sự Kiện</h2>
                    <Link to="/promotions" className="text-primary hover:text-primary-hover font-medium flex items-center gap-1">
                        Xem tất cả <span className="material-symbols-outlined text-lg">arrow_forward</span>
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {PROMOTIONS.map((promo) => (
                        <Link to={promo.link} key={promo.id} className="rounded-xl overflow-hidden group cursor-pointer bg-surface-dark border border-white/5 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1 block">
                            <div className="aspect-video bg-white/10 overflow-hidden">
                                <img src={promo.image} alt={promo.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                            </div>
                            <div className="p-5">
                                <h3 className="text-white font-bold text-lg mb-2 group-hover:text-primary transition-colors">{promo.title}</h3>
                                <p className="text-white/60 text-sm mb-4 line-clamp-2">{promo.description}</p>
                                <div className="text-primary text-sm font-bold uppercase tracking-wide flex items-center gap-1">
                                    Xem chi tiết <span className="material-symbols-outlined text-base">arrow_forward</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
           </div>
      </section>
    </div>
  );
};

export default Home;

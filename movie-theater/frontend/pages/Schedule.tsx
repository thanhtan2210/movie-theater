
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MOVIES, CINEMAS } from '../constants';
import LoadingSpinner from '../components/LoadingSpinner';

const CITIES = ['Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng', 'Cần Thơ'];
const FORMATS = ['Tất cả', '2D', '3D', 'IMAX'];

const Schedule: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState(CITIES[0]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedCinema, setSelectedCinema] = useState<number | 'all'>('all');
  const [selectedFormat, setSelectedFormat] = useState('Tất cả');

  // Generate next 14 days
  const dates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const weekday = date.toLocaleDateString('vi-VN', { weekday: 'short' });
    const isToday = new Date().toDateString() === date.toDateString();
    return { day, month, weekday: isToday ? 'Hôm nay' : weekday, full: date };
  };

  // Filter cinemas based on selected city
  const filteredCinemasByCity = CINEMAS.filter(cinema => {
    const cityMatch = selectedCity === 'Hồ Chí Minh' ? 'TP. HCM' : selectedCity;
    return cinema.address.includes(cityMatch);
  });

  // Filter cinemas for display based on specific cinema selection
  const activeCinemas = selectedCinema === 'all' 
    ? filteredCinemasByCity 
    : filteredCinemasByCity.filter(c => c.id === Number(selectedCinema));

  // Mock function to generate deterministic showtimes based on IDs
  const getShowtimes = (movieId: number, cinemaId: number) => {
    const baseTimes = ['09:00', '11:30', '14:00', '16:30', '19:00', '21:30', '23:00'];
    // Simple hash to vary times per movie/cinema
    const seed = movieId + cinemaId; 
    return baseTimes.filter((_, i) => (i + seed) % 2 === 0); // Randomize slightly
  };

  return (
    <div className="flex-1 container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-black text-white mb-8">Lịch Chiếu Phim</h1>
        
        {/* Filters Section */}
        <div className="bg-surface-dark rounded-2xl p-6 border border-white/10 mb-10 shadow-xl">
            
            {/* City Tabs */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar border-b border-white/10 pb-4 mb-6">
                {CITIES.map(city => (
                    <button
                        key={city}
                        onClick={() => { setSelectedCity(city); setSelectedCinema('all'); }}
                        className={`px-5 py-2 rounded-full whitespace-nowrap text-sm font-bold transition-all ${
                            selectedCity === city 
                            ? 'bg-primary text-white shadow-lg shadow-primary/25' 
                            : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                        }`}
                    >
                        {city}
                    </button>
                ))}
            </div>

            {/* Date Slider */}
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-6 mb-2">
                {dates.map((date, idx) => {
                    const { day, month, weekday, full } = formatDate(date);
                    const isSelected = full.toDateString() === selectedDate.toDateString();
                    return (
                        <button 
                            key={idx} 
                            onClick={() => setSelectedDate(full)}
                            className={`flex flex-col items-center justify-center min-w-[72px] h-[72px] rounded-xl border transition-all duration-300 ${
                                isSelected 
                                ? 'bg-primary border-primary text-white transform scale-105 shadow-lg shadow-primary/20' 
                                : 'bg-background-dark border-white/10 text-white/50 hover:border-white/30 hover:text-white'
                            }`}
                        >
                            <span className="text-[10px] uppercase font-bold tracking-wider mb-0.5">{weekday}</span>
                            <span className="text-xl font-black">{day}/{month}</span>
                        </button>
                    )
                })}
            </div>

            {/* Secondary Filters */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                    <label className="block text-xs font-bold text-white/40 uppercase tracking-wider mb-2">Rạp</label>
                    <select 
                        value={selectedCinema}
                        onChange={(e) => setSelectedCinema(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                        className="w-full h-12 bg-background-dark border border-white/10 rounded-lg px-4 text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all appearance-none"
                    >
                        <option value="all">Tất cả các rạp tại {selectedCity}</option>
                        {filteredCinemasByCity.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-bold text-white/40 uppercase tracking-wider mb-2">Định dạng</label>
                    <div className="flex bg-background-dark p-1 rounded-lg border border-white/10 h-12 items-center">
                        {FORMATS.map(fmt => (
                            <button
                                key={fmt}
                                onClick={() => setSelectedFormat(fmt)}
                                className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                                    selectedFormat === fmt 
                                    ? 'bg-white/10 text-white shadow-sm' 
                                    : 'text-white/50 hover:text-white'
                                }`}
                            >
                                {fmt}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        {/* Movie Schedule List */}
        <div className="space-y-8">
            {MOVIES.slice(0, 4).map((movie) => (
                <div key={movie.id} className="bg-surface-dark rounded-xl overflow-hidden border border-white/10 shadow-lg flex flex-col md:flex-row animate-fade-in-up">
                    {/* Movie Info */}
                    <div className="md:w-64 lg:w-72 bg-[#151b26] flex-shrink-0 relative group">
                         <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
                         <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black via-black/60 to-transparent">
                            <span className="inline-block px-2 py-1 mb-2 text-[10px] font-bold tracking-wider text-white uppercase bg-primary w-fit rounded">
                                {movie.rating}
                            </span>
                            <h2 className="text-xl font-bold text-white mb-1 leading-tight">{movie.title}</h2>
                            <p className="text-white/60 text-sm mb-4 line-clamp-1">{movie.genre}</p>
                            <Link to={`/movie/${movie.id}`} className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
                                Xem chi tiết <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </Link>
                         </div>
                    </div>

                    {/* Showtimes by Cinema */}
                    <div className="flex-1 p-6 md:p-8 space-y-6">
                        {activeCinemas.length > 0 ? (
                            activeCinemas.map(cinema => (
                                <div key={cinema.id} className="border-b border-white/5 last:border-0 pb-6 last:pb-0">
                                    <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary">theaters</span>
                                        {cinema.name}
                                    </h3>
                                    
                                    <div className="flex flex-col gap-3">
                                        <div className="flex items-center gap-4">
                                            <span className="text-xs font-bold text-white/40 uppercase w-16">2D Phụ đề</span>
                                            <div className="flex flex-wrap gap-3">
                                                {getShowtimes(movie.id, cinema.id).map((time, idx) => (
                                                    <Link 
                                                        key={idx}
                                                        to={`/booking/${movie.id}`} 
                                                        className="px-5 py-2 rounded-lg border border-white/10 bg-white/5 text-white text-sm font-medium hover:bg-primary hover:border-primary transition-all hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5"
                                                    >
                                                        {time}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                        {/* Mock 3D or other formats randomly */}
                                        {(movie.id + cinema.id) % 3 === 0 && (
                                            <div className="flex items-center gap-4">
                                                <span className="text-xs font-bold text-white/40 uppercase w-16">3D Lồng tiếng</span>
                                                <div className="flex flex-wrap gap-3">
                                                    {['19:15', '21:40'].map((time, idx) => (
                                                        <Link 
                                                            key={idx}
                                                            to={`/booking/${movie.id}`} 
                                                            className="px-5 py-2 rounded-lg border border-white/10 bg-white/5 text-white text-sm font-medium hover:bg-primary hover:border-primary transition-all hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5"
                                                        >
                                                            {time}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-white/40">
                                <span className="material-symbols-outlined text-4xl mb-2">sentiment_dissatisfied</span>
                                <p>Không tìm thấy rạp chiếu phù hợp.</p>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Schedule;

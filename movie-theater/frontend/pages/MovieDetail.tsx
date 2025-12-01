
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOVIES, CINEMAS } from '../constants';
import LoadingSpinner from '../components/LoadingSpinner';

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState('Hôm nay, 24 Tháng 7');
  const [selectedCinemaId, setSelectedCinemaId] = useState<number | 'all'>('all');
  
  const movie = MOVIES.find(m => m.id === Number(id)) || MOVIES[0];

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  const filteredCinemas = selectedCinemaId === 'all' 
    ? CINEMAS 
    : CINEMAS.filter(c => c.id === Number(selectedCinemaId));

  return (
    <div className="flex-1">
      {/* Banner */}
      <div className="relative h-[400px] md:h-[500px] w-full">
         <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${movie.backdrop})` }}
         >
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/80 to-transparent"></div>
         </div>
      </div>

      <div className="container mx-auto px-4 -mt-32 relative z-10 pb-12">
        <div className="flex flex-col md:flex-row gap-8">
            {/* Poster */}
            <div className="w-48 md:w-64 flex-shrink-0 mx-auto md:mx-0 rounded-lg overflow-hidden shadow-2xl border-4 border-surface-dark">
                <img src={movie.poster} alt={movie.title} className="w-full h-auto" />
            </div>

            {/* Info */}
            <div className="flex-1 flex flex-col justify-end pb-4 text-center md:text-left">
                <h1 className="text-3xl md:text-5xl font-black text-white mb-2">{movie.title}</h1>
                <p className="text-white/60 mb-6">{movie.genre} • {movie.duration} • {movie.rating}</p>
                
                <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-8">
                    <div className="bg-surface-dark p-4 rounded-lg border border-white/10 min-w-[140px]">
                        <p className="text-white/60 text-sm mb-1">Ngày Phát Hành</p>
                        <p className="text-white font-bold">{movie.releaseDate}</p>
                    </div>
                    <div className="bg-surface-dark p-4 rounded-lg border border-white/10 min-w-[140px]">
                        <p className="text-white/60 text-sm mb-1">Đạo Diễn</p>
                        <p className="text-white font-bold">{movie.director}</p>
                    </div>
                     <div className="bg-surface-dark p-4 rounded-lg border border-white/10 min-w-[140px]">
                        <p className="text-white/60 text-sm mb-1">Đánh giá IMDb</p>
                        <p className="text-primary font-bold text-xl">{movie.imdb}</p>
                    </div>
                </div>

                <div className="mb-8">
                    <h3 className="text-xl font-bold text-white mb-2">Tóm tắt</h3>
                    <p className="text-white/80 leading-relaxed max-w-3xl">{movie.synopsis}</p>
                </div>

                {movie.trailerUrl && (
                    <div className="mb-8">
                        <h3 className="text-xl font-bold text-white mb-4">Trailer</h3>
                        <a 
                            href={movie.trailerUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="block relative aspect-video w-full max-w-3xl rounded-xl overflow-hidden bg-black group border border-white/10 shadow-2xl"
                        >
                             <img 
                                src={movie.backdrop} 
                                alt="Trailer thumbnail" 
                                className="w-full h-full object-cover opacity-70 group-hover:opacity-50 transition-opacity duration-300" 
                             />
                             <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 md:w-20 md:h-20 bg-primary rounded-full flex items-center justify-center pl-1 shadow-[0_0_30px_rgba(37,99,235,0.5)] group-hover:scale-110 transition-transform duration-300 group-hover:bg-primary-hover">
                                    <span className="material-symbols-outlined text-4xl md:text-5xl text-white">play_arrow</span>
                                </div>
                             </div>
                        </a>
                    </div>
                )}

                {/* Cast Section */}
                {movie.cast && movie.cast.length > 0 && (
                    <div className="mb-8">
                        <h3 className="text-xl font-bold text-white mb-4">Diễn viên</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {movie.cast.map(actor => (
                                <div key={actor.id} className="text-center">
                                    <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-2 border-2 border-white/10 bg-white/5">
                                        <img src={actor.image} alt={actor.name} className="w-full h-full object-cover" />
                                    </div>
                                    <p className="text-white font-medium text-sm">{actor.name}</p>
                                    <p className="text-white/50 text-xs">{actor.role}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Crew Section */}
                {movie.crew && movie.crew.length > 0 && (
                    <div className="mb-8">
                        <h3 className="text-xl font-bold text-white mb-4">Đoàn làm phim</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {movie.crew.map(member => (
                                <div key={member.id} className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 font-bold border border-white/5 shrink-0">
                                        {member.name.charAt(0)}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-white font-bold text-sm truncate">{member.name}</p>
                                        <p className="text-white/50 text-xs truncate">{member.job}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Reviews Section */}
                {movie.reviews && movie.reviews.length > 0 && (
                    <div className="mb-8 max-w-3xl">
                        <h3 className="text-xl font-bold text-white mb-4">Đánh giá</h3>
                        <div className="space-y-4">
                            {movie.reviews.map(review => (
                                <div key={review.id} className="bg-white/5 p-4 rounded-xl border border-white/10">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10">
                                                <img src={review.avatar} alt={review.user} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <p className="text-white font-bold text-sm">{review.user}</p>
                                                <p className="text-white/40 text-xs">{review.date}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 bg-primary/20 px-2 py-1 rounded text-primary text-sm font-bold">
                                            <span className="material-symbols-outlined text-base">star</span>
                                            {review.rating}/10
                                        </div>
                                    </div>
                                    <p className="text-white/80 text-sm">{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>

        {/* Booking Section */}
        <div className="mt-4">
            <h2 className="text-2xl font-bold text-white mb-6">Lịch Chiếu</h2>
            
            <div className="bg-surface-dark p-6 rounded-xl border border-white/10">
                <div className="mb-6 flex flex-col md:flex-row gap-4">
                     <select 
                        className="bg-background-dark border border-white/10 text-white rounded-lg p-3 w-full md:w-64 focus:ring-primary focus:border-primary"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                     >
                        <option>Hôm nay, 24 Tháng 7</option>
                        <option>Ngày mai, 25 Tháng 7</option>
                        <option>Thứ Sáu, 26 Tháng 7</option>
                     </select>
                     <select 
                        className="bg-background-dark border border-white/10 text-white rounded-lg p-3 w-full md:w-64 focus:ring-primary focus:border-primary"
                        value={selectedCinemaId}
                        onChange={(e) => setSelectedCinemaId(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                     >
                        <option value="all">Tất cả các rạp</option>
                        {CINEMAS.map(cinema => (
                            <option key={cinema.id} value={cinema.id}>{cinema.name}</option>
                        ))}
                     </select>
                </div>

                <div className="space-y-6">
                    {filteredCinemas.map(cinema => (
                        <div key={cinema.id} className="border-b border-white/5 pb-6 last:border-0 last:pb-0 animate-fade-in-up">
                            <h3 className="text-white font-bold text-lg mb-1">{cinema.name}</h3>
                            <p className="text-white/50 text-sm mb-4">{cinema.address}</p>
                            
                            <div className="flex flex-col gap-3">
                                <span className="text-sm font-semibold text-primary">2D Phụ đề</span>
                                <div className="flex flex-wrap gap-3">
                                    {['18:00', '19:30', '20:45', '22:00'].map((time, index) => (
                                        <Link 
                                            key={`${cinema.id}-2d-${index}`}
                                            to={`/booking/${movie.id}`}
                                            className="px-6 py-2 rounded-lg border border-white/20 text-white hover:bg-primary hover:border-primary transition-all text-sm font-medium"
                                        >
                                            {time}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    {filteredCinemas.length === 0 && (
                        <div className="text-center text-white/50 py-8">
                            Không tìm thấy rạp nào phù hợp.
                        </div>
                    )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;

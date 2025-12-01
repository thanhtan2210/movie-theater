import React from 'react';
import { CINEMAS } from '../constants';

const Cinemas: React.FC = () => {
  return (
    <div className="flex-1 container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">Rạp Chiếu Phim</h1>
        <p className="text-white/60 mb-8">Khám phá các rạp chiếu phim gần bạn và chọn nơi bạn muốn xem phim.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CINEMAS.map((cinema) => (
                <div key={cinema.id} className="group bg-surface-dark rounded-xl overflow-hidden border border-white/10 hover:border-primary/50 hover:-translate-y-1 transition-all duration-300">
                    <div className="aspect-video bg-gray-800 overflow-hidden relative">
                        <img src={cinema.image} alt={cinema.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button className="px-4 py-2 bg-white text-black font-bold rounded-full text-sm">Xem Bản Đồ</button>
                        </div>
                    </div>
                    <div className="p-4">
                        <h3 className="text-white font-bold text-lg mb-2">{cinema.name}</h3>
                        <div className="flex items-start gap-2 text-white/60 text-sm">
                            <span className="material-symbols-outlined text-base shrink-0 mt-0.5">location_on</span>
                            <p>{cinema.address}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Cinemas;

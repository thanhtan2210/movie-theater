
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MOCK_TICKETS } from '../constants';
import LoadingSpinner from '../components/LoadingSpinner';

const TicketDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const ticket = MOCK_TICKETS.find(t => t.id === id);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!ticket) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-4xl text-white/30">confirmation_number</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Không tìm thấy vé</h2>
          <p className="text-white/60 mb-6">Vé bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
          <Link to="/history" className="px-6 py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary-hover transition-colors">
            Quay lại lịch sử
          </Link>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Upcoming': return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'Past': return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
      case 'Cancelled': return 'text-red-500 bg-red-500/10 border-red-500/20';
      default: return 'text-white bg-white/10';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'Upcoming': return 'Sắp tới';
      case 'Past': return 'Đã xem';
      case 'Cancelled': return 'Đã hủy';
      default: return status;
    }
  };

  return (
    <div className="flex-1 container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-6 group"
        >
          <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">arrow_back</span>
          <span>Quay lại</span>
        </button>

        <div className="bg-surface-dark rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex flex-col md:flex-row">
          
          {/* Left Side - Poster & Visuals */}
          <div className="w-full md:w-1/3 relative bg-black">
            <div 
                className="absolute inset-0 bg-cover bg-center opacity-60 blur-sm"
                style={{ backgroundImage: `url(${ticket.poster})` }}
            ></div>
            <div className="relative h-full flex flex-col items-center justify-center p-8 z-10 bg-gradient-to-b from-black/30 via-transparent to-black/80">
                <img 
                    src={ticket.poster} 
                    alt={ticket.movieTitle} 
                    className="w-48 rounded-lg shadow-2xl border-2 border-white/10 mb-6"
                />
                <div className={`px-4 py-1.5 rounded-full text-sm font-bold border uppercase tracking-wider ${getStatusColor(ticket.status)}`}>
                    {getStatusText(ticket.status)}
                </div>
            </div>
          </div>

          {/* Right Side - Details */}
          <div className="flex-1 p-6 md:p-10 relative">
             <div className="absolute top-0 right-0 p-6 hidden md:block">
                <div className="text-right">
                    <p className="text-xs text-white/40 uppercase tracking-widest mb-1">Mã đặt vé</p>
                    <p className="text-xl font-mono font-bold text-primary">{ticket.id}</p>
                </div>
             </div>

             <h1 className="text-2xl md:text-3xl font-black text-white mb-6 pr-0 md:pr-24">{ticket.movieTitle}</h1>

             <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8 mb-8">
                <div>
                    <p className="text-sm text-white/40 mb-1 flex items-center gap-2">
                        <span className="material-symbols-outlined text-base">theaters</span> Rạp chiếu
                    </p>
                    <p className="text-white font-medium">{ticket.cinemaName}</p>
                    <p className="text-white/60 text-sm">{ticket.room}</p>
                </div>
                <div>
                    <p className="text-sm text-white/40 mb-1 flex items-center gap-2">
                        <span className="material-symbols-outlined text-base">calendar_clock</span> Suất chiếu
                    </p>
                    <p className="text-white font-medium text-lg">{ticket.showtime.split(' - ')[1]}</p>
                    <p className="text-white/60 text-sm">{ticket.showtime.split(' - ')[0]}</p>
                </div>
                <div>
                    <p className="text-sm text-white/40 mb-1 flex items-center gap-2">
                        <span className="material-symbols-outlined text-base">chair</span> Ghế ngồi
                    </p>
                    <p className="text-white font-medium text-lg tracking-wide">{ticket.seats.join(', ')}</p>
                </div>
                <div>
                    <p className="text-sm text-white/40 mb-1 flex items-center gap-2">
                        <span className="material-symbols-outlined text-base">payments</span> Tổng tiền
                    </p>
                    <p className="text-white font-medium text-lg text-primary">{ticket.totalPrice.toLocaleString()}đ</p>
                </div>
             </div>

             <div className="border-t border-dashed border-white/10 pt-8 flex flex-col sm:flex-row gap-8 items-center">
                <div className="bg-white p-3 rounded-xl shadow-lg">
                    <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${ticket.id}`} 
                        alt="QR Code" 
                        className="w-32 h-32"
                    />
                </div>
                <div className="flex-1 text-center sm:text-left">
                    <p className="text-white font-bold mb-2">Quét mã để vào rạp</p>
                    <p className="text-white/60 text-sm mb-4">Vui lòng đưa mã QR này cho nhân viên soát vé khi đến rạp. Bạn cũng có thể chụp màn hình lại để sử dụng khi không có mạng.</p>
                    <div className="flex gap-3 justify-center sm:justify-start">
                        <button 
                            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium text-white transition-colors flex items-center gap-2"
                            onClick={() => window.print()}
                        >
                            <span className="material-symbols-outlined text-lg">print</span> In vé
                        </button>
                        <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium text-white transition-colors flex items-center gap-2">
                            <span className="material-symbols-outlined text-lg">download</span> Tải về
                        </button>
                    </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;

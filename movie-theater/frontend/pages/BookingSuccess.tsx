import React from 'react';
import { Link } from 'react-router-dom';

const BookingSuccess: React.FC = () => {
  return (
    <div className="flex-1 flex items-center justify-center p-4 bg-background-dark">
      <div className="bg-surface-dark w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-white/10">
         
         <div className="flex-1 p-8 md:p-12 flex flex-col justify-center items-center text-center">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-5xl text-green-500">check_circle</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Thanh Toán Thành Công!</h1>
            <p className="text-white/60 mb-8 max-w-sm">Cảm ơn bạn đã đặt vé. Vé điện tử đã được gửi đến email của bạn và lưu trong phần Lịch sử đặt vé.</p>
            
            <div className="w-full border-t border-b border-white/10 py-6 mb-8">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-white/60">Mã đặt vé</span>
                    <span className="text-xl font-bold text-primary tracking-widest">CS8A6B2C</span>
                </div>
                 <div className="flex justify-between items-center">
                    <span className="text-white/60">Tổng tiền</span>
                    <span className="text-white font-medium">220.000đ</span>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full">
                <Link to="/history" className="flex-1 py-3 px-6 rounded-lg border border-white/20 text-white font-bold hover:bg-white/5 transition-colors text-center">
                    Xem Vé
                </Link>
                <Link to="/" className="flex-1 py-3 px-6 rounded-lg bg-primary text-white font-bold hover:bg-primary-hover transition-colors text-center">
                    Về Trang Chủ
                </Link>
            </div>
         </div>

         <div className="w-full md:w-96 bg-[#151b26] p-8 relative overflow-hidden flex flex-col justify-center items-center border-l border-white/10">
             <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
             
             <div className="relative z-10 w-full bg-white rounded-xl p-4 shadow-xl mb-6">
                 <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=CS8A6B2C" alt="QR Code" className="w-full h-auto aspect-square" />
             </div>
             
             <div className="relative z-10 text-center">
                <h3 className="text-white font-bold text-lg mb-4">Kẻ Trộm Mặt Trăng 4</h3>
                <div className="space-y-2 text-sm text-white/70">
                    <p className="flex items-center gap-2 justify-center"><span className="material-symbols-outlined text-base">theaters</span> Cinestarr Sài Gòn</p>
                    <p className="flex items-center gap-2 justify-center"><span className="material-symbols-outlined text-base">calendar_month</span> 24/07/2024 - 19:30</p>
                    <p className="flex items-center gap-2 justify-center"><span className="material-symbols-outlined text-base">chair</span> Ghế: F5, F6</p>
                </div>
             </div>
         </div>
      </div>
    </div>
  );
};

export default BookingSuccess;

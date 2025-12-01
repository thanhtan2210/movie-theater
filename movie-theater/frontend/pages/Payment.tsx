import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Payment: React.FC = () => {
  const navigate = useNavigate();
  const [method, setMethod] = useState<'card' | 'momo' | 'bank'>('card');

  return (
    <div className="flex-1 container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row-reverse gap-8 max-w-6xl mx-auto">
        
        {/* Order Summary */}
        <div className="w-full lg:w-1/3">
             <div className="bg-surface-dark rounded-xl p-6 border border-white/10 sticky top-24">
                <h3 className="text-xl font-bold text-white mb-4 border-b border-white/10 pb-4">Tóm tắt đơn hàng</h3>
                <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-white/80">
                        <span>Phim</span>
                        <span className="font-medium text-white">Kẻ Trộm Mặt Trăng 4</span>
                    </div>
                     <div className="flex justify-between text-white/80">
                        <span>Rạp</span>
                        <span className="font-medium text-white">Cinestarr Sài Gòn</span>
                    </div>
                     <div className="flex justify-between text-white/80">
                        <span>Suất chiếu</span>
                        <span className="font-medium text-white">19:30 - 24/07</span>
                    </div>
                    <div className="flex justify-between text-white/80">
                        <span>Ghế</span>
                        <span className="font-medium text-white">F5, F6</span>
                    </div>
                     <div className="flex justify-between text-white/80">
                        <span>Combo bắp nước</span>
                        <span className="font-medium text-white">-</span>
                    </div>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-dashed border-white/20">
                    <span className="text-white/60">Tổng tiền</span>
                    <span className="text-2xl font-bold text-primary">220.000đ</span>
                </div>
                <div className="mt-4 bg-primary/10 text-primary text-center py-2 rounded-lg text-sm font-medium border border-primary/20">
                    Thời gian giữ vé: 09:45
                </div>
             </div>
        </div>

        {/* Payment Methods */}
        <div className="flex-1 bg-surface-dark rounded-xl p-6 sm:p-8 border border-white/10">
             <h2 className="text-2xl font-bold text-white mb-6">Phương Thức Thanh Toán</h2>
             
             <div className="grid grid-cols-3 gap-4 mb-8">
                <button 
                    onClick={() => setMethod('card')}
                    className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${method === 'card' ? 'border-primary bg-primary/10 text-primary' : 'border-white/10 bg-white/5 text-white/60 hover:bg-white/10'}`}
                >
                    <span className="material-symbols-outlined text-3xl">credit_card</span>
                    <span className="text-sm font-semibold">Thẻ Quốc Tế</span>
                </button>
                 <button 
                    onClick={() => setMethod('momo')}
                    className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${method === 'momo' ? 'border-primary bg-primary/10 text-primary' : 'border-white/10 bg-white/5 text-white/60 hover:bg-white/10'}`}
                >
                    <span className="material-symbols-outlined text-3xl">account_balance_wallet</span>
                    <span className="text-sm font-semibold">Ví Điện Tử</span>
                </button>
                 <button 
                    onClick={() => setMethod('bank')}
                    className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${method === 'bank' ? 'border-primary bg-primary/10 text-primary' : 'border-white/10 bg-white/5 text-white/60 hover:bg-white/10'}`}
                >
                    <span className="material-symbols-outlined text-3xl">account_balance</span>
                    <span className="text-sm font-semibold">ATM Nội Địa</span>
                </button>
             </div>

             {method === 'card' && (
                 <div className="space-y-4 animate-fade-in-up">
                    <div>
                        <label className="block text-sm text-white/60 mb-1">Số thẻ</label>
                        <div className="relative">
                            <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-background-dark border border-white/20 rounded-lg py-3 px-4 text-white focus:ring-primary focus:border-primary pl-10" />
                            <span className="material-symbols-outlined absolute left-3 top-3 text-white/40">credit_card</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                             <label className="block text-sm text-white/60 mb-1">Ngày hết hạn</label>
                             <input type="text" placeholder="MM/YY" className="w-full bg-background-dark border border-white/20 rounded-lg py-3 px-4 text-white focus:ring-primary focus:border-primary" />
                        </div>
                         <div>
                             <label className="block text-sm text-white/60 mb-1">CVV</label>
                             <input type="text" placeholder="123" className="w-full bg-background-dark border border-white/20 rounded-lg py-3 px-4 text-white focus:ring-primary focus:border-primary" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm text-white/60 mb-1">Tên chủ thẻ</label>
                        <input type="text" placeholder="NGUYEN VAN A" className="w-full bg-background-dark border border-white/20 rounded-lg py-3 px-4 text-white focus:ring-primary focus:border-primary" />
                    </div>
                 </div>
             )}

            <div className="mt-8 pt-6 border-t border-white/10">
                <div className="flex items-start gap-3 mb-6">
                    <input type="checkbox" id="terms" className="mt-1 bg-background-dark border-white/20 rounded text-primary focus:ring-primary" />
                    <label htmlFor="terms" className="text-sm text-white/60">
                        Tôi đồng ý với <a href="#" className="text-primary hover:underline">Điều khoản sử dụng</a> và <a href="#" className="text-primary hover:underline">Chính sách bảo mật</a> của Cinestarr.
                    </label>
                </div>
                <button 
                    onClick={() => navigate('/booking-success')}
                    className="w-full py-4 bg-primary text-white font-bold rounded-xl text-lg hover:bg-primary-hover transition-colors shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                >
                    <span className="material-symbols-outlined">lock</span>
                    Thanh Toán Ngay
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;

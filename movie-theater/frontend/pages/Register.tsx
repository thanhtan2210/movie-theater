
import React from 'react';
import { Link } from 'react-router-dom';

const Register: React.FC = () => {
  return (
    <div className="flex-1 flex items-center justify-center p-4 min-h-[calc(100vh-64px)] bg-background-dark">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate-fade-in-up">
            <h1 className="text-3xl md:text-4xl font-black text-white mb-2 leading-tight tracking-[-0.033em]">Tạo tài khoản mới</h1>
            <p className="text-white/60 mt-2 text-base leading-normal">Bắt đầu hành trình điện ảnh của bạn cùng Cinestarr.</p>
        </div>

        <div className="bg-white/5 rounded-xl p-6 md:p-8 border border-white/10 shadow-2xl backdrop-blur-sm animate-fade-in-up">
            <form className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-white/80 mb-2" htmlFor="name">Họ và Tên</label>
                    <input 
                        id="name" 
                        type="text" 
                        placeholder="Nhập họ và tên của bạn" 
                        className="block w-full h-11 px-4 rounded-lg bg-[#1c2431] border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-sm"
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-white/80 mb-2" htmlFor="phone">Số điện thoại</label>
                    <input 
                        id="phone" 
                        type="tel" 
                        placeholder="Nhập số điện thoại" 
                        className="block w-full h-11 px-4 rounded-lg bg-[#1c2431] border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-white/80 mb-2" htmlFor="email">Email</label>
                    <input 
                        id="email" 
                        type="email" 
                        placeholder="Nhập địa chỉ email" 
                        className="block w-full h-11 px-4 rounded-lg bg-[#1c2431] border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-white/80 mb-2" htmlFor="password">Mật khẩu</label>
                    <input 
                        id="password" 
                        type="password" 
                        placeholder="Nhập mật khẩu" 
                        className="block w-full h-11 px-4 rounded-lg bg-[#1c2431] border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-white/80 mb-2" htmlFor="confirm-password">Xác nhận mật khẩu</label>
                    <input 
                        id="confirm-password" 
                        type="password" 
                        placeholder="Nhập lại mật khẩu" 
                        className="block w-full h-11 px-4 rounded-lg bg-[#1c2431] border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-sm"
                    />
                </div>
                
                <button 
                    type="submit" 
                    className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-white gap-2 text-base font-bold leading-normal hover:bg-primary-hover transition-colors shadow-lg shadow-primary/20"
                >
                    Đăng ký
                </button>
            </form>
        </div>
        
        <p className="text-center text-sm text-white/60 mt-8">
            Đã có tài khoản? <Link to="/login" className="font-medium text-primary hover:text-primary-hover transition-colors">Đăng nhập ngay</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

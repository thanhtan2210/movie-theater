import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-background-dark border-t border-white/10 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-sm text-white/50">© 2024 Cinestarr. All rights reserved.</p>
            <p className="text-xs text-white/30">Mang đến trải nghiệm điện ảnh đỉnh cao cho bạn.</p>
          </div>
          <div className="flex gap-6 text-white/70">
            <Link to="/terms" className="hover:text-white transition-colors text-sm">Điều khoản</Link>
            <Link to="/privacy" className="hover:text-white transition-colors text-sm">Bảo mật</Link>
            <Link to="/contact" className="hover:text-white transition-colors text-sm">Liên hệ</Link>
            <Link to="/faq" className="hover:text-white transition-colors text-sm">FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PROMOTIONS } from '../constants';
import LoadingSpinner from '../components/LoadingSpinner';

const PromotionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const promo = PROMOTIONS.find(p => p.id === Number(id));

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!promo) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Không tìm thấy khuyến mãi</h2>
          <Link to="/promotions" className="text-primary hover:underline">Quay lại danh sách</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Link to="/promotions" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors">
          <span className="material-symbols-outlined">arrow_back</span> Quay lại ưu đãi
        </Link>

        <div className="bg-surface-dark rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
          <div className="aspect-video w-full relative">
             <img src={promo.image} alt={promo.title} className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-gradient-to-t from-surface-dark to-transparent"></div>
          </div>
          
          <div className="p-6 md:p-10 -mt-20 relative z-10">
            <h1 className="text-3xl md:text-4xl font-black text-white mb-4">{promo.title}</h1>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-white/80 leading-relaxed mb-6">
                {promo.description}
              </p>
              
              <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-8">
                <h3 className="text-xl font-bold text-white mb-4">Chi tiết chương trình</h3>
                <div className="space-y-4 text-white/70">
                   {promo.content ? (
                     <div dangerouslySetInnerHTML={{ __html: promo.content }} />
                   ) : (
                     <p>Thông tin chi tiết đang được cập nhật.</p>
                   )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/" className="flex-1 py-3 px-6 rounded-xl bg-primary text-white font-bold text-center hover:bg-primary-hover transition-colors shadow-lg shadow-primary/20">
                  Đặt vé ngay
                </Link>
                <button className="flex-1 py-3 px-6 rounded-xl bg-white/10 text-white font-bold text-center hover:bg-white/20 transition-colors">
                  Điều kiện áp dụng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionDetail;

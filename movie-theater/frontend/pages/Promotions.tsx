import React from 'react';

const Promotions: React.FC = () => {
  return (
    <div className="flex-1 container mx-auto px-4 py-8">
         <div className="max-w-6xl mx-auto">
             <div className="text-center mb-12">
                 <h1 className="text-4xl font-black text-white mb-4">Ưu Đãi & Khuyến Mãi</h1>
                 <p className="text-white/60 max-w-2xl mx-auto">Khám phá các ưu đãi độc quyền và tận hưởng trải nghiệm xem phim tuyệt vời với chi phí tiết kiệm!</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {[1, 2, 3, 4, 5, 6].map((i) => (
                     <div key={i} className="bg-surface-dark rounded-2xl overflow-hidden shadow-lg group hover:shadow-primary/10 transition-shadow">
                         <div className="aspect-[16/9] overflow-hidden">
                             <img src={`https://picsum.photos/seed/promo_page_${i}/800/450`} alt="Promo" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                         </div>
                         <div className="p-6">
                             <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">Ưu đãi đặc biệt {i}</h3>
                             <p className="text-white/60 text-sm mb-4">Giảm giá lên đến 50% cho vé thứ hai vào mỗi cuối tuần. Rủ bạn bè và người thân cùng đi xem phim!</p>
                             <button className="text-primary font-bold text-sm uppercase tracking-wider hover:underline">Xem Chi tiết</button>
                         </div>
                     </div>
                 ))}
             </div>
         </div>
    </div>
  );
};

export default Promotions;

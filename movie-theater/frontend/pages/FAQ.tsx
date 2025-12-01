import React from 'react';

const FAQ: React.FC = () => {
  return (
    <div className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
             <div className="text-center mb-12">
                 <h1 className="text-4xl font-black text-white mb-4">Câu hỏi thường gặp</h1>
                 <p className="text-white/60">Tìm kiếm câu trả lời cho các câu hỏi của bạn.</p>
                 <div className="max-w-md mx-auto mt-6 relative">
                     <input type="text" placeholder="Tìm kiếm câu hỏi..." className="w-full h-12 pl-12 pr-4 rounded-full bg-surface-dark border-transparent text-white focus:ring-2 focus:ring-primary focus:bg-background-dark transition-all" />
                     <span className="material-symbols-outlined absolute left-4 top-3 text-white/40">search</span>
                 </div>
             </div>

             <div className="space-y-8">
                 <div className="space-y-4">
                     <h2 className="text-2xl font-bold text-primary">Đặt vé</h2>
                     <details className="group bg-surface-dark rounded-xl p-4 border border-white/5 [&_summary::-webkit-details-marker]:hidden">
                        <summary className="flex items-center justify-between cursor-pointer list-none font-medium text-white">
                            Làm thế nào để đặt vé xem phim?
                            <span className="transition group-open:rotate-180">
                                <span className="material-symbols-outlined">expand_more</span>
                            </span>
                        </summary>
                        <p className="text-white/60 mt-4 group-open:animate-fade-in-down">
                            Bạn có thể đặt vé trực tuyến thông qua trang web của chúng tôi. Chỉ cần chọn phim bạn muốn xem, chọn suất chiếu, chọn chỗ ngồi và tiến hành thanh toán.
                        </p>
                    </details>
                    <details className="group bg-surface-dark rounded-xl p-4 border border-white/5 [&_summary::-webkit-details-marker]:hidden">
                        <summary className="flex items-center justify-between cursor-pointer list-none font-medium text-white">
                            Tôi có thể hủy hoặc thay đổi vé đã đặt không?
                             <span className="transition group-open:rotate-180">
                                <span className="material-symbols-outlined">expand_more</span>
                            </span>
                        </summary>
                        <p className="text-white/60 mt-4 group-open:animate-fade-in-down">
                            Chính sách hủy và thay đổi vé có thể khác nhau tùy thuộc vào rạp chiếu. Vui lòng kiểm tra các điều khoản và điều kiện tại thời điểm mua vé.
                        </p>
                    </details>
                 </div>

                 <div className="space-y-4">
                     <h2 className="text-2xl font-bold text-primary">Thanh toán</h2>
                     <details className="group bg-surface-dark rounded-xl p-4 border border-white/5 [&_summary::-webkit-details-marker]:hidden">
                        <summary className="flex items-center justify-between cursor-pointer list-none font-medium text-white">
                            Những phương thức thanh toán nào được chấp nhận?
                             <span className="transition group-open:rotate-180">
                                <span className="material-symbols-outlined">expand_more</span>
                            </span>
                        </summary>
                        <p className="text-white/60 mt-4 group-open:animate-fade-in-down">
                            Chúng tôi chấp nhận hầu hết các loại thẻ tín dụng và thẻ ghi nợ chính, cũng như các ví điện tử phổ biến như MoMo, ZaloPay và VNPay.
                        </p>
                    </details>
                 </div>
             </div>
        </div>
    </div>
  );
};

export default FAQ;

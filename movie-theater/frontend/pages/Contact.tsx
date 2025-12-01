import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="flex-1 container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-6">Chúng tôi có thể giúp gì cho bạn?</h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">Chúng tôi luôn sẵn sàng trợ giúp và trả lời bất kỳ câu hỏi nào bạn có thể có. Rất mong nhận được phản hồi từ bạn.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
                 <div className="flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/10">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary shrink-0">
                        <span className="material-symbols-outlined text-2xl">location_on</span>
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-lg">Địa chỉ văn phòng</h3>
                        <p className="text-white/60">123 Movie Lane, Hollywood, CA 90210</p>
                    </div>
                 </div>
                 
                  <div className="flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/10">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary shrink-0">
                        <span className="material-symbols-outlined text-2xl">mail</span>
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-lg">Email cho chúng tôi</h3>
                        <p className="text-white/60">support@cinestarr.com</p>
                    </div>
                 </div>

                  <div className="flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/10">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary shrink-0">
                        <span className="material-symbols-outlined text-2xl">call</span>
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-lg">Gọi cho chúng tôi</h3>
                        <p className="text-white/60">+1 (555) 123-4567</p>
                    </div>
                 </div>

                 <div className="h-64 rounded-2xl overflow-hidden bg-gray-800 border border-white/10">
                     <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.255857218335!2d106.69926831533414!3d10.79155796186411!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528b4c09d5c5f%3A0xc081831826500858!2zQ2hvIFThuqFwIFRo4buDIG5o4buNIG5o4bqhbiwgUXXhuq1uIDEsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaA!5e0!3m2!1sen!2s!4v1654160000000!5m2!1sen!2s" 
                        width="100%" 
                        height="100%" 
                        style={{border:0}} 
                        allowFullScreen 
                        loading="lazy"
                        className="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all"
                    ></iframe>
                 </div>
            </div>

            <div className="bg-surface-dark p-8 md:p-10 rounded-2xl shadow-2xl border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-6">Gửi tin nhắn cho chúng tôi</h3>
                <form className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">Họ và Tên</label>
                        <input type="text" className="w-full bg-background-dark border border-white/20 rounded-lg px-4 py-3 text-white focus:ring-primary focus:border-primary" placeholder="Nguyễn Văn A" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">Email</label>
                        <input type="email" className="w-full bg-background-dark border border-white/20 rounded-lg px-4 py-3 text-white focus:ring-primary focus:border-primary" placeholder="email@example.com" />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">Chủ đề</label>
                        <input type="text" className="w-full bg-background-dark border border-white/20 rounded-lg px-4 py-3 text-white focus:ring-primary focus:border-primary" placeholder="Vấn đề cần hỗ trợ..." />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">Nội dung</label>
                        <textarea rows={4} className="w-full bg-background-dark border border-white/20 rounded-lg px-4 py-3 text-white focus:ring-primary focus:border-primary resize-none" placeholder="Nhập nội dung tin nhắn..."></textarea>
                    </div>
                    <button className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-colors shadow-lg shadow-primary/20">
                        Gửi tin nhắn
                    </button>
                </form>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

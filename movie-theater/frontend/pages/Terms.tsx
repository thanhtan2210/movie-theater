
import React from 'react';

const Terms: React.FC = () => {
  return (
    <div className="flex-1 container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto bg-surface-dark p-8 rounded-2xl border border-white/10 shadow-xl">
        <h1 className="text-3xl md:text-4xl font-black text-white mb-8 border-b border-white/10 pb-4">Điều khoản sử dụng</h1>
        
        <div className="space-y-6 text-white/80 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Giới thiệu</h2>
            <p>Chào mừng bạn đến với Cinestarr. Khi sử dụng dịch vụ của chúng tôi, bạn đồng ý tuân thủ các điều khoản và điều kiện được nêu dưới đây. Vui lòng đọc kỹ trước khi sử dụng trang web hoặc đặt vé.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. Đặt vé và Thanh toán</h2>
            <p>Việc đặt vé trực tuyến phụ thuộc vào tình trạng chỗ ngồi có sẵn. Thanh toán phải được thực hiện ngay lập tức thông qua các phương thức được chấp nhận (Thẻ tín dụng, Ví điện tử, ATM). Cinestarr không chịu trách nhiệm nếu giao dịch không thành công do lỗi từ phía ngân hàng hoặc nhà cung cấp dịch vụ thanh toán.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. Chính sách hoàn/hủy vé</h2>
            <p>Vé đã mua không được hoàn lại tiền trong hầu hết các trường hợp, trừ khi suất chiếu bị hủy do lỗi của rạp. Việc đổi vé có thể được xem xét tùy theo chính sách cụ thể của từng loại vé và thời gian yêu cầu.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Quy định tại rạp</h2>
            <p>Khách hàng vui lòng tuân thủ các quy định của rạp chiếu phim, bao gồm không quay phim, chụp ảnh trong rạp, giữ trật tự và không mang thức ăn bên ngoài vào rạp.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. Thay đổi điều khoản</h2>
            <p>Cinestarr có quyền thay đổi, chỉnh sửa các điều khoản này bất cứ lúc nào mà không cần báo trước. Việc bạn tiếp tục sử dụng dịch vụ sau khi có thay đổi đồng nghĩa với việc bạn chấp nhận các thay đổi đó.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;

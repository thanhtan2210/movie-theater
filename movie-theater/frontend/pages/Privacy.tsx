
import React from 'react';

const Privacy: React.FC = () => {
  return (
    <div className="flex-1 container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto bg-surface-dark p-8 md:p-10 rounded-2xl border border-white/10 shadow-xl">
        <h1 className="text-3xl md:text-4xl font-black text-white mb-2">Chính sách bảo mật</h1>
        <p className="text-white/60 mb-8 pb-8 border-b border-white/10">
          Cập nhật lần cuối: 24/07/2024
        </p>
        
        <div className="space-y-8 text-white/80 leading-relaxed text-base">
          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary text-sm">1</span>
              Thu thập thông tin cá nhân
            </h2>
            <p className="mb-3">
              Chúng tôi thu thập thông tin cá nhân khi bạn đăng ký tài khoản, đặt vé, tham gia khảo sát hoặc đăng ký nhận bản tin. Các loại thông tin chúng tôi thu thập bao gồm:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-white/70">
              <li>Thông tin định danh: Tên, ngày sinh, giới tính.</li>
              <li>Thông tin liên lạc: Địa chỉ email, số điện thoại.</li>
              <li>Thông tin giao dịch: Chi tiết vé đã đặt, lịch sử thanh toán (lưu ý: chúng tôi không lưu trữ thông tin thẻ tín dụng đầy đủ).</li>
              <li>Thông tin kỹ thuật: Địa chỉ IP, loại thiết bị, trình duyệt web.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary text-sm">2</span>
              Mục đích sử dụng thông tin
            </h2>
            <p className="mb-3">Thông tin của bạn được sử dụng cho các mục đích sau:</p>
            <ul className="list-disc pl-5 space-y-1 text-white/70">
              <li>Xử lý đơn đặt vé và gửi vé điện tử qua email/SMS.</li>
              <li>Cung cấp dịch vụ hỗ trợ khách hàng và giải quyết khiếu nại.</li>
              <li>Gửi thông báo về thay đổi lịch chiếu, ưu đãi đặc biệt hoặc tin tức mới (nếu bạn đồng ý).</li>
              <li>Cải thiện trải nghiệm người dùng trên website và ứng dụng của chúng tôi.</li>
              <li>Ngăn chặn các hành vi gian lận và đảm bảo an ninh hệ thống.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary text-sm">3</span>
              Bảo mật thông tin
            </h2>
            <p>
              Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn. Cinestarr áp dụng các biện pháp an ninh kỹ thuật và tổ chức phù hợp, bao gồm mã hóa SSL cho tất cả các giao dịch trực tuyến, tường lửa, và kiểm soát truy cập nghiêm ngặt để ngăn chặn truy cập trái phép, mất mát hoặc phá hủy dữ liệu.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary text-sm">4</span>
              Quyền của người dùng
            </h2>
            <p className="mb-3">Bạn có các quyền sau đối với thông tin cá nhân của mình:</p>
            <ul className="list-disc pl-5 space-y-1 text-white/70">
              <li><strong>Truy cập và chỉnh sửa:</strong> Bạn có thể xem và cập nhật thông tin cá nhân trong phần "Hồ sơ của bạn".</li>
              <li><strong>Hủy đăng ký:</strong> Bạn có thể từ chối nhận email tiếp thị bất cứ lúc nào bằng cách nhấp vào liên kết hủy đăng ký trong email.</li>
              <li><strong>Xóa dữ liệu:</strong> Bạn có quyền yêu cầu xóa tài khoản và dữ liệu cá nhân bằng cách liên hệ với bộ phận hỗ trợ của chúng tôi.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary text-sm">5</span>
              Chính sách Cookie
            </h2>
            <p className="mb-3">
              Trang web của chúng tôi sử dụng cookie để cá nhân hóa nội dung, cung cấp các tính năng mạng xã hội và phân tích lưu lượng truy cập.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-white/70">
              <li><strong>Cookie thiết yếu:</strong> Cần thiết để trang web hoạt động (ví dụ: giữ trạng thái đăng nhập).</li>
              <li><strong>Cookie phân tích:</strong> Giúp chúng tôi hiểu cách bạn tương tác với trang web để cải thiện dịch vụ.</li>
              <li><strong>Cookie quảng cáo:</strong> Được sử dụng để hiển thị quảng cáo phù hợp với sở thích của bạn.</li>
            </ul>
            <p className="mt-3 text-sm italic text-white/50">
              Bạn có thể tắt cookie trong cài đặt trình duyệt của mình, tuy nhiên điều này có thể ảnh hưởng đến một số tính năng của trang web.
            </p>
          </section>

          <div className="mt-8 pt-8 border-t border-white/10">
            <p className="text-white/60 text-sm">
              Nếu bạn có bất kỳ câu hỏi nào về Chính sách bảo mật này, vui lòng liên hệ với chúng tôi qua email: <span className="text-primary cursor-pointer hover:underline">privacy@cinestarr.com</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;

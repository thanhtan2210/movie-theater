
import { Movie, Cinema, Ticket, Notification } from './types';

export const MOVIES: Movie[] = [
  {
    id: 1,
    title: "Kẻ Trộm Mặt Trăng 4",
    poster: "https://picsum.photos/seed/minions/300/450",
    backdrop: "https://picsum.photos/seed/minions-bg/1200/600",
    genre: "Hài, Hành động, Phiêu lưu",
    duration: "1h 35m",
    rating: "P",
    releaseDate: "03/07/2024",
    director: "Chris Renaud",
    imdb: "7.9/10",
    synopsis: "Gru, đặc vụ của Liên minh Chống tội phạm nổi tiếng nhất thế giới, trở lại với một chương mới đầy hỗn loạn và táo bạo hơn của Minions.",
    status: 'Now Showing',
    trailerUrl: "https://www.youtube.com/watch?v=qQdXHiN9tL8",
    cast: [
      { id: 1, name: "Steve Carell", role: "Gru (lồng tiếng)", image: "https://picsum.photos/seed/actor1/150/150" },
      { id: 2, name: "Kristen Wiig", role: "Lucy (lồng tiếng)", image: "https://picsum.photos/seed/actor2/150/150" },
      { id: 3, name: "Joey King", role: "Poppy (lồng tiếng)", image: "https://picsum.photos/seed/actor3/150/150" },
      { id: 4, name: "Will Ferrell", role: "Maxime (lồng tiếng)", image: "https://picsum.photos/seed/actor4/150/150" },
    ],
    crew: [
      { id: 1, name: "Chris Renaud", job: "Đạo diễn" },
      { id: 2, name: "Mike White", job: "Biên kịch" },
      { id: 3, name: "Ken Daurio", job: "Biên kịch" }
    ],
    reviews: [
        { id: 1, user: "Minh Anh", avatar: "https://picsum.photos/seed/user1/50/50", rating: 9, comment: "Phim rất hài hước, cả nhà đều thích!", date: "05/07/2024" },
        { id: 2, user: "Tuấn Kiệt", avatar: "https://picsum.photos/seed/user2/50/50", rating: 8, comment: "Minion vẫn dễ thương như mọi khi. Cốt truyện ổn.", date: "04/07/2024" }
    ]
  },
  {
    id: 2,
    title: "Vây Hãm: Kẻ Trừng Phạt",
    poster: "https://picsum.photos/seed/roundup/300/450",
    backdrop: "https://picsum.photos/seed/roundup-bg/1200/600",
    genre: "Hành động, Tội phạm",
    duration: "1h 49m",
    rating: "18+",
    releaseDate: "24/05/2024",
    director: "Heo Myeong-haeng",
    imdb: "6.8/10",
    synopsis: "Thám tử Ma Seok-do quay trở lại để đối đầu với những tên tội phạm nguy hiểm nhất.",
    status: 'Now Showing',
    trailerUrl: "https://www.youtube.com/watch?v=2v8w3x1b2c4",
    cast: [
        { id: 1, name: "Ma Dong-seok", role: "Ma Seok-do", image: "https://picsum.photos/seed/actor5/150/150" },
        { id: 2, name: "Kim Mu-yeol", role: "Baek Chang-gi", image: "https://picsum.photos/seed/actor6/150/150" }
    ],
    crew: [
        { id: 1, name: "Heo Myeong-haeng", job: "Đạo diễn" },
        { id: 2, name: "Oh Sang-ho", job: "Biên kịch" }
    ],
    reviews: [
        { id: 1, user: "Hùng Dũng", avatar: "https://picsum.photos/seed/user3/50/50", rating: 10, comment: "Hành động mãn nhãn, đấm phát nào chất phát đó.", date: "25/05/2024" }
    ]
  },
  {
    id: 3,
    title: "Dune: Hành Tinh Cát - Phần Hai",
    poster: "https://picsum.photos/seed/dune/300/450",
    backdrop: "https://picsum.photos/seed/dune-bg/1200/600",
    genre: "Khoa học viễn tưởng, Hành động",
    duration: "2h 46m",
    rating: "13+",
    releaseDate: "01/03/2024",
    director: "Denis Villeneuve",
    imdb: "8.6/10",
    synopsis: "Paul Atreides hợp nhất với Chani và người Fremen trong khi tìm cách trả thù những kẻ đã hủy diệt gia đình anh.",
    status: 'Coming Soon',
    trailerUrl: "https://www.youtube.com/watch?v=Way9Dexny3w",
    cast: [
        { id: 1, name: "Timothée Chalamet", role: "Paul Atreides", image: "https://picsum.photos/seed/actor7/150/150" },
        { id: 2, name: "Zendaya", role: "Chani", image: "https://picsum.photos/seed/actor8/150/150" }
    ],
    crew: [
        { id: 1, name: "Denis Villeneuve", job: "Đạo diễn" },
        { id: 2, name: "Jon Spaihts", job: "Biên kịch" },
        { id: 3, name: "Hans Zimmer", job: "Nhà soạn nhạc" }
    ],
    reviews: []
  },
  {
    id: 4,
    title: "Godzilla x Kong: Đế Chế Mới",
    poster: "https://picsum.photos/seed/gvk/300/450",
    backdrop: "https://picsum.photos/seed/gvk-bg/1200/600",
    genre: "Hành động, Khoa học viễn tưởng",
    duration: "1h 55m",
    rating: "K",
    releaseDate: "29/03/2024",
    director: "Adam Wingard",
    imdb: "6.2/10",
    synopsis: "Hai titan cổ đại Godzilla và Kong phải hợp sức để chống lại một mối đe dọa mới.",
    status: 'Now Showing',
    trailerUrl: "https://www.youtube.com/watch?v=lV1OOlGwExM",
    cast: [
        { id: 1, name: "Rebecca Hall", role: "Dr. Ilene Andrews", image: "https://picsum.photos/seed/actor9/150/150" },
        { id: 2, name: "Brian Tyree Henry", role: "Bernie Hayes", image: "https://picsum.photos/seed/actor10/150/150" }
    ],
    crew: [
        { id: 1, name: "Adam Wingard", job: "Đạo diễn" },
        { id: 2, name: "Terry Rossio", job: "Biên kịch" }
    ],
    reviews: [
        { id: 1, user: "Nam Khánh", avatar: "https://picsum.photos/seed/user4/50/50", rating: 7, comment: "Kỹ xảo đẹp nhưng cốt truyện hơi đơn giản.", date: "30/03/2024" }
    ]
  }
];

export const CINEMAS: Cinema[] = [
  {
    id: 1,
    name: "Cinestarr Sài Gòn",
    address: "123 Đường Lê Lợi, Phường Bến Nghé, Quận 1, TP. HCM",
    image: "https://picsum.photos/seed/cinema1/400/300"
  },
  {
    id: 2,
    name: "Cinestarr Hà Nội",
    address: "456 Phố Tràng Tiền, Quận Hoàn Kiếm, Hà Nội",
    image: "https://picsum.photos/seed/cinema2/400/300"
  },
  {
    id: 3,
    name: "Cinestarr Đà Nẵng",
    address: "789 Đường Bạch Đằng, Quận Hải Châu, Đà Nẵng",
    image: "https://picsum.photos/seed/cinema3/400/300"
  },
  {
    id: 4,
    name: "Cinestarr Cần Thơ",
    address: "101 Đại lộ Hòa Bình, Quận Ninh Kiều, Cần Thơ",
    image: "https://picsum.photos/seed/cinema4/400/300"
  }
];

export const PROMOTIONS = [
  {
    id: 1,
    title: "Happy Wednesday - Đồng giá 60k",
    description: "Ưu đãi giá vé đặc biệt vào thứ 4 hàng tuần cho mọi suất chiếu. Áp dụng cho thành viên Cinestarr.",
    image: "https://picsum.photos/seed/promo1/600/350",
    link: "/promotion/1",
    content: "<p>Thứ 4 vui vẻ, giá vé cực rẻ! Chỉ 60.000đ/vé 2D cho tất cả các suất chiếu trong ngày thứ 4 hàng tuần.</p><ul><li>Áp dụng cho thành viên Cinestarr.</li><li>Không áp dụng cho các ngày lễ, tết.</li><li>Không áp dụng đồng thời với các chương trình khuyến mãi khác.</li></ul>"
  },
  {
    id: 2,
    title: "Combo Hè Sôi Động",
    description: "Tặng ngay ly nước phiên bản giới hạn khi mua combo bắp nước.",
    image: "https://picsum.photos/seed/promo2/600/350",
    link: "/promotion/2",
    content: "<p>Giải nhiệt mùa hè với Combo Sôi Động! Khi mua 01 Combo Bắp Nước (gồm 1 bắp lớn + 2 nước lớn), bạn sẽ nhận ngay 01 ly nước phiên bản giới hạn cực cool.</p><p>Số lượng quà tặng có hạn, chương trình có thể kết thúc sớm hơn dự kiến.</p>"
  },
  {
    id: 3,
    title: "Thành Viên Mới",
    description: "Đăng ký thành viên nhận ngay bắp ngọt miễn phí cho lần đầu tiên.",
    image: "https://picsum.photos/seed/promo3/600/350",
    link: "/promotion/3",
    content: "<p>Chào mừng bạn mới! Đăng ký tài khoản thành viên Cinestarr ngay hôm nay để nhận ngay voucher bắp ngọt miễn phí.</p><p>Voucher sẽ được gửi vào ví voucher trong tài khoản của bạn và có giá trị sử dụng trong vòng 30 ngày kể từ ngày đăng ký.</p>"
  },
  {
    id: 4,
    title: "Ưu đãi Học sinh - Sinh viên",
    description: "Giảm ngay 20% giá vé cho học sinh, sinh viên khi xuất trình thẻ.",
    image: "https://picsum.photos/seed/promo4/600/350",
    link: "/promotion/4",
    content: "<p>Ưu đãi đặc biệt dành cho các bạn học sinh, sinh viên. Giảm ngay 20% giá vé 2D khi mua vé trực tiếp tại quầy và xuất trình thẻ học sinh/sinh viên còn hạn sử dụng.</p><p>Áp dụng cho tất cả các suất chiếu từ Thứ 2 đến Thứ 6 hàng tuần.</p>"
  },
  {
    id: 5,
    title: "Xem phim thả ga, tích điểm đổi quà",
    description: "Tích lũy điểm thưởng với mỗi giao dịch để đổi lấy vé xem phim và bắp nước miễn phí.",
    image: "https://picsum.photos/seed/promo5/600/350",
    link: "/promotion/5",
    content: "<p>Với mỗi 1.000đ chi tiêu, bạn sẽ tích lũy được 1 điểm thưởng. Dùng điểm thưởng để đổi lấy vé xem phim 2D, combo bắp nước và nhiều quà tặng hấp dẫn khác.</p>"
  },
  {
    id: 6,
    title: "Quà sinh nhật bất ngờ",
    description: "Nhận vé xem phim miễn phí trong tháng sinh nhật của bạn.",
    image: "https://picsum.photos/seed/promo6/600/350",
    link: "/promotion/6",
    content: "<p>Chúc mừng sinh nhật! Cinestarr tặng bạn 01 vé xem phim 2D miễn phí áp dụng trong tháng sinh nhật. Voucher sẽ tự động được gửi vào tài khoản thành viên của bạn.</p><p>Điều kiện: Thành viên đã thực hiện ít nhất 1 giao dịch trong vòng 12 tháng qua.</p>"
  }
];

export const MOCK_TICKETS: Ticket[] = [
  {
    id: "CS8A6B2C",
    movieTitle: "Dune: Hành Tinh Cát - Phần Hai",
    poster: "https://picsum.photos/seed/dune/300/450",
    cinemaName: "Cinestarr Grand",
    room: "Phòng chiếu 5",
    showtime: "Thứ Sáu, 24/05/2024 - 19:30",
    seats: ["G7", "G8"],
    totalPrice: 220000,
    status: "Upcoming",
    bookingDate: "20/05/2024"
  },
  {
    id: "GK9X2Y3Z",
    movieTitle: "Godzilla x Kong: Đế Chế Mới",
    poster: "https://picsum.photos/seed/gvk/300/450",
    cinemaName: "Cinestarr Royal",
    room: "Phòng chiếu 2",
    showtime: "Thứ Ba, 14/05/2024 - 20:00",
    seats: ["E4"],
    totalPrice: 110000,
    status: "Past",
    bookingDate: "10/05/2024"
  },
  {
    id: "FG1H2J3K",
    movieTitle: "Vây Hãm: Kẻ Trừng Phạt",
    poster: "https://picsum.photos/seed/roundup/300/450",
    cinemaName: "Cinestarr City",
    room: "Phòng chiếu 1",
    showtime: "Chủ Nhật, 12/05/2024 - 18:45",
    seats: ["J10", "J11", "J12"],
    totalPrice: 330000,
    status: "Cancelled",
    bookingDate: "11/05/2024"
  }
];

export const MOCK_NOTIFICATIONS: Notification[] = [
    {
        id: 1,
        title: "Đặt vé thành công",
        message: 'Vé cho phim "Kẻ Trộm Mặt Trăng 4" suất 19:30 hôm nay đã được xác nhận. Mã vé: CS8A6B2C.',
        time: "2 giờ trước",
        type: 'booking',
        isRead: false
    },
    {
        id: 2,
        title: "Quà tặng sinh nhật",
        message: "Chúc mừng sinh nhật! Cinestarr gửi tặng bạn 01 voucher bắp nước miễn phí. Kiểm tra ví voucher ngay!",
        time: "1 ngày trước",
        type: 'promo',
        isRead: false
    },
    {
        id: 3,
        title: "Phim mới sắp chiếu",
        message: 'Đừng bỏ lỡ bom tấn "Vây Hãm: Kẻ Trừng Phạt" khởi chiếu vào cuối tuần này. Đặt vé sớm để có vị trí đẹp.',
        time: "3 ngày trước",
        type: 'info',
        isRead: true
    }
];

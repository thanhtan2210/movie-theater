-- 1. Bảng Tài Khoản
CREATE TABLE TaiKhoan (
    MaTaiKhoan INT IDENTITY(1,1) PRIMARY KEY,
    Email NVARCHAR(100),
    SDT VARCHAR(15),
    GioiTinh NVARCHAR(10),
    TenDangNhap NVARCHAR(50) UNIQUE,
    Password NVARCHAR(255)
);

-- 2. Bảng Khách Hàng
CREATE TABLE KhachHang (
    MaKhachHang INT IDENTITY(1,1) PRIMARY KEY,
    MaTaiKhoan INT UNIQUE,
    HoTen NVARCHAR(100),
    LoaiKhachHang NVARCHAR(50),
    FOREIGN KEY (MaTaiKhoan) REFERENCES TaiKhoan(MaTaiKhoan)
);

-- 3. Bảng Khách Hàng Thành Viên
CREATE TABLE KhachHangThanhVien (
    MaKhachHang INT PRIMARY KEY,
    SoDiemTichLuy INT DEFAULT 0,
    NgayDangKy DATE DEFAULT GETDATE(),
    CapDoThanhVien NVARCHAR(50),
    FOREIGN KEY (MaKhachHang) REFERENCES KhachHang(MaKhachHang)
);

-- 4. Bảng Nhân Sự
CREATE TABLE NhanSu (
    MaNhanSu INT IDENTITY(1,1) PRIMARY KEY,
    MaTaiKhoan INT UNIQUE,
    HoTen NVARCHAR(100),
    CCCD VARCHAR(20),
    DiaChi NVARCHAR(255),
    FOREIGN KEY (MaTaiKhoan) REFERENCES TaiKhoan(MaTaiKhoan)
);

-- 5. Bảng Quản Lý
CREATE TABLE QuanLy (
    MaQuanLy INT PRIMARY KEY,
    NgayNhanChuc DATE,
    ChucVu NVARCHAR(50),
    FOREIGN KEY (MaQuanLy) REFERENCES NhanSu(MaNhanSu)
);

-- 6. Bảng Rạp Chiếu
CREATE TABLE RapChieu (
    MaRap INT IDENTITY(1,1) PRIMARY KEY,
    TenRap NVARCHAR(100),
    DiaChi NVARCHAR(255),
    SDT VARCHAR(15),
    TongDoanhThu DECIMAL(18, 0) DEFAULT 0,
    MaQuanLy INT,
    FOREIGN KEY (MaQuanLy) REFERENCES QuanLy(MaQuanLy)
);

-- 7. Bảng Quầy Giao Dịch
CREATE TABLE QuayGiaoDich (
    MaQuay INT IDENTITY(1,1) PRIMARY KEY,
    TenQuay NVARCHAR(50),
    MaRap INT,
    FOREIGN KEY (MaRap) REFERENCES RapChieu(MaRap)
);

-- 8. Bảng Nhân Viên
CREATE TABLE NhanVien (
    MaNhanVien INT PRIMARY KEY,
    ViTri NVARCHAR(50),
    MaQuanLy INT, 
    MaQuay INT, 
    FOREIGN KEY (MaNhanVien) REFERENCES NhanSu(MaNhanSu),
    FOREIGN KEY (MaQuanLy) REFERENCES QuanLy(MaQuanLy),
    FOREIGN KEY (MaQuay) REFERENCES QuayGiaoDich(MaQuay)
);

-- 9. Bảng Phim
CREATE TABLE Phim (
    MaPhim INT IDENTITY(1,1) PRIMARY KEY,
    TenPhim NVARCHAR(200),
    ThoiLuong INT,
    XuatXu NVARCHAR(50),
    GioiHanDoTuoi INT,
    DaoDien NVARCHAR(100),
    NgayKhoiChieu DATE,
    TrangThai NVARCHAR(50), 
    DiemDanhGia FLOAT
);

-- 10. Bảng Diễn Viên
CREATE TABLE DienVien (
    MaDienVien INT IDENTITY(1,1) PRIMARY KEY,
    TenDienVien NVARCHAR(100),
    QuocTich NVARCHAR(50)
);

-- 11. Bảng Phim_DienVien (Trung gian)
CREATE TABLE Phim_DienVien (
    MaPhim INT,
    MaDienVien INT,
    VaiDien NVARCHAR(100),
    PRIMARY KEY (MaPhim, MaDienVien),
    FOREIGN KEY (MaPhim) REFERENCES Phim(MaPhim),
    FOREIGN KEY (MaDienVien) REFERENCES DienVien(MaDienVien)
);

-- 12. Bảng Đánh Giá
CREATE TABLE DanhGia (
    MaPhim INT,
    MaTaiKhoan INT,
    ThoiGianDanhGia DATETIME DEFAULT GETDATE(),
    NoiDungDanhGia NVARCHAR(MAX),
    DiemDanhGia FLOAT CHECK (DiemDanhGia BETWEEN 0 AND 10),
    PRIMARY KEY (MaPhim, MaTaiKhoan),
    FOREIGN KEY (MaPhim) REFERENCES Phim(MaPhim),
    FOREIGN KEY (MaTaiKhoan) REFERENCES TaiKhoan(MaTaiKhoan)
);

-- 13. Bảng Phòng Chiếu
CREATE TABLE PhongChieu (
    MaPhong INT IDENTITY(1,1) PRIMARY KEY,
    TenPhong NVARCHAR(50),
    TinhTrang NVARCHAR(50),
    SoLuongGhe INT,
    LoaiPhong NVARCHAR(50),
    MaRap INT,
    FOREIGN KEY (MaRap) REFERENCES RapChieu(MaRap)
);

-- 14. Bảng Ghế Ngồi
CREATE TABLE GheNgoi (
    MaGhe INT IDENTITY(1,1) PRIMARY KEY,
    MaPhong INT,
    HangGhe CHAR(1),
    SoGhe INT,
    LoaiGhe NVARCHAR(50),
    FOREIGN KEY (MaPhong) REFERENCES PhongChieu(MaPhong)
);

-- 15. Bảng Suất Chiếu
CREATE TABLE SuatChieu (
    MaSuatChieu INT IDENTITY(1,1) PRIMARY KEY,
    MaPhim INT,
    MaPhong INT,
    ThoiGianBatDau DATETIME,
    ThoiGianKetThuc DATETIME,
    NgayChieu DATE,
    DinhDang NVARCHAR(50),
    NgonNgu NVARCHAR(50),
    FOREIGN KEY (MaPhim) REFERENCES Phim(MaPhim),
    FOREIGN KEY (MaPhong) REFERENCES PhongChieu(MaPhong)
);

-- 16. Bảng Ca Trực 
CREATE TABLE CaTruc (
    MaCa INT IDENTITY(1,1) PRIMARY KEY,
    TenCa NVARCHAR(50),
    GioBatDau TIME,
    GioKetThuc TIME
);

-- 17. Bảng Phân Công Trực
CREATE TABLE PhanCongTruc (
    MaPhanCong INT IDENTITY(1,1) PRIMARY KEY,
    MaNhanVien INT,
    MaCa INT,
    NgayTruc DATE,
    FOREIGN KEY (MaNhanVien) REFERENCES NhanVien(MaNhanVien),
    FOREIGN KEY (MaCa) REFERENCES CaTruc(MaCa)
);

-- 18. Bảng Voucher (Cha)
CREATE TABLE Voucher (
    MaVoucher INT IDENTITY(1,1) PRIMARY KEY,
    TenVoucher NVARCHAR(100),
    MoTa NVARCHAR(255),
    GiaTri DECIMAL(18, 0),
    SoLuong INT,
    TuNgay DATE,
    DenNgay DATE,
    NguoiPhatHanh NVARCHAR(50)
);

-- 19. Bảng Voucher Tích Điểm (Con)
CREATE TABLE VoucherTuDiem (
    MaVoucher INT PRIMARY KEY,
    SoDiemDoi INT, 
    FOREIGN KEY (MaVoucher) REFERENCES Voucher(MaVoucher)
);

-- 20. Bảng Voucher Theo Lịch (Con)
CREATE TABLE VoucherTheoLich (
    MaVoucher INT PRIMARY KEY,
    SuKien NVARCHAR(100),     
    FOREIGN KEY (MaVoucher) REFERENCES Voucher(MaVoucher)
);

-- 21. Bảng Quy Đổi Voucher
CREATE TABLE QuyDoiVoucher (
    MaKhachHang INT,
    MaVoucher INT,
    NgayDoi DATE DEFAULT GETDATE(),
    GioDoi TIME DEFAULT CONVERT(TIME, GETDATE()),
    PRIMARY KEY (MaKhachHang, MaVoucher, NgayDoi),
    FOREIGN KEY (MaKhachHang) REFERENCES KhachHang(MaKhachHang),
    FOREIGN KEY (MaVoucher) REFERENCES Voucher(MaVoucher)
);

-- 22. Bảng Giao Dịch (Phải tạo trước ApVoucher)
CREATE TABLE GiaoDich (
    MaGiaoDich INT IDENTITY(1,1) PRIMARY KEY,
    ThoiGianGiaoDich DATETIME DEFAULT GETDATE(),
    HinhThucThanhToan NVARCHAR(50),
    TongTienThanhToan DECIMAL(18, 0),
    LoaiGiaoDich NVARCHAR(50),
    MaTaiKhoan INT,
    MaRap INT,
    MaQuay INT,
    FOREIGN KEY (MaTaiKhoan) REFERENCES TaiKhoan(MaTaiKhoan),
    FOREIGN KEY (MaRap) REFERENCES RapChieu(MaRap),
    FOREIGN KEY (MaQuay) REFERENCES QuayGiaoDich(MaQuay)
);

-- 23. Bảng Áp Voucher (Tạo sau GiaoDich)
CREATE TABLE ApVoucher (
    MaGiaoDich INT,
    MaVoucher INT,
    GiaTriGiamThucTe DECIMAL(18,0),
    PRIMARY KEY (MaGiaoDich, MaVoucher),
    FOREIGN KEY (MaGiaoDich) REFERENCES GiaoDich(MaGiaoDich),
    FOREIGN KEY (MaVoucher) REFERENCES Voucher(MaVoucher)
);

-- 24. Bảng Vé
CREATE TABLE Ve (
    MaVe INT IDENTITY(1,1) PRIMARY KEY,
    MaSuatChieu INT,
    MaGhe INT,
    TrangThai NVARCHAR(50),
    GiaVe DECIMAL(18, 0),
    FOREIGN KEY (MaSuatChieu) REFERENCES SuatChieu(MaSuatChieu),
    FOREIGN KEY (MaGhe) REFERENCES GheNgoi(MaGhe)
);

-- 25. Bảng Mua Vé
CREATE TABLE MuaVe (
    MaGiaoDich INT,
    MaVe INT,
    SoLuongVe INT DEFAULT 1,
    PRIMARY KEY (MaGiaoDich, MaVe),
    FOREIGN KEY (MaGiaoDich) REFERENCES GiaoDich(MaGiaoDich),
    FOREIGN KEY (MaVe) REFERENCES Ve(MaVe)
);

-- 26. Bảng Đồ Ăn Uống
CREATE TABLE DoAnUong (
    ComboID INT IDENTITY(1,1) PRIMARY KEY,
    TenCombo NVARCHAR(100),
    Gia DECIMAL(18,0),
    MoTa NVARCHAR(255)
);

-- 27. Bảng Mua Đồ Ăn
CREATE TABLE MuaDoAn (
    MaGiaoDich INT,
    ComboID INT,
    SoLuong INT,
    ThanhTien DECIMAL(18,0),
    PRIMARY KEY (MaGiaoDich, ComboID),
    FOREIGN KEY (MaGiaoDich) REFERENCES GiaoDich(MaGiaoDich),
    FOREIGN KEY (ComboID) REFERENCES DoAnUong(ComboID)
);
GO

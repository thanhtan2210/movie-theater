USE QuanLyRapChieuPhim_Final;
GO

-- ======================================================================================
-- PHẦN 1: LÀM SẠCH & CHUẨN BỊ
-- ======================================================================================
PRINT N'--- 1. ĐANG DỌN DẸP DỮ LIỆU CŨ ---';
EXEC sp_msforeachtable 'ALTER TABLE ? NOCHECK CONSTRAINT all';
DELETE FROM MuaDoAn; DELETE FROM MuaVe; DELETE FROM ApVoucher; DELETE FROM GiaoDich;
DELETE FROM QuyDoiVoucher; DELETE FROM VoucherTuDiem; DELETE FROM VoucherTheoLich; DELETE FROM Voucher;
DELETE FROM Ve; DELETE FROM SuatChieu; DELETE FROM PhanCongTruc; DELETE FROM CaTruc;
DELETE FROM GheNgoi; DELETE FROM PhongChieu; DELETE FROM DanhGia; DELETE FROM Phim_DienVien;
DELETE FROM DienVien; DELETE FROM Phim; DELETE FROM NhanVien; DELETE FROM QuayGiaoDich;
DELETE FROM RapChieu; DELETE FROM QuanLy; DELETE FROM NhanSu; DELETE FROM KhachHangThanhVien;
DELETE FROM KhachHang; DELETE FROM TaiKhoan; DELETE FROM DoAnUong;

-- Reset ID
DECLARE @sql NVARCHAR(MAX) = N'';
SELECT @sql = @sql + N'DBCC CHECKIDENT (''' + TABLE_NAME + ''', RESEED, 0); '
FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE';
EXEC sp_executesql @sql;
EXEC sp_msforeachtable 'ALTER TABLE ? WITH CHECK CHECK CONSTRAINT all';
GO

-- ======================================================================================
-- PHẦN 2: TẠO DỮ LIỆU DANH MỤC (PHIM, RẠP, MÓN ĂN)
-- ======================================================================================
PRINT N'--- 2. TẠO MASTER DATA ---';

-- 1. Món ăn
INSERT INTO DoAnUong (TenCombo, Gia, MoTa) VALUES
(N'Bắp Ngọt (M)', 45000, N'Bắp rang bơ vừa'), (N'Bắp Phô Mai (L)', 65000, N'Bắp phô mai lớn'),
(N'Coca Cola (L)', 35000, N'Ly lớn'), (N'Combo Solo', 75000, N'1 Bắp + 1 Nước'),
(N'Combo Couple', 135000, N'1 Bắp L + 2 Nước'), (N'Combo Family', 199000, N'2 Bắp + 4 Nước');

-- 2. Phim (10 Phim hot)
INSERT INTO Phim (TenPhim, ThoiLuong, XuatXu, GioiHanDoTuoi, NgayKhoiChieu, TrangThai, DiemDanhGia) VALUES
(N'Dune: Part Two', 166, N'Mỹ', 13, '2024-03-01', N'Đang chiếu', 9.2),
(N'Mai', 131, N'Việt Nam', 18, '2024-02-10', N'Đang chiếu', 8.5),
(N'Kung Fu Panda 4', 94, N'Mỹ', 0, '2024-03-08', N'Sắp chiếu', NULL),
(N'Godzilla x Kong', 115, N'Mỹ', 13, '2024-04-01', N'Sắp chiếu', NULL),
(N'Exhuma: Quật Mộ Trùng Ma', 134, N'Hàn', 16, '2024-03-15', N'Đang chiếu', 8.8),
(N'Oppenheimer', 180, N'Mỹ', 18, '2023-08-01', N'Đã chiếu', 9.5),
(N'Đào, Phở và Piano', 100, N'Việt Nam', 13, '2024-02-10', N'Đã chiếu', 9.0),
(N'Doraemon: Bản giao hưởng', 110, N'Nhật', 0, '2024-05-01', N'Sắp chiếu', NULL);

-- 3. Rạp & Quầy
INSERT INTO NhanSu (MaTaiKhoan, HoTen, DiaChi) VALUES (NULL, N'Giám Đốc Vùng', N'TP.HCM'); -- Tạo dummy nhân sự để làm quản lý
INSERT INTO QuanLy (MaQuanLy, NgayNhanChuc, ChucVu) VALUES (1, '2020-01-01', N'Director');

INSERT INTO RapChieu (TenRap, DiaChi, MaQuanLy) VALUES
(N'CGV Vincom Đồng Khởi', N'Q1, TP.HCM', 1),
(N'Galaxy Nguyễn Du', N'Q1, TP.HCM', 1),
(N'Lotte Cinema Go Vap', N'Go Vap, TP.HCM', 1);

-- Tạo mỗi rạp 2 quầy
INSERT INTO QuayGiaoDich (TenQuay, MaRap)
SELECT N'Quầy Vé ' + CAST(MaRap AS VARCHAR), MaRap FROM RapChieu
UNION ALL
SELECT N'Quầy Bắp ' + CAST(MaRap AS VARCHAR), MaRap FROM RapChieu;

-- ======================================================================================
-- PHẦN 3: SINH USER & NHÂN VIÊN TỰ ĐỘNG (100 USER)
-- ======================================================================================
PRINT N'--- 3. SINH 100 TÀI KHOẢN & KHÁCH HÀNG ---';
DECLARE @i INT = 1;
WHILE @i <= 100
BEGIN
    -- Tạo tên ngẫu nhiên: Họ + Đệm + Tên
    DECLARE @Ho NVARCHAR(20) = CASE ABS(CHECKSUM(NEWID())) % 5 
        WHEN 0 THEN N'Nguyễn ' WHEN 1 THEN N'Trần ' WHEN 2 THEN N'Lê ' WHEN 3 THEN N'Phạm ' ELSE N'Hoàng ' END;
    DECLARE @Dem NVARCHAR(20) = CASE ABS(CHECKSUM(NEWID())) % 4 
        WHEN 0 THEN N'Văn ' WHEN 1 THEN N'Thị ' WHEN 2 THEN N'Minh ' ELSE N'Thanh ' END;
    DECLARE @Ten NVARCHAR(20) = CASE ABS(CHECKSUM(NEWID())) % 6 
        WHEN 0 THEN N'Hùng' WHEN 1 THEN N'Lan' WHEN 2 THEN N'Tuấn' WHEN 3 THEN N'Hương' WHEN 4 THEN N'Đạt' ELSE N'Ngân' END;
    
    -- Insert Tài khoản
    INSERT INTO TaiKhoan (Email, TenDangNhap, Password, GioiTinh, SDT) VALUES 
    ('user' + CAST(@i AS VARCHAR) + '@mail.com', 'user' + CAST(@i AS VARCHAR), 'pass123', 
     CASE WHEN @Dem = N'Thị ' THEN N'Nữ' ELSE N'Nam' END, '09' + RIGHT('00000000' + CAST(@i AS VARCHAR), 8));

    -- Chia: 10 người đầu là Nhân viên, 90 người sau là Khách
    IF @i <= 10
    BEGIN
        INSERT INTO NhanSu (MaTaiKhoan, HoTen, CCCD) VALUES (SCOPE_IDENTITY(), @Ho + @Dem + @Ten, '079' + CAST(@i AS VARCHAR));
        -- Set làm nhân viên quầy (Random quầy)
        INSERT INTO NhanVien (MaNhanVien, ViTri, MaQuanLy, MaQuay) 
        VALUES (SCOPE_IDENTITY(), N'Nhân viên bán vé', 1, (ABS(CHECKSUM(NEWID())) % 6) + 1);
    END
    ELSE
    BEGIN
        INSERT INTO KhachHang (MaTaiKhoan, HoTen, LoaiKhachHang) VALUES (SCOPE_IDENTITY(), @Ho + @Dem + @Ten, N'Thành viên');
        -- Random tạo thẻ thành viên
        IF @i % 2 = 0 
            INSERT INTO KhachHangThanhVien (MaKhachHang, SoDiemTichLuy, CapDoThanhVien) 
            VALUES (SCOPE_IDENTITY() - 10, ABS(CHECKSUM(NEWID())) % 2000, N'Bạc'); -- -10 vì 10 ID đầu là nhân viên (check lại logic ID nếu cần, ở đây ID KhachHang tự tăng nên ko sao)
    END
    SET @i = @i + 1;
END

-- ======================================================================================
-- PHẦN 4: HỆ THỐNG PHÒNG & GHẾ (AUTO GENERATE)
-- ======================================================================================
PRINT N'--- 4. TẠO PHÒNG & GHẾ ---';
-- Tạo 3 phòng cho mỗi rạp
INSERT INTO PhongChieu (TenPhong, TinhTrang, SoLuongGhe, LoaiPhong, MaRap)
SELECT N'Phòng ' + CAST(Id AS VARCHAR), N'Hoạt động', 60, N'2D', MaRap
FROM RapChieu CROSS JOIN (SELECT 1 AS Id UNION SELECT 2 UNION SELECT 3) AS T;

-- Tạo ghế (A-F, 1-10) cho tất cả các phòng
DECLARE @MaPhongCursor INT;
DECLARE cur_Phong CURSOR FOR SELECT MaPhong FROM PhongChieu;
OPEN cur_Phong;
FETCH NEXT FROM cur_Phong INTO @MaPhongCursor;
WHILE @@FETCH_STATUS = 0
BEGIN
    DECLARE @Hang INT = 0;
    WHILE @Hang < 6 -- 6 Hàng
    BEGIN
        DECLARE @CharHang CHAR(1) = CHAR(65 + @Hang);
        DECLARE @So INT = 1;
        WHILE @So <= 10 -- 10 Ghế/hàng
        BEGIN
            INSERT INTO GheNgoi (MaPhong, HangGhe, SoGhe, LoaiGhe)
            VALUES (@MaPhongCursor, @CharHang, @So, CASE WHEN @CharHang = 'F' THEN N'VIP' ELSE N'Thường' END);
            SET @So = @So + 1;
        END
        SET @Hang = @Hang + 1;
    END
    FETCH NEXT FROM cur_Phong INTO @MaPhongCursor;
END
CLOSE cur_Phong; DEALLOCATE cur_Phong;

-- ======================================================================================
-- PHẦN 5: LỊCH CHIẾU & VÉ (QUAN TRỌNG NHẤT)
-- ======================================================================================
PRINT N'--- 5. TẠO 50 SUẤT CHIẾU & HÀNG NGÀN VÉ ---';
SET @i = 1;
WHILE @i <= 50
BEGIN
    -- Chọn random Phim & Phòng
    DECLARE @RndPhim INT = (SELECT TOP 1 MaPhim FROM Phim ORDER BY NEWID());
    DECLARE @RndPhong INT = (SELECT TOP 1 MaPhong FROM PhongChieu ORDER BY NEWID());
    -- Random ngày trong khoảng 10 ngày trước đến 10 ngày sau
    DECLARE @RndDate DATETIME = DATEADD(DAY, (ABS(CHECKSUM(NEWID())) % 20) - 10, GETDATE());
    -- Set giờ chiếu (18h, 20h, 22h)
    SET @RndDate = DATEADD(HOUR, 18 + (ABS(CHECKSUM(NEWID())) % 5), CAST(CAST(@RndDate AS DATE) AS DATETIME));

    INSERT INTO SuatChieu (MaPhim, MaPhong, ThoiGianBatDau, ThoiGianKetThuc, NgayChieu, DinhDang)
    VALUES (@RndPhim, @RndPhong, @RndDate, DATEADD(HOUR, 2, @RndDate), CAST(@RndDate AS DATE), N'2D');
    
    DECLARE @NewSuat INT = SCOPE_IDENTITY();

    -- **Logic:** Tự động tạo Vé Trống cho toàn bộ ghế trong phòng này
    INSERT INTO Ve (MaSuatChieu, MaGhe, TrangThai, GiaVe)
    SELECT @NewSuat, MaGhe, N'Trống', CASE WHEN LoaiGhe = 'VIP' THEN 110000 ELSE 85000 END
    FROM GheNgoi WHERE MaPhong = @RndPhong;

    SET @i = @i + 1;
END

-- ======================================================================================
-- PHẦN 6: GIAO DỊCH MUA VÉ & REVIEW (MÔ PHỎNG HOẠT ĐỘNG)
-- ======================================================================================
PRINT N'--- 6. MÔ PHỎNG 200 GIAO DỊCH ---';
SET @i = 1;
WHILE @i <= 200
BEGIN
    -- 1. Lấy random Khách hàng
    DECLARE @RndKhach INT = (SELECT TOP 1 MaTaiKhoan FROM KhachHang ORDER BY NEWID());
    DECLARE @RndRap INT = (SELECT TOP 1 MaRap FROM RapChieu ORDER BY NEWID());
    
    -- 2. Tìm một suất chiếu còn vé trống
    DECLARE @SuatDuocChon INT = (SELECT TOP 1 MaSuatChieu FROM Ve WHERE TrangThai = N'Trống' GROUP BY MaSuatChieu HAVING COUNT(*) > 2 ORDER BY NEWID());
    
    IF @SuatDuocChon IS NOT NULL
    BEGIN
        -- 3. Tạo Giao Dịch (Tổng tiền tạm tính = 0)
        INSERT INTO GiaoDich (ThoiGianGiaoDich, TongTienThanhToan, LoaiGiaoDich, MaTaiKhoan, MaRap, MaQuay)
        VALUES (GETDATE(), 0, N'Mua vé', @RndKhach, @RndRap, 1);
        
        DECLARE @MaGD INT = SCOPE_IDENTITY();
        DECLARE @TongTien DECIMAL(18,0) = 0;

        -- 4. Mua 1-3 Vé ngẫu nhiên
        DECLARE @VeMua TABLE (ID INT, Gia DECIMAL(18,0));
        INSERT INTO @VeMua 
        SELECT TOP ((ABS(CHECKSUM(NEWID())) % 3) + 1) MaVe, GiaVe FROM Ve WHERE MaSuatChieu = @SuatDuocChon AND TrangThai = N'Trống';

        -- Insert vào chi tiết MuaVe
        INSERT INTO MuaVe (MaGiaoDich, MaVe, SoLuongVe) SELECT @MaGD, ID, 1 FROM @VeMua;
        -- Update trạng thái vé
        UPDATE Ve SET TrangThai = N'Đã bán' WHERE MaVe IN (SELECT ID FROM @VeMua);
        -- Cộng tiền vé
        SELECT @TongTien = SUM(Gia) FROM @VeMua;
        DELETE FROM @VeMua;

        -- 5. Mua Bắp nước (50% tỉ lệ)
        IF (@i % 2 = 0)
        BEGIN
            DECLARE @RndCombo INT = (SELECT TOP 1 ComboID FROM DoAnUong ORDER BY NEWID());
            DECLARE @GiaCombo DECIMAL(18,0) = (SELECT Gia FROM DoAnUong WHERE ComboID = @RndCombo);
            INSERT INTO MuaDoAn (MaGiaoDich, ComboID, SoLuong, ThanhTien) VALUES (@MaGD, @RndCombo, 1, @GiaCombo);
            SET @TongTien = @TongTien + @GiaCombo;
        END

        -- 6. Update Tổng tiền thật
        UPDATE GiaoDich SET TongTienThanhToan = @TongTien WHERE MaGiaoDich = @MaGD;

        -- 7. Đánh giá phim (Nếu suất chiếu đã qua)
        DECLARE @NgayChieu DATETIME = (SELECT ThoiGianBatDau FROM SuatChieu WHERE MaSuatChieu = @SuatDuocChon);
        IF @NgayChieu < GETDATE()
        BEGIN
            -- Kiểm tra chưa đánh giá thì mới thêm
            IF NOT EXISTS (SELECT 1 FROM DanhGia WHERE MaTaiKhoan = @RndKhach AND MaPhim = (SELECT MaPhim FROM SuatChieu WHERE MaSuatChieu = @SuatDuocChon))
            BEGIN
                INSERT INTO DanhGia (MaPhim, MaTaiKhoan, DiemDanhGia, NoiDungDanhGia)
                VALUES ((SELECT MaPhim FROM SuatChieu WHERE MaSuatChieu = @SuatDuocChon), @RndKhach, 
                        ABS(CHECKSUM(NEWID())) % 5 + 6, -- Điểm 6-10
                        N'Phim xem ổn, rạp mát');
            END
        END
    END
    SET @i = @i + 1;
END

-- ======================================================================================
-- PHẦN 7: DỮ LIỆU VOUCHER & PHÂN CÔNG (CHO ĐẦY ĐỦ BẢNG)
-- ======================================================================================
PRINT N'--- 7. TẠO VOUCHER & CA TRỰC ---';

-- Ca Trực & Phân Công
INSERT INTO CaTruc (TenCa, GioBatDau, GioKetThuc) VALUES (N'Sáng', '08:00', '16:00'), (N'Tối', '16:00', '23:00');
INSERT INTO PhanCongTruc (MaNhanVien, MaCa, NgayTruc) 
SELECT TOP 10 MaNhanVien, 1, GETDATE() FROM NhanVien;

-- Voucher
INSERT INTO Voucher (TenVoucher, GiaTri, SoLuong, TuNgay, DenNgay) VALUES (N'GIAM 50K', 50000, 100, '2024-01-01', '2025-01-01');
INSERT INTO VoucherTuDiem (MaVoucher, SoDiemDoi) VALUES (SCOPE_IDENTITY(), 500);
INSERT INTO QuyDoiVoucher (MaKhachHang, MaVoucher) VALUES (1, SCOPE_IDENTITY()); -- Khách ID 1 đổi voucher này

PRINT N'--- HOÀN TẤT: DATABASE ĐÃ CÓ DỮ LIỆU KHỔNG LỒ! ---';
GO

-- THỐNG KÊ NHANH
SELECT 'Khach Hang' Tbl, COUNT(*) SL FROM KhachHang
UNION ALL SELECT 'Ve (Tong)', COUNT(*) FROM Ve
UNION ALL SELECT 'Ve (Da ban)', COUNT(*) FROM Ve WHERE TrangThai = N'Đã bán'
UNION ALL SELECT 'Giao Dich', COUNT(*) FROM GiaoDich
UNION ALL SELECT 'Doanh Thu', SUM(TongTienThanhToan) FROM GiaoDich;
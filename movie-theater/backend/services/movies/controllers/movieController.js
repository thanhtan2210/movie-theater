// Movies Controller
const { asyncHandler } = require('../../shared/middleware/errorHandler');
const errorMessages = require('../../shared/constants/errorMessages');

// Get all movies
const getAllMovies = asyncHandler(async (req, res) => {
  // Mock data for now
  const mockMovies = [
    { id: 1, title: 'Kẻ Trộm Mặt Trăng 4', description: 'Hài, Hành động, Phiêu lưu', duration: 95, genre: 'Animation', releaseDate: '2024-07-03', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAneQp9zR7A9BCYXFuzCEvbBc97x3OaxsEPix64eLGWssuQQh7gQpKZ6Oy8IpSA8pOORNUVDyZUbakAzWOGLW1K2L8-0-LtnhJYDaGVDUqA8rph8EtnlT07I267YbZ0JMuu_cnKs0hIKQNbZ0tEE7Y8cB0QOUfnUwq6mUHKVc93T2YhviV04ep1cXP0hP4s3r97qgB7puiOQOjMB9eNi1CoAhrtyBEsBGxknMaoNkPAvS19xp2ecXm2j4RIG7BW-t7gFS5AG24rct4' },
    { id: 2, title: 'Vây Hãm: Kẻ Trừng Phạt', description: 'Hành động, Tội phạm', duration: 109, genre: 'Action', releaseDate: '2024-10-24', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwo1pAQZvptpfFA9lcwLQbFjJcKaomf5Ytml1lvGhrH2QL89wcCiU1MfObUjDGlT8pMr38saoo2QBTZIi5Owaj0eZyZTuxdg_W1V6sWWsN7moUCoKdffSTXTi_zuHc8i_WEcAH37UNKBJLQxRK2piArRVI6euE7s88YGpVOxB4gFUc7Y6f4zEvQuTTcj7U-UvX6mkLmbcvcwWqjY5sZNChVXy4vQzZMjYr2CBHIvC-91FndgeS4SsaUi1ypvEjbDMAKXk_cfndeTY' },
    { id: 3, title: 'Dune: Hành Tinh Cát - Phần Hai', description: 'Khoa học viễn tưởng, Phiêu lưu', duration: 166, genre: 'Sci-Fi', releaseDate: '2024-03-01', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBaAfrUpnPvdpvsE6JQlLdlKwrLHbRns3CMBenr4t6rMkvJJUkxx5qkI2LJaPXTDPaXUGKM9CLdgYwIUCornVyW3A0gjutzxD3cXmrCO169lkz4Awg7uKu2-I94b294NWv7RUwJr6ijy4N6b-nsP9mv4Qeya_-cYjU3tPeUUPj8AR-J1Ki_hL9n3KA2YPAyIyCsg3cUqBeQu9j6y08MiNRtOpPfq0D2VI9uW1iZgjsj5zYDMRXQHwCOuxxtPl70W_OtBJL5oHvK12E' },
    { id: 4, title: 'Godzilla x Kong: Đế Chế Mới', description: 'Hành động, Khoa học viễn tưởng', duration: 115, genre: 'Action', releaseDate: '2024-04-12', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYAhL15lVrgm_ExiobI6rPA8tIVuxqc2pdkcRG9VMl9BTTmyt2523QRR3Pd_kW-yrQGO6OEFIi38LX_tUvFqJSiRgFCWMkS0hisam8wkbsHepXr-jHbzqbnWx1vBYSj1LK8aaRV_2AghnBEqWTrIH2ktClOJJmpIMk-mIHJo7bWUHLh4Y7K2fN6s3u66dyusYIu-vC91FndgeS4SsaUi1ypvEjbDMAKXk_cfndeTY' }
  ];
  res.json({
    success: true,
    message: 'Movies retrieved successfully',
    data: mockMovies
  });
});

// Get movie by ID
const getMovieById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: errorMessages.REQUIRED_FIELD
    });
  }

  // Mock data for now
  const mockMovies = [
    { id: 1, title: 'Kẻ Trộm Mặt Trăng 4', description: 'Hài, Hành động, Phiêu lưu', duration: 95, genre: 'Animation', releaseDate: '2024-07-03', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAneQp9zR7A9BCYXFuzCEvbBc97x3OaxsEPix64eLGWssuQQh7gQpKZ6Oy8IpSA8pOORNUVDyZUbakAzWOGLW1K2L8-0-LtnhJYDaGVDUqA8rph8EtnlT07I267YbZ0JMuu_cnKs0hIKQNbZ0tEE7Y8cB0QOUfnUwq6mUHKVc93T2YhviV04ep1cXP0hP4s3r97qgB7puiOQOjMB9eNi1CoAhrtyBEsBGxknMaoNkPAvS19xp2ecXm2j4RIG7BW-t7gFS5AG24rct4' },
    { id: 2, title: 'Vây Hãm: Kẻ Trừng Phạt', description: 'Hành động, Tội phạm', duration: 109, genre: 'Action', releaseDate: '2024-10-24', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwo1pAQZvptpfFA9lcwLQbFjJcKaomf5Ytml1lvGhrH2QL89wcCiU1MfObUjDGlT8pMr38saoo2QBTZIi5Owaj0eZyZTuxdg_W1V6sWWsN7moUCoKdffSTXTi_zuHc8i_WEcAH37UNKBJLQxRK2piArRVI6euE7s88YGpVOxB4gFUc7Y6f4zEvQuTTcj7U-UvX6mkLmbcvcwWqjY5sZNChVXy4vQzZMjYr2CBHIvC-91FndgeS4SsaUi1ypvEjbDMAKXk_cfndeTY' },
    { id: 3, title: 'Dune: Hành Tinh Cát - Phần Hai', description: 'Khoa học viễn tưởng, Phiêu lưu', duration: 166, genre: 'Sci-Fi', releaseDate: '2024-03-01', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBaAfrUpnPvdpvsE6JQlLdlKwrLHbRns3CMBenr4t6rMkvJJUkxx5qkI2LJaPXTDPaXUGKM9CLdgYwIUCornVyW3A0gjutzxD3cXmrCO169lkz4Awg7uKu2-I94b294NWv7RUwJr6ijy4N6b-nsP9mv4Qeya_-cYjU3tPeUUPj8AR-J1Ki_hL9n3KA2YPAyIyCsg3cUqBeQuTTcj7U-UvX6mkLmbcvcwWqjY5sZNChVXy4vQzZMjYr2CBHIvC-91FndgeS4SsaUi1ypvEjbDMAKXk_cfndeTY' },
    { id: 4, title: 'Godzilla x Kong: Đế Chế Mới', description: 'Hành động, Khoa học viễn tưởng', duration: 115, genre: 'Action', releaseDate: '2024-04-12', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYAhL15lVrgm_ExiobI6rPA8tIVuxqc2pdkcRG9VMl9BTTmyt2523QRR3Pd_kW-yrQGO6OEFIi38LX_tUvFqJSiRgFCWMkS0hisam8wkbsHepXr-jHbzqbnWx1vBYSj1LK8aaRV_2AghnBEqWTrIH2ktClOJJmpIMk-mIHJo7bWUHLh4Y7K2fN6s3u66dyusYIu-vC91FndgeS4SsaUi1ypvEjbDMAKXk_cfndeTY' }
  ];
  
  const movie = mockMovies.find(movie => movie.id === parseInt(id));

  if (!movie) {
    return res.status(404).json({
      success: false,
      message: errorMessages.NOT_FOUND
    });
  }

  res.json({
    success: true,
    message: 'Movie retrieved successfully',
    data: movie
  });
});

// Create new movie (Admin only)
const createMovie = asyncHandler(async (req, res) => {
  const { title, description, duration, genre, releaseDate } = req.body;

  if (!title || !description || !duration) {
    return res.status(400).json({
      success: false,
      message: errorMessages.REQUIRED_FIELD
    });
  }

  // For now, just return a success message with the received data
  res.status(201).json({
    success: true,
    message: 'Movie created successfully',
    data: { title, description, duration, genre, releaseDate, id: Math.floor(Math.random() * 1000) }
  });
});

// Update movie (Admin only)
const updateMovie = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: errorMessages.REQUIRED_FIELD
    });
  }

  // For now, just return a success message with the received data
  res.json({
    success: true,
    message: `Movie with ID ${id} updated successfully`,
    data: { id, ...req.body }
  });
});

// Delete movie (Admin only)
const deleteMovie = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: errorMessages.REQUIRED_FIELD
    });
  }

  // For now, just return a success message
  res.json({
    success: true,
    message: `Movie with ID ${id} deleted successfully`
  });
});

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie
};

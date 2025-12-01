
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MOVIES } from '../constants';
import { Movie } from '../types';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim()) {
      const filtered = MOVIES.filter(movie => 
        movie.title.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    if (isMenuOpen) closeMenu();
  };

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchResults([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Clear search on route change
  useEffect(() => {
    clearSearch();
  }, [location]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background-dark/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleMenu}
              className="md:hidden text-white/70 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-2xl">
                {isMenuOpen ? 'close' : 'menu'}
              </span>
            </button>

            <Link to="/" className="flex items-center gap-2 text-white" onClick={closeMenu}>
              <div className="size-8 text-primary">
                 <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_6_543)">
                    <path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z" fill="currentColor"></path>
                    <path clipRule="evenodd" d="M7.24189 26.4066C7.31369 26.4411 7.64204 26.5637 8.52504 26.3738C9.59462 26.1438 11.0343 25.5311 12.7183 24.4963C14.7583 23.2426 17.0256 21.4503 19.238 19.238C21.4503 17.0256 23.2426 14.7583 24.4963 12.7183C25.5311 11.0343 26.1438 9.59463 26.3738 8.52504C26.5637 7.64204 26.4411 7.31369 26.4066 7.24189C26.345 7.21246 26.143 7.14535 25.6664 7.1918C24.9745 7.25925 23.9954 7.5498 22.7699 8.14278C20.3369 9.32007 17.3369 11.4915 14.4142 14.4142C11.4915 17.3369 9.32007 20.3369 8.14278 22.7699C7.5498 23.9954 7.25925 24.9745 7.1918 25.6664C7.14534 26.143 7.21246 26.345 7.24189 26.4066ZM29.9001 10.7285C29.4519 12.0322 28.7617 13.4172 27.9042 14.8126C26.465 17.1544 24.4686 19.6641 22.0664 22.0664C19.6641 24.4686 17.1544 26.465 14.8126 27.9042C13.4172 28.7617 12.0322 29.4519 10.7285 29.9001L21.5754 40.747C21.6001 40.7606 21.8995 40.931 22.8729 40.7217C23.9424 40.4916 25.3821 39.879 27.0661 38.8441C29.1062 37.5904 31.3734 35.7982 33.5858 33.5858C35.7982 31.3734 37.5904 29.1062 38.8441 27.0661C39.879 25.3821 40.4916 23.9425 40.7216 22.8729C40.931 21.8995 40.7606 21.6001 40.747 21.5754L29.9001 10.7285ZM29.2403 4.41187L43.5881 18.7597C44.9757 20.1473 44.9743 22.1235 44.6322 23.7139C44.2714 25.3919 43.4158 27.2666 42.252 29.1604C40.8128 31.5022 38.8165 34.012 36.4142 36.4142C34.012 38.8165 31.5022 40.8128 29.1604 42.252C27.2666 43.4158 25.3919 44.2714 23.7139 44.6322C22.1235 44.9743 20.1473 44.9757 18.7597 43.5881L4.41187 29.2403C3.29027 28.1187 3.08209 26.5973 3.21067 25.2783C3.34099 23.9415 3.8369 22.4852 4.54214 21.0277C5.96129 18.0948 8.43335 14.7382 11.5858 11.5858C14.7382 8.43335 18.0948 5.9613 21.0277 4.54214C22.4852 3.8369 23.9415 3.34099 25.2783 3.21067C26.5973 3.08209 28.1187 3.29028 29.2403 4.41187Z" fill="currentColor" fillRule="evenodd"></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_6_543">
                      <rect fill="white" height="48" width="48"></rect>
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <h2 className="text-xl font-bold leading-tight tracking-[-0.015em]">Cinestarr</h2>
            </Link>
          </div>
          
          <div className="hidden md:flex flex-1 justify-center gap-8">
            <Link to="/" className={`text-sm font-medium leading-normal transition-colors ${isActive('/') ? 'text-white' : 'text-white/70 hover:text-white'}`}>Trang chủ</Link>
            <Link to="/schedule" className={`text-sm font-medium leading-normal transition-colors ${isActive('/schedule') ? 'text-white' : 'text-white/70 hover:text-white'}`}>Lịch chiếu</Link>
            <Link to="/cinemas" className={`text-sm font-medium leading-normal transition-colors ${isActive('/cinemas') ? 'text-white' : 'text-white/70 hover:text-white'}`}>Rạp</Link>
            <Link to="/promotions" className={`text-sm font-medium leading-normal transition-colors ${isActive('/promotions') ? 'text-white' : 'text-white/70 hover:text-white'}`}>Khuyến mãi</Link>
          </div>

          <div className="flex items-center gap-4">
             <div className="hidden sm:flex relative" ref={searchRef}>
                <input 
                    type="text" 
                    placeholder="Tìm kiếm phim..." 
                    className="bg-white/5 border-none rounded-lg py-2 px-4 pl-10 text-sm text-white focus:ring-1 focus:ring-primary w-32 lg:w-64 focus:w-48 transition-all"
                    value={searchQuery}
                    onChange={handleSearch}
                />
                 <span className="material-symbols-outlined absolute left-2 top-2 text-white/50 text-lg">search</span>
                 
                 {/* Desktop Search Results */}
                 {searchQuery && (
                    <div className="absolute top-full left-0 w-full mt-3 bg-surface-dark/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 ring-1 ring-white/5 animate-fade-in-up origin-top">
                        {searchResults.length > 0 ? (
                            <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
                                {searchResults.map(movie => (
                                    <Link 
                                        key={movie.id} 
                                        to={`/movie/${movie.id}`} 
                                        className="flex gap-4 p-4 hover:bg-white/5 transition-all items-center border-b border-white/5 last:border-0 group"
                                        onClick={clearSearch}
                                    >
                                        <div className="w-14 h-20 flex-shrink-0 rounded-md overflow-hidden shadow-lg bg-gray-800">
                                            <img 
                                                src={movie.poster} 
                                                alt={movie.title} 
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-bold text-white truncate group-hover:text-primary transition-colors">{movie.title}</h4>
                                            <p className="text-xs text-white/60 mt-1 truncate">{movie.genre}</p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <span className="text-[10px] font-bold bg-primary/20 text-primary px-2 py-0.5 rounded border border-primary/20">
                                                    {movie.rating}
                                                </span>
                                                <span className="text-[10px] text-white/40 flex items-center gap-1 border border-white/10 px-2 py-0.5 rounded bg-white/5">
                                                    <span className="material-symbols-outlined text-[12px]">schedule</span>
                                                    {movie.duration}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="p-6 text-sm text-white/50 text-center flex flex-col items-center gap-2">
                                <span className="material-symbols-outlined text-3xl opacity-50">movie_edit</span>
                                <span>Không tìm thấy phim phù hợp</span>
                            </div>
                        )}
                    </div>
                 )}
            </div>
            
            {/* Conditional Rendering based on Auth State */}
            {isAuthenticated ? (
                <>
                    <Link to="/history" className="flex cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 w-10 bg-white/10 text-white hover:bg-white/20 transition-colors" title="Lịch sử đặt vé">
                        <span className="material-symbols-outlined text-xl">confirmation_number</span>
                    </Link>
                    <Link to="/profile" className="flex cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 w-10 border-2 border-primary hover:border-primary-hover transition-all">
                        {user?.avatar ? (
                            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                        ) : (
                            <span className="material-symbols-outlined text-xl text-white">person</span>
                        )}
                    </Link>
                </>
            ) : (
                <Link to="/login" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary-hover transition-colors">
                    <span className="truncate">Đăng nhập</span>
                </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden absolute top-16 left-0 w-full bg-background-dark border-b border-white/10 shadow-2xl transition-all duration-300 ease-in-out origin-top z-40 ${
          isMenuOpen ? 'opacity-100 scale-y-100 max-h-[80vh] overflow-y-auto' : 'opacity-0 scale-y-0 max-h-0'
        }`}
      >
        <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
            <Link 
              to="/" 
              onClick={closeMenu} 
              className={`flex items-center gap-3 text-base font-medium py-2 border-b border-white/5 ${isActive('/') ? 'text-primary' : 'text-white/80'}`}
            >
              <span className="material-symbols-outlined">home</span> Trang chủ
            </Link>
            <Link 
              to="/schedule" 
              onClick={closeMenu} 
              className={`flex items-center gap-3 text-base font-medium py-2 border-b border-white/5 ${isActive('/schedule') ? 'text-primary' : 'text-white/80'}`}
            >
              <span className="material-symbols-outlined">calendar_month</span> Lịch chiếu
            </Link>
            <Link 
              to="/cinemas" 
              onClick={closeMenu} 
              className={`flex items-center gap-3 text-base font-medium py-2 border-b border-white/5 ${isActive('/cinemas') ? 'text-primary' : 'text-white/80'}`}
            >
              <span className="material-symbols-outlined">theaters</span> Rạp
            </Link>
            <Link 
              to="/promotions" 
              onClick={closeMenu} 
              className={`flex items-center gap-3 text-base font-medium py-2 border-b border-white/5 ${isActive('/promotions') ? 'text-primary' : 'text-white/80'}`}
            >
              <span className="material-symbols-outlined">local_activity</span> Khuyến mãi
            </Link>
            
            {/* Mobile Auth Links */}
            {isAuthenticated ? (
                <>
                    <Link 
                        to="/history" 
                        onClick={closeMenu}
                        className={`flex items-center gap-3 text-base font-medium py-2 border-b border-white/5 ${isActive('/history') ? 'text-primary' : 'text-white/80'}`}
                    >
                        <span className="material-symbols-outlined">confirmation_number</span> Lịch sử đặt vé
                    </Link>
                    <Link 
                        to="/profile" 
                        onClick={closeMenu}
                        className={`flex items-center gap-3 text-base font-medium py-2 border-b border-white/5 ${isActive('/profile') ? 'text-primary' : 'text-white/80'}`}
                    >
                        <span className="material-symbols-outlined">person</span> Hồ sơ cá nhân
                    </Link>
                </>
            ) : (
                <Link 
                    to="/login" 
                    onClick={closeMenu}
                    className="flex items-center gap-3 text-base font-medium py-2 border-b border-white/5 text-primary"
                >
                    <span className="material-symbols-outlined">login</span> Đăng nhập
                </Link>
            )}

            <div className="relative mt-2 sm:hidden">
                <input 
                    type="text" 
                    placeholder="Tìm kiếm phim..." 
                    className="w-full bg-white/5 border-none rounded-lg py-3 px-4 pl-10 text-sm text-white focus:ring-1 focus:ring-primary placeholder:text-white/40"
                    value={searchQuery}
                    onChange={handleSearch}
                />
                 <span className="material-symbols-outlined absolute left-3 top-3 text-white/50 text-lg">search</span>

                 {/* Mobile Search Results */}
                 {searchQuery && (
                    <div className="mt-4 bg-surface-dark rounded-xl overflow-hidden border border-white/10 shadow-lg ring-1 ring-white/5">
                        {searchResults.length > 0 ? (
                            <div className="max-h-[50vh] overflow-y-auto">
                                {searchResults.map(movie => (
                                    <Link 
                                        key={movie.id} 
                                        to={`/movie/${movie.id}`} 
                                        className="flex gap-4 p-4 hover:bg-white/5 transition-colors items-center border-b border-white/5 last:border-0 group"
                                        onClick={clearSearch}
                                    >
                                        <div className="w-14 h-20 flex-shrink-0 rounded-md overflow-hidden bg-white/5">
                                            <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-bold text-white truncate group-hover:text-primary transition-colors">{movie.title}</p>
                                            <p className="text-xs text-white/50 truncate mt-1">{movie.genre}</p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <span className="text-[10px] font-bold bg-primary/20 text-primary px-2 py-0.5 rounded border border-primary/20">{movie.rating}</span>
                                                <span className="text-[10px] text-white/40 flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[12px]">schedule</span>
                                                    {movie.duration}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="p-6 text-sm text-white/50 text-center flex flex-col items-center gap-2">
                                <span className="material-symbols-outlined text-2xl opacity-50">search_off</span>
                                <span>Không tìm thấy phim phù hợp</span>
                            </div>
                        )}
                    </div>
                 )}
            </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;

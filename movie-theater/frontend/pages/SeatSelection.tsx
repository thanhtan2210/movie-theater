
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MOVIES } from '../constants';

const ROWS_STANDARD = ['A', 'B', 'C', 'D'];
const ROW_COUPLE = 'E';

const SeatSelection: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const movie = MOVIES.find(m => m.id === Number(id)) || MOVIES[0];
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(585); // 09:45 in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const toggleSeat = (seatId: string) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  // Mock seat status logic
  const isOccupied = (row: string, num: number) => {
    // Manually setting occupied seats to match the general feel of the screenshot
    if (row === 'A' && (num === 3 || num === 7 || num === 8)) return true;
    if (row === 'B' && (num === 3 || num === 9 || num === 10)) return true;
    if (row === 'C' && (num === 3 || num === 4 || num === 7 || num === 8)) return true; // Visual gap logic might differ
    if (row === 'D' && (num === 3 || num === 4 || num === 7 || num === 8)) return true;
    if (row === 'E' && (num === 2 || num === 3)) return true; // Couple seat index
    return false;
  };

  const calculateTotal = () => {
    let total = 0;
    selectedSeats.forEach(seat => {
      if (seat.startsWith('E')) {
        total += 220000; // Couple seat price
      } else {
        total += 110000; // Standard price
      }
    });
    return total;
  };

  const standardCount = selectedSeats.filter(s => !s.startsWith('E')).length;
  const coupleCount = selectedSeats.filter(s => s.startsWith('E')).length;

  return (
    <div className="flex flex-col min-h-screen bg-background-dark text-white font-display">
      {/* Custom Header for Booking Flow */}
      <div className="bg-surface-dark/50 backdrop-blur-md border-b border-white/10 sticky top-0 z-30">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <button 
              onClick={() => navigate(-1)} 
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              <span className="hidden sm:inline font-medium">Quay lại</span>
            </button>
            <div className="h-8 w-px bg-white/10"></div>
            <div className="flex items-center gap-4">
               <div className="w-10 h-14 bg-gray-800 rounded overflow-hidden shadow-sm flex-shrink-0 hidden xs:block">
                  <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover" />
               </div>
               <div>
                 <h1 className="text-base sm:text-lg font-bold leading-tight">{movie.title}</h1>
                 <p className="text-xs sm:text-sm text-white/50 truncate max-w-[200px] sm:max-w-md">Rạp Cinestarr Thủ Đức | Phòng Chiếu 5 | Thứ Sáu, 24 Tháng 10, 19:30</p>
               </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        
        {/* Main Content - Seat Map */}
        <div className="flex-1 flex flex-col items-center">
           {/* Screen Visual */}
           <div className="w-full max-w-2xl mb-12 sm:mb-16 relative flex flex-col items-center">
              <div className="h-1.5 bg-white/20 rounded-full w-full shadow-[0_5px_20px_rgba(255,255,255,0.2)]"></div>
              <div className="h-12 w-[90%] bg-gradient-to-b from-white/10 to-transparent pointer-events-none transform perspective-[100px] rotate-x-12 origin-top"></div>
              <div className="text-white/20 text-xs tracking-[0.3em] font-medium mt-2 uppercase">Màn hình</div>
           </div>

           {/* Seats Container */}
           <div className="flex flex-col gap-3 sm:gap-4 mb-10 w-full max-w-4xl overflow-x-auto pb-8 px-4 sm:justify-center">
              {ROWS_STANDARD.map((row) => (
                <div key={row} className="flex items-center justify-center gap-6 sm:gap-8 min-w-max mx-auto">
                   <span className="w-6 text-center text-white/40 font-bold text-sm">{row}</span>
                   
                   <div className="flex gap-2 sm:gap-3">
                      {/* Left Block: 1-4 */}
                      {[1, 2, 3, 4].map(num => renderSeat(row, num))}
                   </div>
                   <div className="flex gap-2 sm:gap-3">
                      {/* Center Block: 5-8 */}
                      {[5, 6, 7, 8].map(num => renderSeat(row, num))}
                   </div>
                   <div className="flex gap-2 sm:gap-3">
                      {/* Right Block: 9-12 */}
                      {[9, 10, 11, 12].map(num => renderSeat(row, num))}
                   </div>

                   <span className="w-6 text-center text-white/40 font-bold text-sm">{row}</span>
                </div>
              ))}

              {/* Couple Seats Row - Spaced slightly more */}
              <div className="flex items-center justify-center gap-6 sm:gap-8 min-w-max mx-auto mt-4 sm:mt-6">
                 <span className="w-6 text-center text-white/40 font-bold text-sm">{ROW_COUPLE}</span>
                 
                 <div className="flex gap-2 sm:gap-3">
                    {/* Left Block: 2 couples */}
                    {[1, 2].map(num => renderCoupleSeat(ROW_COUPLE, num))}
                 </div>
                 <div className="flex gap-2 sm:gap-3">
                    {/* Center Block: 2 couples */}
                    {[3, 4].map(num => renderCoupleSeat(ROW_COUPLE, num))}
                 </div>
                 <div className="flex gap-2 sm:gap-3">
                    {/* Right Block: 2 couples */}
                    {[5, 6].map(num => renderCoupleSeat(ROW_COUPLE, num))}
                 </div>

                 <span className="w-6 text-center text-white/40 font-bold text-sm">{ROW_COUPLE}</span>
              </div>
           </div>

           {/* Legend */}
           <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-sm text-white/60">
              <div className="flex items-center gap-2">
                 <div className="w-5 h-5 rounded bg-white/10 border border-white/5"></div>
                 <span>Ghế trống</span>
              </div>
              <div className="flex items-center gap-2">
                 <div className="w-5 h-5 rounded bg-primary border-2 border-white/30 shadow-[0_0_10px_rgba(59,130,246,0.6)]"></div>
                 <span>Ghế đang chọn</span>
              </div>
              <div className="flex items-center gap-2">
                 <div className="w-5 h-5 rounded bg-gray-800 border border-white/10 flex items-center justify-center text-[10px] text-white/20 font-bold">×</div> 
                 <span>Ghế đã đặt</span>
              </div>
              <div className="flex items-center gap-2">
                 <div className="w-5 h-5 rounded bg-purple-500/10 border border-purple-500/20"></div>
                 <span>Ghế VIP / Đôi</span>
              </div>
           </div>
        </div>

        {/* Sidebar Summary */}
        <div className="w-full lg:w-[380px] flex-shrink-0">
           <div className="bg-[#1c2431] rounded-2xl p-6 shadow-2xl border border-white/5 sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Vé Của Bạn</h2>
              
              <div className="space-y-4 mb-6">
                 <div className="flex justify-between items-start text-white/80">
                    <span className="text-white/60">Ghế đã chọn:</span>
                    <span className="text-white font-bold text-lg text-right w-1/2 break-words">
                       {selectedSeats.length > 0 ? selectedSeats.join(', ') : '-'}
                    </span>
                 </div>
                 <div className="flex justify-between items-start text-white/80">
                    <span className="text-white/60">Loại vé:</span>
                    <div className="text-right flex flex-col items-end">
                       {standardCount > 0 && <span className="text-white font-medium">{standardCount} Vé đơn</span>}
                       {coupleCount > 0 && <span className="text-white font-medium">{coupleCount} Vé đôi</span>}
                       {selectedSeats.length === 0 && <span className="text-white font-medium">-</span>}
                    </div>
                 </div>
              </div>

              <div className="border-t border-dashed border-white/10 my-6"></div>

              <div className="flex justify-between items-end mb-6">
                 <span className="text-white/80 text-lg font-medium">Tổng tiền</span>
                 <span className="text-2xl sm:text-3xl font-bold text-primary">{calculateTotal().toLocaleString()}đ</span>
              </div>

              <div className="bg-[#135bec]/10 border border-[#135bec]/30 rounded-lg p-3 text-center mb-6">
                 <p className="text-[#135bec] text-sm font-medium">Thời gian giữ ghế còn lại: <span className="font-bold text-base">{formatTime(timeLeft)}</span></p>
              </div>

              <button 
                 onClick={() => navigate('/payment')}
                 disabled={selectedSeats.length === 0}
                 className="w-full py-3.5 bg-primary text-white font-bold text-lg rounded-xl hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-primary/25"
              >
                 Thanh Toán
              </button>
           </div>
        </div>

      </div>
    </div>
  );

  function renderSeat(row: string, num: number) {
    const seatId = `${row}${num}`;
    const occupied = isOccupied(row, num);
    const selected = selectedSeats.includes(seatId);

    return (
      <button
        key={seatId}
        onClick={() => !occupied && toggleSeat(seatId)}
        disabled={occupied}
        className={`
          w-8 h-8 sm:w-10 sm:h-10 rounded-md flex items-center justify-center text-[10px] font-bold transition-all duration-200 ease-out transform relative
          ${occupied 
            ? 'bg-gray-800 border border-white/10 cursor-not-allowed text-white/20' 
            : selected 
              ? 'bg-primary text-white shadow-[0_0_15px_rgba(59,130,246,0.6)] scale-110 border-2 border-white/30 z-10' 
              : 'bg-white/10 hover:bg-white/20 hover:scale-105 active:scale-95 hover:shadow-lg border border-white/5 text-transparent hover:text-white/30'}
        `}
      >
        {selected ? seatId : (occupied ? '×' : '')}
      </button>
    );
  }

  function renderCoupleSeat(row: string, num: number) {
    // Generate an ID for couple seat, e.g., E1-E2
    const seatId = `${row}${num * 2 - 1}-${row}${num * 2}`; 
    const occupied = isOccupied(row, num);
    const selected = selectedSeats.includes(seatId);

    return (
      <button
        key={seatId}
        onClick={() => !occupied && toggleSeat(seatId)}
        disabled={occupied}
        className={`
          w-[72px] sm:w-[88px] h-8 sm:h-10 rounded-md flex items-center justify-center text-[10px] font-bold transition-all duration-200 ease-out transform relative
          ${occupied 
            ? 'bg-gray-800 border border-white/10 cursor-not-allowed text-white/20' 
            : selected 
              ? 'bg-purple-600 text-white shadow-[0_0_20px_rgba(147,51,234,0.6)] scale-105 border-2 border-white/30 z-10' 
              : 'bg-purple-500/10 hover:bg-purple-500/30 hover:scale-105 active:scale-95 hover:shadow-lg border border-purple-500/20 text-transparent hover:text-white/30'}
        `}
      >
        {selected ? seatId : (occupied ? '×' : '')}
      </button>
    );
  }
};

export default SeatSelection;

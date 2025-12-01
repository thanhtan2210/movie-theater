
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_TICKETS } from '../constants';
import { Ticket } from '../types';

const BookingHistory: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>(MOCK_TICKETS);
  const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'past'>('all');

  const handleCancelTicket = (ticketId: string) => {
    if (window.confirm('Bạn có chắc chắn muốn hủy vé này không? Hành động này không thể hoàn tác.')) {
      setTickets(prevTickets => 
        prevTickets.map(ticket => 
          ticket.id === ticketId ? { ...ticket, status: 'Cancelled' as const } : ticket
        )
      );
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    if (activeTab === 'all') return true;
    if (activeTab === 'upcoming') return ticket.status === 'Upcoming';
    if (activeTab === 'past') return ticket.status === 'Past' || ticket.status === 'Cancelled';
    return true;
  });

  return (
    <div className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-white mb-8">Lịch Sử Đặt Vé</h1>
      
      <div className="flex gap-4 mb-8 overflow-x-auto pb-2 no-scrollbar">
        <button 
          onClick={() => setActiveTab('all')}
          className={`px-6 py-2 rounded-full font-medium text-sm transition-colors whitespace-nowrap ${activeTab === 'all' ? 'bg-primary text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}
        >
          Tất cả
        </button>
        <button 
          onClick={() => setActiveTab('upcoming')}
          className={`px-6 py-2 rounded-full font-medium text-sm transition-colors whitespace-nowrap ${activeTab === 'upcoming' ? 'bg-primary text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}
        >
          Sắp tới
        </button>
        <button 
          onClick={() => setActiveTab('past')}
          className={`px-6 py-2 rounded-full font-medium text-sm transition-colors whitespace-nowrap ${activeTab === 'past' ? 'bg-primary text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}
        >
          Đã xem / Hủy
        </button>
      </div>

      <div className="space-y-6">
        {filteredTickets.length > 0 ? (
          filteredTickets.map((ticket) => (
            <div key={ticket.id} className="bg-surface-dark rounded-xl p-4 md:p-6 border border-white/10 hover:border-white/20 transition-all group animate-fade-in-up">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-32 lg:w-40 flex-shrink-0">
                  <img src={ticket.poster} alt={ticket.movieTitle} className="w-full rounded-lg shadow-md aspect-[2/3] object-cover" />
                </div>
                
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                      <span className={`text-xs font-bold px-2 py-1 rounded uppercase ${
                          ticket.status === 'Upcoming' ? 'bg-green-500/20 text-green-500' : 
                          ticket.status === 'Past' ? 'bg-gray-500/20 text-gray-400' : 'bg-red-500/20 text-red-500'
                      }`}>
                          {ticket.status === 'Upcoming' ? 'Sắp tới' : ticket.status === 'Past' ? 'Đã xem' : 'Đã hủy'}
                      </span>
                      <span className="text-white/40 text-sm">#{ticket.id}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">{ticket.movieTitle}</h3>
                  
                  <div className="space-y-1 text-sm text-white/60 mb-6">
                      <p>{ticket.showtime}</p>
                      <p>{ticket.cinemaName} | {ticket.room}</p>
                      <p>Ghế: <span className="text-white font-medium">{ticket.seats.join(', ')}</span></p>
                  </div>

                  <div className="mt-auto flex flex-wrap gap-3">
                      {ticket.status === 'Upcoming' && (
                           <>
                              <Link to={`/ticket/${ticket.id}`} className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors flex items-center gap-2">
                                  <span className="material-symbols-outlined text-lg">qr_code</span> Xem vé
                              </Link>
                              <button 
                                onClick={() => handleCancelTicket(ticket.id)}
                                className="px-4 py-2 bg-white/10 text-white/70 rounded-lg text-sm font-medium hover:bg-red-500/20 hover:text-red-500 transition-colors"
                              >
                                  Hủy vé
                              </button>
                           </>
                      )}
                      {ticket.status !== 'Upcoming' && (
                          <Link to={`/ticket/${ticket.id}`} className="px-4 py-2 bg-white/10 text-white/70 rounded-lg text-sm font-medium hover:bg-white/20 hover:text-white transition-colors">
                               Xem chi tiết
                          </Link>
                      )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 border-2 border-dashed border-white/10 rounded-xl">
              <div className="inline-block p-4 bg-white/5 rounded-full mb-4">
                  <span className="material-symbols-outlined text-4xl text-white/20">confirmation_number</span>
              </div>
              <h3 className="text-white text-xl font-bold mb-2">Không tìm thấy vé nào</h3>
              <p className="text-white/60 mb-6 max-w-sm mx-auto">Bạn chưa có lịch sử đặt vé nào trong mục này.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingHistory;

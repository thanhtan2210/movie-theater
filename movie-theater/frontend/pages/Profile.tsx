
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Notification } from '../types';
import { MOCK_NOTIFICATIONS } from '../constants';

type Tab = 'info' | 'notifications' | 'password';

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<Tab>('info');
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);

  useEffect(() => {
    if (location.state && location.state.tab) {
        setActiveTab(location.state.tab as Tab);
    }
  }, [location.state]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getTabClass = (tab: Tab) => {
    const baseClass = "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors w-full text-left";
    if (activeTab === tab) {
        return `${baseClass} bg-primary/10 text-primary font-medium`;
    }
    return `${baseClass} text-white/70 hover:bg-white/5 hover:text-white`;
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id: number) => {
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const deleteNotification = (id: number, e: React.MouseEvent) => {
      e.stopPropagation();
      setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAllNotifications = () => {
      if (window.confirm("Bạn có chắc chắn muốn xóa tất cả thông báo không?")) {
          setNotifications([]);
      }
  };
  
  const markAllAsRead = () => {
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const getIconForType = (type: string) => {
      switch(type) {
          case 'booking': return { icon: 'confirmation_number', color: 'text-primary', bg: 'bg-primary/20' };
          case 'promo': return { icon: 'redeem', color: 'text-green-500', bg: 'bg-green-500/20' };
          case 'info': return { icon: 'movie', color: 'text-yellow-500', bg: 'bg-yellow-500/20' };
          default: return { icon: 'notifications', color: 'text-white', bg: 'bg-white/10' };
      }
  };

  const renderContent = () => {
    switch (activeTab) {
        case 'info':
            return (
                <div className="animate-fade-in-up">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-white mb-2">Hồ sơ của bạn</h1>
                        <p className="text-white/60">Quản lý thông tin cá nhân và cài đặt tài khoản của bạn.</p>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl mb-8 border border-white/10">
                        <div className="flex items-center gap-4">
                             <div className="w-16 h-16 rounded-full bg-cover bg-center" style={{ backgroundImage: `url("${user?.avatar || 'https://picsum.photos/seed/user/200/200'}")` }}></div>
                             <div>
                                 <p className="text-white font-bold">{user?.name}</p>
                                 <p className="text-white/50 text-sm">Thành viên từ 2023</p>
                             </div>
                        </div>
                        <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg transition-colors">
                            Thay đổi ảnh
                        </button>
                    </div>

                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">Họ và Tên</label>
                            <input type="text" defaultValue={user?.name} className="w-full bg-background-dark border border-white/20 rounded-lg px-4 py-3 text-white focus:ring-primary focus:border-primary" />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">Email</label>
                            <input type="email" defaultValue={user?.email} readOnly className="w-full bg-background-dark/50 border border-white/10 rounded-lg px-4 py-3 text-white/50 cursor-not-allowed focus:ring-0 focus:border-white/10" />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">Số điện thoại</label>
                            <input type="tel" defaultValue="0901234567" className="w-full bg-background-dark border border-white/20 rounded-lg px-4 py-3 text-white focus:ring-primary focus:border-primary" />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">Ngày sinh</label>
                            <input type="date" defaultValue="1995-08-15" className="w-full bg-background-dark border border-white/20 rounded-lg px-4 py-3 text-white focus:ring-primary focus:border-primary" />
                        </div>

                        <div className="md:col-span-2 flex justify-end gap-4 mt-4 pt-6 border-t border-white/10">
                            <button type="button" className="px-6 py-3 rounded-lg border border-white/20 text-white font-bold hover:bg-white/5 transition-colors">
                                Hủy
                            </button>
                            <button type="submit" className="px-6 py-3 rounded-lg bg-primary text-white font-bold hover:bg-primary-hover transition-colors">
                                Lưu thay đổi
                            </button>
                        </div>
                    </form>
                </div>
            );
        case 'notifications':
            return (
                <div className="animate-fade-in-up">
                    <div className="mb-6 flex flex-wrap justify-between items-end gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-white mb-2">Thông báo</h1>
                            <p className="text-white/60">Cập nhật tin tức, ưu đãi và trạng thái đặt vé của bạn.</p>
                        </div>
                        {notifications.length > 0 && (
                            <div className="flex gap-2">
                                <button onClick={markAllAsRead} className="text-xs text-primary hover:text-primary-hover font-medium px-3 py-1.5 rounded-lg border border-primary/30 hover:bg-primary/10 transition-colors">
                                    Đánh dấu đã đọc
                                </button>
                                <button onClick={clearAllNotifications} className="text-xs text-red-500 hover:text-red-400 font-medium px-3 py-1.5 rounded-lg border border-red-500/30 hover:bg-red-500/10 transition-colors">
                                    Xóa tất cả
                                </button>
                            </div>
                        )}
                    </div>
                    
                    {notifications.length > 0 ? (
                        <div className="space-y-3">
                            {notifications.map(notification => {
                                const style = getIconForType(notification.type);
                                return (
                                    <div 
                                        key={notification.id}
                                        onClick={() => markAsRead(notification.id)}
                                        className={`p-4 rounded-xl border flex gap-4 transition-all cursor-pointer group relative overflow-hidden ${
                                            !notification.isRead 
                                            ? 'bg-white/10 border-primary/30' 
                                            : 'bg-white/5 border-white/10 opacity-80 hover:opacity-100'
                                        }`}
                                    >
                                        {!notification.isRead && (
                                            <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>
                                        )}
                                        
                                        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${style.bg} flex items-center justify-center ${style.color} shrink-0`}>
                                            <span className="material-symbols-outlined text-xl">{style.icon}</span>
                                        </div>
                                        
                                        <div className="flex-1 pr-6">
                                            <div className="flex justify-between items-start mb-1">
                                                <h4 className={`font-bold text-sm sm:text-base ${!notification.isRead ? 'text-white' : 'text-white/80'}`}>
                                                    {notification.title}
                                                </h4>
                                                <span className="text-white/40 text-xs whitespace-nowrap ml-2">{notification.time}</span>
                                            </div>
                                            <p className="text-white/70 text-sm leading-relaxed">{notification.message}</p>
                                        </div>

                                        <button 
                                            onClick={(e) => deleteNotification(notification.id, e)}
                                            className="absolute bottom-2 right-2 p-2 text-white/20 hover:text-red-500 hover:bg-white/5 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                                            title="Xóa thông báo"
                                        >
                                            <span className="material-symbols-outlined text-lg">delete</span>
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-16 border-2 border-dashed border-white/10 rounded-xl bg-white/5">
                            <div className="inline-block p-4 bg-white/5 rounded-full mb-4">
                                <span className="material-symbols-outlined text-4xl text-white/20">notifications_off</span>
                            </div>
                            <h3 className="text-white font-medium mb-1">Không có thông báo mới</h3>
                            <p className="text-white/40 text-sm">Bạn đã cập nhật tất cả thông tin.</p>
                        </div>
                    )}
                </div>
            );
        case 'password':
            return (
                <div className="animate-fade-in-up">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-white mb-2">Đổi mật khẩu</h1>
                        <p className="text-white/60">Vui lòng nhập mật khẩu hiện tại để thay đổi mật khẩu mới.</p>
                    </div>
                    <form className="max-w-lg space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">Mật khẩu hiện tại</label>
                            <div className="relative">
                                <input type="password" placeholder="Nhập mật khẩu hiện tại" className="w-full bg-background-dark border border-white/20 rounded-lg px-4 py-3 text-white focus:ring-primary focus:border-primary pr-10" />
                                <span className="material-symbols-outlined absolute right-3 top-3 text-white/40 cursor-pointer hover:text-white/60">visibility_off</span>
                            </div>
                        </div>
                        <div className="pt-2">
                            <label className="block text-sm font-medium text-white/80 mb-2">Mật khẩu mới</label>
                            <div className="relative">
                                <input type="password" placeholder="Nhập mật khẩu mới" className="w-full bg-background-dark border border-white/20 rounded-lg px-4 py-3 text-white focus:ring-primary focus:border-primary pr-10" />
                                <span className="material-symbols-outlined absolute right-3 top-3 text-white/40 cursor-pointer hover:text-white/60">visibility_off</span>
                            </div>
                            <p className="text-white/40 text-xs mt-2">Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số.</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">Xác nhận mật khẩu mới</label>
                            <div className="relative">
                                <input type="password" placeholder="Nhập lại mật khẩu mới" className="w-full bg-background-dark border border-white/20 rounded-lg px-4 py-3 text-white focus:ring-primary focus:border-primary pr-10" />
                                <span className="material-symbols-outlined absolute right-3 top-3 text-white/40 cursor-pointer hover:text-white/60">visibility_off</span>
                            </div>
                        </div>

                        <div className="flex justify-end pt-6 border-t border-white/10">
                            <button type="submit" className="px-6 py-3 rounded-lg bg-primary text-white font-bold hover:bg-primary-hover transition-colors shadow-lg shadow-primary/20">
                                Cập nhật mật khẩu
                            </button>
                        </div>
                    </form>
                </div>
            );
        default:
            return null;
    }
  };

  return (
    <div className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto">
            
            {/* Sidebar */}
            <aside className="w-full md:w-64 flex-shrink-0">
                <div className="bg-surface-dark rounded-xl p-6 border border-white/10 text-center mb-6">
                    <div className="w-24 h-24 mx-auto rounded-full bg-cover bg-center mb-4 border-2 border-primary" style={{ backgroundImage: `url("${user?.avatar || 'https://picsum.photos/seed/user/200/200'}")` }}></div>
                    <h2 className="text-white font-bold text-lg">{user?.name}</h2>
                    <p className="text-white/50 text-sm">{user?.email}</p>
                </div>
                
                <nav className="flex flex-col gap-2">
                    <button 
                        onClick={() => setActiveTab('info')}
                        className={getTabClass('info')}
                    >
                        <span className="material-symbols-outlined">person</span> Thông tin cá nhân
                    </button>
                    <button 
                        onClick={() => navigate('/history')} 
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/5 hover:text-white transition-colors w-full text-left"
                    >
                        <span className="material-symbols-outlined">confirmation_number</span> Lịch sử đặt vé
                    </button>
                     <button 
                        onClick={() => setActiveTab('notifications')}
                        className={getTabClass('notifications')}
                    >
                        <span className="material-symbols-outlined">notifications</span> Thông báo
                        {unreadCount > 0 && (
                            <span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                {unreadCount}
                            </span>
                        )}
                    </button>
                     <button 
                        onClick={() => setActiveTab('password')}
                        className={getTabClass('password')}
                    >
                        <span className="material-symbols-outlined">lock</span> Đổi mật khẩu
                    </button>
                    <button 
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-500/80 hover:bg-red-500/10 hover:text-red-500 transition-colors mt-4 w-full text-left"
                    >
                        <span className="material-symbols-outlined">logout</span> Đăng xuất
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 bg-surface-dark rounded-xl border border-white/10 p-6 md:p-8 min-h-[500px]">
                {renderContent()}
            </main>
        </div>
    </div>
  );
};

export default Profile;

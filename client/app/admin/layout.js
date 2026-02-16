'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import {
    CalendarDays,
    Newspaper,
    ShoppingBag,
    Users,
    FileText,
    LogOut,
    LayoutDashboard,
    Image,
    Menu,
    X,
    Phone
} from 'lucide-react';

export default function AdminLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const pathname = usePathname();
    const { logout, admin } = useAuth();

    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    const navItems = [
        { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Events', href: '/admin/events', icon: CalendarDays },
        { name: 'News', href: '/admin/news', icon: Newspaper },
        { name: 'Shop', href: '/admin/shop', icon: ShoppingBag },
        { name: 'Carousel', href: '/admin/carousel', icon: Image },
        { name: 'Submissions', href: '/admin/submissions', icon: FileText },
        { name: 'Book a Call', href: '/admin/book-call', icon: Phone },
    ];

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
                {/* Mobile Header */}
                <div className="md:hidden bg-black text-white p-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold">Admin Portal</h1>
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Sidebar */}
                <aside
                    className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-purple-900 to-black text-white transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                        }`}
                >
                    <div className="p-6 flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold">Admin Portal</h1>
                            <p className="text-sm text-purple-200 mt-1">Afrobeats San Diego</p>
                        </div>
                        <button onClick={() => setIsSidebarOpen(false)} className="md:hidden">
                            <X size={24} />
                        </button>
                    </div>

                    <nav className="mt-6">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsSidebarOpen(false)}
                                    className={`flex items-center gap-3 px-6 py-3 transition ${isActive
                                        ? 'bg-purple-700 border-l-4 border-white'
                                        : 'hover:bg-purple-800'
                                        }`}
                                >
                                    <Icon size={20} />
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="absolute bottom-0 w-64 p-6 border-t border-purple-700">
                        {admin && (
                            <div className="mb-4">
                                <p className="text-sm text-purple-200">Logged in as:</p>
                                <p className="text-sm font-semibold truncate">{admin.email}</p>
                            </div>
                        )}
                        <button
                            onClick={logout}
                            className="flex items-center gap-2 w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
                        >
                            <LogOut size={18} />
                            <span>Logout</span>
                        </button>
                    </div>
                </aside>

                {/* Overlay for mobile */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-40 md:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                    ></div>
                )}

                {/* Main Content */}
                <main className="flex-1 overflow-auto h-[calc(100vh-64px)] md:h-screen">
                    <div className="p-4 md:p-8">
                        {children}
                    </div>
                </main>
            </div>
        </ProtectedRoute>
    );
}

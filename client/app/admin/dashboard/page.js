'use client';
import { useState, useEffect } from 'react';
import apiClient from '@/lib/api';
import { Calendar, Newspaper, ShoppingBag, Users } from 'lucide-react';

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        events: 0,
        news: 0,
        shopItems: 0,
        connectSubmissions: 0,
        calendarSubmissions: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const [events, news, shop, connect, calendar] = await Promise.all([
                apiClient.get('/events'),
                apiClient.get('/news'),
                apiClient.get('/shop'),
                apiClient.get('/connect'),
                apiClient.get('/calendar'),
            ]);

            setStats({
                events: events.data?.length || 0,
                news: news.data?.length || 0,
                shopItems: shop.data?.length || 0,
                connectSubmissions: connect.data?.length || 0,
                calendarSubmissions: calendar.data?.length || 0,
            });
        } catch (error) {
            console.error('Failed to fetch stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        { title: 'Total Events', value: stats.events, icon: Calendar, color: 'bg-blue-500' },
        { title: 'News Posts', value: stats.news, icon: Newspaper, color: 'bg-green-500' },
        { title: 'Shop Items', value: stats.shopItems, icon: ShoppingBag, color: 'bg-purple-500' },
        { title: 'Connect Submissions', value: stats.connectSubmissions, icon: Users, color: 'bg-orange-500' },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statCards.map((card, index) => {
                    const Icon = card.icon;
                    return (
                        <div key={index} className="bg-white rounded-xl shadow-md p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-sm font-medium">{card.title}</p>
                                    <p className="text-3xl font-bold text-gray-900 mt-2">{card.value}</p>
                                </div>
                                <div className={`${card.color} p-3 rounded-lg`}>
                                    <Icon className="text-white" size={24} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <a
                        href="/admin/events"
                        className="p-4 border-2 border-purple-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition"
                    >
                        <h3 className="font-semibold text-gray-900">Manage Events</h3>
                        <p className="text-sm text-gray-600 mt-1">Add, edit, or delete calendar events</p>
                    </a>
                    <a
                        href="/admin/news"
                        className="p-4 border-2 border-purple-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition"
                    >
                        <h3 className="font-semibold text-gray-900">Manage News</h3>
                        <p className="text-sm text-gray-600 mt-1">Create and manage news posts</p>
                    </a>
                    <a
                        href="/admin/submissions"
                        className="p-4 border-2 border-purple-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition"
                    >
                        <h3 className="font-semibold text-gray-900">View Submissions</h3>
                        <p className="text-sm text-gray-600 mt-1">
                            Review calendar and connect submissions
                            {stats.calendarSubmissions > 0 && (
                                <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                    {stats.calendarSubmissions} pending
                                </span>
                            )}
                        </p>
                    </a>
                </div>
            </div>
        </div>
    );
}

'use client';
import { useState, useEffect } from 'react';
import apiClient from '@/lib/api';
import { CheckCircle, XCircle, Calendar, Users } from 'lucide-react';

export default function AdminSubmissions() {
    const [calendarSubmissions, setCalendarSubmissions] = useState([]);
    const [connectSubmissions, setConnectSubmissions] = useState([]);
    const [activeTab, setActiveTab] = useState('calendar');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSubmissions();
    }, []);

    const fetchSubmissions = async () => {
        try {
            const [calendar, connect] = await Promise.all([
                apiClient.get('/calendar'),
                apiClient.get('/connect'),
            ]);
            setCalendarSubmissions(calendar.data || []);
            setConnectSubmissions(connect.data || []);
        } catch (error) {
            alert('Failed to fetch submissions');
        } finally {
            setLoading(false);
        }
    };

    const approveCalendarEvent = async (id) => {
        const time = prompt('Enter event time (e.g., 7:00 PM):');
        const link = prompt('Enter event link (optional):');
        if (!time) return;

        try {
            await apiClient.put(`/calendar/${id}/approve`, { time, link: link || '' });
            alert('Event approved and published!');
            fetchSubmissions();
        } catch (error) {
            alert('Failed to approve event');
        }
    };

    const deleteSubmission = async (type, id) => {
        if (!confirm('Delete this submission?')) return;
        try {
            await apiClient.delete(`/${type}/${id}`);
            alert('Submission deleted!');
            fetchSubmissions();
        } catch (error) {
            alert('Failed to delete');
        }
    };

    if (loading) return <div className="flex justify-center p-8"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div></div>;

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Submissions</h1>

            <div className="flex gap-4 mb-6">
                <button
                    onClick={() => setActiveTab('calendar')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${activeTab === 'calendar' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                >
                    <Calendar size={20} />
                    Calendar Events ({calendarSubmissions.length})
                </button>
                <button
                    onClick={() => setActiveTab('connect')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${activeTab === 'connect' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                >
                    <Users size={20} />
                    Connect Forms ({connectSubmissions.length})
                </button>
            </div>

            {activeTab === 'calendar' && (
                <div className="space-y-4">
                    {calendarSubmissions.length === 0 ? (
                        <div className="bg-white rounded-xl p-8 text-center text-gray-500">No calendar submissions yet</div>
                    ) : (
                        calendarSubmissions.map((sub) => (
                            <div key={sub._id} className="bg-white rounded-xl shadow-md p-6">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-gray-900">{sub.eventTitle}</h3>
                                        <p className="text-gray-600 mt-2">{sub.eventDetails}</p>
                                        <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                                            <div><span className="font-semibold">Submitted by:</span> {sub.name}</div>
                                            <div><span className="font-semibold">Email:</span> {sub.email}</div>
                                            <div><span className="font-semibold">Date:</span> {new Date(sub.eventDate).toLocaleDateString()}</div>
                                            <div><span className="font-semibold">Location:</span> {sub.location || 'N/A'}</div>
                                            <div><span className="font-semibold">Phone:</span> {sub.phone || 'N/A'}</div>
                                            <div><span className="font-semibold">Status:</span> <span className={`px-2 py-1 rounded ${sub.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{sub.status}</span></div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 ml-4">
                                        {sub.status !== 'approved' && (
                                            <button
                                                onClick={() => approveCalendarEvent(sub._id)}
                                                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                                            >
                                                <CheckCircle size={18} /> Approve
                                            </button>
                                        )}
                                        <button
                                            onClick={() => deleteSubmission('calendar', sub._id)}
                                            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                                        >
                                            <XCircle size={18} /> Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {activeTab === 'connect' && (
                <div className="space-y-4">
                    {connectSubmissions.length === 0 ? (
                        <div className="bg-white rounded-xl p-8 text-center text-gray-500">No connect form submissions yet</div>
                    ) : (
                        connectSubmissions.map((sub) => (
                            <div key={sub._id} className="bg-white rounded-xl shadow-md p-6">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-gray-900">{sub.name} - {sub.role}</h3>
                                        <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                                            <div><span className="font-semibold">Role:</span> {sub.role}</div>
                                            {sub.equipment && <div><span className="font-semibold">Equipment:</span> {sub.equipment}</div>}
                                            {sub.demo && <div><span className="font-semibold">Demo:</span> {sub.demo}</div>}
                                            {sub.style && <div><span className="font-semibold">Style:</span> {sub.style}</div>}
                                            {sub.description && <div className="col-span-2"><span className="font-semibold">Description:</span> {sub.description}</div>}
                                            {sub.rate && <div><span className="font-semibold">Rate:</span> {sub.rate}</div>}
                                            {sub.location && <div><span className="font-semibold">Location:</span> {sub.location}</div>}
                                            {sub.availability && <div><span className="font-semibold">Availability:</span> {sub.availability}</div>}
                                            <div><span className="font-semibold">Submitted:</span> {new Date(sub.createdAt).toLocaleDateString()}</div>
                                            <div><span className="font-semibold">Status:</span> <span className={`px-2 py-1 rounded ${sub.status === 'new' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>{sub.status}</span></div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => deleteSubmission('connect', sub._id)}
                                        className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 ml-4"
                                    >
                                        <XCircle size={18} /> Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

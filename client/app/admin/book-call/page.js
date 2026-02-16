'use client';
import { useState, useEffect } from 'react';
import apiClient from '@/lib/api';
import { Trash2, Calendar, Mail, Phone, User } from 'lucide-react';
import { format } from 'date-fns';

export default function AdminBookCall() {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSubmissions();
    }, []);

    const fetchSubmissions = async () => {
        try {
            const response = await apiClient.get('/forms/book-call');
            setSubmissions(response.data || []);
        } catch (error) {
            alert('Failed to fetch submissions');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this submission?')) return;
        try {
            await apiClient.delete(`/forms/book-call/${id}`);
            alert('Submission deleted');
            fetchSubmissions();
        } catch (error) {
            alert('Failed to delete');
        }
    };

    if (loading) return <div className="flex justify-center p-8"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div></div>;

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Book a Call Submissions</h1>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                {submissions.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">No submissions yet.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-600">Date</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-600">Name</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-600">Contact</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-600">Message</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {submissions.map((item) => (
                                    <tr key={item._id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                                            {format(new Date(item.createdAt), 'MMM dd, yyyy')}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <User size={16} className="text-purple-500" />
                                                <span className="font-medium text-gray-900">{item.fullName}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1 text-sm text-gray-600">
                                                <div className="flex items-center gap-2">
                                                    <Mail size={14} /> {item.email}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Phone size={14} /> {item.phoneNumber}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700 max-w-xs truncate">
                                            {item.message}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleDelete(item._id)}
                                                className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition"
                                                title="Delete"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

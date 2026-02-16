'use client';
import { useState, useEffect } from 'react';
import apiClient from '@/lib/api';
import { Plus, Edit, Trash2, Calendar, Upload } from 'lucide-react';

export default function AdminEvents() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        phone: '',
        link: '',
        image: '',
    });

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await apiClient.get('/events');
            setEvents(response.data || []);
        } catch (error) {
            alert('Failed to fetch events');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingEvent) {
                await apiClient.put(`/events/${editingEvent._id}`, formData);
                alert('Event updated successfully!');
            } else {
                await apiClient.post('/events', formData);
                alert('Event created successfully!');
            }
            setShowModal(false);
            resetForm();
            fetchEvents();
        } catch (error) {
            alert('Failed to save event');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this event?')) return;
        try {
            await apiClient.delete(`/events/${id}`);
            alert('Event deleted successfully!');
            fetchEvents();
        } catch (error) {
            alert('Failed to delete event');
        }
    };

    const handleEdit = (event) => {
        setEditingEvent(event);
        setFormData({
            title: event.title,
            description: event.description,
            date: event.date.split('T')[0],
            time: event.time,
            location: event.location || '',
            phone: event.phone || '',
            link: event.link || '',
            image: event.image || '',
        });
        setShowModal(true);
    };

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            date: '',
            time: '',
            location: '',
            phone: '',
            link: '',
            image: '',
        });
        setEditingEvent(null);
    };

    const [uploading, setUploading] = useState(false);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('image', file);
            formData.append('folder', 'events');

            const response = await apiClient.post('/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.success) {
                setFormData({ ...formData, image: response.url });
            }
        } catch (error) {
            alert('Failed to upload image: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    if (loading) {
        return <div className="flex justify-center p-8"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div></div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Events Management</h1>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
                >
                    <Plus size={20} />
                    Add Event
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {events.map((event) => (
                            <tr key={event._id}>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        {event.image && (
                                            <img src={event.image} alt={event.title} className="w-12 h-12 rounded object-cover" />
                                        )}
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">{event.title}</div>
                                            <div className="text-sm text-gray-500">{event.description.substring(0, 50)}...</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    {new Date(event.date).toLocaleDateString()} - {event.time}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">{event.location || 'N/A'}</td>
                                <td className="px-6 py-4 text-right text-sm font-medium">
                                    <button onClick={() => handleEdit(event)} className="text-blue-600 hover:text-blue-900 mr-4">
                                        <Edit size={18} />
                                    </button>
                                    <button onClick={() => handleDelete(event._id)} className="text-red-600 hover:text-red-900">
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-6">{editingEvent ? 'Edit Event' : 'Add New Event'}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg"
                                    rows="3"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                                    <input
                                        type="date"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-lg"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                                    <input
                                        type="text"
                                        value={formData.time}
                                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-lg"
                                        placeholder="7:00 PM"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                                <input
                                    type="text"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                                <input
                                    type="text"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Event Link</label>
                                <input
                                    type="url"
                                    value={formData.link}
                                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Event Image</label>
                                <div className="flex flex-col gap-4">
                                    {formData.image && (
                                        <div className="relative w-full h-40 group">
                                            <img src={formData.image} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                                            <button
                                                type="button"
                                                onClick={() => setFormData({ ...formData, image: '' })}
                                                className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                                            >
                                                <Plus size={16} className="rotate-45" />
                                            </button>
                                        </div>
                                    )}
                                    <label className={`w-full h-32 flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer transition ${uploading ? 'bg-gray-100' : 'hover:bg-gray-50 border-gray-300'}`}>
                                        <Upload size={32} className={`mb-2 ${uploading ? 'animate-bounce text-purple-600' : 'text-gray-400'}`} />
                                        <span className="text-sm text-gray-500">
                                            {uploading ? 'Uploading to Cloudinary...' : 'Click to upload image'}
                                        </span>
                                        <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} disabled={uploading} />
                                    </label>
                                </div>
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => { setShowModal(false); resetForm(); }}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={uploading}
                                    className={`flex-1 px-4 py-2 text-white rounded-lg transition ${uploading ? 'bg-purple-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'}`}
                                >
                                    {editingEvent ? 'Update' : 'Create'} Event
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

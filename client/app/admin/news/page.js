'use client';
import { useState, useEffect } from 'react';
import apiClient from '@/lib/api';
import { Plus, Edit, Trash2, TrendingUp, Upload } from 'lucide-react';

export default function AdminNews() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingNews, setEditingNews] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        thumbnail: '',
        trending: false,
        author: 'AfroBeat San Diego',
        link: '',
    });

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const response = await apiClient.get('/news');
            setNews(response.data || []);
        } catch (error) {
            alert('Failed to fetch news');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.thumbnail) {
            alert('Please upload a thumbnail image');
            return;
        }

        try {
            if (editingNews) {
                await apiClient.put(`/news/${editingNews._id}`, formData);
                alert('News updated successfully!');
            } else {
                await apiClient.post('/news', formData);
                alert('News created successfully!');
            }
            setShowModal(false);
            resetForm();
            fetchNews();
        } catch (error) {
            console.error('Save error:', error);
            alert(error.message || 'Failed to save news');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this news post?')) return;
        try {
            await apiClient.delete(`/news/${id}`);
            alert('News deleted!');
            fetchNews();
        } catch (error) {
            alert(error.message || 'Failed to delete');
        }
    };

    const handleEdit = (item) => {
        setEditingNews(item);
        setFormData({
            title: item.title,
            thumbnail: item.thumbnail,
            trending: item.trending,
            author: item.author,
            link: item.link,
        });
        setShowModal(true);
    };

    const resetForm = () => {
        setFormData({ title: '', thumbnail: '', trending: false, author: 'AfroBeat San Diego', link: '' });
        setEditingNews(null);
    };

    const [uploading, setUploading] = useState(false);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('image', file);
            formData.append('folder', 'news');

            const response = await apiClient.post('/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.success) {
                setFormData(prev => ({ ...prev, thumbnail: response.url }));
            }
        } catch (error) {
            alert('Failed to upload image: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    if (loading) return <div className="flex justify-center p-8"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div></div>;

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <h1 className="text-3xl font-bold text-gray-900">News Management</h1>
                <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                    <Plus size={20} /> Add News
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {news.map((item) => (
                    <div key={item._id} className="bg-white rounded-xl shadow-md overflow-hidden">
                        <img src={item.thumbnail} alt={item.title} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-semibold text-gray-900 flex-1">{item.title.substring(0, 60)}...</h3>
                                {item.trending && <TrendingUp size={16} className="text-red-500" />}
                            </div>
                            <p className="text-sm text-gray-500 mb-4">{item.author}</p>
                            <div className="flex gap-2">
                                <button onClick={() => handleEdit(item)} className="flex-1 text-blue-600 border border-blue-600 px-3 py-1 rounded hover:bg-blue-50">
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(item._id)} className="flex-1 text-red-600 border border-red-600 px-3 py-1 rounded hover:bg-red-50">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-6">{editingNews ? 'Edit News' : 'Add News'}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                                <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-2 border rounded-lg" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail Image</label>
                                <div className="flex flex-col gap-4">
                                    {formData.thumbnail && (
                                        <div className="relative w-full h-40 group">
                                            <img src={formData.thumbnail} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                                            <button
                                                type="button"
                                                onClick={() => setFormData({ ...formData, thumbnail: '' })}
                                                className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                                            >
                                                <Plus size={16} className="rotate-45" />
                                            </button>
                                        </div>
                                    )}
                                    <label className={`w-full h-32 flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer transition ${uploading ? 'bg-gray-100' : 'hover:bg-gray-50 border-gray-300'}`}>
                                        <Upload size={32} className={`mb-2 ${uploading ? 'animate-bounce text-purple-600' : 'text-gray-400'}`} />
                                        <span className="text-sm text-gray-500">
                                            {uploading ? 'Uploading to Cloudinary...' : 'Click to upload thumbnail'}
                                        </span>
                                        <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} disabled={uploading} />
                                    </label>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Link</label>
                                <input type="url" value={formData.link} onChange={(e) => setFormData({ ...formData, link: e.target.value })} className="w-full px-4 py-2 border rounded-lg" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                                <input type="text" value={formData.author} onChange={(e) => setFormData({ ...formData, author: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
                            </div>
                            <div className="flex items-center">
                                <input type="checkbox" checked={formData.trending} onChange={(e) => setFormData({ ...formData, trending: e.target.checked })} className="mr-2" />
                                <label className="text-sm font-medium text-gray-700">Mark as Trending</label>
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button type="button" onClick={() => { setShowModal(false); resetForm(); }} className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50">Cancel</button>
                                <button
                                    type="submit"
                                    disabled={uploading}
                                    className={`flex-1 px-4 py-2 text-white rounded-lg transition ${uploading ? 'bg-purple-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'}`}
                                >
                                    {editingNews ? 'Update' : 'Create'} News
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

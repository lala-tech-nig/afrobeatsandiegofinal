'use client';
import { useState, useEffect } from 'react';
import apiClient from '@/lib/api';
import { Plus, Edit, Trash2, DollarSign, Upload } from 'lucide-react';

export default function AdminShop() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        image: '',
        purchaseLink: '',
        category: 'merchandise',
        inStock: true,
    });

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await apiClient.get('/shop');
            setItems(response.data || []);
        } catch (error) {
            alert('Failed to fetch shop items');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.image) {
            alert("Please upload an image first.");
            return;
        }

        if (!formData.purchaseLink) {
            alert("Please enter a purchase link.");
            return;
        }

        try {
            // Ensure price is a valid number
            const priceValue = parseFloat(formData.price);
            const validPrice = isNaN(priceValue) ? 0 : priceValue;

            const dataToSend = {
                ...formData,
                price: validPrice
            };

            console.log("Sending shop item:", dataToSend);

            if (editingItem) {
                await apiClient.put(`/shop/${editingItem._id}`, dataToSend);
                alert('Item updated!');
            } else {
                await apiClient.post('/shop', dataToSend);
                alert('Item created!');
            }
            setShowModal(false);
            resetForm();
            fetchItems();
        } catch (error) {
            console.error("Save error:", error);
            const message = error.response?.data?.message || 'Failed to save item';
            alert(message);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this item?')) return;
        try {
            await apiClient.delete(`/shop/${id}`);
            alert('Item deleted!');
            fetchItems();
        } catch (error) {
            alert('Failed to delete');
        }
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setFormData({
            title: item.title,
            description: item.description,
            price: item.price.toString(),
            image: item.image,
            purchaseLink: item.purchaseLink,
            category: item.category,
            inStock: item.inStock,
        });
        setShowModal(true);
    };

    const resetForm = () => {
        setFormData({ title: '', description: '', price: '', image: '', purchaseLink: '', category: 'merchandise', inStock: true });
        setEditingItem(null);
    };

    const [uploading, setUploading] = useState(false);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        setUploading(true);
        try {
            const uploadData = new FormData();
            uploadData.append('image', file);
            uploadData.append('folder', 'shop');

            const response = await apiClient.post('/upload', uploadData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.success) {
                setFormData(prev => ({ ...prev, image: response.url }));
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
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Shop Management</h1>
                <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
                    <Plus size={20} /> Add Item
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item) => (
                    <div key={item._id} className="bg-white rounded-xl shadow-md overflow-hidden">
                        <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                            <p className="text-sm text-gray-600 mb-2">{item.description.substring(0, 60)}...</p>
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-lg font-bold text-purple-600">${item.price}</span>
                                {!item.inStock && <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">Out of Stock</span>}
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => handleEdit(item)} className="flex-1 text-blue-600 border border-blue-600 px-3 py-1 rounded hover:bg-blue-50 transition">Edit</button>
                                <button onClick={() => handleDelete(item._id)} className="flex-1 text-red-600 border border-red-600 px-3 py-1 rounded hover:bg-red-50 transition">Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-6">{editingItem ? 'Edit Item' : 'Add Item'}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                                <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" rows="3" required />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
                                    <input type="number" step="0.01" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                    <input type="text" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
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
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Purchase Link</label>
                                <input type="url" value={formData.purchaseLink} onChange={(e) => setFormData({ ...formData, purchaseLink: e.target.value })} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" required />
                            </div>
                            <div className="flex items-center">
                                <input type="checkbox" id="inStock" checked={formData.inStock} onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })} className="mr-2 w-4 h-4 text-purple-600 rounded" />
                                <label htmlFor="inStock" className="text-sm font-medium text-gray-700">In Stock</label>
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button type="button" onClick={() => { setShowModal(false); resetForm(); }} className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50 transition">Cancel</button>
                                <button
                                    type="submit"
                                    disabled={uploading}
                                    className={`flex-1 px-4 py-2 text-white rounded-lg transition ${uploading ? 'bg-purple-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'}`}
                                >
                                    {editingItem ? 'Update' : 'Create'} Item
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

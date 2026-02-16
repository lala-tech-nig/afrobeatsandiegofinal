'use client';
import { useState, useEffect } from 'react';
import apiClient from '@/lib/api';
import uploadToCloudinary from '@/lib/uploadToCloudinary';
import { Upload, Trash2, AlertCircle, Image as ImageIcon } from 'lucide-react';

export default function AdminCarousel() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const response = await apiClient.get('/carousel/admin');
            setImages(response.data || []);
            setError('');
        } catch (error) {
            setError('Failed to fetch carousel images');
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setError('Please select an image file');
            return;
        }

        // Check if we already have 5 images
        if (images.length >= 5) {
            setError('Maximum of 5 carousel images allowed. Please delete one before uploading.');
            return;
        }

        setUploading(true);
        setError('');

        try {
            const formData = new FormData();
            formData.append('image', file);
            formData.append('folder', 'carousel');

            const response = await apiClient.post('/carousel', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.success) {
                await fetchImages();
                e.target.value = ''; // Reset file input
            }
        } catch (error) {
            setError(error.message || 'Failed to upload image');
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this carousel image?')) return;

        try {
            await apiClient.delete(`/carousel/${id}`);
            await fetchImages();
            setError('');
        } catch (error) {
            setError('Failed to delete image');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center p-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Carousel Management</h1>
                    <p className="text-gray-600 mt-2">
                        Manage homepage hero carousel images (Maximum: 5 images)
                    </p>
                </div>
                <div className="text-right">
                    <div className="text-sm text-gray-600 mb-2">
                        {images.length} / 5 images
                    </div>
                    <label
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition ${images.length >= 5 || uploading
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-purple-600 text-white hover:bg-purple-700'
                            }`}
                    >
                        <Upload size={20} />
                        {uploading ? 'Uploading...' : 'Upload Image'}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleUpload}
                            disabled={images.length >= 5 || uploading}
                            className="hidden"
                        />
                    </label>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
                    <AlertCircle size={20} />
                    {error}
                </div>
            )}

            {images.length >= 5 && (
                <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
                    <AlertCircle size={20} />
                    Maximum carousel limit reached. Delete an image to upload a new one.
                </div>
            )}

            {images.length === 0 ? (
                <div className="bg-white rounded-xl p-12 text-center">
                    <ImageIcon size={64} className="mx-auto text-gray-400 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No carousel images yet</h3>
                    <p className="text-gray-600">Upload your first carousel image to get started</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {images.map((image, index) => (
                        <div key={image._id} className="bg-white rounded-xl shadow-md overflow-hidden">
                            <div className="relative aspect-video">
                                <img
                                    src={image.image}
                                    alt={image.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                    #{index + 1}
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="font-semibold text-gray-900 mb-2">{image.title}</h3>
                                <div className="flex items-center justify-between mt-3">
                                    <span className={`text-xs px-2 py-1 rounded ${image.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                        {image.active ? 'Active' : 'Inactive'}
                                    </span>
                                    <button
                                        onClick={() => handleDelete(image._id)}
                                        className="flex items-center gap-2 text-red-600 hover:text-red-700 transition"
                                    >
                                        <Trash2 size={18} />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="mt-8 bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-lg">
                <h4 className="font-semibold mb-2">Tips:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Use high-quality images with 16:9 aspect ratio for best results</li>
                    <li>Recommended minimum resolution: 1920x1080 pixels</li>
                    <li>Images are automatically optimized by Cloudinary</li>
                    <li>Maximum file size: 5MB</li>
                </ul>
            </div>
        </div>
    );
}

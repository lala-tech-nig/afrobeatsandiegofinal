import apiClient from './api';

/**
 * Upload file to Cloudinary via backend API
 * @param {File} file - The file to upload
 * @param {string} folder - Optional folder name in Cloudinary
 * @param {Function} onProgress - Optional progress callback
 * @returns {Promise<{url: string, publicId: string}>}
 */
export async function uploadToCloudinary(file, folder = 'afrobeats-sandiego', onProgress = null) {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('folder', folder);

    try {
        // Note: Progress tracking would require XMLHttpRequest instead of fetch
        const response = await apiClient.post('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        if (response.success) {
            return {
                url: response.url,
                publicId: response.publicId,
                filename: response.filename,
            };
        } else {
            throw new Error(response.message || 'Upload failed');
        }
    } catch (error) {
        throw new Error(error.message || 'Failed to upload image');
    }
}

export default uploadToCloudinary;

import React, { useState, useEffect } from 'react';
import apiClient from '../lib/api';

const ShoppingSectionNew = () => {
  const [shopItems, setShopItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShopItems = async () => {
      try {
        const response = await apiClient.get('/shop');
        if (response.data && response.data.success) {
          setShopItems(response.data.data || []);
        } else if (Array.isArray(response.data)) {
          // Handle case where API might return array directly
          setShopItems(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch shop items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShopItems();
  }, []);

  if (loading) {
    return (
      <section className="w-full py-20 px-6 bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-100 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </section>
    );
  }

  return (
    <section className="w-full flex justify-center items-center py-20 px-4 bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-100">
      <div className="w-full max-w-7xl flex flex-col items-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 drop-shadow-lg">
          Our Shop
        </h2>
        <p className="text-lg sm:text-xl text-center mb-10 max-w-3xl text-gray-700 font-medium">
          Support the Afrobeats community by shopping our exclusive merchandise.
        </p>

        {shopItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {shopItems.map((item) => (
              <div
                key={item._id}
                className="group relative bg-white rounded-3xl shadow-xl overflow-hidden border-2 border-purple-100 cursor-pointer transition-transform hover:-translate-y-2 hover:shadow-2xl"
                onClick={() => window.open(item.purchaseLink || '#', '_blank')}
                role="button"
                tabIndex={0}
              >
                <div className="h-64 w-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-purple-600">${item.price}</span>
                    <span className="px-4 py-2 bg-black text-white rounded-full text-sm font-semibold group-hover:bg-purple-600 transition-colors">
                      Buy Now
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full max-w-4xl bg-white rounded-[3rem] border-4 border-purple-200 p-10 text-center shadow-lg">
            <p className="text-2xl text-gray-500 font-medium">New merchandise dropping soon! Stay tuned.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ShoppingSectionNew;
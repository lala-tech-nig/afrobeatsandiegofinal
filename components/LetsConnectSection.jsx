'use client';
import React from 'react';
import ConnectForm from './ConnectForm';
import { motion } from 'framer-motion';

const LetsConnectSection = () => {
  return (
    <section
      className="py-20 px-6 w-full bg-cover bg-center relative"
      // style={{
      //   backgroundImage: `url('/connect-bg.jpg')`, // 💡 make sure this image exists in your public folder
      // }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 backdrop-blur-sm z-0" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Top Left Heading Animation */}
        <motion.h1
          className="text-4xl font-extrabold text-purple-400 uppercase mb-4"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          LET’S CONNECT
        </motion.h1>

        {/* Centered Subtitle Animation */}
        <motion.p
          className="text-center font-semibold text-xl md:text-2xl mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Help us connect with you and how to better serve you and work with you,
          <br />
          our vision and mission is wild.
        </motion.p>

        {/* Connect Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <ConnectForm />
        </motion.div>
      </div>
    </section>
  );
};

export default LetsConnectSection;

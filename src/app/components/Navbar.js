'use client';

import { motion } from 'framer-motion'

const Navbar = () => {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-white body-font bg-gray-900 bg-opacity-80 backdrop-blur-md fixed w-full z-10"
    >
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <motion.a 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex title-font font-medium items-center text-white mb-4 md:mb-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-purple-500 rounded-full" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">SP IMG</span>
        </motion.a>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <motion.a 
            whileHover={{ scale: 1.1, color: '#A78BFA' }}
            whileTap={{ scale: 0.95 }}
            className="mr-5 hover:text-purple-300 cursor-pointer transition-colors duration-300"
          >
            Home
          </motion.a>
          <motion.a 
            whileHover={{ scale: 1.1, color: '#A78BFA' }}
            whileTap={{ scale: 0.95 }}
            className="mr-5 hover:text-purple-300 cursor-pointer transition-colors duration-300"
          >
            About
          </motion.a>
          <motion.a 
            whileHover={{ scale: 1.1, color: '#A78BFA' }}
            whileTap={{ scale: 0.95 }}
            className="mr-5 hover:text-purple-300 cursor-pointer transition-colors duration-300"
          >
            Contact
          </motion.a>
        </nav>
      </div>
    </motion.header>
  )
}

export default Navbar
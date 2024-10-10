'use client';

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Hero = () => {
	const [text, setText] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const gen = async () => {
		setIsLoading(true);
		const url = 'https://open-ai21.p.rapidapi.com/texttoimage2';
		const options = {
			method: 'POST',
			headers: {
				'x-rapidapi-key': 'cf00acd9bemsh5f026ed14164853p12f8e3jsn81b1b27a8a58',
				'x-rapidapi-host': 'open-ai21.p.rapidapi.com',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ text: text })
		};

		try {
			const response = await fetch(url, options);
			const result = await response.json();
			if (result && result.generated_image) {
				setImageUrl(result.generated_image);
			} else {
				console.error('No image URL in the response');
			}
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	}

	const handleDownload = () => {
		const link = document.createElement('a');
		link.href = imageUrl;
		link.download = 'generated-image.png';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	return (
		<motion.section 
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			className="bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 w-full min-h-screen flex flex-col justify-center items-center p-4 text-white"
		>
			<div className="w-full max-w-4xl mx-auto text-center">
				<motion.h1 
					initial={{ y: -50, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ delay: 0.2, duration: 0.8 }}
					className="mb-4 text-5xl font-extrabold tracking-tight leading-none md:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
				>
					Transform Text to Image
				</motion.h1>
				<motion.p 
					initial={{ y: 50, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ delay: 0.4, duration: 0.8 }}
					className="mb-8 text-lg font-normal sm:px-16 xl:px-48 text-gray-300"
				>
					Enter your text below and watch as AI brings your words to life in stunning visuals.
				</motion.p>
				
				<motion.div 
					initial={{ scale: 0.8, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ delay: 0.6, duration: 0.5 }}
					className="flex flex-col items-center mb-8 space-y-4"
				>
					<input
						type="text"
						value={text}
						onChange={(e) => setText(e.target.value)}
						className="w-full p-4 text-white border-2 border-purple-500 rounded-lg bg-gray-800 bg-opacity-50 shadow-lg sm:text-md focus:ring-4 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ease-in-out placeholder-gray-400"
						placeholder="Describe your image here..."
					/>
					
					<motion.button
						whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(167, 139, 250, 0.5)" }}
						whileTap={{ scale: 0.95 }}
						onClick={gen}
						disabled={isLoading}
						className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 focus:ring-4 focus:ring-purple-500 disabled:opacity-50 transition-all duration-300 ease-in-out"
					>
						{isLoading ? (
							<svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
								<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
								<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
							</svg>
						) : (
							<svg
								className="mr-2 -ml-1 w-5 h-5"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
							</svg>
						)}
						{isLoading ? 'Generating...' : 'Generate Image'}
					</motion.button>
				</motion.div>

				{/* Image display area */}
				<AnimatePresence>
					{imageUrl && (
						<motion.div 
							initial={{ opacity: 0, y: 50 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 50 }}
							transition={{ duration: 0.5 }}
							className="mt-8 w-full max-w-2xl mx-auto" // Increased max-width
						>
							<div className="bg-gray-800 bg-opacity-30 backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105">
								<motion.img 
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.5 }}
									src={imageUrl} 
									alt="Generated" 
									className="object-contain w-full h-96" // Increased height
								/>
								<div className="p-4 bg-gradient-to-r from-purple-900 to-indigo-900 bg-opacity-50 backdrop-blur-sm">
									<motion.button
										whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(167, 139, 250, 0.5)" }}
										whileTap={{ scale: 0.95 }}
										onClick={handleDownload}
										className="w-full py-2 px-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:from-purple-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 transition-all duration-300 ease-in-out"
									>
										<svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
										</svg>
										Download Image
									</motion.button>
								</div>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</motion.section>
	);
};

export default Hero;
'use client';
import { motion } from 'framer-motion';
import Navbar from '../components/navbar';
import profilePic from '../assets/images/alex.jpeg';
import danishpng from '../assets/images/3.png';
import danishpdf from '../assets/pdf/DA_AlexWentzel-CV.pdf';
import NoiseFilter from '../components/noiseFilter';

const CVPage = () => {
  return (
    <div className="flex bg-gray-100 min-h-screen relative">
      {/* Noise filter overlay */}
      <NoiseFilter />

      {/* Main Content Area */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl p-8 w-full mx-auto my-8 bg-transparent"
      >
        {/* PDF Preview Section */}
        <div className="grid grid-cols-2 gap-8 mb-16">
          <div className="text-center">
            <img
              src={danishpng}
              alt="Dansk CV forhåndsvisning"
              className="mb-4 rounded-lg shadow-md"
            />
            <a
              href={danishpdf}
              download
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Download på dansk
            </a>
          </div>
          <div className="text-center">
            <img
              src="/path/to/english-pdf-preview.jpg"
              alt="English CV preview"
              className="mb-4 rounded-lg shadow-md"
            />
            <a
              href="/path/to/english-cv.pdf"
              download
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Download in English
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CVPage;

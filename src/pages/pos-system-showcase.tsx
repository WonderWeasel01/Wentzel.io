import React from 'react';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Vibrant from '../assets/pos/vibrant.png';
import pos1 from '../assets/pos/pos1.png';
import pos2 from '../assets/pos/pos2.png';
import pos3 from '../assets/pos/pos3.png';
import pos4 from '../assets/pos/pos4.png';

import {
  BarChart3,
  CreditCard,
  ExternalLink,
  Package,
  Receipt,
  ShoppingCart,
  Tablet,
  Users,
} from 'lucide-react';
import NoiseFilter from '../components/noiseFilter';
import { shapes } from '../components/shapes';

// Placeholder for actual screenshots - replace with your real screenshots
const screenshots = [pos1, pos2, pos3, pos4];

const POSSystemShowcase = () => {
  const [randomShapes, setRandomShapes] = useState<string[]>([]);
  const [activeScreenshot, setActiveScreenshot] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Generate random shapes once on mount
    setRandomShapes(
      Array.from(
        { length: 5 },
        () => shapes[Math.floor(Math.random() * shapes.length)]
      )
    );

    // Auto-rotate screenshots
    const interval = setInterval(() => {
      setActiveScreenshot((prev) => (prev + 1) % screenshots.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen bg-stone-100 text-stone-900 selection:bg-amber-200 selection:text-stone-900 overflow-x-hidden">
      {/* Noise Filter Overlay */}
      <NoiseFilter />

      {/* Main Content Area */}
      <main className="flex flex-col w-full min-h-[100vh] p-4 overflow-hidden relative">
        {/* Development Status Banner */}
        <div className="bg-amber-100 text-amber-800 py-3 rounded-lg mb-8 border border-amber-200 shadow-sm">
          <p className="text-center font-medium">
            🚧 GadeFest POS is currently under development. This system will be
            completed for the event on May 3rd. 🚧
          </p>
        </div>

        {/* Background grain pattern */}
        <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-[url('/grain-pattern.svg')] bg-repeat opacity-30"></div>
        </div>

        <div className="relative z-10">
          {/* Hero Section */}
          <motion.section
            className="py-24 relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <motion.h1
                  className="text-5xl md:text-6xl font-bold mb-6 grainy-text"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  GadeFest POS
                </motion.h1>
                <motion.p
                  className="text-xl md:text-2xl max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  Streamlined point-of-sale system for festivals and events
                </motion.p>
              </div>

              <div className="grid grid-cols-1 gap-12 items-center">
                {/* iPad Mockup */}
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  {/* iPad Mockup */}
                  <div className="relative z-10 flex justify-center">
                    {/* iPad Mockup - Landscape Orientation - bredere format */}
                    <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[500px] w-[900px] max-w-[90vw] shadow-xl rotate-0">
                      {/* Volume buttons - flyttet til toppen */}
                      <div className="w-[35px] h-[4px] bg-gray-800 left-[30%] -translate-x-1/2 top-[-17px] absolute rounded-t-lg"></div>
                      <div className="w-[35px] h-[4px] bg-gray-800 left-[36%] -translate-x-1/2 top-[-17px] absolute rounded-t-lg"></div>

                      {/* Power button - flyttet til bunden */}
                      <div className="w-[40px] h-[4px] bg-gray-800 left-[50%] -translate-x-1/2 bottom-[-17px] absolute rounded-b-lg"></div>

                      {/* Camera at top - keeping this as it was nice */}
                      <div className="w-[8px] h-[8px] bg-gray-800 top-[15px] left-[15px] absolute rounded-full"></div>

                      <div className="rounded-[2rem] overflow-hidden w-full h-full bg-white">
                        {/* Screenshots Carousel */}
                        <div className="relative w-full h-full">
                          {screenshots.map((src, index) => (
                            <div
                              key={index}
                              className={`absolute inset-0 transition-opacity duration-1000 ${
                                index === activeScreenshot
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              }`}
                            >
                              <img
                                src={src}
                                alt={`POS System Screenshot ${index + 1}`}
                                className="w-full h-full object-contain"
                              />
                            </div>
                          ))}

                          {/* Screenshot Indicators */}
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                            {screenshots.map((_, index) => (
                              <button
                                key={index}
                                className={`w-3 h-3 rounded-full ${
                                  index === activeScreenshot
                                    ? 'bg-amber-500'
                                    : 'bg-gray-300'
                                }`}
                                onClick={() => setActiveScreenshot(index)}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Rotating Shape 1 */}
                  <motion.div
                    className="absolute -bottom-10 -left-10 w-28 h-28 z-1"
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 9,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: 'linear',
                    }}
                  >
                    <div
                      className="w-full h-full"
                      style={{
                        mask: `url(${randomShapes[0]}) center/contain no-repeat`,
                        WebkitMask: `url(${randomShapes[0]}) center/contain no-repeat`,
                        backgroundColor: '#A5FFD6',
                      }}
                    />
                  </motion.div>

                  {/* Rotating Shape 2 */}
                  <motion.div
                    className="absolute -top-10 right-0 w-20 h-20 z-10"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 7,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: 'linear',
                    }}
                  >
                    <div
                      className="w-full h-full"
                      style={{
                        mask: `url(${randomShapes[1]}) center/contain no-repeat`,
                        WebkitMask: `url(${randomShapes[1]}) center/contain no-repeat`,
                        backgroundColor: '#FFD700',
                      }}
                    />
                  </motion.div>
                </motion.div>

                {/* App Description - flyttet til under iPad'en */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="max-w-4xl mx-auto"
                >
                  <h2 className="text-3xl font-bold mb-6 text-center">
                    Powerful POS for Festivals
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-amber-100 p-3 rounded-lg">
                        <ShoppingCart className="w-6 h-6 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Quick Sales</h3>
                        <p className="text-stone-700">
                          Process transactions rapidly with an intuitive touch
                          interface
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-amber-100 p-3 rounded-lg">
                        <Package className="w-6 h-6 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">
                          Inventory Management
                        </h3>
                        <p className="text-stone-700">
                          Track stock levels in real-time with automatic updates
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-amber-100 p-3 rounded-lg">
                        <BarChart3 className="w-6 h-6 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">
                          Sales Analytics
                        </h3>
                        <p className="text-stone-700">
                          View comprehensive sales data and performance metrics
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-amber-100 p-3 rounded-lg">
                        <CreditCard className="w-6 h-6 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">
                          Vibrant Integration
                        </h3>
                        <p className="text-stone-700">
                          Seamless payment processing with Vibrant payment
                          system
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 flex flex-wrap gap-4 justify-center">
                    <a
                      href="#demo"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors"
                    >
                      <Tablet className="w-5 h-5" />
                      Preview Demo (Not Available)
                    </a>
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 px-6 py-3 border border-stone-300 rounded-lg hover:bg-stone-200 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                      Contact Us
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* Tech Stack Section */}
          <motion.section
            className="py-16 relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center grainy-text">
                Built With Modern Technology
              </h2>

              <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24">
                {/* Vibrant Logo */}
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 bg-white rounded-xl shadow-md flex items-center justify-center p-4">
                    {/* Replace with actual Vibrant logo */}

                    <img
                      src={Vibrant}
                      alt="Vibrant Payments Logo"
                      className="w-24 h-24"
                    />
                  </div>
                  <p className="font-medium">Vibrant Payments</p>
                </div>

                {/* React Logo */}
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 bg-white rounded-xl shadow-md flex items-center justify-center p-4">
                    <svg
                      viewBox="-11.5 -10.23174 23 20.46348"
                      className="w-24 h-24"
                    >
                      <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
                      <g stroke="#61dafb" strokeWidth="1" fill="none">
                        <ellipse rx="11" ry="4.2" />
                        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
                      </g>
                    </svg>
                  </div>
                  <p className="font-medium">React</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Timeline Section - Replacing Key Features */}
          <motion.section
            className="py-24 relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center grainy-text">
                Development Timeline
              </h2>

              <div className="relative border-l-2 border-amber-500 ml-4 md:ml-0 md:mx-auto md:max-w-3xl pl-8 md:pl-0">
                {[
                  {
                    date: 'Marts 1, 2025',
                    title: 'Project Kickoff',
                    description:
                      'Initial planning and requirements gathering for the GadeFest POS system',
                    status: 'Completed',
                  },
                  {
                    date: 'Marts 10, 2025',
                    title: 'UI Design & Prototyping',
                    description:
                      'Design of user interface and creation of interactive prototypes',
                    status: 'In Progress',
                  },
                  {
                    date: 'April 1, 2025',
                    title: 'Core Functionality',
                    description:
                      'Implementation of sales processing and inventory management features',
                    status: 'Upcoming',
                  },
                  {
                    date: 'April 10, 2025',
                    title: 'Vibrant Integration',
                    description:
                      'Integration with Vibrant payment processing system',
                    status: 'Upcoming',
                  },
                  {
                    date: 'April 25, 2025',
                    title: 'Testing & Deployment',
                    description:
                      'Final testing and deployment preparation for the event',
                    status: 'Upcoming',
                  },
                  {
                    date: 'May 3, 2025',
                    title: 'Event Launch',
                    description:
                      'Official launch of the POS system at GadeFest',
                    status: 'Upcoming',
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="mb-12 md:grid md:grid-cols-5 md:gap-8 relative"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    {/* Timeline dot */}
                    <div className="absolute -left-[25px] md:static md:flex md:justify-end md:items-center">
                      <div
                        className={`w-4 h-4 rounded-full ${
                          item.status === 'Completed'
                            ? 'bg-green-500'
                            : item.status === 'In Progress'
                            ? 'bg-amber-500'
                            : 'bg-gray-300'
                        } md:mr-4`}
                      ></div>
                    </div>

                    {/* Date */}
                    <div className="md:text-right md:col-span-2">
                      <p className="font-medium text-stone-600">{item.date}</p>
                    </div>

                    {/* Content */}
                    <div className="md:col-span-2">
                      <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                      <p className="text-stone-700">{item.description}</p>
                      <span
                        className={`inline-block mt-2 px-2 py-1 text-xs rounded-full ${
                          item.status === 'Completed'
                            ? 'bg-green-100 text-green-800'
                            : item.status === 'In Progress'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Rotating Shape 4 */}
              <motion.div
                className="absolute top-1/2 -left-10 w-16 h-16 z-10"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 9,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: 'linear',
                }}
              >
                <div
                  className="w-full h-full"
                  style={{
                    mask: `url(${randomShapes[3]}) center/contain no-repeat`,
                    WebkitMask: `url(${randomShapes[3]}) center/contain no-repeat`,
                    backgroundColor: '#FFA07A',
                  }}
                />
              </motion.div>

              {/* Rotating Shape 5 */}
              <motion.div
                className="absolute bottom-20 right-0 w-20 h-20 z-10"
                animate={{ rotate: -360 }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: 'linear',
                }}
              >
                <div
                  className="w-full h-full"
                  style={{
                    mask: `url(${randomShapes[4]}) center/contain no-repeat`,
                    WebkitMask: `url(${randomShapes[4]}) center/contain no-repeat`,
                    backgroundColor: '#20B2AA',
                  }}
                />
              </motion.div>
            </div>
          </motion.section>

          {/* Screenshots Section */}
          <motion.section
            id="demo"
            className="py-24 relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center grainy-text">
                System Screenshots
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {screenshots.map((src, index) => (
                  <motion.div
                    key={index}
                    className="rounded-xl overflow-hidden shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <img
                      src={src}
                      alt={`POS System Screenshot ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        </div>
      </main>
    </div>
  );
};

export default POSSystemShowcase;

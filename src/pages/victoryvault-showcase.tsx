import React from 'react';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import {
  Download,
  ExternalLink,
  Trophy,
  Users,
  BarChart2,
  Share2,
} from 'lucide-react';
import NoiseFilter from '../components/NoiseFilter';
import { shapes } from '../components/shapes';

// In Vite, you can import images directly
import mockupScreenshot1 from '../assets/victoryvault/vv1.jpg';
import mockupScreenshot2 from '../assets/victoryvault/vv2.jpg';

const VictoryVaultShowcase = () => {
  const [randomShapes, setRandomShapes] = useState<string[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Generate random shapes once on mount
    setRandomShapes(
      Array.from(
        { length: 5 },
        () => shapes[Math.floor(Math.random() * shapes.length)]
      )
    );
  }, []);

  return (
    <div className="flex min-h-screen bg-stone-100 text-stone-900 selection:bg-amber-200 selection:text-stone-900 overflow-x-hidden">
      {/* Noise Filter Overlay */}
      <NoiseFilter />

      {/* Main Content Area */}
      <main className="flex flex-col w-full min-h-[100vh] p-4 overflow-hidden relative">
        {/* Development Status Banner */}
        <div className="bg-amber-100 text-amber-800 px-4 py-3 rounded-lg mb-8 border border-amber-200 shadow-sm">
          <p className="text-center font-medium">
            🚧 Victory Vault is currently under development. Features and design
            may change before final release. 🚧
          </p>
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
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <motion.h1
                  className="text-5xl md:text-6xl font-bold mb-6 grainy-text"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  Victory Vault
                </motion.h1>
                <motion.p
                  className="text-xl md:text-2xl max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  Track your board game victories and unlock powerful statistics
                </motion.p>
              </div>

              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Phone Mockups */}
                <motion.div
                  className="relative flex justify-center md:justify-start"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  <div className="relative z-10">
                    {/* Main Phone */}
                    <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
                      <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
                      <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
                      <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
                      <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
                      <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white">
                        <img
                          src={mockupScreenshot1 || '/placeholder.svg'}
                          alt="Victory Vault Dashboard"
                          className="w-full h-full object-cover"
                        />
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

                {/* App Description */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                >
                  <h2 className="text-3xl font-bold mb-6">
                    Track Your Board Game Victories
                  </h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-amber-100 p-3 rounded-lg">
                        <Trophy className="w-6 h-6 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">
                          Record Victories
                        </h3>
                        <p className="text-stone-700">
                          Log wins, scores, and game details for your favorite
                          board games
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-amber-100 p-3 rounded-lg">
                        <BarChart2 className="w-6 h-6 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">
                          Detailed Statistics
                        </h3>
                        <p className="text-stone-700">
                          View win rates, average scores, and performance trends
                          over time
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-amber-100 p-3 rounded-lg">
                        <Users className="w-6 h-6 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">
                          Player Profiles
                        </h3>
                        <p className="text-stone-700">
                          Track individual player performance and competitive
                          rankings
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-amber-100 p-3 rounded-lg">
                        <Share2 className="w-6 h-6 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Share Games</h3>
                        <p className="text-stone-700">
                          Create and share board games with friends to track
                          group statistics
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 flex flex-wrap gap-4">
                    <a
                      href="#download"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors"
                    >
                      <Download className="w-5 h-5" />
                      Preview APK (Not Available)
                    </a>
                    <a
                      href="https://victoryvault.wentzeldigital.dk"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 border border-stone-300 rounded-lg hover:bg-stone-200 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                      Test Server
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* Video Demo Section */}
          <motion.section
            className="py-24 relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center grainy-text">
                See Victory Vault in Action
              </h2>

              <div className="relative rounded-2xl overflow-hidden aspect-video shadow-xl flex items-center justify-center bg-stone-200">
                {/* Placeholder Text */}
                <p className="text-xl font-semibold text-stone-600">
                  🎥 App preview under development...
                </p>
              </div>
            </div>
          </motion.section>

          {/* Features Section */}
          <motion.section
            className="py-24 relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center grainy-text">
                Key Features
              </h2>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    title: 'Game Management',
                    description:
                      'Create and manage your board game collection with custom categories and details',
                  },
                  {
                    title: 'Victory Tracking',
                    description:
                      'Record wins, scores, and game details after each session',
                  },
                  {
                    title: 'Player Statistics',
                    description:
                      'Track individual and group performance with detailed analytics',
                  },
                  {
                    title: 'Leaderboards',
                    description:
                      'See who dominates in each game with customizable leaderboards',
                  },
                  {
                    title: 'Game History',
                    description:
                      'Review past games with complete play history and outcomes',
                  },
                  {
                    title: 'Social Sharing',
                    description:
                      'Share games and statistics with friends and gaming groups',
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="p-6 border border-stone-300 rounded-lg bg-white/50 backdrop-blur-sm hover:border-amber-500 transition-all"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                  >
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-stone-700">{feature.description}</p>
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

          {/* Download Section */}
          <motion.section
            id="download"
            className="py-24 relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 grainy-text">
                Ready to Track Your Victories?
              </h2>
              <p className="text-lg mb-10">
                Download Victory Vault now and start tracking your board game
                statistics. Available for Android devices.
              </p>
              <p className="text-amber-600 font-medium mb-6">
                ⚠️ This is a development preview and not ready for general use.
                Features may be incomplete or unstable.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a
                  href="/downloads/victoryvault.apk"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors"
                >
                  <Download className="w-5 h-5" />
                  Preview APK (Not Available)
                </a>
                <a
                  href="https://victoryvault.wentzeldigital.dk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-stone-300 rounded-lg hover:bg-stone-200 transition-colors"
                >
                  <ExternalLink className="w-5 h-5" />
                  Try Test Server
                </a>
              </div>
            </div>
          </motion.section>
        </div>
      </main>
    </div>
  );
};

export default VictoryVaultShowcase;

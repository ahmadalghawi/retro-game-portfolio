'use client';
import { motion } from 'framer-motion';
import { useXP } from '../context/XPContext';

const Footer = () => {
  const { addXP } = useXP();

  const handleEasterEgg = () => {
    // Easter egg: clicking the "Game Over" text
    addXP(1000);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/ahmadalghawi',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" clipRule="evenodd"/>
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/ahmad-alghawi-310722197/',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
    {
      name: 'Email',
      url: 'mailto:ahmadalghawi.86@gmail.com',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-black relative overflow-hidden">
      {/* Retro Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-12 h-full">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="border-r border-[#00ff00]" />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Stats Section */}
          <div className="space-y-4">
            <h3 className="text-[#00ff00] pixel-text text-xl mb-4">Player Stats</h3>
            <motion.div 
              className="pixel-border-sm p-4 bg-black"
              whileHover={{ scale: 1.02 }}
            >
              <div className="space-y-2 text-[#00ff00] pixel-text">
                <p>Quests Completed: 10+</p>
                <p>Skills Mastered: 15+</p>
                <p>Projects Launched: 8+</p>
              </div>
            </motion.div>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-[#00ff00] pixel-text text-xl mb-4">Contact Quest</h3>
            <motion.div 
              className="pixel-border-sm p-4 bg-black"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex justify-center space-x-6">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00ff00] hover:text-[#ff00ff] transition-colors"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.3 }}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Credits Section */}
          <div className="space-y-4">
            <h3 className="text-[#00ff00] pixel-text text-xl mb-4">Credits</h3>
            <motion.div 
              className="pixel-border-sm p-4 bg-black"
              whileHover={{ scale: 1.02 }}
            >
              <div className="space-y-2 text-[#00ff00] pixel-text">
                <p>Developed by: Ahmad Alghawi</p>
                <p>Tech Stack: Next.js, React</p>
                <motion.p
                  className="cursor-pointer text-[#ff00ff]"
                  onClick={handleEasterEgg}
                  whileHover={{ scale: 1.1 }}
                >
                  GAME OVER?
                </motion.p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          className="mt-12 pt-8 border-t border-[#00ff00]/30 text-center text-[#00ff00] pixel-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p>&copy; {new Date().getFullYear()} Ahmad Alghawi | All rights reserved</p>
          <p className="mt-2 text-sm">
            <motion.span
              animate={{ 
                color: ['#00ff00', '#ff00ff', '#00ffff', '#00ff00'],
              }}
              transition={{ duration: 4, repeat: Infinity }}
              onClick={scrollToTop}
              className="cursor-pointer hover:text-[#00ff00]/80"
            >
              Press Start to Continue...
            </motion.span>
          </p>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00ff00] to-transparent" />
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-[#00ff00] to-transparent" />
        <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-[#00ff00] to-transparent" />
      </div>
    </footer>
  );
};

export default Footer;

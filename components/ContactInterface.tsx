'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const ContactInterface = ({ onClose }: { onClose: () => void }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [typing, setTyping] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  const typewriterEffect = (text: string) => {
    let index = 0;
    setTyping('');
    const interval = setInterval(() => {
      setTyping((prev) => prev + text[index]);
      index++;
      if (index === text.length) clearInterval(interval);
    }, 50);
  };

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/ahmadalghawi' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/ahmad-alghawi-310722197/' },
    { name: 'Email', url: 'mailto:ahmadalghawi.86@gmail.com' },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 z-50 pixel-bg"
      >
        <div className="scanlines"></div>
        
        <div className="container mx-auto px-4 py-8 h-screen flex flex-col items-center justify-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="w-full max-w-2xl pixel-border p-8 relative"
          >
            {/* Terminal-like header */}
            <div className="flex items-center justify-between mb-6 border-b-2 border-[#00ff00] pb-2">
              <div className="text-[#00ff00] pixel-text">CONTACT.exe</div>
              <button 
                onClick={onClose}
                className="retro-button text-sm"
              >
                [X]
              </button>
            </div>

            {showSuccess ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-center"
              >
                <h3 className="text-[#00ff00] pixel-text text-xl mb-4">MESSAGE SENT SUCCESSFULLY!</h3>
                <div className="loading-dots">
                  <span className="text-[#00ff00]">Returning to main screen</span>
                  <span className="dot">.</span>
                  <span className="dot">.</span>
                  <span className="dot">.</span>
                </div>
              </motion.div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  {/* Contact Form */}
                  <div>
                    <h3 className="text-[#00ff00] pixel-text mb-4">SEND MESSAGE:</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <input
                          type="text"
                          placeholder="ENTER NAME"
                          className="w-full bg-black border-2 border-[#00ff00] p-2 text-[#00ff00] pixel-text focus:outline-none focus:border-[#ff00ff]"
                          required
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <input
                          type="email"
                          placeholder="ENTER EMAIL"
                          className="w-full bg-black border-2 border-[#00ff00] p-2 text-[#00ff00] pixel-text focus:outline-none focus:border-[#ff00ff]"
                          required
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                      <div>
                        <textarea
                          placeholder="ENTER MESSAGE"
                          rows={4}
                          className="w-full bg-black border-2 border-[#00ff00] p-2 text-[#00ff00] pixel-text focus:outline-none focus:border-[#ff00ff]"
                          required
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        />
                      </div>
                      <button type="submit" className="retro-button w-full">
                        [SEND MESSAGE]
                      </button>
                    </form>
                  </div>

                  {/* Social Links */}
                  <div>
                    <h3 className="text-[#00ff00] pixel-text mb-4">QUICK CONNECT:</h3>
                    <div className="space-y-4">
                      {socialLinks.map((link, index) => (
                        <motion.a
                          key={link.name}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="retro-button w-full block text-center"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          [CONNECT VIA {link.name}]
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ASCII Art */}
                <div className="text-[#00ff00] font-mono text-xs leading-none mb-4 hidden md:block">
                  <pre>
                    {`
     _____                 __                  __     
    / ___/____  ____  ____/ /_____ _____ _____/ /_    
    \\__ \\/ __ \\/ __ \\/ __  / ___/ ___/ / ___/ __/
   ___/ / /_/ / / / / /_/ / /__/ /  / (__  ) /_      
  /____/\\____/_/ /_/\\__,_/\\___/_/  /_/____/\\__/      
                    `}
                  </pre>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ContactInterface;


import React from 'react';
import { Mail, Globe, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer 
      className="w-full bg-card border-t py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-fact-purple to-fact-blue bg-clip-text text-transparent">FactFlow</h3>
            <p className="text-muted-foreground text-sm">Expanding your knowledge one fact at a time.</p>
          </div>
          
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-lg">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm transition-colors hover:text-primary">
                <Mail size={16} />
                <a href="mailto:adewoleadeigbe@gmail.com" className="hover:underline">adewoleadeigbe@gmail.com</a>
              </li>
              <li className="flex items-center gap-2 text-sm transition-colors hover:text-primary">
                <Globe size={16} />
                <a href="https://codewithblakish.netlify.app/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  codewithblakish.netlify.app
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm transition-colors hover:text-primary">
                <Phone size={16} />
                <a href="https://wa.me/2348282039201" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  +2348282039201
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} FactFlow. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;

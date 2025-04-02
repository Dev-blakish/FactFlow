
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import GrainBackground from '@/components/GrainBackground';
import Logo from '@/components/Logo';
import Footer from '@/components/Footer';

const Home = () => {
  return (
    <GrainBackground className="min-h-screen flex flex-col">
      <div className="container py-8 flex-1 flex flex-col">
        <header className="flex justify-between items-center">
          <Logo />
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
        </header>

        <div className="flex-1 flex flex-col items-center justify-center max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-fact-purple to-fact-blue">
              Discover Amazing Facts Every Day
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Explore fascinating facts from around the world. Curated just for you based on your interests. Expand your knowledge one fact at a time.
            </p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Button size="lg" asChild>
                <Link to="/signup">Get Started</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        <div className="py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            className="p-6 rounded-lg bg-card shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-105 hover:bg-gradient-to-br hover:from-fact-purple/10 hover:to-fact-blue/10 cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h3 className="font-semibold text-lg mb-2">Personalized Facts</h3>
            <p className="text-muted-foreground">Select your favorite categories and get facts tailored to your interests.</p>
          </motion.div>
          <motion.div 
            className="p-6 rounded-lg bg-card shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-105 hover:bg-gradient-to-br hover:from-fact-purple/10 hover:to-fact-blue/10 cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <h3 className="font-semibold text-lg mb-2">Endless Discovery</h3>
            <p className="text-muted-foreground">Access thousands of verified facts across science, history, technology, and more.</p>
          </motion.div>
          <motion.div 
            className="p-6 rounded-lg bg-card shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-105 hover:bg-gradient-to-br hover:from-fact-purple/10 hover:to-fact-blue/10 cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <h3 className="font-semibold text-lg mb-2">Share Knowledge</h3>
            <p className="text-muted-foreground">Easily share fascinating facts with friends and expand your knowledge together.</p>
          </motion.div>
        </div>
      </div>
      <Footer />
    </GrainBackground>
  );
};

export default Home;

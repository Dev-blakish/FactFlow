
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import GrainBackground from '@/components/GrainBackground';
import Logo from '@/components/Logo';
import { FACT_CATEGORIES } from '@/components/FactCategories';
import { ArrowLeft, ArrowRight, Sparkles, Copy, Share2, Facebook, Twitter, MessageCircle, Check } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

const MOCK_FACTS = {
  science: [
    "The human body contains enough iron to make a nail that is 3 inches long.",
    "A teaspoonful of neutron star material would weigh about 6 billion tons.",
    "The Hawaiian alphabet only has 12 letters: A, E, I, O, U, H, K, L, M, N, P, and W.",
    "A bolt of lightning is five times hotter than the surface of the sun.",
    "Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible.",
    "The average person will spend six months of their life waiting for red lights to turn green.",
    "A day on Venus is longer than a year on Venus.",
    "The DNA in your body, if uncoiled, would stretch about 10 billion miles.",
    "Stomach acid is strong enough to dissolve razor blades.",
    "The Milky Way galaxy is 105,700 light-years wide.",
    "There are more atoms in a glass of water than there are glasses of water in all the oceans on Earth.",
    "A cloud can weigh over a million pounds.",
    "Octopuses have three hearts.",
    "Bananas are berries, but strawberries aren't.",
    "Human saliva contains a painkiller called opiorphin that is six times more powerful than morphine.",
  ],
  history: [
    "The shortest war in history was between Britain and Zanzibar on August 27, 1896. Zanzibar surrendered after 38 minutes.",
    "Ancient Egyptians used to use slabs of stone as pillows.",
    "The first alarm clock could only ring at 4 a.m.",
    "Vikings used the bones of slain animals to make their weapons stronger.",
    "In Ancient Rome, it was considered a sign of leadership to be born with a crooked nose.",
  ],
  technology: [
    "The first computer bug was an actual real-life bug. A moth was trapped in a Harvard Mark II computer in 1947.",
    "The average person spends 6 months of their lifetime waiting for red lights to turn green.",
    "The original name for the search engine Google was Backrub.",
    "The first message sent over the internet was 'LO'. It was supposed to be 'LOGIN', but the system crashed.",
    "The first YouTube video was uploaded on April 23, 2005, and was titled 'Me at the zoo'.",
  ],
  space: [
    "There is a planet made of diamonds, called 55 Cancri e.",
    "One day on Venus is longer than one year on Earth.",
    "The footprints on the Moon will be there for at least 100 million years.",
    "The Sun makes up 99.86% of the mass in the Solar System.",
    "Space is completely silent because there is no air to carry sound waves.",
  ],
  animals: [
    "Octopuses have three hearts and blue blood.",
    "A snail can sleep for three years without eating.",
    "Cows have best friends and get stressed when they are separated.",
    "Flamingos can only eat with their heads upside down.",
    "Honeybees can recognize human faces.",
  ],
};

FACT_CATEGORIES.forEach(category => {
  if (!MOCK_FACTS[category.id as keyof typeof MOCK_FACTS]) {
    MOCK_FACTS[category.id as keyof typeof MOCK_FACTS] = [
      `This is an interesting fact about ${category.name}.`,
      `Did you know this amazing ${category.name} fact?`,
      `Here's something surprising about ${category.name}!`,
      `${category.name} fact that will blow your mind.`,
      `Fascinating information about ${category.name}.`,
      `Scientists discovered new ${category.name} insights last year.`,
      `The history of ${category.name} dates back centuries.`,
      `Recent studies on ${category.name} revealed unexpected findings.`,
      `${category.name} has influenced cultures worldwide in unexpected ways.`,
      `Modern technology has transformed our understanding of ${category.name}.`,
    ];
  }
});

const getRandomFact = (category: string) => {
  const facts = MOCK_FACTS[category as keyof typeof MOCK_FACTS] || [];
  if (facts.length === 0) return "No facts available for this category.";
  
  const randomIndex = Math.floor(Math.random() * facts.length);
  return facts[randomIndex];
};

const Facts = () => {
  const [currentCategory, setCurrentCategory] = useState('science');
  const [currentFact, setCurrentFact] = useState('');
  const [factHistory, setFactHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showFact, setShowFact] = useState(false);
  const [animation, setAnimation] = useState<'next' | 'prev' | ''>('');
  const [isCopied, setIsCopied] = useState(false);
  
  const generateNewFact = () => {
    const newFact = getRandomFact(currentCategory);
    
    setFactHistory(prev => {
      if (historyIndex < prev.length - 1) {
        return [...prev.slice(0, historyIndex + 1), newFact];
      }
      return [...prev, newFact];
    });
    
    setHistoryIndex(prev => prev + 1);
    setCurrentFact(newFact);
  };
  
  const goToNextFact = () => {
    setAnimation('next');
    setShowFact(false);
    
    setTimeout(() => {
      generateNewFact();
      setShowFact(true);
    }, 300);
  };
  
  const goToPrevFact = () => {
    if (historyIndex <= 0) return;
    
    setAnimation('prev');
    setShowFact(false);
    
    setTimeout(() => {
      setHistoryIndex(prev => prev - 1);
      setCurrentFact(factHistory[historyIndex - 1]);
      setShowFact(true);
    }, 300);
  };
  
  const handleCategoryChange = (value: string) => {
    setCurrentCategory(value);
    setFactHistory([]);
    setHistoryIndex(-1);
    setShowFact(false);
    
    setTimeout(() => {
      setShowFact(true);
      generateNewFact();
    }, 300);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentFact);
      setIsCopied(true);
      toast({
        title: "Copied!",
        description: "Fact copied to clipboard",
      });
      
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Could not copy the fact to clipboard",
        variant: "destructive",
      });
    }
  };

  const shareOnSocialMedia = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Did you know? ${currentFact}`);
    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
        break;
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${text} ${url}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, '_blank', 'width=600,height=400');
  };
  
  useEffect(() => {
    const timer = setTimeout(() => {
      generateNewFact();
      setShowFact(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <GrainBackground className="min-h-screen flex flex-col">
      <div className="container py-8">
        <header className="flex justify-between items-center mb-12">
          <Logo />
          <Link to="/">
            <Button variant="outline">Sign Out</Button>
          </Link>
        </header>
        
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Daily Facts</h1>
            <Select 
              value={currentCategory} 
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {FACT_CATEGORIES.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="relative min-h-[300px] flex items-center justify-center">
            {!showFact ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <Button
                  size="lg"
                  className="flex items-center gap-2"
                  onClick={() => {
                    setShowFact(true);
                    if (factHistory.length === 0) {
                      generateNewFact();
                    }
                  }}
                >
                  <Sparkles size={18} />
                  <span>Show Fact</span>
                </Button>
              </motion.div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={historyIndex}
                  initial={{ 
                    opacity: 0, 
                    x: animation === 'next' ? 100 : animation === 'prev' ? -100 : 0,
                    scale: 0.9 
                  }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ 
                    opacity: 0, 
                    x: animation === 'next' ? -100 : animation === 'prev' ? 100 : 0,
                    scale: 0.9 
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-full"
                >
                  <Card className="w-full">
                    <CardContent className="pt-6">
                      <div className="text-sm font-medium text-muted-foreground mb-2">
                        Did you know?
                      </div>
                      <p className="text-xl leading-relaxed">
                        {currentFact}
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-2">
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={goToPrevFact}
                        disabled={historyIndex <= 0}
                      >
                        <ArrowLeft size={18} />
                      </Button>
                      <div className="text-sm text-muted-foreground">
                        Fact #{historyIndex + 1}
                      </div>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={goToNextFact}
                      >
                        <ArrowRight size={18} />
                      </Button>
                    </CardFooter>

                    <CardFooter className="flex items-center justify-between pt-4 border-t mt-2">
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2"
                          onClick={copyToClipboard}
                        >
                          {isCopied ? <Check size={16} /> : <Copy size={16} />}
                          <span>{isCopied ? "Copied!" : "Copy"}</span>
                        </Button>
                        
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center gap-2"
                            >
                              <Share2 size={16} />
                              <span>Share</span>
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-2" align="center">
                            <div className="flex gap-2">
                              <Button 
                                variant="outline" 
                                size="icon"
                                className="rounded-full bg-[#1877F2] hover:bg-[#1877F2]/90 text-white"
                                onClick={() => shareOnSocialMedia('facebook')}
                              >
                                <Facebook size={18} />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="icon"
                                className="rounded-full bg-[#1DA1F2] hover:bg-[#1DA1F2]/90 text-white"
                                onClick={() => shareOnSocialMedia('twitter')}
                              >
                                <Twitter size={18} />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="icon"
                                className="rounded-full bg-[#25D366] hover:bg-[#25D366]/90 text-white"
                                onClick={() => shareOnSocialMedia('whatsapp')}
                              >
                                <MessageCircle size={18} />
                              </Button>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
          
          <div className="mt-12">
            <h2 className="text-xl font-semibold mb-4">About This Category</h2>
            <p className="text-muted-foreground">
              {currentCategory === 'science' && "Science facts cover a wide range of discoveries, phenomena, and laws that govern our universe. From biology to physics, chemistry to astronomy, there's always something fascinating to learn."}
              {currentCategory === 'history' && "History facts take us on a journey through time, exploring civilizations, events, and individuals that shaped our world. Travel from ancient times to modern history and discover surprising insights."}
              {currentCategory === 'technology' && "Technology facts highlight innovations, breakthroughs, and the evolution of tools that transform how we live. Explore the origins of devices, software, and the digital revolution."}
              {currentCategory === 'space' && "Space facts venture beyond our atmosphere to explore planets, stars, galaxies, and cosmic phenomena. From our solar system to the edge of the observable universe, space is full of wonders."}
              {currentCategory === 'animals' && "Animal facts showcase the incredible diversity, behaviors, and adaptations of Earth's creatures. From tiny insects to massive mammals, the animal kingdom is full of surprises."}
              {!['science', 'history', 'technology', 'space', 'animals'].includes(currentCategory) && 
                `Explore the fascinating world of ${FACT_CATEGORIES.find(c => c.id === currentCategory)?.name || currentCategory} through these curated facts. Keep checking back for new additions!`
              }
            </p>
          </div>
        </div>
      </div>
    </GrainBackground>
  );
};

export default Facts;

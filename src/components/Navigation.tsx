import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Menu, X, Activity, User, LogOut } from 'lucide-react';
import { useState } from 'react';

interface NavigationProps {
  user?: any;
  onSignOut?: () => void;
}

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Solutions', href: '#solutions' },
  { name: 'Impact', href: '#impact' },
  { name: 'Contact', href: '#contact' }
];

export const Navigation: React.FC<NavigationProps> = ({ user, onSignOut }) => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-glass border-b border-glass-border"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="p-2 bg-gradient-primary rounded-lg shadow-glow-primary">
              <Activity className="text-primary-foreground" size={24} />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              MedTech Innovations
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-muted-foreground hover:text-foreground transition-colors duration-medical relative group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.name}
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-primary origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            ))}
            
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-glass backdrop-blur-glass border border-glass-border">
                  <User className="w-4 h-4 text-primary" />
                  <span className="text-sm text-foreground">{user.email}</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={onSignOut}
                  className="border-glass-border bg-gradient-glass backdrop-blur-glass"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button variant="default" className="bg-gradient-primary hover:opacity-90 shadow-glow-primary">
                Get Started
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          className={`md:hidden overflow-hidden bg-card/95 backdrop-blur-glass border border-glass-border rounded-glass mt-2 ${
            isOpen ? 'block' : 'hidden'
          }`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-4 py-2 space-y-2">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors duration-medical"
                whileHover={{ x: 5 }}
              >
                {item.name}
              </motion.button>
            ))}
            <div className="pt-2">
              {user ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-glass backdrop-blur-glass border border-glass-border">
                    <User className="w-4 h-4 text-primary" />
                    <span className="text-sm text-foreground">{user.email}</span>
                  </div>
                  <Button 
                    onClick={onSignOut}
                    variant="outline"
                    className="w-full border-glass-border bg-gradient-glass backdrop-blur-glass"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Button className="w-full bg-gradient-primary hover:opacity-90">
                  Get Started
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};
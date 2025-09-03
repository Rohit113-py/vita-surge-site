import { Heart, Brain, Activity, Pill, Microscope, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const medicalIcons = [
  { Icon: Heart, delay: 0, color: '#FF6B6B', position: { x: 10, y: 20 } },
  { Icon: Brain, delay: 0.5, color: '#4ECDC4', position: { x: 85, y: 30 } },
  { Icon: Activity, delay: 1, color: '#45B7D1', position: { x: 20, y: 70 } },
  { Icon: Pill, delay: 1.5, color: '#96CEB4', position: { x: 75, y: 80 } },
  { Icon: Microscope, delay: 2, color: '#FFEAA7', position: { x: 50, y: 15 } },
  { Icon: Zap, delay: 2.5, color: '#DDA0DD', position: { x: 90, y: 60 } }
];

export const FloatingIcons = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {medicalIcons.map(({ Icon, delay, color, position }, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            left: `${position.x}%`,
            top: `${position.y}%`
          }}
          initial={{ opacity: 0, scale: 0, y: 50 }}
          animate={{ 
            opacity: [0, 1, 1, 1],
            scale: [0, 1.2, 1, 1],
            y: [50, 0, -10, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 3,
            delay,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            times: [0, 0.3, 0.6, 1]
          }}
          whileHover={{
            scale: 1.5,
            rotate: 15,
            transition: { duration: 0.3 }
          }}
        >
          <div
            className="p-4 rounded-full backdrop-blur-glass border border-glass-border shadow-glass animate-pulse-glow"
            style={{
              background: `linear-gradient(135deg, ${color}20, ${color}10)`,
              boxShadow: `0 0 30px ${color}50`
            }}
          >
            <Icon 
              size={32} 
              style={{ color }} 
              className="drop-shadow-lg"
            />
          </div>
        </motion.div>
      ))}
      
      {/* Floating data particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-primary rounded-full opacity-60"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          animate={{
            x: [0, Math.random() * 200 - 100],
            y: [0, Math.random() * 200 - 100],
            scale: [0, 1, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: Math.random() * 4 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};
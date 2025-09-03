import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'accent';
  hover?: boolean;
  glow?: boolean;
}

export const GlassCard = ({ 
  children, 
  className, 
  variant = 'primary',
  hover = true,
  glow = false 
}: GlassCardProps) => {
  const variants = {
    primary: 'bg-gradient-glass border-glass-border shadow-glass',
    secondary: 'bg-gradient-secondary border-secondary/20 shadow-glow-secondary',
    accent: 'bg-gradient-primary border-primary/20 shadow-glow-primary'
  };

  return (
    <motion.div
      className={cn(
        'backdrop-blur-glass border rounded-glass p-6 transition-all duration-medical',
        variants[variant],
        glow && 'animate-pulse-glow',
        hover && 'hover:shadow-medical hover:scale-105 hover:border-primary/40',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      whileHover={hover ? {
        scale: 1.02,
        transition: { duration: 0.3, ease: "backOut" }
      } : {}}
    >
      {children}
    </motion.div>
  );
};

export const StatCard = ({ title, value, change, icon: Icon }: {
  title: string;
  value: string;
  change: string;
  icon: React.ElementType;
}) => (
  <GlassCard variant="accent" glow>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold text-foreground">{value}</p>
        <p className="text-sm text-secondary">{change}</p>
      </div>
      <div className="p-3 bg-primary/10 rounded-lg">
        <Icon size={24} className="text-primary" />
      </div>
    </div>
  </GlassCard>
);
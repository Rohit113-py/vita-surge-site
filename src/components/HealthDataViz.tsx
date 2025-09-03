import { motion } from 'framer-motion';
import { Activity, Heart, Brain, TrendingUp } from 'lucide-react';

export const HealthDataViz = () => {
  // Simulated health data
  const healthMetrics = [
    { label: 'Heart Rate', value: 72, unit: 'bpm', trend: '+2%', color: '#FF6B6B' },
    { label: 'Blood Oxygen', value: 98, unit: '%', trend: '+0.5%', color: '#4ECDC4' },
    { label: 'Sleep Quality', value: 85, unit: '%', trend: '+5%', color: '#45B7D1' },
    { label: 'Activity Score', value: 92, unit: 'pts', trend: '+8%', color: '#96CEB4' }
  ];

  // Heartbeat animation path
  const heartbeatPath = "M0,50 L10,50 L15,30 L25,70 L35,20 L45,80 L55,40 L65,50 L100,50";
  
  return (
    <div className="space-y-8">
      {/* Real-time heartbeat monitor */}
      <div className="relative h-32 bg-card/50 rounded-glass border border-glass-border backdrop-blur-glass overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-full h-20" viewBox="0 0 400 100">
            {/* Grid lines */}
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            
            {/* Animated heartbeat line */}
            <motion.path
              d={heartbeatPath}
              fill="none"
              stroke="#FF6B6B"
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "linear",
                repeatDelay: 0.5 
              }}
              style={{
                filter: 'drop-shadow(0 0 8px #FF6B6B)',
                transform: 'scaleX(4)'
              }}
            />
          </svg>
          
          <motion.div
            className="absolute right-4 flex items-center space-x-2"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <Heart className="text-red-500 animate-heartbeat" size={24} />
            <span className="text-xl font-bold text-foreground">72 BPM</span>
          </motion.div>
        </div>
      </div>

      {/* Health metrics grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {healthMetrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            className="bg-card/50 backdrop-blur-glass border border-glass-border rounded-glass p-4 hover:shadow-glass transition-all duration-medical"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm text-muted-foreground">{metric.label}</h3>
              <TrendingUp 
                size={16} 
                className="text-secondary"
                style={{ color: metric.color }}
              />
            </div>
            
            <div className="flex items-baseline space-x-1">
              <motion.span 
                className="text-2xl font-bold"
                style={{ color: metric.color }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
              >
                {metric.value}
              </motion.span>
              <span className="text-sm text-muted-foreground">{metric.unit}</span>
            </div>
            
            <div className="flex items-center mt-2">
              <span className="text-xs text-secondary">{metric.trend}</span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-muted rounded-full h-2 mt-2 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: metric.color }}
                initial={{ width: 0 }}
                animate={{ width: `${metric.value}%` }}
                transition={{ delay: index * 0.1 + 0.5, duration: 1, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Brain activity visualization */}
      <div className="bg-card/50 backdrop-blur-glass border border-glass-border rounded-glass p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Brain className="text-primary" size={24} />
          <h3 className="text-lg font-semibold text-foreground">Neural Activity</h3>
        </div>
        
        <div className="relative h-24">
          {/* Simulated brain waves */}
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-full h-1 rounded-full"
              style={{
                top: `${i * 20}%`,
                background: `linear-gradient(90deg, transparent, #4ECDC4, transparent)`
              }}
              animate={{
                x: [-100, window.innerWidth || 800],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 3,
                delay: i * 0.3,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
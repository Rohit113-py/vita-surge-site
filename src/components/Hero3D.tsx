import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { DNAHelix } from './DNAHelix';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import { FloatingIcons } from './FloatingIcons';

export const Hero3D = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-mesh">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Canvas>
          <Suspense fallback={null}>
            <PerspectiveCamera makeDefault position={[0, 0, 10]} />
            <Environment preset="night" />
            
            {/* Lighting */}
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#4A90E2" />
            <pointLight position={[-10, -10, -10]} intensity={0.8} color="#00D4AA" />
            <spotLight 
              position={[0, 20, 0]} 
              intensity={1.5} 
              color="#4A90E2"
              castShadow
              angle={0.3}
              penumbra={1}
              distance={50}
            />
            
            {/* DNA Helix */}
            <DNAHelix />
            
            {/* Orbit controls for interaction */}
            <OrbitControls 
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.5}
              maxPolarAngle={Math.PI * 0.8}
              minPolarAngle={Math.PI * 0.2}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Floating Medical Icons */}
      <FloatingIcons />

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center px-4 py-2 bg-gradient-glass backdrop-blur-glass border border-glass-border rounded-full mb-8 shadow-glass"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className="text-sm font-medium text-primary">Revolutionary Healthcare Technology</span>
            <div className="w-2 h-2 bg-primary rounded-full ml-2 animate-pulse-glow" />
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            The Future of
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Personalized Medicine
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Revolutionizing healthcare through AI-powered diagnostics, 
            real-time monitoring, and precision medicine for better patient outcomes.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:opacity-90 shadow-glow-primary text-lg px-8 py-3 group"
            >
              Explore Solutions
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-glass-border bg-gradient-glass backdrop-blur-glass hover:shadow-glass text-lg px-8 py-3 group"
            >
              <Play className="mr-2 group-hover:scale-110 transition-transform" size={20} />
              Watch Demo
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="flex flex-col sm:flex-row justify-center items-center gap-8 mt-12 pt-8 border-t border-glass-border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            {[
              { value: '10M+', label: 'Patients Monitored' },
              { value: '99.7%', label: 'Diagnostic Accuracy' },
              { value: '500+', label: 'Healthcare Partners' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
              >
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-6 h-10 border-2 border-glass-border rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </motion.div>
    </section>
  );
};
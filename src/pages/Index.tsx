import { Navigation } from "@/components/Navigation";
import { Hero3D } from "@/components/Hero3D";
import { GlassCard, StatCard } from "@/components/GlassCard";
import { HealthDataViz } from "@/components/HealthDataViz";
import { motion } from "framer-motion";
import { 
  Shield, 
  Zap, 
  Heart, 
  Users, 
  Globe, 
  Award,
  ChevronRight,
  Microscope,
  Brain,
  Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />
      
      {/* Hero Section with 3D Animation */}
      <Hero3D />

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Pioneering Healthcare Innovation
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're building the next generation of medical technology that combines 
            artificial intelligence, real-time monitoring, and precision medicine.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Shield,
              title: "Advanced Security",
              description: "End-to-end encryption ensures your medical data remains private and secure."
            },
            {
              icon: Zap,
              title: "Real-time Monitoring",
              description: "Continuous health tracking with instant alerts for critical changes."
            },
            {
              icon: Brain,
              title: "AI-Powered Insights",
              description: "Machine learning algorithms provide personalized health recommendations."
            }
          ].map((feature, index) => (
            <GlassCard key={index} className="text-center hover:shadow-glow-primary transition-all duration-medical">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-lg mb-4">
                <feature.icon className="text-primary-foreground" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 bg-gradient-secondary bg-clip-text text-transparent">
            Revolutionary Healthcare Solutions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our cutting-edge technology transforms how healthcare is delivered, 
            monitored, and personalized for each patient.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <HealthDataViz />
          </motion.div>

          <div className="space-y-6">
            {[
              {
                title: "Predictive Analytics",
                description: "Forecast health trends and potential issues before they become critical.",
                icon: Activity
              },
              {
                title: "Personalized Treatment",
                description: "Tailored therapy plans based on genetic analysis and health history.",
                icon: Microscope
              },
              {
                title: "Remote Monitoring",
                description: "Continuous patient care from anywhere with IoT-enabled devices.",
                icon: Heart
              }
            ].map((solution, index) => (
              <motion.div
                key={index}
                className="flex items-start space-x-4 p-4 rounded-glass bg-card/30 backdrop-blur-glass border border-glass-border hover:shadow-glass transition-all duration-medical"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex-shrink-0 p-2 bg-secondary/20 rounded-lg">
                  <solution.icon className="text-secondary" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{solution.title}</h3>
                  <p className="text-muted-foreground">{solution.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-mesh">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Global Healthcare Impact
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our technology is making a difference in healthcare outcomes worldwide,
              helping patients live healthier, longer lives.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <StatCard 
              title="Lives Improved" 
              value="2.3M+" 
              change="+15% this month"
              icon={Heart}
            />
            <StatCard 
              title="Early Detections" 
              value="450K+" 
              change="+22% this month"
              icon={Shield}
            />
            <StatCard 
              title="Partner Hospitals" 
              value="1,200+" 
              change="+8% this month"
              icon={Users}
            />
            <StatCard 
              title="Countries Served" 
              value="45+" 
              change="+3 new regions"
              icon={Globe}
            />
          </div>

          <GlassCard className="text-center">
            <div className="max-w-2xl mx-auto">
              <Award className="mx-auto mb-4 text-secondary" size={48} />
              <blockquote className="text-xl italic mb-6 text-foreground">
                "This technology has revolutionized our patient care capabilities. 
                We're detecting conditions earlier and providing more personalized 
                treatments than ever before."
              </blockquote>
              <cite className="text-muted-foreground">
                Dr. Sarah Johnson, Chief Medical Officer at Metropolitan Hospital
              </cite>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Ready to Transform Healthcare?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join the healthcare revolution. Partner with us to bring cutting-edge 
            medical technology to your patients.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <GlassCard>
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Get in Touch</h3>
                <p className="text-muted-foreground mb-6">
                  Ready to revolutionize your healthcare delivery? 
                  Contact our team to learn more about our solutions.
                </p>
              </div>
              
              <div className="space-y-4">
                <Button className="w-full bg-gradient-primary hover:opacity-90 shadow-glow-primary">
                  Schedule a Demo
                  <ChevronRight className="ml-2" size={20} />
                </Button>
                <Button variant="outline" className="w-full border-glass-border bg-gradient-glass backdrop-blur-glass">
                  Download Whitepaper
                </Button>
              </div>
            </div>
          </GlassCard>

          <GlassCard variant="secondary">
            <div className="text-center">
              <Globe className="mx-auto mb-6 text-secondary animate-dna-spin" size={64} />
              <h3 className="text-xl font-semibold mb-4">Global Presence</h3>
              <p className="text-muted-foreground mb-6">
                Our technology is deployed across major healthcare systems worldwide.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>North America: 15 locations</div>
                <div>Europe: 12 locations</div>
                <div>Asia Pacific: 18 locations</div>
                <div>Latin America: 8 locations</div>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-glass-border bg-card/50 backdrop-blur-glass py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Activity className="text-primary" size={24} />
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              MedTech Innovations
            </span>
          </div>
          <p className="text-muted-foreground">
            © 2024 MedTech Innovations. All rights reserved. 
            Building the future of healthcare technology.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

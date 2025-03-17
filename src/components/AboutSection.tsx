
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ShieldCheck, Clock, Users, Map } from 'lucide-react';

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  const benefits = [
    {
      icon: <ShieldCheck className="h-6 w-6" />,
      title: "Safety First",
      description: "All our drivers undergo rigorous background checks and our vehicles are regularly maintained.",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Punctuality",
      description: "We pride ourselves on being on time, every time. We monitor flight arrivals and traffic conditions.",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Local Expertise",
      description: "Our drivers are locals who know Málaga inside out and can offer valuable insights about the area.",
    },
    {
      icon: <Map className="h-6 w-6" />,
      title: "Flexible Routes",
      description: "We customize our routes according to your needs, whether it's a direct transfer or a scenic drive.",
    },
  ];
  
  return (
    <section id="about" className="py-24 bg-accent overflow-hidden" ref={sectionRef}>
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block py-1 px-3 mb-4 text-xs font-medium uppercase tracking-wider text-primary-foreground bg-primary rounded-full">About Us</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Premium Transportation in the Heart of Costa del Sol
            </h2>
            <div className="prose max-w-none mb-8">
              <p className="text-lg mb-4">
                Málaga Driver Hub is a premium transportation service dedicated to providing reliable, comfortable, and professional driver services in Málaga and throughout Costa del Sol.
              </p>
              <p className="mb-4">
                Founded with a passion for exceptional service, we combine our deep knowledge of the region with a commitment to customer satisfaction. Our team of experienced drivers ensures a smooth and enjoyable journey, whether you're visiting for business or pleasure.
              </p>
              <p>
                With a fleet of well-maintained vehicles and drivers who speak multiple languages, we cater to international visitors and local residents alike. We take pride in our attention to detail and personalized approach to meet each client's unique transportation needs.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
              {benefits.map((benefit, index) => (
                <motion.div 
                  key={index}
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <motion.div 
            className="relative h-[500px] overflow-hidden rounded-2xl"
            style={{ y, opacity }}
          >
            <div className="relative w-full h-full">
              <motion.div 
                className="absolute inset-0 bg-cover bg-center rounded-2xl elegant-shadow"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1511096675011-cdebb21fa97f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')` }}
                initial={{ scale: 1.1 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 1.5 }}
                viewport={{ once: true }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <div className="glass-panel p-4 rounded-lg">
                  <p className="text-sm md:text-base font-medium">
                    Experience the beautiful coastline and cultural richness of Málaga with drivers who truly know the region.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

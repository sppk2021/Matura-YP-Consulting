import React from 'react';
import { motion } from 'motion/react';
import { Users, Briefcase, Award, Globe } from 'lucide-react';

const stats = [
  { label: 'Happy Clients', value: '500+', icon: Users },
  { label: 'Projects Completed', value: '1200+', icon: Briefcase },
  { label: 'Years Experience', value: '15+', icon: Award },
  { label: 'Countries Served', value: '10+', icon: Globe },
];

export default function Stats() {
  return (
    <section className="py-16 bg-brand-gold">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 bg-brand-navy/10 rounded-full flex items-center justify-center mb-4">
                <stat.icon className="w-6 h-6 text-brand-navy" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-brand-navy mb-1">
                {stat.value}
              </div>
              <div className="text-sm font-bold uppercase tracking-widest text-brand-navy/70">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

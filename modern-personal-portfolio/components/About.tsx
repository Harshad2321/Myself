import React from 'react';
import Section from './Section';
import { SKILLS } from '../constants';
// Fix: Import `motion` from `framer-motion` instead of destructuring from `window.FramerMotion`.
import { motion } from 'framer-motion';

const timelineData = [
  { year: '2023 - Present', role: 'Senior Frontend Developer', company: 'Tech Solutions Inc.', description: 'Leading the development of interactive web applications using React and modern technologies, focusing on performance and user experience.' },
  { year: '2020 - 2023', role: 'Mid-Level Developer', company: 'Creative Agency LLC', description: 'Developed and maintained client websites, implemented new features, and collaborated with designers to create pixel-perfect interfaces.' },
  { year: '2018 - 2020', role: 'Junior Developer', company: 'Startup Hub', description: 'Assisted in building a SaaS platform from the ground up, gaining experience in full-stack development and agile methodologies.' },
];

const About: React.FC = () => {
  return (
    <Section id="about">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">About Me</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div>
          <h3 className="text-2xl font-semibold mb-6">My Journey</h3>
          <div className="relative border-l-2 border-light-primary/30 dark:border-dark-primary/30 pl-8">
            {timelineData.map((item, index) => (
              <motion.div 
                key={index}
                className="mb-12 relative"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="absolute -left-[38px] top-1 w-4 h-4 rounded-full bg-light-primary dark:bg-dark-primary border-4 border-light-bg dark:border-dark-bg"></div>
                <p className="text-sm font-semibold text-light-primary dark:text-dark-primary mb-1">{item.year}</p>
                <h4 className="text-xl font-bold">{item.role}</h4>
                <p className="text-md text-light-secondary dark:text-dark-secondary mb-2">{item.company}</p>
                <p>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-semibold mb-6">My Skills</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {SKILLS.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="p-4 bg-light-card dark:bg-dark-card rounded-lg shadow-md flex flex-col items-center justify-center gap-2 border border-black/10 dark:border-white/10"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <skill.icon className="w-10 h-10" />
                <span className="font-medium">{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default About;

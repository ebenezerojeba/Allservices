import React from 'react';
import { motion, useAnimation, animate } from 'framer-motion';
import { Users, Calendar, UserCog, TrendingUp } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const AnimatedCounter = ({ end, inView }) => {
  const nodeRef = React.useRef();

  React.useEffect(() => {
    if (inView) {
      const node = nodeRef.current;
      const controls = animate(0, end, {
        duration: 1.5,
        ease: "easeOut",
        onUpdate(value) {
          node.textContent = Math.round(value).toLocaleString();
        },
      });
      return () => controls.stop();
    }
  }, [end, inView]);

  return <span ref={nodeRef}>0</span>;
};

const StatCard = ({ title, count, icon: Icon, percentage, index, inView }) => {
  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.2,
        ease: "easeOut"
      }
    }
  };

  const iconVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.2,
      rotate: 360,
      transition: { duration: 0.5 }
    }
  };

  const percentageVariants = {
    initial: { x: -20, opacity: 0 },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        delay: 1 + index * 0.2,
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg p-6 relative overflow-hidden"
    >
      <motion.div
        className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 
                   bg-gradient-to-br from-blue-100 to-transparent 
                   rounded-full opacity-50"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-700">{title}</h3>
        <motion.div
          variants={iconVariants}
          initial="initial"
          whileHover="hover"
        >
          <Icon className="w-6 h-6 text-blue-500" />
        </motion.div>
      </div>
      
      <div className="text-4xl font-bold text-gray-900 mb-4">
        <AnimatedCounter end={count} inView={inView} />
      </div>
      
      <motion.div
        className="flex items-center space-x-2"
        variants={percentageVariants}
        initial="initial"
        animate={inView ? "animate" : "initial"}
      >
        <TrendingUp className="w-4 h-4 text-green-500" />
        <span className="text-sm font-semibold text-green-500">
          {percentage}%
        </span>
      </motion.div>
    </motion.div>
  );
};

const StatsDashboard = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl">
      <div className="text-center mb-12">
        <motion.h2
          variants={headerVariants}
          initial="hidden"
          animate="visible"
          className="text-3xl font-bold mb-4 font-Ysabeau bg-clip-text text-transparent 
                     bg-gradient-to-r from-blue-600 to-blue-300 "
        >
          Where Skilled Artisans Meet Their Perfect Match
        </motion.h2>
        <motion.p
          variants={subtitleVariants}
          initial="hidden"
          animate="visible"
          className="text-lg text-gray-500"
        >
          One Platform, Endless Possibilities. Connecting Skilled Professionals with Quality Clients!
        </motion.p>
      </div>

      <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatCard
          title="Appointments"
          count={410}
          icon={Calendar}
          percentage={12.5}
          index={0}
          inView={inView}
        />
        <StatCard
          title="Artisans"
          count={207}
          icon={UserCog}
          percentage={8.2}
          index={1}
          inView={inView}
        />
        <StatCard
          title="Users"
          count={196}
          icon={Users}
          percentage={15.4}
          index={2}
          inView={inView}
        />
      </div>
    </div>
  );
};

export default StatsDashboard;
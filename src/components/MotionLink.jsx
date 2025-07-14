import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const MotionLink = motion(Link);

const linkVariants = {
  initial: { color: 'black' },
  hover: { color: 'black' }
};

const underlineVariants = {
  initial: { width: 0 },
  hover: { width: '100%' }
};

export default function MotionLinkUnderline({ to, children, ...props }) {
  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      animate="initial"
      className="motion-link-wrapper"
    >
      <MotionLink
        to={to}
        {...props}
        variants={linkVariants}
        style={{
          textDecoration: 'none',
          color: 'inherit',
          position: 'relative',
          display: 'inline-block',
        }}
      >
        {children}
        <motion.div
          className="underline"
          variants={underlineVariants}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          style={{
            height: '1px',
            background: 'black',
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: 0,
          }}
        />
      </MotionLink>
    </motion.div>
  );
}

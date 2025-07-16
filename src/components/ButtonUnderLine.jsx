import { motion } from 'framer-motion';

const underlineVariants = {
    initial : {width : 0},
    hover : {width : '100%'}
}

export default function ButtonUnderLine({ children, ...props }) {
  return (
    <motion.div
      role="button"
      initial="initial"
      whileHover="hover"
      animate="initial"
      className="position-relative d-inline-block pb-1"
      {...props}
    >
      {children}
      <motion.div
        className="position-absolute bottom-0 start-0"
        style={{
          height: "1px",
          backgroundColor: "black"
        }}
        variants={underlineVariants}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      />
    </motion.div>
  );
}

import { NavLink } from 'react-router-dom';
import { motion, useScroll, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

const AppHeader = () => {
    const { scrollY } = useScroll();
    const controls = useAnimation();

    useEffect(() => {
  const unsubscribe = scrollY.on("change", (y) => {
    if (y > 50) {
      controls.start({
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #cccccc',
        color: '#000000',
        transition: {  duration: 1 }
      });
    } else {
      controls.start({
        backgroundColor: 'transparent',
        borderBottom: '1px solid #ffffff',
        color: '#ffffff',
        transition: {duration: 1 }
      });
    }
  });

  return () => unsubscribe();
}, [scrollY, controls]);


    return (
        <motion.header className='header' animate={controls}>
            <div className="nav-bar d-flex justify-content-between align-items-center p-3">
                <div className="left-col d-flex gap-3">
                    <NavLink to='/' className="nav-link">Home</NavLink>
                    <NavLink to='/categories' className="nav-link">Categorie</NavLink>
                </div>
                <div className="brand-col">
                 <p className='text-center m-0'>JW <span><img src="\img\jw_logo.png" alt="Brand Logo Image" /></span> LUX</p>
                </div>
                <div className="right-col d-flex justify-content-end gap-3">
                    <p className='m-0'>Search</p>
                    <p className='m-0'>Cart</p>
                </div>
            </div>
        </motion.header>
    );
};

export default AppHeader;

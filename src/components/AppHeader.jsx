import { NavLink } from 'react-router-dom';
import { motion, useScroll, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

const AppHeader = ({ isHomePage }) => {
    const { scrollY } = useScroll();
    const controls = useAnimation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const unsubscribe = scrollY.on("change", (y) => {
            if (isHomePage) {
                // Comportamento per la homepage
                if (y > 50) {
                    controls.start({
                        backgroundColor: '#ffffff',
                        borderBottom: '1px solid #cccccc',
                        color: '#000000',
                        transition: { duration: 0.4 }
                    });
                } else {
                    controls.start({
                        backgroundColor: 'transparent',
                        borderBottom: '1px solid #ffffff',
                        color: '#ffffff',
                        transition: { duration: 0.4 }
                    });
                }
            } else {
                // Comportamento per le altre pagine
                if (y > 50) {
                    controls.start({
                        backgroundColor: '#ffffff',
                        borderBottom: '1px solid #cccccc',
                        color: '#000000',
                        transition: { duration: 0.4 }
                    });
                } else {
                    controls.start({
                        backgroundColor: '#000000',
                        borderBottom: '1px solid #ffffff',
                        color: '#ffffff',
                        transition: { duration: 0.4 }
                    });
                }
            }
        });

        // Imposta lo stato iniziale per le pagine non-homepage
        if (!isHomePage) {
            controls.start({
                backgroundColor: '#000000',
                borderBottom: '1px solid #ffffff',
                color: '#ffffff',
                transition: { duration: 0.4 }
            });
        }

        return () => unsubscribe();
    }, [scrollY, controls, isHomePage]);

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
        document.body.style.overflow = !isMenuOpen ? 'hidden' : 'auto';
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
        document.body.style.overflow = 'auto';
    };

    return (
        <motion.header className='header' animate={controls}>
            <div className="nav-bar d-flex justify-content-between align-items-center p-3">
                {/* Hamburger menu (mobile only) */}
                <button 
                    className={`hamburger-menu d-lg-none ${isMenuOpen ? 'active' : ''}`}
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                {/* Navigation links */}
                <motion.div 
                    className={`left-col ${isMenuOpen ? 'show' : ''}`}
                    initial={false}
                    animate={{
                        opacity: isMenuOpen ? 1 : 1,
                        y: isMenuOpen ? 0 : 0
                    }}
                    transition={{
                        duration: 0.3,
                        ease: "easeInOut"
                    }}
                >
                    <NavLink 
                        to='/' 
                        className="nav-link" 
                        onClick={closeMenu}
                    >
                        Home
                    </NavLink>
                    <NavLink 
                        to='/categories' 
                        className="nav-link" 
                        onClick={closeMenu}
                    >
                        Categorie
                    </NavLink>
                </motion.div>

                {/* Brand logo */}
                <motion.div 
                    className="brand-col"
                    animate={{
                        scale: isMenuOpen ? 0.95 : 1
                    }}
                    transition={{ duration: 0.3 }}
                >
                    <p className='text-center m-0'>
                        JW <span><img src="/img/jw_logo.png" alt="Brand Logo Image" /></span> LUX
                    </p>
                </motion.div>

                {/* Right actions */}
                <div className="right-col d-flex justify-content-end gap-3">
                    <motion.p 
                        className='m-0'
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                    >
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </motion.p>
                    <motion.p 
                        className='m-0'
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                    >
                        <i className="fa-solid fa-bag-shopping"></i>
                    </motion.p>
                </div>
            </div>
        </motion.header>
    );
};

export default AppHeader;
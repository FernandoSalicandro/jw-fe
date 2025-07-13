import { NavLink } from 'react-router-dom';
import { motion, useScroll, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import axios from 'axios';

const AppHeader = ({ isHomePage }) => {
    const { scrollY } = useScroll();
    const controls = useAnimation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);

useEffect(() => {
    if(searchValue && searchValue.length >= 4){
        axios.get(`http://localhost:3000/products?search=${searchValue}`).then(resp =>
            setSearchResults(resp.data)
        ).catch(err => console.log(err))    
    
    } else {
        setSearchResults([]);
    }
}, [searchValue])

    useEffect(() => {
        const handleScroll = (y) => {
            setIsScrolled(y > 50);

            const baseStyle = {
                transition: { duration: 0.4 }
            };

            if (isHomePage) {
                if (y > 50) {
                    controls.start({
                        backgroundColor: '#ffffff',
                        borderBottom: '1px solid #cccccc',
                        ...baseStyle
                    });
                } else {
                    controls.start({
                        backgroundColor: 'transparent',
                        borderBottom: '1px solid #ffffff',
                        ...baseStyle
                    });
                }
            } else {
                if (y > 50) {
                    controls.start({
                        backgroundColor: '#ffffff',
                        borderBottom: '1px solid #cccccc',
                        ...baseStyle
                    });
                } else {
                    controls.start({
                        backgroundColor: '#000000',
                        borderBottom: '1px solid #ffffff',
                        ...baseStyle
                    });
                }
            }
        };

        const unsubscribe = scrollY.on("change", handleScroll);

        if (!isHomePage) {
            controls.start({
                backgroundColor: '#000000',
                borderBottom: '1px solid #ffffff',
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

    const textClass = isMenuOpen ? 'text-white' : isScrolled ? 'text-black' : 'text-white';
    const brandTextClass = (() => {
        if (isMenuOpen) {
            return isHomePage ? 'text-white' : 'text-black'; // ← menu aperto
        } else if (isScrolled) {
            return 'text-black'; // ← scroll attivo
        } else {
            return isHomePage ? 'text-white' : 'text-white'; // ← in alto
        }
    })();



    return (
        <motion.header
            className='header'
            animate={controls}
            initial={isHomePage ? {
                backgroundColor: 'transparent'
            } : {
                backgroundColor: '#000000'
            }}
        >
            <div className="nav-bar d-flex justify-content-between align-items-center p-3">
                {/* Hamburger Menu */}
                <button
                    className={`hamburger-menu d-lg-none ${isMenuOpen ? 'active' : ''} ${isScrolled ? 'scrolled' : ''}`}
                    onClick={toggleMenu}
                    aria-label="Toggle navigation menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                {/* Navigation Links */}
                <motion.div
                    className={`left-col ${isMenuOpen ? 'show' : ''}`}
                    initial={false}
                    animate={{
                        opacity: 1,
                        y: 0
                    }}
                    transition={{
                        duration: 0.3,
                        ease: "easeInOut"
                    }}
                >
                    <NavLink
                        to='/'
                        className={`nav-link ${textClass}`}
                        onClick={closeMenu}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to='/categories'
                        className={`nav-link ${textClass}`}
                        onClick={closeMenu}
                    >
                        Categorie
                    </NavLink>
                </motion.div>

                {/* Brand Logo */}
                <motion.div
                    className="brand-col"
                    animate={{
                        scale: isMenuOpen ? 0.95 : 1
                    }}
                    transition={{
                        duration: 0.3,
                        ease: "easeOut"
                    }}
                >
                    <p className={`text-center m-0 ${brandTextClass}`}>


                        JW <span><img src="/img/jw_logo.png" alt="JW LUX Logo" /></span> LUX
                    </p>
                </motion.div>

                {/* Action Icons */}
                <div className="right-col d-flex justify-content-end gap-3">
                    <motion.p
                        className={`m-0 ${textClass}`}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                    >
                        <i type="button" onClick={() => setIsSearchOpen(!isSearchOpen)} className="fa-solid fa-magnifying-glass" aria-label="Search"></i>
                    </motion.p>
                    <motion.p
                        className={`m-0 ${textClass}`}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                    >
                        <i className="fa-solid fa-bag-shopping" aria-label="Shopping cart"></i>
                    </motion.p>
                </div>
            </div>
            {isSearchOpen && (
                <>
                    <div className={`nav-search-cont container-fluid bg-white text-black py-3 d-flex justify-content-center align-items-center gap-1 ${isSearchOpen ? 'open' : ''}`}>
                        <i className="fa-solid fa-magnifying-glass" aria-label="Search"></i>
                        <div action='submit' className="nav-search container-fluid form d-flex justify-content-center align-items-center gap-1">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="form-control p-3"
                                aria-label="Search"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                            />
                            <i
                                role="button"
                                onClick={() => setIsSearchOpen(false)}
                                className="fa-solid fa-xmark"
                                aria-label="Close search"
                            ></i>

                        </div>

                    </div>
                    {searchResults.length >0 &&
                    <div className="search-res-modal">
                        {searchResults.map(curResult => (
                            <div className="search-res-item">
                                <a href={`/productDetails/${curResult.slug}`}>
                                    {curResult.name}
                                </a>
                            </div>
                        ))}
                    </div>
                    }
                </>

            )}

        </motion.header>
    );
};

export default AppHeader;

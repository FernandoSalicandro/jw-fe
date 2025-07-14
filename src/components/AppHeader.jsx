import { NavLink, Link } from 'react-router-dom';
import { motion, useScroll, useAnimation, easeInOut } from 'framer-motion';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductsCarousel from '../components/ProductsCarousel.jsx';
import MotionLinkUnderline from '../components/MotionLink.jsx';


const AppHeader = ({ isHomePage }) => {
    const { scrollY } = useScroll();
    const controls = useAnimation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

    useEffect(() => {
        if (searchValue && searchValue.length >= 3) {
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

        // 👇 Forza update immediato sul mount o cambio pagina
        handleScroll(scrollY.get());

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

    const MotionLink = motion(Link);



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
                    <button

                        className={`border-0 btn btn-outline ${isScrolled ? 'show-details' : 'show-details-white'} ${textClass} fs-5 `}
                        onClick={() => { setIsCategoriesOpen(!isCategoriesOpen); closeMenu() }}
                    >
                        Categories
                    </button>
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
                        <div className="nav-search container-fluid form d-flex justify-content-center align-items-center gap-1">
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
                    {searchResults.length > 0 &&
                        <>

                            <motion.div
                                className="bg-white pb-2 border overflow-hidden"
                                initial={{ height: 0 }}
                                animate={{ height: 'auto' }}
                                exit={{ height: 0 }}
                                transition={{ ease: easeInOut, duration: 0.8 }}
                            >
                                <div className='d-flex justify-content-between align-items-center p-2'>
                                    <p className='text-black mx-5 m-0'>Results</p>
                                    <button className="btn btn-outline border-0 show-details mx-5 m-0">Show All</button>

                                </div>

                                <div className="search-res-modal ">
                                    <ProductsCarousel products={searchResults} onCloseSearch={() => setIsSearchOpen(false)} />
                                </div>



                            </motion.div>
                        </>
                    }




                </>
            )}

            {isCategoriesOpen &&
                <motion.div
                    className="categories-nav-modal bg-white text-black pb-2 border overflow-hidden"
                    initial={{ width: 0 }}
                    animate={{ width: 300 }}
                    exit={{ width: 0 }}
                    transition={{ ease: easeInOut, duration: 0.8 }}
                >

                    <div className="d-flex justify-content-end p-2">
                        <button
                            className="btn-close"
                            onClick={() => setIsCategoriesOpen(false)}
                            aria-label="Close categories menu"
                        ></button>
                    </div>
                    <ul>
                        <li><MotionLinkUnderline to="/rings">Rings</MotionLinkUnderline></li>
                        <li><MotionLinkUnderline to="/earrings">Earrings</MotionLinkUnderline></li>
                        <li><MotionLinkUnderline to="/bracelets">Bracelets</MotionLinkUnderline></li>
                        <li><MotionLinkUnderline to="/necklaces">Necklaces</MotionLinkUnderline></li>

                    </ul>
                   


                </motion.div>

            }
        </motion.header>
    );
};

export default AppHeader;

import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { motion, useScroll, useAnimation, easeInOut, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductsCarousel from "../components/ProductsCarousel.jsx";
import MotionLinkUnderline from "../components/MotionLink.jsx";
import { useCart } from "../Context/CartContext";
import { useWishList } from "../Context/WishListContext";
import { useSearch } from "../Context/SearchContext.jsx";
import CartModal from "../components/CartModal.jsx";
import WishListModal from "../components/WishListModal.jsx";

const AppHeader = ({ isHomePage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [discountCode, setDiscountCode] = useState(null);

  const { scrollY } = useScroll();
  const controls = useAnimation();
  const navigate = useNavigate();
  const location = useLocation();

  const { searchResults, setSearchResults } = useSearch();
  const { isCartOpen, setIsCartOpen, cart } = useCart();
  const { isWishListOpen, setIsWishListOpen, wishList } = useWishList();


  //nascondere il banner solo in alcune pagine 
  const hidenBannerOn = ["/thankyou"]

  const showBanner = !hidenBannerOn.includes(location.pathname);

  useEffect(() => {
    axios.get('http://localhost:3000/products/discount-code')
      .then(response => {
        if (response.data.data?.length > 0) {
          setDiscountCode(response.data.data[0]);
        }
      })
      .catch(error => console.error('Error fetching discount code:', error));
  }, []);

  useEffect(() => {
    if (isCategoriesOpen) {
      setIsCategoriesOpen(false);
    }
  }, [location]);

  useEffect(() => {
    if (searchValue && searchValue.length >= 3) {
      axios.get(`http://localhost:3000/products?search=${searchValue}`)
        .then(resp => setSearchResults(resp.data))
        .catch(err => console.log(err));
    } else {
      setSearchResults([]);
    }
  }, [searchValue]);

  useEffect(() => {
    const handleScroll = (y) => {
      setIsScrolled(y > 50);
      const baseStyle = { transition: { duration: 0.4 } };

      controls.start({
        backgroundColor: isHomePage
          ? (y > 50 ? "#ffffff" : "transparent")
          : (y > 50 ? "#ffffff" : "#000000"),
        borderBottom: isHomePage
          ? (y > 50 ? "1px solid #cccccc" : "1px solid #ffffff")
          : "1px solid #ffffff",
        ...baseStyle,
      });
    };

    const unsubscribe = scrollY.on("change", handleScroll);
    handleScroll(scrollY.get());
    return () => unsubscribe();
  }, [scrollY, controls, isHomePage]);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
    document.body.style.overflow = !isMenuOpen ? "hidden" : "auto";
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = "auto";
  };

  const textClass = isMenuOpen ? "text-white" : isScrolled ? "text-black" : "text-white";
  const brandTextClass = isMenuOpen
    ? (isHomePage ? "text-white" : "text-black")
    : isScrolled ? "text-black" : "text-white";

  return (
    <>
      <motion.header
        className="header"
        animate={controls}
        initial={isHomePage ? { backgroundColor: "transparent" } : { backgroundColor: "#000000" }}
      >
        <div className="nav-bar d-flex justify-content-between align-items-center p-3">
          <button
            className={`hamburger-menu d-lg-none ${isMenuOpen ? "active" : ""} ${isScrolled ? "scrolled" : ""}`}
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
          >
            <span></span><span></span><span></span>
          </button>

          <motion.div
            className={`left-col ${isMenuOpen ? "show" : ""}`}
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <NavLink to="/" className={`nav-link ${textClass}`} onClick={closeMenu}>Home</NavLink>
            <button
              className={`border-0 btn btn-outline ${isScrolled ? "show-details" : "show-details-white"} ${textClass} fs-5`}
              onClick={() => { setIsCategoriesOpen(!isCategoriesOpen); closeMenu(); }}
            >
              Categories
            </button>
          </motion.div>

          <motion.div className="brand-col" animate={{ scale: isMenuOpen ? 0.95 : 1 }} transition={{ duration: 0.3, ease: "easeOut" }}>
            <p className={`text-center m-0 ${brandTextClass}`}>
              JW <span><img src="/img/jw_logo.png" alt="JW LUX Logo" /></span> LUX
            </p>
          </motion.div>

          <div className="right-col d-flex justify-content-end gap-3">
            <motion.p className={`m-0 ${textClass}`} whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
              <i type="button" onClick={() => setIsSearchOpen(!isSearchOpen)} className="fa-solid fa-magnifying-glass" aria-label="Search" />
            </motion.p>

            <motion.p className={`m-0 ${textClass}`} whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
              <div className="position-relative">
                <i type="button" className="fa-regular fa-heart" onClick={() => setIsWishListOpen(!isWishListOpen)} aria-label="Wish list" />
                {wishList.length > 0 && <span className="icon-badge"></span>}
              </div>
            </motion.p>

            <motion.p className={`m-0 ${textClass}`} whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
              <div className="position-relative">
                <i role="button" onClick={() => setIsCartOpen(!isCartOpen)} className="fa-solid fa-bag-shopping" aria-label="Shopping cart" />
                {cart.length > 0 && <span className="icon-badge"></span>}
              </div>
            </motion.p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {isSearchOpen ? (
            <motion.div
              key="search"
              initial={{ y: -42, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -32, opacity: 0 }}
              transition={{ ease: "easeOut", duration: 0.5 }}
            >
              <>
                <div className="nav-search-cont container-fluid bg-white text-black py-3 d-flex justify-content-center align-items-center gap-1">
                  <i className="fa-solid fa-magnifying-glass" />
                  <div className="nav-search container-fluid form d-flex gap-1">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="form-control p-3"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <i
                      role="button"
                      onClick={() => setIsSearchOpen(false)}
                      className="fa-solid fa-xmark"
                      aria-label="Close search"
                    />
                  </div>
                </div>

                {searchResults.length > 0 && (
                  <motion.div
                    className="bg-white pb-2 border overflow-hidden"
                    initial={{ y: -32, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    transition={{ ease: easeInOut, duration: 0.5 }}
                  >
                    <div className='d-flex justify-content-between align-items-center p-2'>
                      <p className='text-black mx-5 m-0'>Results</p>
                      <button
                        className="btn btn-outline border-0 show-details mx-5 m-0"
                        onClick={() => {
                          navigate(`/search?query=${searchValue}`);
                          setIsSearchOpen(false);
                        }}
                      >
                        Show All
                      </button>
                    </div>
                    <div className="search-res-modal">
                      <ProductsCarousel products={searchResults} onCloseSearch={() => setIsSearchOpen(false)} />
                    </div>
                  </motion.div>
                )}
              </>
            </motion.div>
          ) : (
            discountCode  && showBanner && (
              <motion.div
                key="banner"
                initial={{ y: -42, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -32, opacity: 0 }}
                transition={{ ease: "easeOut", duration: 0.5 }}
                className="code-banner section-separator bg-dark my-0"
              >
                <p className="text-center text-white m-0 py-2">
                  Special Code {discountCode.code} - {discountCode.value}% OFF!
                  Valid from {new Date(discountCode.start_date).toLocaleDateString()}
                  to {new Date(discountCode.end_date).toLocaleDateString()} - Enjoy Our Free Shipping On All Orders
                </p>
              </motion.div>
            )
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isCategoriesOpen && (
            <motion.div
              className="categories-nav-modal bg-white text-black pb-2 border overflow-hidden"
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ ease: easeInOut, duration: 0.5 }}
            >
              <div className="d-flex justify-content-end p-2">
                <button className="btn-close" onClick={() => setIsCategoriesOpen(false)} aria-label="Close categories menu" />
              </div>
              <ul>
                <li><MotionLinkUnderline onClick={() => setIsCategoriesOpen(false)} to="/rings">Rings</MotionLinkUnderline></li>
                <li><MotionLinkUnderline onClick={() => setIsCategoriesOpen(false)} to="/earrings">Earrings</MotionLinkUnderline></li>
                <li><MotionLinkUnderline onClick={() => setIsCategoriesOpen(false)} to="/bracelets">Bracelets</MotionLinkUnderline></li>
                <li><MotionLinkUnderline onClick={() => setIsCategoriesOpen(false)} to="/necklaces">Necklaces</MotionLinkUnderline></li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <WishListModal isOpen={isWishListOpen} onClose={() => setIsWishListOpen(false)} />
    </>
  );
};

export default AppHeader;

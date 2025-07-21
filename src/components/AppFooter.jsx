import { NavLink } from 'react-router-dom';
const AppFooter = () => {
    return (
        <footer className="footer">
            <div className="container-footer">
                <div className="footer-column">
                    <h4>JW LUX</h4>
                    <p>Please call or email for any information or to make an appointment at one of our boutiques.</p>
                    <p>+1 (212) 421 3030</p>
                    <div className="footer-social">
                        <NavLink to="#"><i className="fab fa-facebook-f"></i></NavLink>
                        <NavLink to="#"><i className="fab fa-instagram"></i></NavLink>
                        <NavLink to="#"><i className="fab fa-twitter"></i></NavLink>
                    </div>
                </div>
                <div className="footer-column">
                    <h4>SHOP</h4>
                    <ul>
                        <li><NavLink to="/earrings">Earrings</NavLink></li>
                        <li><NavLink to="/bracelets">Bracelets</NavLink></li>
                        <li><NavLink to="/necklace">Necklaces</NavLink></li>
                        <li><NavLink to="/rings">Rings</NavLink></li>
                    </ul>
                </div>

                <div className="footer-column">
                    <h4>CLIENT SERVICES</h4>
                    <ul>
                        <li><NavLink to="/about-us">About Us</NavLink></li>
                        <li><NavLink to="/CustomerService">Customer Service</NavLink></li>
                        <li><NavLink to="/Shippingandreturns">Shipping and Returns</NavLink></li>
                    </ul>
                </div>

                <div className="footer-column">
                    <h4>CONTACT</h4>
                    <ul>
                        <li><NavLink to="/contact">Contact Us</NavLink></li>
                        <li><NavLink to="/book-appointment">Book an Appointment</NavLink></li>
                        <li><NavLink to="/careers">Careers</NavLink></li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h4>Sign Up</h4>
                    <p>Discover in advance the new arrivals from our extraordinary workshop, special events, and other news from the world of JW LUX.</p>
                </div>
            </div>
        </footer>
    )

};



export default AppFooter;
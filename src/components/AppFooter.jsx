
const AppFooter = () => {
    return (
        <footer className="footer">
            <div className="column">
                <h4>SHOP</h4>
                <ul>
                    <li><a href="#">Anelli</a></li>
                    <li><a href="#">Bracciali</a></li>
                    <li><a href="#">Collane</a></li>
                    <li><a href="#">Orecchini</a></li>
                </ul>
            </div>

            <div className="column">
                <h4>CLIENT SERVICES</h4>
                <ul>
                    <li><a href="#">Chi siamo</a></li>
                    <li><a href="#">Servizi clienti</a></li>
                    <li><a href="#">Spedizione</a></li>
                    <li><a href="#">Resi e rimborsi</a></li>
                </ul>
            </div>

            <div className="column">
                <h4>CONTACT</h4>
                <p>Email:</p>
                <p>Tel:</p>
                <div className="social-icons">
                      <ul>
                    <li><a href="#">twitter</a></li>
                    <li><a href="#">facebook</a></li>
                    <li><a href="#">instagram</a></li>
                </ul>
                </div>
            </div>
            <div className="column">
                <h4>ISCRIZIONE</h4>
                <p>Scopri in anteprima i nuovi arrivi dal nostro straordinario laboratorio, gli eventi speciali e altre novità dal mondo di JWLUX.</p>
            </div>
        </footer>
    )

};

export default AppFooter;
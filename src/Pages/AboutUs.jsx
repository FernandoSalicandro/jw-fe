export default function AboutUs() {
    return (
        <>
        <div className="page-main">
    {/* prima immagine */}
    <div className="aboutus-card-row" style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
        <div className="aboutus-card-text" style={{ flex: 1, padding: '1rem' }}>
            <h2>La nostra storia</h2>
            <p>
                Siamo un team appassionato di gioielli, dediti a creare pezzi unici che raccontano una storia. Ogni collezione nasce da un'ispirazione autentica e da una ricerca continua della qualità.
            </p>
        </div>
        <div className="aboutus-card-img" style={{ flex: 1, textAlign: 'right' }}>
            <img src="/img/brand-story-img.png" alt="La nostra storia" style={{ maxWidth: '80%', width: '100%', margin: '9px' }} />
        </div>
    </div>

    {/* seconda immagine */}
                <div className="aboutus-card-row" style={{ display: 'flex', alignItems: 'center', flexDirection: 'row-reverse' }}>
                    <div className="aboutus-card-text" style={{ flex: 1, padding: '1rem' }}>
                        <h2>I nostri valori</h2>
                        <p>
                            Crediamo nell'artigianalità, nella sostenibilità e nell'attenzione ai dettagli. Ogni gioiello è realizzato con cura per accompagnarti nei momenti più importanti della tua vita.
                        </p>
                    </div>
                    <div className="aboutus-card-img" style={{ flex: 1, textAlign: 'left' }}>
                        <img src="/img/hero-homepage.png" alt="I nostri valori" style={{ maxWidth: '80%', margin:'9px' }} />
                    </div>
                </div>
        </div>
        </>
    )
}

          <div className="container">
                    <div className="row row-cols-2 d-flex text-cente brand-story-img">
                        <div className="col p-0"><img src="img/brand-story-img.png" alt="" /></div>
                        <div className="col p-0 text-center">Ciao</div>
                    </div>
                    <div className="row row-cols-2 d-flex text-cente brand-story-img">
                        <div className="col p-0">Ciao</div>
                        <div className="col p-0"><img src="img/brand-story-img.png" alt="" /></div>

                    </div>


                </div>
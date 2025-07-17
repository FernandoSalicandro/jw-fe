export default function AboutUs() {
    return (
        <>
            <div className="page-main">
                {/* prima immagine */}
                <div className="aboutus-card-row" style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                    <div className="aboutus-card-text" style={{ flex: 1, padding: '1rem' }}>
                        <h2>Our Story</h2>
                        <p>
                            Since 1952, our jewelry atelier has stood for timeless elegance and artisanal mastery. Founded in a small workshop in the heart of the city, our brand began with a single craftsman’s dream: to shape precious metals into meaningful pieces. Over the decades, that passion has passed through generations, growing into a family legacy that honors tradition while embracing modern beauty. Every creation tells a story — of love, of history, of craftsmanship.
                            Each piece we create carries the essence of where we come from: the careful hands of our founders, the inspiration drawn from nature, art, and human connection. From engagement rings to heirloom necklaces, every jewel is more than an object — it’s a moment frozen in time, a memory made tangible, a symbol of something deeply personal.
                            Today, we continue to design and handcraft our collections with the same love, in the same city, honoring our legacy while looking to the future. Because for us, jewelry is not just made — it is lived, worn, remembered.
                        </p>
                    </div>
                    <div className="aboutus-card-img" style={{ flex: 1, textAlign: 'right' }}>
                        <img src="/img/brand-story-img.png" alt="La nostra storia" style={{ maxWidth: '80%', width: '100%', margin: '9px' }} />
                    </div>
                </div>

                {/* seconda immagine */}
                <div className="aboutus-card-row" style={{ display: 'flex', alignItems: 'center', flexDirection: 'row-reverse' }}>
                    <div className="aboutus-card-text" style={{ flex: 1, padding: '1rem' }}>
                        <h2>Our Values</h2>
                        <p>
                            At the core of everything we do lies authenticity, integrity, and attention to detail. We believe jewelry is more than adornment — it’s a personal expression, a symbol of moments worth remembering. That’s why we work with ethically sourced materials, carefully selected gemstones, and a deep respect for the art of handcrafting. Our commitment is to create pieces that last, that speak, and that are as unique as the people who wear them.
                            We value authenticity, timelessness, and meaning. Our collections are not driven by passing trends but by a deep respect for form, craftsmanship, and emotional connection. Whether you’re choosing a gift for someone you love or marking a chapter of your own life, we believe that jewelry should hold more than beauty — it should hold memory, emotion, and truth.
                            With every creation, we aim to honor individuality. Because no two people are the same — and neither should their jewelry be.
                        </p>
                    </div>
                    <div className="aboutus-card-img" style={{ flex: 1, textAlign: 'left' }}>
                        <img src="/img/hero-homepage.png" alt="I nostri valori" style={{ maxWidth: '80%', margin: '9px' }} />
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
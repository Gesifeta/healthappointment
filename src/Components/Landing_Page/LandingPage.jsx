import "./LandingPage.css"

const LandingPage = () => {
    return (
        <section className="hero-section">
            <div>
                <div data-aos="fade-up" className="flex-hero">

                    <h1>
                        Your Health<br />
                        <span className="text-gradient">

                            Our Responsibility
                        </span>
                    </h1>
                    <div className="blob-cont">
                        <div className="blue blob"></div>
                    </div>
                    <div className="blob-cont">
                        <div className="blue1 blob"></div>
                    </div>
                    <h4>
                        At Loyo, we believe in making healthcare simple, accessible, and patient-focused. Our mission is to provide a seamless appointment scheduling experience, connecting patients with qualified healthcare providers who meet their specific needs. Whether you are booking a routine check-up or seeking specialist care, we make it easy to find and schedule appointments with trusted medical professionals.
                    </h4>
                    <a href="#services">
                        <button className="button">Get Started</button>
                    </a>

                </div>

            </div>
        </section>
    )
}

export default LandingPage
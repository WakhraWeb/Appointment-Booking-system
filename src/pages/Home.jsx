
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import About from "../components/About";
import Testimonials from "../components/Testimonials";
import Booking from "./Booking";
import Footer from "../components/Footer";
const Home = () => {
    return (
        <>
            <Navbar />

            <main>
                <Hero />
                <Services />
                <About />
                <Testimonials />
                <Booking />
            </main>

            <Footer />

        </>
    );
};

export default Home;

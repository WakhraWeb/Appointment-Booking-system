import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-forest text-white">
            <div className="container-custom grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
                {/* Brand */}
                <div>
                    <Link to="/" className="font-heading text-2xl font-bold">
                        Glow<span className="text-rose">Beauty</span>
                    </Link>
                    <p className="mt-4 max-w-xs text-sm leading-7 text-white/70">
                        Your beauty, our passion. Enjoy thoughtful treatments,
                        personalized care, and a little time just for you.
                    </p>
                    <Link to="/booking" className="btn-primary mt-6 inline-flex">
                        Book an Appointment <span aria-hidden="true">↗</span>
                    </Link>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="font-heading text-lg font-semibold">Quick Links</h3>
                    <ul className="mt-5 space-y-3 text-sm text-white/70">
                        <li><Link to="/" className="hover:text-white">Home</Link></li>
                        <li><a href="/#services" className="hover:text-white">Services</a></li>
                        <li><a href="/#about" className="hover:text-white">About Us</a></li>
                        <li><a href="/#testimonials" className="hover:text-white">Reviews</a></li>
                    </ul>
                </div>

                {/* Services */}
                <div>
                    <h3 className="font-heading text-lg font-semibold">Our Services</h3>
                    <ul className="mt-5 space-y-3 text-sm text-white/70">
                        <li>Facial & Skincare</li>
                        <li>Hair Styling</li>
                        <li>Makeup</li>
                        <li>Manicure & Pedicure</li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="font-heading text-lg font-semibold">Get in Touch</h3>
                    <ul className="mt-5 space-y-3 text-sm leading-6 text-white/70">
                        <li>Email: hello@glowbeauty.com</li>
                        <li>Phone: +92 300 1234567</li>
                        <li>Opening Hours: Mon – Sat, 9 AM – 7 PM</li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-white/15">
                <div className="container-custom flex flex-col gap-3 py-5 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
                    <p>© {new Date().getFullYear()} GlowBeauty. All rights reserved.</p>
                    <p>Made with care for your beauty.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
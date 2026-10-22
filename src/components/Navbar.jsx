import { useState } from "react";
import { Link } from "react-router-dom";
const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Reviews", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 border-b border-border bg-ivory/95 backdrop-blur-md">
            <nav
                className="container-custom flex min-h-[76px] items-center justify-between gap-6"
                aria-label="Main navigation"
            >
                {/* Brand */}
                <a href="#home" className="shrink-0" aria-label="GlowBeauty home">
                    <span className="font-heading text-2xl font-bold tracking-tight text-forest">
                        Glow<span className="text-rose-dark">Beauty</span>
                    </span>
                    <span className="mt-0.5 block text-[9px] font-semibold uppercase tracking-[0.24em] text-muted">
                        Your beauty, our passion
                    </span>
                </a>

                {/* Desktop navigation */}

                <div className="hidden items-center gap-8 md:flex">
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="text-sm font-medium text-ink transition-colors duration-200 hover:text-rose-dark"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>


                {/* Desktop CTA */}

                <Link
                    to="/booking"
                    className="btn-primary !hidden md:!inline-flex whitespace-nowrap"
                >
                    Book an Appointment
                </Link>


                {/* Mobile menu button */}
                <button
                    type="button"
                    className="flex size-11 items-center justify-center rounded-full border border-border text-forest transition-colors hover:bg-white md:hidden"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
                    aria-expanded={menuOpen}
                    aria-controls="mobile-navigation"
                >
                    {menuOpen ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                        >
                            <path d="M18 6 6 18M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                        >
                            <path d="M4 7h16M4 12h16M4 17h16" />
                        </svg>
                    )}
                </button>
            </nav>

            {/* Mobile navigation */}
            {menuOpen && (
                <div
                    id="mobile-navigation"
                    className="border-t border-border bg-ivory px-5 pb-6 pt-3 md:hidden"
                >
                    <div className="container-custom flex flex-col">
                        {navLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                onClick={() => setMenuOpen(false)}
                                className="border-b border-border py-4 text-sm font-medium text-ink transition-colors hover:text-rose-dark"
                            >
                                {link.label}
                            </a>
                        ))}

                        <a
                            href="#booking"
                            onClick={() => setMenuOpen(false)}
                            className="btn-primary mt-5 w-full "
                        >
                            Book an Appointment
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
}

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Reviews", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

    const closeMenu = () => setMenuOpen(false);

    useEffect(() => {
        let active = true;

        const loadUser = async () => {
            const { data: { user: currentUser } } =
                await supabase.auth.getUser();

            if (!active) return;

            setUser(currentUser);

            if (currentUser) {
                const { data: profile, error } = await supabase
                    .from("profiles")
                    .select("role")
                    .eq("id", currentUser.id)
                    .single();

                if (!active) return;

                setRole(error ? null : profile?.role || null);
            } else {
                setRole(null);
            }

            if (active) setLoading(false);
        };

        loadUser();

        const { data: { subscription } } =
            supabase.auth.onAuthStateChange(() => {
                loadUser();
            });

        return () => {
            active = false;
            subscription.unsubscribe();
        };
    }, []);

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error("Logout error:", error);
            alert("Logout nahi ho saka. Please try again.");
            return;
        }

        closeMenu();
    };

    const displayName =
        user?.user_metadata?.full_name ||
        user?.email?.split("@")[0] ||
        "User";

    const dashboardLink =
        role === "admin" ? "/admin-dashboard" : "/dashboard";

    const dashboardLabel =
        role === "admin" ? "Admin Dashboard" : "Dashboard";

    const authActions = (
        <>
            {loading ? null : user ? (
                <>
                    {/* User identity */}
                    <div className="flex max-w-[150px] min-w-0 items-center gap-2 rounded-full border border-border bg-white/70 px-2 py-1.5">
                        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-blush text-sm font-bold text-forest">
                            {displayName.charAt(0).toUpperCase()}
                        </span>

                        <div className="min-w-0">
                            <p className="max-w-[100px] truncate text-xs font-semibold leading-4 text-forest">
                                {displayName}
                            </p>
                            <p className="text-[10px] leading-3 text-muted">
                                {role === "admin" ? "Admin" : "Customer"}
                            </p>
                        </div>
                    </div>

                    {/* Dashboard */}
                    <Link
                        to={dashboardLink}
                        onClick={closeMenu}
                        className="whitespace-nowrap rounded-full border border-rose-dark/20 bg-blush px-3 py-2.5 text-sm font-semibold text-rose-dark shadow-sm transition-all duration-200 hover:border-rose-dark hover:bg-rose-dark hover:text-white"
                    >
                        {dashboardLabel}
                    </Link>

                    {/* Logout */}
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="whitespace-nowrap rounded-full border border-border bg-white/60 px-3 py-2.5 text-sm font-semibold text-forest transition-colors hover:border-rose-dark hover:bg-blush hover:text-rose-dark"
                    >
                        Logout
                    </button>
                </>
            ) : (
                <>
                    <Link
                        to="/login"
                        onClick={closeMenu}
                        className="whitespace-nowrap rounded-full px-3 py-2.5 text-sm font-semibold text-forest transition-colors hover:bg-blush"
                    >
                        Login
                    </Link>

                    <Link
                        to="/signup"
                        onClick={closeMenu}
                        className="whitespace-nowrap rounded-full border border-rose-dark bg-rose-dark px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-rose"
                    >
                        Sign Up
                    </Link>
                </>
            )}
        </>
    );

    return (
        <header className="sticky top-0 z-50 border-b border-border bg-ivory/95 backdrop-blur-md">
            <nav
                className="container-custom flex min-h-[76px] items-center justify-between gap-3"
                aria-label="Main navigation"
            >
                {/* Brand */}
                <a
                    href="#home"
                    onClick={closeMenu}
                    className="shrink-0"
                    aria-label="GlowBeauty home"
                >
                    <span className="font-heading text-2xl font-bold tracking-tight text-forest">
                        Glow<span className="text-rose-dark">Beauty</span>
                    </span>

                    <span className="mt-0.5 block text-[9px] font-semibold uppercase tracking-[0.2em] text-muted">
                        Your beauty, our passion
                    </span>
                </a>

                {/* Desktop navigation */}
                <div className="hidden items-center gap-3 lg:flex xl:gap-5">
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="whitespace-nowrap text-sm font-medium text-ink transition-colors duration-200 hover:text-rose-dark"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                {/* Desktop actions */}
                <div className="hidden shrink-0 items-center gap-1 lg:flex xl:gap-2">
                    {authActions}

                    <Link
                        to="/booking"
                        className="btn-primary shrink-0 whitespace-nowrap !px-3 !py-2.5 text-sm"
                    >
                        Book Appointment
                    </Link>
                </div>

                {/* Mobile menu button */}
                <button
                    type="button"
                    className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border text-forest transition-colors hover:bg-white lg:hidden"
                    onClick={() => setMenuOpen((open) => !open)}
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

            {/* Mobile / tablet navigation */}
            {menuOpen && (
                <div
                    id="mobile-navigation"
                    className="border-t border-border bg-ivory px-5 pb-6 pt-3 lg:hidden"
                >
                    <div className="container-custom flex flex-col">
                        {navLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                onClick={closeMenu}
                                className="border-b border-border py-4 text-sm font-medium text-ink transition-colors hover:text-rose-dark"
                            >
                                {link.label}
                            </a>
                        ))}

                        <div className="flex flex-col gap-3 border-b border-border py-4">
                            {authActions}
                        </div>

                        <Link
                            to="/booking"
                            onClick={closeMenu}
                            className="btn-primary mt-5 w-full text-center"
                        >
                            Book an Appointment
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}

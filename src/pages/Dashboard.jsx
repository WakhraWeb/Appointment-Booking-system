
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function Dashboard() {
    const navigate = useNavigate();
    const [loggingOut, setLoggingOut] = useState(false);

    const handleLogout = async () => {
        setLoggingOut(true);

        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error("Logout error:", error.message);
            setLoggingOut(false);
            return;
        }

        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-ivory">
            <header className="border-b border-border bg-ivory/95">
                <div className="container-custom flex items-center justify-between py-5">
                    <Link to="/" className="font-heading text-2xl font-bold">
                        <span className="text-forest">Glow</span>
                        <span className="text-rose-dark">Beauty</span>
                    </Link>

                    <button
                        onClick={handleLogout}
                        disabled={loggingOut}
                        className="rounded-full border border-forest px-5 py-2 text-sm font-medium text-forest transition hover:bg-forest hover:text-white disabled:opacity-50"
                    >
                        {loggingOut ? "Logging out..." : "Logout"}
                    </button>
                </div>
            </header>

            <main className="container-custom section-padding">
                <div className="mb-10">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-rose-dark">
                        Customer Dashboard
                    </p>

                    <h1 className="font-heading text-3xl font-bold text-forest md:text-4xl">
                        Welcome to GlowBeauty!
                    </h1>

                    <p className="mt-3 text-muted">
                        Manage your appointments and enjoy your beauty journey.
                    </p>
                </div>

                <div className="mb-10 grid gap-5 md:grid-cols-3">
                    <div className="rounded-2xl border border-border bg-white p-6 shadow-card">
                        <p className="text-sm text-muted">Total Appointments</p>
                        <h2 className="mt-3 font-heading text-3xl font-bold text-forest">
                            0
                        </h2>
                    </div>

                    <div className="rounded-2xl border border-border bg-white p-6 shadow-card">
                        <p className="text-sm text-muted">Upcoming Appointments</p>
                        <h2 className="mt-3 font-heading text-3xl font-bold text-forest">
                            0
                        </h2>
                    </div>

                    <div className="rounded-2xl border border-border bg-white p-6 shadow-card">
                        <p className="text-sm text-muted">Completed Appointments</p>
                        <h2 className="mt-3 font-heading text-3xl font-bold text-forest">
                            0
                        </h2>
                    </div>
                </div>

                <section className="rounded-2xl border border-border bg-white p-6 shadow-card md:p-8">
                    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <h2 className="font-heading text-2xl font-bold text-forest">
                                My Appointments
                            </h2>
                            <p className="mt-2 text-sm text-muted">
                                Keep track of your salon visits.
                            </p>
                        </div>

                        <Link
                            to="/booking"
                            className="btn-primary"
                        >
                            Book an Appointment
                        </Link>
                    </div>

                    <div className="rounded-xl bg-ivory px-5 py-12 text-center">
                        <h3 className="font-heading text-xl font-semibold text-forest">
                            No appointments to show yet
                        </h3>

                        <p className="mx-auto mt-2 max-w-md text-sm text-muted">
                            Your appointments will appear here once your bookings
                            are connected to your account.
                        </p>

                        <Link
                            to="/booking"
                            className="mt-6 inline-block font-semibold text-rose-dark hover:underline"
                        >
                            Make your first booking →
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    );
}

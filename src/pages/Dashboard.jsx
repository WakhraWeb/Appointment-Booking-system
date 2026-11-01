 
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function Dashboard() {
    const navigate = useNavigate();

    const [appointments, setAppointments] = useState([]);
    const [customerName, setCustomerName] = useState("");
    const [loading, setLoading] = useState(true);
    const [loggingOut, setLoggingOut] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        let active = true;

        const loadDashboard = async () => {
            try {
                const {
                    data: { user },
                    error: userError,
                } = await supabase.auth.getUser();

                if (userError || !user) {
                    navigate("/login", { replace: true });
                    return;
                }

                if (active) {
                    setCustomerName(
                        user.user_metadata?.full_name ||
                        user.email ||
                        "Customer"
                    );
                }

                const { data, error: bookingError } = await supabase
                    .from("appointments")
                    .select("*")
                    .eq("user_id", user.id)
                    .order("created_at", { ascending: false });

                if (bookingError) throw bookingError;

                if (active) {
                    setAppointments(data || []);
                }
            } catch (err) {
                console.error("Dashboard error:", err);

                if (active) {
                    setError("Could not load your appointments. Please try again.");
                }
            } finally {
                if (active) setLoading(false);
            }
        };

        loadDashboard();

        return () => {
            active = false;
        };
    }, [navigate]);

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

    const counts = {
        total: appointments.length,
        pending: appointments.filter((a) => a.status === "pending").length,
        confirmed: appointments.filter((a) => a.status === "confirmed").length,
        cancelled: appointments.filter((a) => a.status === "cancelled").length,
    };

    const formatDate = (date) => {
        if (!date) return "—";

        return new Date(`${date}T00:00:00`).toLocaleDateString(
            "en-US",
            {
                day: "numeric",
                month: "short",
                year: "numeric",
            }
        );
    };

    const statusStyle = {
        pending: "bg-amber-100 text-amber-800",
        confirmed: "bg-green-100 text-green-800",
        cancelled: "bg-red-100 text-red-800",
    };

    const statCards = [
        { label: "Total Appointments", value: counts.total },
        { label: "Pending", value: counts.pending },
        { label: "Confirmed", value: counts.confirmed },
        { label: "Cancelled", value: counts.cancelled },
    ];

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
                        Welcome, {customerName}!
                    </h1>

                    <p className="mt-3 text-muted">
                        Manage your appointments and enjoy your beauty journey.
                    </p>
                </div>

                {error && (
                    <div className="mb-6 rounded-xl bg-red-50 p-4 text-sm text-red-700">
                        {error}
                    </div>
                )}

                <div className="mb-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {statCards.map((card) => (
                        <div
                            key={card.label}
                            className="rounded-2xl border border-border bg-white p-6 shadow-card"
                        >
                            <p className="text-sm text-muted">{card.label}</p>

                            <h2 className="mt-3 font-heading text-3xl font-bold text-forest">
                                {loading ? "—" : card.value}
                            </h2>
                        </div>
                    ))}
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

                        <Link to="/booking" className="btn-primary">
                            Book an Appointment
                        </Link>
                    </div>

                    {loading ? (
                        <div className="py-12 text-center text-muted">
                            Loading your appointments...
                        </div>
                    ) : appointments.length === 0 ? (
                        <div className="rounded-xl bg-ivory px-5 py-12 text-center">
                            <h3 className="font-heading text-xl font-semibold text-forest">
                                No appointments yet
                            </h3>

                            <p className="mx-auto mt-2 max-w-md text-sm text-muted">
                                Your bookings will appear here once you make an appointment.
                            </p>

                            <Link
                                to="/booking"
                                className="mt-6 inline-block font-semibold text-rose-dark hover:underline"
                            >
                                Make your first booking →
                            </Link>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[650px] text-left">
                                <thead>
                                    <tr className="border-b border-border text-sm text-muted">
                                        <th className="px-4 py-4 font-medium">Service</th>
                                        <th className="px-4 py-4 font-medium">Date</th>
                                        <th className="px-4 py-4 font-medium">Time</th>
                                        <th className="px-4 py-4 font-medium">Status</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {appointments.map((appointment) => (
                                        <tr
                                            key={appointment.id}
                                            className="border-b border-border last:border-0"
                                        >
                                            <td className="px-4 py-5 font-medium text-forest">
                                                {appointment.service_name}
                                            </td>

                                            <td className="px-4 py-5 text-sm text-ink">
                                                {formatDate(appointment.appointment_date)}
                                            </td>

                                            <td className="px-4 py-5 text-sm text-ink">
                                                {appointment.appointment_time}
                                            </td>

                                            <td className="px-4 py-5">
                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusStyle[appointment.status] ||
                                                        "bg-gray-100 text-gray-700"
                                                        }`}
                                                >
                                                    {appointment.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}

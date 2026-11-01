
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function AdminDashboard() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [updatingId, setUpdatingId] = useState(null);

    const fetchAppointments = async () => {
        setError("");
        setLoading(true);

        try {
            const { data, error } = await supabase
                .from("appointments")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;

            setAppointments(data || []);
        } catch (err) {
            console.error("Fetch appointments error:", err);
            setError("Appointments load nahi ho sakin. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let active = true;

        const loadAppointments = async () => {
            try {
                const { data, error } = await supabase
                    .from("appointments")
                    .select("*")
                    .order("created_at", { ascending: false });

                if (error) throw error;

                if (active) setAppointments(data || []);
            } catch (err) {
                console.error("Fetch appointments error:", err);

                if (active) {
                    setError("Appointments load nahi ho sakin. Please try again.");
                }
            } finally {
                if (active) setLoading(false);
            }
        };

        loadAppointments();

        return () => {
            active = false;
        };
    }, []);

    // Update appointment status
    const updateStatus = async (appointmentId, newStatus) => {
        setError("");
        setUpdatingId(appointmentId);

        try {
            const { error } = await supabase
                .from("appointments")
                .update({ status: newStatus })
                .eq("id", appointmentId);

            if (error) throw error;

            await fetchAppointments();
        } catch (err) {
            console.error("Status update error:", err);
            setError(
                "Appointment status update nahi ho saka. Please try again."
            );
        } finally {
            setUpdatingId(null);
        }
    };

    const stats = [
        {
            title: "Total Appointments",
            value: appointments.length,
            description: "All bookings",
            icon: "📅",
        },
        {
            title: "Pending",
            value: appointments.filter((a) => a.status === "pending").length,
            description: "Awaiting confirmation",
            icon: "⏳",
        },
        {
            title: "Confirmed",
            value: appointments.filter((a) => a.status === "confirmed").length,
            description: "Approved bookings",
            icon: "✓",
        },
        {
            title: "Cancelled",
            value: appointments.filter((a) => a.status === "cancelled").length,
            description: "Cancelled bookings",
            icon: "✕",
        },
    ];

    return (
        <main className="min-h-screen bg-ivory">
            <div className="container-custom section-padding">

                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm font-medium uppercase tracking-widest text-rose-dark">
                            GlowBeauty Admin
                        </p>

                        <h1 className="mt-2 font-heading text-3xl font-semibold text-forest sm:text-4xl">
                            Dashboard
                        </h1>

                        <p className="mt-2 text-muted">
                            Welcome back! Here's what's happening at your salon.
                        </p>
                    </div>

                    <Link
                        to="/booking"
                        className="btn-primary inline-flex items-center justify-center"
                    >
                        + New Appointment
                    </Link>
                </div>

                {/* Statistics */}
                <section className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                    {stats.map((stat) => (
                        <div
                            key={stat.title}
                            className="rounded-2xl border border-border bg-white p-6 shadow-card"
                        >
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-muted">
                                    {stat.title}
                                </p>

                                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blush text-lg text-rose-dark">
                                    {stat.icon}
                                </span>
                            </div>

                            <h2 className="mt-5 text-3xl font-semibold text-forest">
                                {loading ? "..." : stat.value}
                            </h2>

                            <p className="mt-2 text-sm text-muted">
                                {stat.description}
                            </p>
                        </div>
                    ))}
                </section>

                {/* Appointments */}
                <section className="mt-10 rounded-2xl border border-border bg-white p-6 shadow-card sm:p-8">

                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-xl font-semibold text-forest">
                                Recent Appointments
                            </h2>

                            <p className="mt-1 text-sm text-muted">
                                Manage your latest customer bookings.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={fetchAppointments}
                            disabled={loading}
                            className="w-fit rounded-full bg-blush px-4 py-2 text-xs font-medium text-rose-dark transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {loading ? "Refreshing..." : "Refresh Bookings"}
                        </button>
                    </div>

                    {error && (
                        <div className="mt-6 rounded-xl bg-red-50 p-4 text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    <div className="mt-8 overflow-x-auto">
                        <table className="w-full min-w-[950px] text-left">
                            <thead>
                                <tr className="border-b border-border text-sm text-muted">
                                    <th className="px-4 py-4 font-medium">Customer</th>
                                    <th className="px-4 py-4 font-medium">Service</th>
                                    <th className="px-4 py-4 font-medium">Date</th>
                                    <th className="px-4 py-4 font-medium">Time</th>
                                    <th className="px-4 py-4 font-medium">Status</th>
                                    <th className="px-4 py-4 font-medium">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="6" className="px-4 py-12 text-center text-sm text-muted">
                                            Loading appointments...
                                        </td>
                                    </tr>
                                ) : appointments.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-4 py-12 text-center text-sm text-muted">
                                            No appointments found.
                                            <p className="mt-2">
                                                New bookings will appear here.
                                            </p>
                                        </td>
                                    </tr>
                                ) : (
                                    appointments.map((appointment) => (
                                        <tr
                                            key={appointment.id}
                                            className="border-b border-border last:border-0"
                                        >
                                            <td className="px-4 py-4">
                                                <p className="font-medium text-forest">
                                                    {appointment.customer_name}
                                                </p>
                                                <p className="text-xs text-muted">
                                                    {appointment.customer_email}
                                                </p>
                                            </td>

                                            <td className="px-4 py-4 text-sm text-ink">
                                                {appointment.service_name}
                                            </td>

                                            <td className="px-4 py-4 text-sm text-ink">
                                                {appointment.appointment_date}
                                            </td>

                                            <td className="px-4 py-4 text-sm text-ink">
                                                {appointment.appointment_time}
                                            </td>

                                            <td className="px-4 py-4">
                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${appointment.status === "confirmed"
                                                            ? "bg-green-100 text-green-800"
                                                            : appointment.status === "cancelled"
                                                                ? "bg-red-100 text-red-800"
                                                                : "bg-amber-100 text-amber-800"
                                                        }`}
                                                >
                                                    {appointment.status}
                                                </span>
                                            </td>

                                            <td className="px-4 py-4">
                                                {appointment.status === "pending" ? (
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                updateStatus(appointment.id, "confirmed")
                                                            }
                                                            disabled={updatingId === appointment.id}
                                                            className="rounded-lg bg-green-100 px-3 py-2 text-xs font-semibold text-green-800 hover:bg-green-200 disabled:opacity-50"
                                                        >
                                                            {updatingId === appointment.id
                                                                ? "Updating..."
                                                                : "Confirm"}
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                updateStatus(appointment.id, "cancelled")
                                                            }
                                                            disabled={updatingId === appointment.id}
                                                            className="rounded-lg bg-red-100 px-3 py-2 text-xs font-semibold text-red-800 hover:bg-red-200 disabled:opacity-50"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <span className="text-xs text-muted">
                                                        No action needed
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </main>
    );
}


import { Link } from "react-router-dom";

const stats = [
    {
        title: "Total Appointments",
        value: "0",
        description: "All bookings",
        icon: "📅",
    },
    {
        title: "Pending",
        value: "0",
        description: "Awaiting confirmation",
        icon: "⏳",
    },
    {
        title: "Confirmed",
        value: "0",
        description: "Approved bookings",
        icon: "✓",
    },
    {
        title: "Cancelled",
        value: "0",
        description: "Cancelled bookings",
        icon: "✕",
    },
];

export default function Dashboard() {
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
                                {stat.value}
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

                        <span className="w-fit rounded-full bg-blush px-4 py-2 text-xs font-medium text-rose-dark">
                            All Bookings
                        </span>
                    </div>

                    <div className="mt-8 overflow-x-auto">
                        <table className="w-full min-w-[650px] text-left">
                            <thead>
                                <tr className="border-b border-border text-sm text-muted">
                                    <th className="px-4 py-4 font-medium">Customer</th>
                                    <th className="px-4 py-4 font-medium">Service</th>
                                    <th className="px-4 py-4 font-medium">Date</th>
                                    <th className="px-4 py-4 font-medium">Time</th>
                                    <th className="px-4 py-4 font-medium">Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="px-4 py-12 text-center text-sm text-muted"
                                    >
                                        No appointments to display yet.
                                        <p className="mt-2">
                                            New bookings will appear here.
                                        </p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

            </div>
        </main>
    );
}


import { useState } from "react";
import { supabase } from "../lib/supabase";

const services = [
    { name: "Signature Facial", price: 45, duration: 45 },
    { name: "Luxury Manicure", price: 30, duration: 30 },
    { name: "Hair Styling", price: 40, duration: 45 },
];

const timeSlots = [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
];

const Booking = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        service: "",
        date: "",
        time: "",
    });

    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const updateForm = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const selectedService = services.find(
        (service) => service.name === form.service
    );

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSubmitting(true);
        setMessage("");
        setMessageType("");

        try {
            const {
                data: { session },
            } = await supabase.auth.getSession();

            const { data, error } = await supabase.functions.invoke(
                "create-booking",
                {
                    body: {
                        name: form.name,
                        email: form.email,
                        phone: form.phone,
                        service: form.service,
                        date: form.date,
                        time: form.time,
                    },
                    headers: session?.access_token
                        ? {
                            Authorization: `Bearer ${session.access_token}`,
                        }
                        : {},
                }
            );

            if (error) {
                let errorMessage =
                    "Could not save appointment. Please try again.";

                if (
                    error.context &&
                    typeof error.context.json === "function"
                ) {
                    try {
                        const responseBody = await error.context.json();

                        if (responseBody?.error) {
                            errorMessage = responseBody.error;
                        }
                    } catch {
                        console.error("Could not read error response.");
                    }
                }

                throw new Error(errorMessage);
            }

            if (data?.error) {
                throw new Error(data.error);
            }

            setMessage("Appointment request submitted successfully!");
            setMessageType("success");

            setForm({
                name: "",
                email: "",
                phone: "",
                service: "",
                date: "",
                time: "",
            });
        } catch (error) {
            console.error("Booking error:", error);

            setMessage(
                error.message || "Booking failed. Please try again."
            );
            setMessageType("error");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section id="contact" className="section-padding bg-ivory">
            <div className="container-custom">
                {/* Centered heading */}
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-dark">
                        Your time to glow
                    </p>

                    <h2 className="mt-3 font-heading text-4xl font-semibold text-forest sm:text-5xl">
                        Book your appointment
                    </h2>

                    <p className="mt-4 leading-7 text-muted">
                        Choose your treatment and preferred time. We look
                        forward to welcoming you to GlowBeauty.
                    </p>

                    {selectedService && (
                        <div className="mt-6 rounded-2xl border border-border bg-white p-5">
                            <p className="font-heading text-xl font-semibold text-forest">
                                {selectedService.name}
                            </p>

                            <p className="mt-2 text-sm text-muted">
                                {selectedService.duration} minutes · $
                                {selectedService.price}
                            </p>
                        </div>
                    )}
                </div>

                {/* Centered booking form */}
                <form
                    onSubmit={handleSubmit}
                    className="mx-auto mt-10 max-w-2xl space-y-5 rounded-2xl border border-border bg-white p-6 shadow-card sm:p-8"
                >
                    <div>
                        <label className="mb-2 block text-sm font-medium text-ink">
                            Full name
                        </label>

                        <input
                            name="name"
                            value={form.name}
                            onChange={updateForm}
                            placeholder="Your name"
                            autoComplete="name"
                            required
                            className="w-full rounded-xl border border-border bg-ivory px-4 py-3 outline-none focus:border-forest"
                        />
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-ink">
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={updateForm}
                                placeholder="you@example.com"
                                autoComplete="email"
                                required
                                className="w-full rounded-xl border border-border bg-ivory px-4 py-3 outline-none focus:border-forest"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-ink">
                                Phone
                            </label>

                            <input
                                type="tel"
                                name="phone"
                                value={form.phone}
                                onChange={updateForm}
                                placeholder="Phone number"
                                autoComplete="tel"
                                required
                                className="w-full rounded-xl border border-border bg-ivory px-4 py-3 outline-none focus:border-forest"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-ink">
                            Choose service
                        </label>

                        <select
                            name="service"
                            value={form.service}
                            onChange={updateForm}
                            required
                            className="w-full rounded-xl border border-border bg-ivory px-4 py-3 outline-none focus:border-forest"
                        >
                            <option value="">Select a treatment</option>

                            {services.map((service) => (
                                <option
                                    key={service.name}
                                    value={service.name}
                                >
                                    {service.name} — ${service.price}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-ink">
                                Appointment date
                            </label>

                            <input
                                type="date"
                                name="date"
                                value={form.date}
                                onChange={updateForm}
                                min={new Date().toLocaleDateString("en-CA")}
                                required
                                className="w-full min-w-0 rounded-xl border border-border bg-ivory px-3 py-3 outline-none focus:border-forest"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-ink">
                                Preferred time
                            </label>

                            <select
                                name="time"
                                value={form.time}
                                onChange={updateForm}
                                required
                                className="w-full rounded-xl border border-border bg-ivory px-3 py-3 outline-none focus:border-forest"
                            >
                                <option value="">Select time</option>

                                {timeSlots.map((time) => (
                                    <option key={time} value={time}>
                                        {time}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {submitting
                            ? "Submitting..."
                            : "Request Appointment"}
                    </button>

                    {message && (
                        <p
                            role="status"
                            aria-live="polite"
                            className={`mt-3 text-center text-sm font-medium ${messageType === "error"
                                    ? "text-red-600"
                                    : "text-forest"
                                }`}
                        >
                            {message}
                        </p>
                    )}
                </form>
            </div>
        </section>
    );
};

export default Booking;

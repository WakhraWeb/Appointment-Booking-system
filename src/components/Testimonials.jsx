import { Link } from "react-router-dom";
const testimonials = [
    {
        id: 1,
        name: "Olivia Bennett",
        service: "Signature Facial",
        review:
            "Such a relaxing experience! The atmosphere was beautiful, and my skin felt so fresh afterward. I can't wait to come back.",
    },
    {
        id: 2,
        name: "Sophia Williams",
        service: "Luxury Manicure",
        review:
            "I loved every detail, from the welcoming environment to the final result. Everything felt thoughtful and professional.",
    },
    {
        id: 3,
        name: "Emma Parker",
        service: "Hair Styling",
        review:
            "A lovely experience from beginning to end. The service was wonderful, and I left feeling confident and refreshed.",
    },
];


const Testimonials = () => {
    return (
        <section className="section-padding bg-white" id="testimonials">
            <div className="container-custom">
                {/* Section heading */}
                <div className="mx-auto mb-12 max-w-2xl text-center">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-rose-dark">
                        Kind Words
                    </p>

                    <h2 className="font-heading text-4xl font-semibold text-forest sm:text-5xl">
                        Love from our clients
                    </h2>

                    <p className="mt-4 leading-7 text-muted">
                        Every visit is an opportunity to make someone feel special.
                        Here is what our sample clients have to say.
                    </p>
                </div>

                {/* Review cards */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {testimonials.map((testimonial) => (
                        <article
                            key={testimonial.id}
                            className="flex h-full flex-col rounded-2xl border border-border bg-ivory p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover sm:p-8"
                        >
                            <div
                                className="text-lg tracking-[0.2em] text-rose-dark"
                                aria-label="5 out of 5 stars"
                            >
                                ★★★★★
                            </div>

                            <blockquote className="mt-5 flex-1 font-heading text-lg leading-8 text-forest">
                                “{testimonial.review}”
                            </blockquote>

                            <div className="mt-7 flex items-center gap-3 border-t border-border pt-5">
                                <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-blush font-heading text-lg font-semibold text-rose-dark">
                                    {testimonial.name.charAt(0)}
                                </div>

                                <div>
                                    <h3 className="text-sm font-semibold text-ink">
                                        {testimonial.name}
                                    </h3>

                                    <p className="mt-1 text-xs text-muted">
                                        {testimonial.service}
                                    </p>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="mt-10 text-center">
                    <Link to="/booking" className="btn-primary">
                        Book Your Experience
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
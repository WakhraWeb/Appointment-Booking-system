const values = [
    {
        number: "01",
        title: "Personalized Care",
        description:
            "Every treatment is chosen with your individual needs, comfort, and goals in mind.",
    },
    {
        number: "02",
        title: "Thoughtful Expertise",
        description:
            "We focus on careful attention, professional service, and the little details that matter.",
    },
    {
        number: "03",
        title: "Your Time to Glow",
        description:
            "Enjoy a welcoming space where you can slow down, feel refreshed, and focus on yourself.",
    },
];

const About = () => {
    return (
        <section id="about" className="section-padding overflow-hidden bg-ivory">
            <div className="container-custom grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
                {/* Image */}
                <div className="relative mx-auto w-full max-w-lg">
                    <div className="absolute -left-5 -top-5 size-28 rounded-full bg-blush sm:size-36" />


                    <div className="relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-[180px] border-8 border-white shadow-card">
                        <img
                            src="/images/salon-about.jpg"
                            alt="A peaceful, elegant beauty salon interior"
                            loading="eager"
                            className="!absolute !inset-0 !m-0 !block !h-full !w-full !max-w-none object-cover object-center"
                        />
                    </div>

                    <div className="absolute -bottom-5 -right-2 rounded-2xl border border-border bg-white p-5 shadow-card sm:-right-5">
                        <p className="font-heading text-2xl font-semibold text-forest">
                            Made for you
                        </p>
                        <p className="mt-1 text-sm text-muted">
                            Beauty, comfort, confidence.
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="pt-3 lg:pt-0">
                    <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-rose-dark">
                        A little about us
                    </p>

                    <h2 className="max-w-xl font-heading text-4xl font-semibold leading-tight text-forest sm:text-5xl">
                        Beauty is more than how you look.
                        <span className="italic text-rose-dark"> It is how you feel.</span>
                    </h2>

                    <p className="mt-6 leading-8 text-muted">
                        At GlowBeauty, we believe that taking care of yourself should
                        feel special. Our goal is to create a welcoming experience where
                        thoughtful beauty treatments meet comfort, care, and confidence.
                    </p>

                    <p className="mt-4 leading-8 text-muted">
                        Whether you are refreshing your skincare routine or preparing
                        for a special occasion, we want every visit to feel personal
                        and every moment to be yours.
                    </p>

                    <div className="mt-9 space-y-6">
                        {values.map((value) => (
                            <div key={value.number} className="flex gap-4">
                                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-blush font-heading text-sm font-semibold text-rose-dark">
                                    {value.number}
                                </span>

                                <div>
                                    <h3 className="font-heading text-lg font-semibold text-forest">
                                        {value.title}
                                    </h3>
                                    <p className="mt-1 text-sm leading-6 text-muted">
                                        {value.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <a href="#services" className="btn-primary mt-9">
                        Explore Our Services
                    </a>
                </div>
            </div>
        </section>
    );
};

export default About;
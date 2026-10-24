import { Link } from "react-router-dom";

const Hero = () => {
    return (
        <section
            id="home"
            className="overflow-hidden bg-ivory"
        >
            <div className="container-custom grid min-h-[650px] items-center gap-12 py-16 md:grid-cols-2 md:py-20 lg:gap-16">
                {/* Left content */}
                <div className="max-w-xl">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2">
                        <span className="size-2 rounded-full bg-rose" />
                        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-forest">
                            Your beauty, our passion
                        </span>
                    </div>

                    <h1 className="font-heading text-5xl font-semibold leading-[1.12] tracking-tight text-forest sm:text-6xl lg:text-7xl">
                        A little care.
                        <br />
                        A lot of <span className="italic text-rose-dark">glow.</span>
                    </h1>

                    <p className="mt-6 max-w-md text-base leading-8 text-muted sm:text-lg">
                        Take a moment for yourself. Discover thoughtful beauty
                        treatments designed to help you feel confident, refreshed,
                        and beautifully you.
                    </p>

                    <div className="mt-8 flex flex-wrap items-center gap-4">
                        <Link to="/booking" className="btn-primary">
                            Book Your Appointment
                            <span aria-hidden="true">↗</span>
                        </Link>

                        <a
                            href="#services"
                            className="btn-secondary"
                        >
                            Explore Services
                        </a>
                    </div>

                    {/* Trust indicators */}
                    <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-5 border-t border-border pt-7">
                        <div>
                            <p className="font-heading text-2xl font-semibold text-forest">
                                Expert
                            </p>
                            <p className="mt-1 text-xs text-muted">Beauty professionals</p>
                        </div>

                        <div className="h-10 w-px bg-border" />

                        <div>
                            <p className="font-heading text-2xl font-semibold text-forest">
                                Personal
                            </p>
                            <p className="mt-1 text-xs text-muted">Care for every client</p>
                        </div>
                    </div>
                </div>

                {/* Right image */}
                <div className="relative mx-auto w-full max-w-lg md:ml-auto">
                    <div className="absolute -right-3 -top-3 h-28 w-28 rounded-full bg-blush sm:-right-5 sm:-top-5 sm:h-36 sm:w-36" />

                    <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full border border-rose/40 sm:-bottom-6 sm:-left-6 sm:h-40 sm:w-40" />

                    <div className="relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-[180px] border-[8px] border-white shadow-card sm:border-[12px]">
                        <img
                            src="/images/salon-hero.jpg"
                            alt="A relaxing beauty salon treatment"
                            className="h-full w-full object-cover"
                            fetchPriority="high"
                        />
                    </div>

                    <div className="absolute -bottom-3 right-2 max-w-[220px] rounded-2xl border border-border bg-white p-4 shadow-card sm:-right-5 sm:bottom-8">
                        <p className="font-heading text-lg font-semibold text-forest">
                            Your moment, your glow.
                        </p>
                        <p className="mt-1 text-xs leading-5 text-muted">
                            Make time for the care you deserve.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
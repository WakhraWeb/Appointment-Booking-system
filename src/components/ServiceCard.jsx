const ServiceCard = ({ service }) => {
    return (
        <article className="group overflow-hidden rounded-2xl border border-border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
            <div className="relative aspect-[4/3] overflow-hidden bg-blush">
                <img
                    src={service.image}
                    alt={service.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-forest backdrop-blur">
                    {service.category}
                </span>
            </div>

            <div className="p-5 sm:p-6">
                <div className="flex items-start justify-between gap-3">
                    <h3 className="font-heading text-xl font-semibold text-forest">
                        {service.name}
                    </h3>

                    <span className="shrink-0 text-lg font-semibold text-rose-dark">
                        ${service.price}
                    </span>
                </div>

                <p className="mt-3 text-sm leading-6 text-muted">
                    {service.description}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                    <span className="text-sm text-muted">
                        {service.duration} min
                    </span>

                    <a
                        href="#booking"
                        className="text-sm font-semibold text-forest transition-colors hover:text-rose-dark"
                    >
                        Book now <span aria-hidden="true">↗</span>
                    </a>
                </div>
            </div>
        </article>
    );
};

export default ServiceCard;
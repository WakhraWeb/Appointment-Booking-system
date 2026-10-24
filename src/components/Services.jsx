import ServiceCard from "./ServiceCard";
import { Link } from "react-router-dom";
const services = [
    {
        id: 1,
        name: "Signature Facial",
        category: "Skincare",
        description:
            "A refreshing facial treatment to cleanse, hydrate, and restore your natural glow.",
        price: 45,
        duration: 45,
        image:
            "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 2,
        name: "Luxury Manicure",
        category: "Nail Care",
        description:
            "A relaxing nail care experience with detailed grooming and a polished finish.",
        price: 30,
        duration: 30,
        image:
            "https://images.unsplash.com/photo-1754799670410-b282791342c3?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",

    },
    {
        id: 3,
        name: "Hair Styling",
        category: "Hair Care",
        description:
            "A beautiful, effortless style tailored to your look and special occasion.",
        price: 40,
        duration: 45,
        image:
            "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    },
];

const Services = () => {
    return (
        <section id="services" className="section-padding bg-white">
            <div className="container-custom">
                <div className="mx-auto mb-12 max-w-2xl text-center">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-rose-dark">
                        Our Services
                    </p>

                    <h2 className="font-heading text-4xl font-semibold leading-tight text-forest sm:text-5xl">
                        A little luxury, just for you
                    </h2>

                    <p className="mt-4 leading-7 text-muted">
                        From glowing skin to beautiful finishing touches, discover
                        treatments made around you.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {services.map((service) => (
                        <ServiceCard key={service.id} service={service} />
                    ))}
                </div>

                <div className="mt-10 text-center">
                    <Link to="/booking" className="btn-primary">
                        Book Your Treatment
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Services;
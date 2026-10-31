
// import { useState } from "react";
// import { Link } from "react-router-dom";

// export default function Signup() {
//     const [showPassword, setShowPassword] = useState(false);

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         alert("Account creation will be connected with Supabase soon.");
//     };

//     return (
//         <main className="flex min-h-screen items-center justify-center bg-ivory px-4 py-12">
//             <div className="w-full max-w-md">
//                 <Link to="/" className="mb-8 block text-center">
//                     <span className="font-heading text-3xl font-bold text-forest">
//                         Glow<span className="text-rose-dark">Beauty</span>
//                     </span>
//                     <span className="mt-1 block text-xs uppercase tracking-[0.2em] text-muted">
//                         Your beauty, our passion
//                     </span>
//                 </Link>

//                 <div className="rounded-3xl border border-border bg-white p-6 shadow-card sm:p-9">
//                     <div className="mb-8 text-center">
//                         <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-rose-dark">
//                             Join GlowBeauty
//                         </p>
//                         <h1 className="font-heading text-3xl font-semibold text-forest">
//                             Create your account
//                         </h1>
//                         <p className="mt-3 text-sm leading-6 text-muted">
//                             Sign up to book and manage your beauty appointments.
//                         </p>
//                     </div>

//                     <form onSubmit={handleSubmit} className="space-y-5">
//                         <div>
//                             <label htmlFor="name" className="mb-2 block text-sm font-semibold text-ink">
//                                 Full name
//                             </label>
//                             <input
//                                 id="name"
//                                 name="name"
//                                 type="text"
//                                 placeholder="Your full name"
//                                 autoComplete="name"
//                                 required
//                                 className="w-full rounded-xl border border-border bg-ivory px-4 py-3 text-sm outline-none focus:border-forest focus:ring-2 focus:ring-forest/10"
//                             />
//                         </div>

//                         <div>
//                             <label htmlFor="email" className="mb-2 block text-sm font-semibold text-ink">
//                                 Email address
//                             </label>
//                             <input
//                                 id="email"
//                                 name="email"
//                                 type="email"
//                                 placeholder="you@example.com"
//                                 autoComplete="email"
//                                 required
//                                 className="w-full rounded-xl border border-border bg-ivory px-4 py-3 text-sm outline-none focus:border-forest focus:ring-2 focus:ring-forest/10"
//                             />
//                         </div>

//                         <div>
//                             <label htmlFor="password" className="mb-2 block text-sm font-semibold text-ink">
//                                 Password
//                             </label>
//                             <div className="relative">
//                                 <input
//                                     id="password"
//                                     name="password"
//                                     type={showPassword ? "text" : "password"}
//                                     placeholder="Create a password"
//                                     autoComplete="new-password"
//                                     minLength={6}
//                                     required
//                                     className="w-full rounded-xl border border-border bg-ivory px-4 py-3 pr-20 text-sm outline-none focus:border-forest focus:ring-2 focus:ring-forest/10"
//                                 />
//                                 <button
//                                     type="button"
//                                     onClick={() => setShowPassword(!showPassword)}
//                                     className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-muted hover:text-forest"
//                                 >
//                                     {showPassword ? "Hide" : "Show"}
//                                 </button>
//                             </div>
//                             <p className="mt-2 text-xs text-muted">
//                                 Password must be at least 6 characters.
//                             </p>
//                         </div>

//                         <button type="submit" className="btn-primary w-full">
//                             Create Account
//                         </button>
//                     </form>

//                     <p className="mt-7 text-center text-sm text-muted">
//                         Already have an account?{" "}
//                         <Link to="/login" className="font-semibold text-forest hover:text-rose-dark">
//                             Sign in
//                         </Link>
//                     </p>
//                 </div>

//                 <p className="mt-6 text-center text-xs text-muted">
//                     <Link to="/" className="hover:text-forest">
//                         ← Back to home
//                     </Link>
//                 </p>
//             </div>
//         </main>
//     );
// }

import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        setLoading(true);
        setMessage("");
        setError("");

        const formData = new FormData(event.currentTarget);
        const name = formData.get("name").trim();
        const email = formData.get("email").trim();
        const password = formData.get("password");

        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: name,
                    },
                },
            });

            if (error) throw error;

            if (data.session) {
                setMessage("Account created successfully! You can now sign in.");
            } else {
                setMessage(
                    "Account created! Please check your email to confirm your account."
                );
            }

            form.reset();
        } catch (err) {
            console.error("Signup error:", err);

            if (err.message?.toLowerCase().includes("rate limit")) {
                setError(
                    "We couldn't send your verification email right now. Please try again after some time."
                );
            } else {
                setError(
                    "We couldn't create your account. Please try again."
                );
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-ivory px-4 py-12">
            <div className="w-full max-w-md">
                <Link to="/" className="mb-8 block text-center">
                    <span className="font-heading text-3xl font-bold text-forest">
                        Glow<span className="text-rose-dark">Beauty</span>
                    </span>
                    <span className="mt-1 block text-xs uppercase tracking-[0.2em] text-muted">
                        Your beauty, our passion
                    </span>
                </Link>

                <div className="rounded-3xl border border-border bg-white p-6 shadow-card sm:p-9">
                    <div className="mb-8 text-center">
                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-rose-dark">
                            Join GlowBeauty
                        </p>
                        <h1 className="font-heading text-3xl font-semibold text-forest">
                            Create your account
                        </h1>
                        <p className="mt-3 text-sm leading-6 text-muted">
                            Sign up to book and manage your beauty appointments.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="name" className="mb-2 block text-sm font-semibold text-ink">
                                Full name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Your full name"
                                autoComplete="name"
                                required
                                className="w-full rounded-xl border border-border bg-ivory px-4 py-3 text-sm outline-none focus:border-forest focus:ring-2 focus:ring-forest/10"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="mb-2 block text-sm font-semibold text-ink">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                autoComplete="email"
                                required
                                className="w-full rounded-xl border border-border bg-ivory px-4 py-3 text-sm outline-none focus:border-forest focus:ring-2 focus:ring-forest/10"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="mb-2 block text-sm font-semibold text-ink">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Create a password"
                                    autoComplete="new-password"
                                    minLength={6}
                                    required
                                    className="w-full rounded-xl border border-border bg-ivory px-4 py-3 pr-20 text-sm outline-none focus:border-forest focus:ring-2 focus:ring-forest/10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-muted hover:text-forest"
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                            <p className="mt-2 text-xs text-muted">
                                Password must be at least 6 characters.
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? "Creating Account..." : "Create Account"}
                        </button>

                        {message && (
                            <p role="status" className="text-center text-sm text-forest">
                                {message}
                            </p>
                        )}

                        {error && (
                            <p role="alert" className="text-center text-sm text-red-600">
                                {error}
                            </p>
                        )}
                    </form>

                    <p className="mt-7 text-center text-sm text-muted">
                        Already have an account?{" "}
                        <Link to="/login" className="font-semibold text-forest hover:text-rose-dark">
                            Sign in
                        </Link>
                    </p>
                </div>

                <p className="mt-6 text-center text-xs text-muted">
                    <Link to="/" className="hover:text-forest">
                        ← Back to home
                    </Link>
                </p>
            </div>
        </main>
    );
}

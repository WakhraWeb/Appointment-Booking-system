
// import { useState } from "react";
// import { Link } from "react-router-dom";

// export default function Login() {
//     const [showPassword, setShowPassword] = useState(false);

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         alert("Login authentication will be connected with Supabase soon.");
//     };

//     return (
//         <main className="flex min-h-screen items-center justify-center bg-ivory px-4 py-12">
//             <div className="w-full max-w-md">

//                 {/* Brand */}
//                 <Link to="/" className="mb-8 block text-center">
//                     <span className="font-heading text-3xl font-bold text-forest">
//                         Glow<span className="text-rose-dark">Beauty</span>
//                     </span>
//                     <span className="mt-1 block text-xs uppercase tracking-[0.2em] text-muted">
//                         Your beauty, our passion
//                     </span>
//                 </Link>

//                 {/* Login card */}
//                 <div className="rounded-3xl border border-border bg-white p-6 shadow-card sm:p-9">
//                     <div className="mb-8 text-center">
//                         <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-rose-dark">
//                             Welcome Back
//                         </p>
//                         <h1 className="font-heading text-3xl font-semibold text-forest">
//                             Sign in to your account
//                         </h1>
//                         <p className="mt-3 text-sm leading-6 text-muted">
//                             Manage your appointments and enjoy a little time for yourself.
//                         </p>
//                     </div>

//                     <form onSubmit={handleSubmit} className="space-y-5">
//                         <div>
//                             <label
//                                 htmlFor="email"
//                                 className="mb-2 block text-sm font-semibold text-ink"
//                             >
//                                 Email address
//                             </label>
//                             <input
//                                 id="email"
//                                 name="email"
//                                 type="email"
//                                 placeholder="you@example.com"
//                                 autoComplete="email"
//                                 required
//                                 className="w-full rounded-xl border border-border bg-ivory px-4 py-3 text-sm outline-none transition focus:border-forest focus:ring-2 focus:ring-forest/10"
//                             />
//                         </div>

//                         <div>
//                             <div className="mb-2 flex items-center justify-between gap-3">
//                                 <label
//                                     htmlFor="password"
//                                     className="text-sm font-semibold text-ink"
//                                 >
//                                     Password
//                                 </label>
//                                 <button
//                                     type="button"
//                                     className="text-xs font-semibold text-forest hover:text-rose-dark"
//                                     onClick={() => alert("Password reset will be added with Supabase.")}
//                                 >
//                                     Forgot password?
//                                 </button>
//                             </div>

//                             <div className="relative">
//                                 <input
//                                     id="password"
//                                     name="password"
//                                     type={showPassword ? "text" : "password"}
//                                     placeholder="Enter your password"
//                                     autoComplete="current-password"
//                                     required
//                                     className="w-full rounded-xl border border-border bg-ivory px-4 py-3 pr-20 text-sm outline-none transition focus:border-forest focus:ring-2 focus:ring-forest/10"
//                                 />
//                                 <button
//                                     type="button"
//                                     onClick={() => setShowPassword(!showPassword)}
//                                     className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-muted hover:text-forest"
//                                 >
//                                     {showPassword ? "Hide" : "Show"}
//                                 </button>
//                             </div>
//                         </div>

//                         <button
//                             type="submit"
//                             className="btn-primary w-full"
//                         >
//                             Sign In
//                         </button>
//                     </form>

//                     <p className="mt-7 text-center text-sm text-muted">
//                         Don't have an account?{" "}
//                         <Link
//                             to="/signup"
//                             className="font-semibold text-forest hover:text-rose-dark"
//                         >
//                             Create account
//                         </Link>
//                     </p>
//                 </div>

//                 <p className="mt-6 text-center text-xs text-muted">
//                     <Link to="/" className="transition hover:text-forest">
//                         ← Back to home
//                     </Link>
//                 </p>
//             </div>
//         </main>
//     );
// }


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        setLoading(true);
        setError("");
        setMessage("");

        const formData = new FormData(event.currentTarget);
        const email = formData.get("email").trim();
        const password = formData.get("password");

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            setMessage("Login successful!");

            navigate("/dashboard", { replace: true });
        } catch (err) {
            console.error("Login error:", err);
            setError(
                "We couldn't sign you in. Please check your email and password, and try again."
            );
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
                            Welcome Back
                        </p>
                        <h1 className="font-heading text-3xl font-semibold text-forest">
                            Sign in to your account
                        </h1>
                        <p className="mt-3 text-sm leading-6 text-muted">
                            Manage your appointments and enjoy a little time for yourself.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-semibold text-ink"
                            >
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                autoComplete="email"
                                required
                                className="w-full rounded-xl border border-border bg-ivory px-4 py-3 text-sm outline-none transition focus:border-forest focus:ring-2 focus:ring-forest/10"
                            />
                        </div>

                        <div>
                            <div className="mb-2 flex items-center justify-between gap-3">
                                <label
                                    htmlFor="password"
                                    className="text-sm font-semibold text-ink"
                                >
                                    Password
                                </label>
                                <button
                                    type="button"
                                    className="text-xs font-semibold text-forest hover:text-rose-dark"
                                    onClick={() => setError("Password reset will be configured next.")}
                                >
                                    Forgot password?
                                </button>
                            </div>

                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                    required
                                    className="w-full rounded-xl border border-border bg-ivory px-4 py-3 pr-20 text-sm outline-none transition focus:border-forest focus:ring-2 focus:ring-forest/10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-muted hover:text-forest"
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? "Signing In..." : "Sign In"}
                        </button>

                        {error && (
                            <p role="alert" className="text-center text-sm text-red-600">
                                {error}
                            </p>
                        )}

                        {message && (
                            <p role="status" className="text-center text-sm text-forest">
                                {message}
                            </p>
                        )}
                    </form>

                    <p className="mt-7 text-center text-sm text-muted">
                        Don't have an account?{" "}
                        <Link
                            to="/signup"
                            className="font-semibold text-forest hover:text-rose-dark"
                        >
                            Create account
                        </Link>
                    </p>
                </div>

                <p className="mt-6 text-center text-xs text-muted">
                    <Link to="/" className="transition hover:text-forest">
                        ← Back to home
                    </Link>
                </p>
            </div>
        </main>
    );
}


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");
        setLoading(true);

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email.trim(),
            password,
        });

        setLoading(false);

        if (error) {
            setError(error.message);
            return;
        }

        // Existing role-based redirect
        const role = data.user?.user_metadata?.role;

        if (role === "admin") {
            navigate("/admin-dashboard");
        } else {
            navigate("/dashboard");
        }
    };

    const handleForgotPassword = async () => {
        setError("");
        setSuccess("");

        if (!email.trim()) {
            setError("Please enter your email address first.");
            return;
        }

        setLoading(true);

        const { error } = await supabase.auth.resetPasswordForEmail(
            email.trim(),
            {
                redirectTo: `${window.location.origin}/reset-password`,
            }
        );

        setLoading(false);

        if (error) {
            setError(error.message);
            return;
        }

        setSuccess(
            "Password reset link has been sent. Please check your email inbox."
        );
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-ivory px-4 py-10">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-card">

                <div className="mb-8 text-center">
                    <h1 className="font-heading text-3xl font-bold text-forest">
                        Welcome Back
                    </h1>

                    <p className="mt-2 text-sm text-muted">
                        Login to your GlowBeauty account
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">

                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="mb-2 block text-sm font-medium text-ink"
                        >
                            Email Address
                        </label>

                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                            className="w-full rounded-lg border border-border px-4 py-3 outline-none focus:border-forest"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label
                            htmlFor="password"
                            className="mb-2 block text-sm font-medium text-ink"
                        >
                            Password
                        </label>

                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                                className="w-full rounded-lg border border-border px-4 py-3 pr-16 outline-none focus:border-forest"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    {/* Forgot Password */}
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={handleForgotPassword}
                            disabled={loading}
                            className="text-sm font-medium text-rose-dark hover:underline disabled:opacity-50"
                        >
                            Forgot Password?
                        </button>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                            {error}
                        </p>
                    )}

                    {/* Success Message */}
                    {success && (
                        <p className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
                            {success}
                        </p>
                    )}

                    {/* Login Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "Please wait..." : "Login"}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-muted">
                    Don't have an account?{" "}
                    <Link
                        to="/signup"
                        className="font-semibold text-forest hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>

            </div>
        </div>
    );
}


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function ResetPassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setMessage("");

        if (password.length < 8) {
            setError("Password must be at least 8 characters.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {
            const { data: sessionData, error: sessionError } =
                await supabase.auth.getSession();

            if (sessionError) throw sessionError;

            if (!sessionData.session) {
                throw new Error(
                    "Reset link is invalid or expired. Please request a new link."
                );
            }

            const { error } = await supabase.auth.updateUser({
                password: password,
            });

            if (error) throw error;

            setMessage("Password updated successfully!");

            await supabase.auth.signOut();

            setTimeout(() => {
                navigate("/login", { replace: true });
            }, 2000);

        } catch (err) {
            console.error("Reset password error:", err);
            setError(err.message || "Something went wrong.");

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
                            Account Security
                        </p>

                        <h1 className="font-heading text-3xl font-semibold text-forest">
                            Create New Password
                        </h1>

                        <p className="mt-3 text-sm leading-6 text-muted">
                            Choose a new password for your GlowBeauty account.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-ink">
                                New Password
                            </label>

                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter new password"
                                minLength={8}
                                required
                                autoComplete="new-password"
                                className="w-full rounded-xl border border-border bg-ivory px-4 py-3 text-sm outline-none transition focus:border-forest focus:ring-2 focus:ring-forest/10"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-ink">
                                Confirm New Password
                            </label>

                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm new password"
                                required
                                autoComplete="new-password"
                                className="w-full rounded-xl border border-border bg-ivory px-4 py-3 text-sm outline-none transition focus:border-forest focus:ring-2 focus:ring-forest/10"
                            />
                        </div>

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

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? "Updating Password..." : "Reset Password"}
                        </button>

                    </form>

                    <p className="mt-6 text-center text-sm text-muted">
                        Remember your password?{" "}
                        <Link
                            to="/login"
                            className="font-semibold text-forest hover:text-rose-dark"
                        >
                            Sign In
                        </Link>
                    </p>

                </div>
            </div>
        </main>
    );
}

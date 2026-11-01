
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function ProtectedRoute({ children, allowedRole }) {
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        let active = true;

        const checkAccess = async () => {
            const { data: { user }, error } = await supabase.auth.getUser();

            if (error || !user) {
                if (active) {
                    setAuthorized(false);
                    setLoading(false);
                }
                return;
            }

            const { data: profile, error: profileError } = await supabase
                .from("profiles")
                .select("role")
                .eq("id", user.id)
                .single();

            if (active) {
                setAuthorized(
                    !profileError && profile?.role === allowedRole
                );
                setLoading(false);
            }
        };

        checkAccess();

        return () => {
            active = false;
        };
    }, [allowedRole]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-ivory text-forest">
                Checking access...
            </div>
        );
    }

    if (!authorized) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

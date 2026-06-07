import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout       from "./pages/Layout";
import DashboardPage from "./pages/DashboardPage";
import UploadPage    from "./pages/UploadPage";
import ReportPage    from "./pages/ReportPage";
import ActionPage    from "./pages/ActionPage";
import AuthPage      from "./pages/AuthPage";
import { supabase }  from "./supabaseClient";

export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function ensureUserProfile(user) {
      if (!user) return;
      try {
        const { data: existingProfile, error: fetchError } = await supabase
          .from("users")
          .select("id")
          .eq("id", user.id)
          .maybeSingle();

        if (fetchError) {
          console.error("Error checking user profile:", fetchError);
          return;
        }

        if (!existingProfile) {
          const fullName = user.user_metadata?.full_name || user.user_metadata?.name || "משתמש גוגל";
          const email = user.email || "";

          const { error: insertError } = await supabase
            .from("users")
            .insert({
              id: user.id,
              full_name: fullName,
              email: email,
              credits: 0,
              is_premium: false
            });

          if (insertError) {
            console.error("Error creating user profile:", insertError);
          } else {
            console.log("User profile automatically created successfully!");
          }
        }
      } catch (err) {
        console.error("Failed to ensure user profile:", err);
      }
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        ensureUserProfile(session.user);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      if (session?.user && (event === "SIGNED_IN" || event === "INITIAL_SESSION")) {
        ensureUserProfile(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="screen" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FAF7F0', minHeight: '100dvh' }}>
        <div style={{ border: '3px solid rgba(39, 62, 47, 0.1)', borderTop: '3px solid #C85A32', borderRadius: '50%', width: '30px', height: '30px', animation: 'spin 1.2s linear infinite' }} />
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {session ? (
          <Route element={<Layout />}>
            <Route path="/"           element={<DashboardPage />} />
            <Route path="/upload"     element={<UploadPage />}    />
            <Route path="/report"     element={<ReportPage />}    />
            <Route path="/report/:id" element={<ReportPage />}    />
            <Route path="/action"     element={<ActionPage />}    />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        ) : (
          <>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="*" element={<Navigate to="/auth" replace />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

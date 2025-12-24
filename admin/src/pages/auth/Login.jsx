import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, ArrowRight, Loader2, Cpu, Globe, Lock } from "lucide-react";
import { useAuthStore } from "../../stores/auth.store";
import { authClient } from "../../../lib/auth-client";
import  axiosInstance  from "../../api/axios";

export default function Login() {

  const [email, setEmail] = useState("anikdas169@gmail.com");
  const [password, setPassword] = useState("12345678");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);

const handleLogin = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    const response = await axiosInstance.post(
      "/auth/sign-in/email",
      {
        email,
        password,
        rememberMe: true,
      }
    );

    console.log("Login success:", response.data);
    setUser(response.data.user);

  } catch (err) {
    console.error("Login failed:", err);
    setError(err.response?.data?.message || "Authorization Failed");
  } finally {
    setLoading(false);
  }
};

  console.log("user =",)
   

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[var(--color-global)] text-[var(--color-textColor)] font-sans overflow-hidden">
      
      {/* LEFT SIDE: THE VIBE */}
      <div className="relative hidden lg:flex flex-col justify-between p-16 overflow-hidden border-r border-white/5">
        {/* Animated Background Element */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] bg-[var(--color-primary-dull)] opacity-20 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-[var(--color-primary)] rounded-lg">
              <Cpu size={24} className="text-[var(--color-bg)]" />
            </div>
            <span className="text-xl font-bold tracking-tight">Vortex Admin</span>
          </div>
          <h1 className="text-7xl font-black tracking-tighter leading-[0.9] uppercase italic">
            Command <br />
            <span className="text-[var(--color-primary)]">The Grid.</span>
          </h1>
        </motion.div>

        <div className="relative z-10 grid grid-cols-2 gap-8">
          <div className="space-y-2">
            <Globe size={20} className="text-[var(--color-primary)]" />
            <p className="text-xs uppercase tracking-widest font-bold">Global Sync</p>
            <p className="text-[var(--color-textDull)] text-sm">Real-time edge replication across 24 regions.</p>
          </div>
          <div className="space-y-2">
            <Lock size={20} className="text-[var(--color-primary)]" />
            <p className="text-xs uppercase tracking-widest font-bold">Ironclad</p>
            <p className="text-[var(--color-textDull)] text-sm">Biometric & hardware-level security layers.</p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: THE FORM */}
      <div className="flex items-center justify-center p-8 relative">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-[420px] space-y-8"
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Authentication</h2>
            <p className="text-[var(--color-textDull)]">Identify yourself to access the secure terminal.</p>
          </div>

          <div className="space-y-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="group space-y-2">
                <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-textDull)] group-focus-within:text-[var(--color-primary)] transition-colors">
                  System ID
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[var(--color-bg)] border border-white/10 rounded-xl py-4 px-5 text-sm outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/5 transition-all"
                />
              </div>

              <div className="group space-y-2">
                <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-textDull)] group-focus-within:text-[var(--color-primary)] transition-colors">
                  Security Code
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[var(--color-bg)] border border-white/10 rounded-xl py-4 px-5 text-sm outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/5 transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-14 bg-[var(--color-primary)] text-[var(--color-bg)] font-bold rounded-xl flex items-center justify-center gap-3 hover:shadow-[0_0_30px_rgba(61,214,198,0.3)] transition-all active:scale-[0.98]"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : (
                  <>
                    ENTER CONSOLE
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>
          </div>
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl flex items-center gap-3 text-rose-400 text-sm"
              >
                <Shield size={18} />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <footer className="text-center">
            <button className="text-[11px] text-[var(--color-textDull)] hover:text-[var(--color-primary)] transition-colors uppercase tracking-widest font-medium">
              Request System Access
            </button>
          </footer>
        </motion.div>
      </div>
    </div>
  );
}
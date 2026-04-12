"use client";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useAppStore } from "@/store/appStore";
import { Mail, Lock, LogIn, UserPlus, ArrowLeft, Sparkles, Eye, EyeOff } from "lucide-react";

export default function AuthView() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { setUser, setUserRole, setView } = useAppStore();
  
  // Detect reduced motion preference
  const prefersReducedMotion = useReducedMotion();
  const shouldReduceMotion = prefersReducedMotion || isMobile;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        handleSessionUser(session.user);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        handleSessionUser(session.user);
      } else {
        setUser(null);
        setUserRole(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [setUser, setUserRole, setView]);

  const handleSessionUser = async (user: any) => {
    setUser(user);
    
    // Fetch user role
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile) {
      setUserRole(profile.role);
      if (profile.role === "admin") {
        setView("admin");
      } else {
        setView("home");
      }
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        
        if (data.user) {
          await handleSessionUser(data.user);
        }
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;

        if (data.user) {
          setError("Check your email for verification link!");
        }
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    setError("");

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}`,
        },
      });

      if (error) throw error;
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  // Memoized particles for performance
  const particles = useMemo(() => 
    !shouldReduceMotion ? [...Array(isMobile ? 10 : 20)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2,
    })) : [],
    [shouldReduceMotion, isMobile]
  );

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Optimized Background - Static on mobile */}
      <div className="absolute inset-0 pointer-events-none">
        {!shouldReduceMotion ? (
          <>
            {/* Gradient Orbs - Reduced complexity on mobile */}
            <motion.div
              className="absolute top-0 left-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-gradient-to-br from-emerald-500/20 via-teal-500/20 to-transparent rounded-full blur-3xl"
              animate={{ 
                scale: [1, 1.2, 1],
                x: isMobile ? 0 : [0, 100, 0],
                y: isMobile ? 0 : [0, 50, 0],
                opacity: [0.3, 0.5, 0.3] 
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-0 right-0 w-[350px] h-[350px] md:w-[600px] md:h-[600px] bg-gradient-to-tl from-blue-500/20 via-purple-500/20 to-transparent rounded-full blur-3xl"
              animate={{ 
                scale: [1.2, 1, 1.2],
                x: isMobile ? 0 : [0, -100, 0],
                y: isMobile ? 0 : [0, -50, 0],
                opacity: [0.5, 0.3, 0.5] 
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
            
            {/* Floating Particles - Fewer on mobile */}
            {particles.map(({ id, left, top, delay, duration }) => (
              <motion.div
                key={id}
                className="absolute w-1 h-1 bg-white/20 rounded-full"
                style={{ left, top }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  delay,
                  ease: "easeInOut",
                }}
              />
            ))}
          </>
        ) : (
          // Static gradient for reduced motion
          <>
            <div className="absolute top-0 left-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-gradient-to-br from-emerald-500/20 via-teal-500/20 to-transparent rounded-full blur-3xl opacity-40" />
            <div className="absolute bottom-0 right-0 w-[350px] h-[350px] md:w-[600px] md:h-[600px] bg-gradient-to-tl from-blue-500/20 via-purple-500/20 to-transparent rounded-full blur-3xl opacity-30" />
          </>
        )}

        {/* Grid Pattern - Static */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        {/* Back Button - Simplified on mobile */}
        <motion.button
          onClick={() => setView("home")}
          className="group mb-6 md:mb-8 flex items-center gap-2 text-white/60 hover:text-white transition-colors touch-manipulation"
          whileHover={!isMobile ? { x: -5 } : {}}
          whileTap={{ scale: 0.95 }}
        >
          <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-emerald-500/30 transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="font-medium">Back to Home</span>
        </motion.button>

        {/* Main Card - Optimized animations */}
        <motion.div
          className="relative"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {/* Card Glow - Disabled on mobile */}
          {!isMobile && (
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-purple-500/20 rounded-3xl blur-xl"
              animate={{
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          )}

          <div className="relative card-glass-premium p-6 md:p-8 backdrop-blur-2xl">
            {/* Header with Icon - Simplified animations on mobile */}
            <div className="text-center mb-6 md:mb-8">
              <motion.div
                className="relative w-16 h-16 md:w-20 md:h-20 mx-auto mb-5 md:mb-6"
                whileHover={!isMobile ? { scale: 1.1 } : {}}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Rotating Border - Static on mobile */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/30 via-blue-500/30 to-purple-500/30"
                  animate={!shouldReduceMotion ? { rotate: 360 } : {}}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Icon Container */}
                <div className="absolute inset-0.5 rounded-2xl bg-[var(--bg-primary)] flex items-center justify-center overflow-hidden">
                  <AnimatePresence mode="wait">
                    {isLogin ? (
                      <motion.div
                        key="login"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <LogIn className="w-8 h-8 md:w-9 md:h-9 text-emerald-400" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="signup"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <UserPlus className="w-8 h-8 md:w-9 md:h-9 text-blue-400" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {/* Sparkles - Simplified animation */}
                  {!shouldReduceMotion && (
                    <motion.div
                      className="absolute top-1 right-1"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-yellow-400" />
                    </motion.div>
                  )}
                </div>
              </motion.div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={isLogin ? "login" : "signup"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-3 bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {isLogin ? "Welcome Back" : "Create Account"}
                  </h2>
                  <p className="text-sm md:text-base text-white/60">
                    {isLogin
                      ? "Sign in to continue your journey"
                      : "Start your journey with us today"}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Error Message - Optimized */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mb-5 md:mb-6 overflow-hidden"
                >
                  <div className="p-3 md:p-4 rounded-xl bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/20 backdrop-blur-sm">
                    <p className="text-red-400 text-xs md:text-sm font-medium flex items-center gap-2">
                      <span>⚠️</span>
                      {error}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Google Sign In Button - Optimized */}
            <motion.button
              onClick={handleGoogleAuth}
              disabled={loading}
              whileHover={!isMobile ? { scale: 1.02 } : {}}
              whileTap={{ scale: 0.98 }}
              className="group relative w-full mb-5 md:mb-6 px-5 md:px-6 py-3.5 md:py-4 rounded-xl overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 touch-manipulation"
            >
              {/* Static background on mobile */}
              <div className="absolute inset-0 bg-white/10" />
              
              {/* Border */}
              <div className="absolute inset-0 border border-white/10 group-hover:border-white/30 rounded-xl transition-all duration-300" />
              
              {/* Content */}
              <span className="relative flex items-center justify-center gap-2.5 md:gap-3 text-white font-semibold text-sm md:text-base">
                {/* Google Icon - No rotation on mobile */}
                <svg 
                  className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </span>
            </motion.button>

            {/* Divider - Static */}
            <div className="relative mb-5 md:mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 md:px-4 py-1 bg-[var(--bg-primary)] text-white/40 text-xs md:text-sm font-medium rounded-full border border-white/10">
                  or continue with email
                </span>
              </div>
            </div>

            {/* Email Form - Optimized */}
            <form onSubmit={handleEmailAuth} className="space-y-4 md:space-y-5">
              {/* Email Input */}
              <div>
                <label className="block text-xs md:text-sm font-semibold text-white/80 mb-2 md:mb-3">
                  Email Address
                </label>
                <div className="relative group">
                  {/* Icon */}
                  <div className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <Mail className={`w-4 h-4 md:w-5 md:h-5 transition-colors ${emailFocused ? "text-emerald-400" : "text-white/40"}`} />
                  </div>
                  
                  {/* Input */}
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                    required
                    className="w-full pl-10 md:pl-12 pr-3 md:pr-4 py-3 md:py-3.5 text-sm md:text-base rounded-xl bg-white/5 border border-white/10 focus:border-emerald-500/50 focus:bg-white/10 text-white placeholder:text-white/30 outline-none transition-all duration-300 touch-manipulation"
                    placeholder="Enter your email"
                    autoComplete="email"
                  />
                  
                  {/* Focus Glow - Desktop only */}
                  {!isMobile && emailFocused && (
                    <div className="absolute inset-0 -z-10 bg-emerald-500/20 rounded-xl blur-xl" />
                  )}
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-xs md:text-sm font-semibold text-white/80 mb-2 md:mb-3">
                  Password
                </label>
                <div className="relative group">
                  {/* Lock Icon */}
                  <div className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <Lock className={`w-4 h-4 md:w-5 md:h-5 transition-colors ${passwordFocused ? "text-blue-400" : "text-white/40"}`} />
                  </div>
                  
                  {/* Input */}
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                    required
                    minLength={6}
                    className="w-full pl-10 md:pl-12 pr-10 md:pr-12 py-3 md:py-3.5 text-sm md:text-base rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 focus:bg-white/10 text-white placeholder:text-white/30 outline-none transition-all duration-300 touch-manipulation"
                    placeholder="Enter your password"
                    autoComplete={isLogin ? "current-password" : "new-password"}
                  />
                  
                  {/* Toggle Password Visibility */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors touch-manipulation p-1"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 md:w-5 md:h-5" />
                    ) : (
                      <Eye className="w-4 h-4 md:w-5 md:h-5" />
                    )}
                  </button>
                  
                  {/* Focus Glow - Desktop only */}
                  {!isMobile && passwordFocused && (
                    <div className="absolute inset-0 -z-10 bg-blue-500/20 rounded-xl blur-xl" />
                  )}
                </div>
              </div>

              {/* Submit Button - Optimized */}
              <motion.button
                type="submit"
                disabled={loading}
                className="relative w-full group overflow-hidden rounded-xl disabled:opacity-50 disabled:cursor-not-allowed mt-5 md:mt-6 touch-manipulation"
                whileHover={!isMobile ? { scale: 1.02 } : {}}
                whileTap={{ scale: 0.98 }}
              >
                {/* Static gradient on mobile */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500" />
                
                {/* Button Content */}
                <span className="relative z-10 flex items-center justify-center gap-2.5 md:gap-3 px-5 md:px-6 py-3.5 md:py-4 text-white font-bold text-sm md:text-lg">
                  {loading ? (
                    <>
                      <div className="w-5 h-5 md:w-6 md:h-6 border-2 md:border-3 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      {isLogin ? "Sign In" : "Create Account"}
                      <span>→</span>
                    </>
                  )}
                </span>
              </motion.button>
            </form>

            {/* Toggle Login/Signup */}
            <div className="mt-6 md:mt-8 text-center">
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError("");
                }}
                className="text-xs md:text-sm text-white/60 hover:text-white transition-colors touch-manipulation p-2"
              >
                {isLogin ? (
                  <>
                    Don&apos;t have an account?{" "}
                    <span className="font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                      Sign up
                    </span>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <span className="font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      Sign in
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Trust Indicators - Simplified */}
        <motion.div
          className="mt-6 md:mt-8 flex items-center justify-center gap-6 md:gap-8 text-white/40 text-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center gap-2">
            <span>🔒</span>
            <span>Secure</span>
          </div>
          <div className="flex items-center gap-2">
            <span>⚡</span>
            <span>Fast</span>
          </div>
          <div className="flex items-center gap-2">
            <span>✨</span>
            <span>Reliable</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
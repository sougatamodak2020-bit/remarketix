"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const { setUser, setUserRole, setView } = useAppStore();

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

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-emerald-500/20 via-teal-500/20 to-transparent rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, 50, 0],
            opacity: [0.3, 0.5, 0.3] 
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-blue-500/20 via-purple-500/20 to-transparent rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            x: [0, -100, 0],
            y: [0, -50, 0],
            opacity: [0.5, 0.3, 0.5] 
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-r from-pink-500/10 via-yellow-500/10 to-transparent rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
            opacity: [0.2, 0.4, 0.2] 
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Grid Pattern */}
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
        {/* Back Button with Hover Effect */}
        <motion.button
          onClick={() => setView("home")}
          className="group mb-8 flex items-center gap-2 text-white/60 hover:text-white transition-all duration-300"
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-emerald-500/30 transition-all duration-300"
            whileHover={{ rotate: -180 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowLeft className="w-4 h-4" />
          </motion.div>
          <span className="font-medium">Back to Home</span>
        </motion.button>

        {/* Main Card */}
        <motion.div
          className="relative"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Card Glow Effect */}
          <motion.div
            className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-purple-500/20 rounded-3xl blur-xl"
            animate={{
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          <div className="relative card-glass-premium p-8 backdrop-blur-2xl">
            {/* Header with Icon Animation */}
            <div className="text-center mb-8">
              <motion.div
                className="relative w-20 h-20 mx-auto mb-6"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Rotating Border */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/30 via-blue-500/30 to-purple-500/30"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Icon Container */}
                <motion.div
                  className="absolute inset-0.5 rounded-2xl bg-[var(--bg-primary)] flex items-center justify-center overflow-hidden"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <AnimatePresence mode="wait">
                    {isLogin ? (
                      <motion.div
                        key="login"
                        initial={{ rotate: -180, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 180, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <LogIn className="w-9 h-9 text-emerald-400" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="signup"
                        initial={{ rotate: -180, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 180, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <UserPlus className="w-9 h-9 text-blue-400" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {/* Sparkles */}
                  <motion.div
                    className="absolute top-1 right-1"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles className="w-4 h-4 text-yellow-400" />
                  </motion.div>
                </motion.div>
              </motion.div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={isLogin ? "login" : "signup"}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="heading-lg text-white mb-3 bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {isLogin ? "Welcome Back" : "Create Account"}
                  </h2>
                  <p className="text-body-sm text-white/60">
                    {isLogin
                      ? "Sign in to continue your journey"
                      : "Start your journey with us today"}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Error Message with Animation */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mb-6 overflow-hidden"
                >
                  <div className="p-4 rounded-xl bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/20 backdrop-blur-sm">
                    <p className="text-red-400 text-sm font-medium flex items-center gap-2">
                      <motion.span
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        ⚠️
                      </motion.span>
                      {error}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Google Sign In Button */}
            <motion.button
              onClick={handleGoogleAuth}
              disabled={loading}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative w-full mb-6 px-6 py-4 rounded-xl overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              {/* Animated Background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5"
                animate={{
                  x: [-100, 100],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              
              {/* Border */}
              <div className="absolute inset-0 border border-white/10 group-hover:border-white/30 rounded-xl transition-all duration-300" />
              
              {/* Content */}
              <span className="relative flex items-center justify-center gap-3 text-white font-semibold">
                {/* Google Icon with Rotation */}
                <motion.svg 
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
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
                </motion.svg>
                Continue with Google
              </span>
            </motion.button>

            {/* Animated Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <motion.div 
                  className="w-full border-t border-white/10"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                />
              </div>
              <div className="relative flex justify-center">
                <motion.span 
                  className="px-4 py-1 bg-[var(--bg-primary)] text-white/40 text-sm font-medium rounded-full border border-white/10"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  or continue with email
                </motion.span>
              </div>
            </div>

            {/* Email Form */}
            <form onSubmit={handleEmailAuth} className="space-y-5">
              {/* Email Input */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <label className="block text-sm font-semibold text-white/80 mb-3">
                  Email Address
                </label>
                <div className="relative group">
                  {/* Icon */}
                  <motion.div
                    className="absolute left-4 top-1/2 -translate-y-1/2"
                    animate={{
                      scale: emailFocused ? 1.1 : 1,
                      color: emailFocused ? "rgb(52, 211, 153)" : "rgba(255, 255, 255, 0.4)",
                    }}
                  >
                    <Mail className="w-5 h-5 transition-colors" />
                  </motion.div>
                  
                  {/* Input */}
                  <motion.input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                    required
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-emerald-500/50 focus:bg-white/10 text-white placeholder:text-white/30 outline-none transition-all duration-300"
                    placeholder="Enter your email"
                    whileFocus={{ scale: 1.01 }}
                  />
                  
                  {/* Focus Glow */}
                  <AnimatePresence>
                    {emailFocused && (
                      <motion.div
                        className="absolute inset-0 -z-10 bg-emerald-500/20 rounded-xl blur-xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Password Input */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <label className="block text-sm font-semibold text-white/80 mb-3">
                  Password
                </label>
                <div className="relative group">
                  {/* Lock Icon */}
                  <motion.div
                    className="absolute left-4 top-1/2 -translate-y-1/2"
                    animate={{
                      scale: passwordFocused ? 1.1 : 1,
                      color: passwordFocused ? "rgb(59, 130, 246)" : "rgba(255, 255, 255, 0.4)",
                    }}
                  >
                    <Lock className="w-5 h-5 transition-colors" />
                  </motion.div>
                  
                  {/* Input */}
                  <motion.input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                    required
                    minLength={6}
                    className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 focus:bg-white/10 text-white placeholder:text-white/30 outline-none transition-all duration-300"
                    placeholder="Enter your password"
                    whileFocus={{ scale: 1.01 }}
                  />
                  
                  {/* Toggle Password Visibility */}
                  <motion.button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <AnimatePresence mode="wait">
                      {showPassword ? (
                        <motion.div
                          key="eye-off"
                          initial={{ rotate: -90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: 90, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <EyeOff className="w-5 h-5" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="eye"
                          initial={{ rotate: -90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: 90, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Eye className="w-5 h-5" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                  
                  {/* Focus Glow */}
                  <AnimatePresence>
                    {passwordFocused && (
                      <motion.div
                        className="absolute inset-0 -z-10 bg-blue-500/20 rounded-xl blur-xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                className="relative w-full group overflow-hidden rounded-xl disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                {/* Animated Gradient Background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{ backgroundSize: "200% 200%" }}
                />
                
                {/* Shine Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                
                {/* Button Content */}
                <span className="relative z-10 flex items-center justify-center gap-3 px-6 py-4 text-white font-bold text-lg">
                  {loading ? (
                    <>
                      <motion.div
                        className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <motion.span
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        Processing...
                      </motion.span>
                    </>
                  ) : (
                    <>
                      {isLogin ? "Sign In" : "Create Account"}
                      <motion.span
                        className="inline-block"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </>
                  )}
                </span>
              </motion.button>
            </form>

            {/* Toggle Login/Signup */}
            <motion.div 
              className="mt-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <motion.button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError("");
                }}
                className="group text-sm text-white/60 hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isLogin ? (
                  <>
                    Don&apos;t have an account?{" "}
                    <span className="relative inline-block font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                      Sign up
                      <motion.span
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </span>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <span className="relative inline-block font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      Sign in
                      <motion.span
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </span>
                  </>
                )}
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          className="mt-8 flex items-center justify-center gap-8 text-white/40 text-xs"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.1, color: "rgba(255, 255, 255, 0.8)" }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🔒
            </motion.div>
            <span>Secure</span>
          </motion.div>
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.1, color: "rgba(255, 255, 255, 0.8)" }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              ⚡
            </motion.div>
            <span>Fast</span>
          </motion.div>
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.1, color: "rgba(255, 255, 255, 0.8)" }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              ✨
            </motion.div>
            <span>Reliable</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
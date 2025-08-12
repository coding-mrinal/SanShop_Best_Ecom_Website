import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

const InputField = ({ icon: Icon, type, placeholder, value, onChange, autoComplete }) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <Icon className="h-5 w-5 text-rose-400 dark:text-rose-300" />
    </div>
    <input
      type={type}
      required
      value={value}
      onChange={onChange}
      autoComplete={autoComplete}
      className="w-full pl-10 pr-10 py-3.5 bg-white dark:bg-gray-700 border border-rose-200 dark:border-rose-900/30 rounded-xl
                 text-gray-900 dark:text-rose-50 placeholder-gray-500 dark:placeholder-rose-200/70
                 focus:outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-400
                 transition-all duration-300 shadow-sm hover:shadow-md"
      placeholder={placeholder}
    />
    {type === "password" && (
      <button
        type="button"
        className="absolute inset-y-0 right-0 pr-3 flex items-center"
        onClick={onChange}
      >
        {value && (type === "text" ? <EyeOff className="h-5 w-5 text-rose-400" /> :
                                     <Eye className="h-5 w-5 text-rose-400" />)}
      </button>
    )}
  </div>
);

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useUser();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      login({ email, name: "John Doe" });
      navigate("/profile");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50/80 via-amber-50/80 to-rose-100/50 dark:from-gray-900 dark:via-rose-900/10 dark:to-rose-900/20 py-12 px-4 sm:px-6">
      <div className="max-w-6xl w-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-rose-100/50 dark:border-rose-900/20 overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 hidden lg:block relative">
            <div 
              className="h-full w-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: "url('https://picsum.photos/800/700?random=1')" }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-rose-900/80 via-rose-800/40 to-amber-800/20"></div>
            </div>
          </div>
          
          <div className="lg:w-1/2 p-10">
            <div className="max-w-md mx-auto">
              <div className="text-center lg:text-left mb-8">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-rose-50 mb-2">Welcome Back</h1>
                <p className="text-lg text-rose-600 dark:text-rose-300/80">Sign in to continue your journey</p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <InputField icon={Mail} type="email" placeholder="Email address" value={email} 
                              onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
                  <div className="relative">
                    <InputField icon={Lock} type={showPassword ? "text" : "password"} placeholder="Password" 
                                value={password} onChange={(e) => setPassword(e.target.value)} 
                                autoComplete="current-password" />
                    {password && (
                      <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center"
                              onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <EyeOff className="h-5 w-5 text-rose-400" /> : 
                                        <Eye className="h-5 w-5 text-rose-400" />}
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center">
                    <input id="remember-me" name="remember-me" type="checkbox"
                      className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-violet-300 dark:border-violet-700 
                                 dark:bg-gray-700/50 rounded focus:ring-offset-0 checked:bg-violet-500" />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-violet-100/80">
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <a href="#" className="font-medium text-violet-600 hover:text-violet-500 dark:text-violet-400 
                                          dark:hover:text-violet-300 hover:underline">
                      Forgot password?
                    </a>
                  </div>
                </div>

                <div className="pt-2">
                  <button type="submit"
                    className="group relative w-full flex justify-center py-3.5 px-4 border-2 border-rose-500 
                               text-sm font-semibold rounded-xl text-rose-600 dark:text-rose-400 
                               bg-transparent hover:bg-rose-500/10 focus:outline-none focus:ring-2 
                               focus:ring-offset-2 focus:ring-rose-500/30 dark:focus:ring-offset-gray-800 
                               shadow-sm hover:shadow-rose-500/20 transition-all duration-300 
                               hover:border-rose-600 dark:border-rose-600 dark:hover:border-rose-500 hover:scale-[1.01]">
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <Lock className="h-5 w-5 text-rose-500 dark:text-rose-400" />
                    </span>
                    Sign in to your account
                  </button>
                </div>
              </form>

              <div className="text-center pt-4">
                <p className="text-sm text-gray-600 dark:text-rose-200/80">
                  Don't have an account?{" "}
                  <Link to="/register" className="font-semibold text-rose-600 hover:text-rose-500 
                                                 dark:text-rose-400 dark:hover:text-rose-300 hover:underline">
                    Create account
                  </Link>
                </p>
              </div>

              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-rose-200/60 dark:border-rose-900/20"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-3 bg-white/90 dark:bg-gray-800/90 text-rose-500 dark:text-rose-300/80 font-medium">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  {["Facebook", "Google"].map((provider) => (
                    <button key={provider} type="button"
                      className="w-full inline-flex justify-center py-2.5 px-4 border border-emerald-200 dark:border-emerald-900/20 
                                 rounded-xl bg-white/60 dark:bg-gray-700/60 text-sm font-medium 
                                 text-emerald-600 dark:text-emerald-300 hover:bg-emerald-50 
                                 dark:hover:bg-emerald-900/10 transition-all duration-200 
                                 hover:border-emerald-300 dark:hover:border-emerald-800/50 hover:scale-[1.02]">
                      {provider}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
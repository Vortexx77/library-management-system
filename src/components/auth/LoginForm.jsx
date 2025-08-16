import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../common/LoadingSpinner';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const { login, loading, error, isAuthenticated } = useAuth();

    const from = location.state?.from?.pathname || '/dashboard';

    useEffect(() => {
        if (isAuthenticated) {
            navigate(from, { replace: true });
        }
    }, [isAuthenticated, navigate, from]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await login(formData);
        if (result.success) {
            navigate(from, { replace: true });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 login-container relative">
            {/* Background Image */}
            <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url('/images/log2.jpeg')`,
                    filter: 'blur(3px)'
                }}
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50" />
            
            {/* Main Content */}
            <div className="relative z-10 flex w-full max-w-5xl mx-auto login-panel rounded-2xl overflow-hidden shadow-2xl">
                {/* Left Panel - Image with Overlay */}
                <div className="flex-1 bg-white p-2 rounded-l-2xl">
                    <div className="relative h-full overflow-hidden rounded-xl">
                        {/* Background Image */}
                        <img 
                            src="/images/log1.jpeg" 
                            alt="Library Students" 
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/60"></div>

                        {/* Content Overlay */}
                        <div className="relative z-10 flex flex-col justify-between h-full p-8 lg:p-12 text-white">
                            {/* Logo */}
                            <div className="flex items-center">
                                <div className="w-16 h-16 rounded-xl flex items-center justify-center mr-4 bg-white/20 p-2 backdrop-blur-sm">
                                    <img 
                                        src="/images/Vortexx1.png" 
                                        alt="Vortexx Logo" 
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            </div>
                            
                            {/* Footer */}
                            <div className="text-center text-sm">
                                <p> {new Date().getFullYear()} Vortexx Libris</p>
                                <p className="text-white/70">Powered by VORTEXX</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Right Panel - Glass Effect */}
                <div className="flex-1 backdrop-blur-sm bg-white/5 border-l border-white/10 p-8 lg:p-12 flex flex-col justify-center text-white min-h-[600px] relative">
                    {/* Glass overlay for additional depth */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/3 to-transparent pointer-events-none"></div>
                    <div className="relative z-10">
                    
                    {/* Login Header */}
                    <div className="mb-12">
                        <h2 className="text-4xl font-bold mb-3 tracking-tight">Welcome Back</h2>
                        <p className="text-white/70 text-lg">Sign in to your library account</p>
                    </div>
                    
                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Username Field */}
                        <div className="space-y-2">
                            <label htmlFor="username" className="block font-semibold mb-3 text-white/90 tracking-wide uppercase text-xs">
                                Username
                            </label>
                            <input
                                id="username"
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Enter your username"
                                className="w-full px-5 py-4 rounded-xl text-white bg-white/5 backdrop-blur-xl border border-white/20 placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/50 focus:bg-white/10 focus:backdrop-blur-2xl transition-all duration-300 text-base shadow-lg shadow-black/10"
                                required
                            />
                        </div>
                        
                        {/* Password Field */}
                        <div className="space-y-2">
                            <label htmlFor="password" className="block font-semibold mb-3 text-white/90 tracking-wide uppercase text-xs">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    className="w-full px-5 py-4 pr-12 rounded-xl text-white bg-white/5 backdrop-blur-xl border border-white/20 placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/50 focus:bg-white/10 focus:backdrop-blur-2xl transition-all duration-300 text-base shadow-lg shadow-black/10"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white/80 transition-colors"
                                >
                                    {showPassword ? (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                        
                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-500/20 backdrop-blur-sm border border-red-400/50 text-red-100 px-5 py-4 rounded-xl flex items-center space-x-3">
                                <svg className="w-5 h-5 text-red-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                <span className="text-sm">{error}</span>
                            </div>
                        )}
                        {/* Login Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/30 text-white font-semibold py-4 px-6 rounded-xl hover:from-white/20 hover:to-white/15 hover:border-white/50 focus:ring-2 focus:ring-white/40 focus:outline-none transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-xl shadow-black/20"
                            >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <LoadingSpinner size="sm" />
                                    <span className="ml-2">Logging in...</span>
                                </div>
                            ) : (
                                'Login'
                            )}
                        </button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
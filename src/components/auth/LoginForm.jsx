import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../common/LoadingSpinner';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
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
                {/* Left Panel - White */}
                <div className="flex-1 bg-white p-8 lg:p-12 flex flex-col justify-between min-h-[600px]">
                    {/* Logo */}
                    <div className="flex items-center mb-8">
                        <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center mr-3">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                        </div>
                        <span className="text-lg font-medium text-gray-700">Logo</span>
                    </div>
                    
                    {/* Center Image */}
                    <div className="flex-1 flex items-center justify-center py-8">
                        <div className="w-full max-w-sm h-64 rounded-xl overflow-hidden shadow-lg">
                            <img 
                                src="/images/log1.jpeg" 
                                alt="Library Students" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    
                    {/* Footer */}
                    <div className="text-center text-sm text-gray-500 mt-8">
                        <p>© 2025 Your Library Name</p>
                        <p>Powered by VORTEXX</p>
                    </div>
                </div>
                
                {/* Right Panel - Glass Effect */}
                <div className="flex-1 backdrop-blur-sm bg-white/5 border-l border-white/10 p-8 lg:p-12 flex flex-col justify-center text-white min-h-[600px] relative">
                    {/* Glass overlay for additional depth */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/3 to-transparent pointer-events-none"></div>
                    <div className="relative z-10">
                    {/* Login Header */}
                    <div className="mb-8">
                        <h2 className="text-4xl font-bold mb-2">Login</h2>
                    </div>
                    
                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Username Field */}
                        <div>
                            <label className="block text-sm font-medium mb-3 text-white/90">
                                Username
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your username"
                                className="w-full px-4 py-3 rounded-lg text-white bg-white/5 backdrop-blur-sm border border-white/10 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-all"
                                required
                            />
                        </div>
                        
                        {/* Password Field */}
                        <div>
                            <label className="block text-sm font-medium mb-3 text-white/90">
                                Password
                            </label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className="w-full px-4 py-3 rounded-lg text-white bg-white/5 backdrop-blur-sm border border-white/10 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-all"
                                required
                            />
                        </div>
                        
                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-500 bg-opacity-20 border border-red-400 text-red-100 px-4 py-3 rounded-lg">
                                {error}
                            </div>
                        )}
                        
                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold py-3 px-4 rounded-lg hover:bg-white/20 focus:ring-2 focus:ring-white/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
                        
                        
                        {/* Terms and Services */}
                        <div className="text-center text-xs text-white/60 mt-8 space-y-1">
                            <p>I have a problem? Contact us at thevortexxinfo@gmail.com</p>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
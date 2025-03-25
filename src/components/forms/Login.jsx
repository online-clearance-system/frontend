import React, { useState } from 'react'
import Logo from "../../assets/images/logo.jpeg"
import { Eye, EyeOff } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../../services/authService'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        
        try {
            const response = await authService.login(email, password);
            const userType = response.user.userType;
            
            if (userType === 'student') {
                navigate('/student');
            } else if (userType === 'staff') {
                navigate('/staff');
            } else if (userType === 'admin') {
                navigate('/admin');
            } else {
                navigate('/');
            }
        } catch (error) {
            setError(error.message || 'Failed to login. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="bg-[#FFFDFF] mx-3 flex items-center justify-center h-screen">
            <div className="mx-auto max-w-md">
                <div className="flex flex-col items-center">
                    <div>
                        <img src={Logo} alt="babcock logo" />
                    </div>
                    <div>
                        <h1 className="font-light text-[#1E3376] text-xl px-1 pb-1 border-[#1E3376] border-b-2">Clear<span className="font-medium">up</span></h1>
                    </div>
                </div>

                <div>
                    <h1 className="text-center text-2xl font-light mt-3">Log In</h1>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-700 p-3 rounded-md mt-3 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col space-y-4 mt-5 font-lexend">
                        <div className="flex flex-col rounded-md">
                            <label htmlFor="Email" className="text-xs font-light">
                                Email/Matric Number
                            </label>
                            <input 
                                type="text" 
                                id="Email" 
                                className="border bg-[#EAEAEA] border-[#E4E3E3] rounded-lg outline-none pl-2 pr-16 py-1" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required 
                            />
                        </div>
                        {/* Password Input with Validation */}
                        <div className="mb-3 flex flex-col">
                            <label htmlFor="Password" className="text-xs font-light">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="border bg-[#EAEAEA] border-[#E4E3E3] rounded-lg outline-none pl-2 pr-16 py-1 w-full"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                                    onClick={() => setShowPassword(!showPassword)}
                                    tabIndex="-1"
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                            <p className="text-[10px]">Forgot Password? {" "}
                                <Link to={"/forgot-password"}>
                                 <span className="text-[#2C50C0]">Click Here.</span>
                                 </Link>
                            </p> 
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`bg-[#2C50C0] w-full py-2 rounded-lg text-xs text-white mt-3 hover:bg-[#436adf] ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}>
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
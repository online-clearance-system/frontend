import React, { useState } from 'react'
import Logo from "../../assets/images/logo.jpeg"
import { Eye, EyeOff } from 'lucide-react'
import { Link } from 'react-router-dom'
const Login = () => {
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    return (
        <div className="bg-[#FFFDFF] mx-3 flex items-center justify-center h-screen">
            <div className="mx-auto max-w-md">
                <div className="flex flex-col items-center">
                    <div>
                        <img src={Logo} alt="babcock logo" />
                    </div>
                    <div>
                        <h1 className="font-light text-[#1E3376] text-xl px-1 pb-1 border-[#1E3376] border-b-2">Clear<span className="font-medium">up</span></h1>
                        <h1 className="uppercase text-[#2C50C0] text-xl font-medium">student</h1>
                    </div>
                </div>

                <div>
                    <h1 className="text-center text-2xl font-light mt-3">Log In</h1>
                </div>

                <form>
                    <div className="flex flex-col space-y-4 mt-5 font-lexend">
                        <div className="flex flex-col  rounded-md">
                            <label htmlFor="MatricNo" className="text-xs font-light">Matriculation Number
                            </label>
                            <input type="text" id="MatricNo" className="border bg-[#EAEAEA] border-[#E4E3E3] rounded-lg outline-none pl-2 pr-16 py-1" required />
                        </div>
                        {/* Password Input with Validation */}
                        <div className="mb-3 flex flex-col">
                            <label htmlFor="Password" className="text-xs font-light">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="border bg-[#EAEAEA] border-[#E4E3E3] rounded-lg outline-none pl-2 pr-16 py-1"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    autoComplete="new-password"
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
                        <Link to={"/student"}>
                            <button
                                type="submit"
                                className="bg-[#2C50C0] w-full py-2 rounded-lg text-xs text-white mt-3 hover:bg-[#436adf]">
                                Login
                            </button>
                        </Link>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
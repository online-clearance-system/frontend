import { useState } from "react"
import Logo from "../../assets/images/logo.jpeg"
import { Eye, EyeOff, Check, X } from "lucide-react"
import { Link, useNavigate } from 'react-router-dom'
import authService from "../../services/authService"

export default function SignUp() {
    const navigate = useNavigate();

    // Form fields state
    const [gender, setGender] = useState("")
    const [gradYear, setGraduationYear] = useState("")
    const [department, setSchool] = useState("")
    const [course, setCourse] = useState("")
    const [firstName, setFirstName] = useState("")
    const [middleName, setMiddleName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [dob, setDob] = useState("")
    const [phone, setPhone] = useState("")
    const [matric, setMatricNo] = useState("")
    const [bursaryAcct, setBursaryAccount] = useState("")

    // Password states
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    // Form submission states
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Check if passwords match
    const passwordsMatch = password === confirmPassword && confirmPassword !== ""

    // Check if form is complete
    const isFormComplete =
        firstName &&
        lastName &&
        email &&
        dob &&
        gender &&
        phone &&
        matric &&
        gradYear &&
        department &&
        course &&
        bursaryAcct &&
        password &&
        confirmPassword &&
        passwordsMatch

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isFormComplete) {
            setError('Please fill all required fields and ensure passwords match.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            // Create the user data object matching the API schema
            const userData = {
                firstName,
                middleName,
                lastName,
                email,
                dob,
                gender,
                phone,
                matric,
                gradYear: parseInt(gradYear),
                course,
                bursaryAcct,
                department,
                password
            };

            await authService.register(userData);
            navigate('/login');
        } catch (error) {
            setError(error.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#FFFDFF] mx-3">
            <div className="mx-auto max-w-sm lg:max-w-xl mt-5">
                <div className="flex justify-between">
                    <div className="leading-tight border-l-2 border-[#1E3376] pl-2">
                        <p className="uppercase text-[#2C50C0]">student </p>
                        <span className="text-[#111B37]">Registration</span>
                    </div>
                    <img src={Logo} alt="babcock logo" className="w-10" />
                </div>

                {error && (
                    <div className="bg-red-50 text-red-700 p-3 rounded-md mt-3 text-sm">
                        {error}
                    </div>
                )}

                <form className="flex-col flex font-lexend mt-5" onSubmit={handleSubmit}>
                    <div className="flex-col flex md:flex-row md:gap-5 justify-between">
                        <div>
                            {/* First Name Input */}
                            <div className="mb-3 flex flex-col">
                                <label htmlFor="FirstName" className="text-sm">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control text-sm outline-none rounded-lg pl-2 pr-10 py-1 border-[1px] border-[#AAACAD]"
                                    id="firstname"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3 flex flex-col">
                                <label htmlFor="MiddleName" className="text-sm">
                                    Middle Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control text-sm outline-none rounded-lg pl-2 pr-10 py-1 border-[1px] border-[#AAACAD]"
                                    id="middlename"
                                    value={middleName}
                                    onChange={(e) => setMiddleName(e.target.value)}
                                />
                            </div>
                            {/* Last Name Input */}
                            <div className="mb-3 flex flex-col">
                                <label htmlFor="lastname" className="text-sm">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control text-sm outline-none rounded-lg pl-2 pr-10 py-1 border-[1px] border-[#AAACAD]"
                                    id="lastname"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Email Input */}
                            <div className="mb-3 flex flex-col">
                                <label htmlFor="email" className="text-sm">
                                    Student Email
                                </label>
                                <input
                                    type="email"
                                    className="form-control text-sm rounded-lg pl-2 py-1 border-[1px] border-[#AAACAD] outline-none"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3 flex flex-col">
                                <label htmlFor="date" className="text-sm">
                                    Date of birth
                                </label>
                                <input
                                    type="date"
                                    className="form-control text-sm rounded-lg pl-2 py-1 border-[1px] border-[#AAACAD] outline-none"
                                    id="date"
                                    value={dob}
                                    onChange={(e) => setDob(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Gender Dropdown */}
                            <div className="mb-3 flex flex-col">
                                <label htmlFor="gender" className="text-sm">
                                    Gender
                                </label>
                                <select
                                    name="Gender"
                                    id="gender"
                                    className="rounded-lg outline-none text-sm border-[1px] border-[#AAACAD] py-2 px-3 appearance-none"
                                    style={{ color: gender ? "black" : "#6B7280" }}
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    required
                                >
                                    <option value="" disabled hidden style={{ color: "#6B7280" }}>
                                        Select your gender
                                    </option>
                                    <option value="Female" style={{ color: "black" }}>
                                        Female
                                    </option>
                                    <option value="Male" style={{ color: "black" }}>
                                        Male
                                    </option>
                                </select>
                            </div>

                            <div className="mb-3 flex flex-col">
                                <label htmlFor="PhoneNo" className="text-sm">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    className="form-control outline-none rounded-lg px-1 py-1 border-[1px] border-[#AAACAD]"
                                    id="phoneNo"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="">
                            <div className="mb-3 flex flex-col">
                                <label htmlFor="MatricNo" className="text-sm">
                                    Matric Number
                                </label>
                                <input
                                    type="text"
                                    className="form-control text-sm outline-none rounded-lg pl-2 pr-10 py-1 border-[1px] border-[#AAACAD]"
                                    id="MatricNo"
                                    value={matric}
                                    onChange={(e) => setMatricNo(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Graduation year*/}
                            <div className="mb-3 flex flex-col">
                                <label htmlFor="graduationYear" className="text-sm">
                                    Graduation year
                                </label>
                                <select
                                    name="GraduationYear"
                                    id="GraduationYear"
                                    className="rounded-lg outline-none text-sm border-[1px] border-[#AAACAD] py-2 px-3 appearance-none"
                                    style={{ color: gradYear ? "black" : "#6B7280" }}
                                    value={gradYear}
                                    onChange={(e) => setGraduationYear(e.target.value)}
                                    required
                                >
                                    <option value="" disabled hidden style={{ color: "#6B7280" }}>
                                        Select your graduation year
                                    </option>
                                    <option value="2025" style={{ color: "black" }}>
                                        2025
                                    </option>
                                    <option value="2024" style={{ color: "black" }}>
                                        2024
                                    </option>
                                    <option value="2023" style={{ color: "black" }}>
                                        2023
                                    </option>
                                    <option value="2022" style={{ color: "black" }}>
                                        2022
                                    </option>
                                    <option value="2021" style={{ color: "black" }}>
                                        2021
                                    </option>
                                </select>
                            </div>

                            {/* school Dropdown */}
                            <div className="mb-3 flex flex-col">
                                <label htmlFor="degree" className="text-sm">
                                    Department
                                </label>
                                <select
                                    name="Degree"
                                    id="degree"
                                    className="rounded-lg border-[1px] text-sm outline-none border-[#AAACAD] py-2 px-3 appearance-none"
                                    style={{ color: department ? "black" : "#6B7280" }}
                                    value={department}
                                    onChange={(e) => setSchool(e.target.value)}
                                    required
                                >
                                    <option value="" disabled hidden style={{ color: "#6B7280" }}>
                                        Select your department
                                    </option>
                                    <option value="B.Sc" style={{ color: "black" }}>
                                      Computer Science
                                    </option>
                                    <option value="B.Eng" style={{ color: "black" }}>
                                        Information Technology
                                    </option>
                                    <option value="B.Eng" style={{ color: "black" }}>
                                        Software Engineering
                                    </option>
                                </select>
                            </div>

                            <div className="mb-3 flex flex-col">
                                <label htmlFor="course" className="text-sm">
                                    Course
                                </label>
                                <select
                                    name="course"
                                    id="course"
                                    className="rounded-lg border-[1px] text-sm outline-none border-[#AAACAD] py-2 px-3 appearance-none"
                                    style={{ color: course ? "black" : "#6B7280" }}
                                    value={course}
                                    onChange={(e) => setCourse(e.target.value)}
                                    required
                                >
                                    <option value="" disabled hidden style={{ color: "#6B7280" }}>
                                        Select your course
                                    </option>
                                    <option value="B.Sc" style={{ color: "black" }}>
                                        Computer Science
                                    </option>
                                    <option value="B.Eng" style={{ color: "black" }}>
                                        Computer Information Systems
                                    </option>
                                    <option value="B.Eng" style={{ color: "black" }}>
                                        Computer Science (Technology)
                                    </option>
                                    <option value="B.Eng" style={{ color: "black" }}>
                                        Information Technology
                                    </option>
                                    <option value="B.Eng" style={{ color: "black" }}>
                                        Software Engineering
                                    </option>
                                </select>
                            </div>

                            <div className="mb-3 flex flex-col">
                                <label htmlFor="banumber" className="text-sm">
                                    Bursary Account Number
                                </label>
                                <input
                                    type="text"
                                    className="form-control text-sm outline-none rounded-lg px-1 py-1 border-[1px] border-[#AAACAD]"
                                    id="banumber"
                                    value={bursaryAcct}
                                    onChange={(e) => setBursaryAccount(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Password Input with Validation */}
                            <div className="mb-3 flex flex-col">
                                <label htmlFor="Password" className="text-sm">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="form-control text-sm w-full outline-none rounded-lg pl-2 py-1 pr-10 border-[1px] border-[#AAACAD]"
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
                            </div>

                            {/* Confirm Password Input */}
                            <div className="mb-3 flex flex-col">
                                <label htmlFor="ConfirmPassword" className="text-sm">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        className={`form-control text-sm w-full outline-none rounded-lg pl-2 py-1 pr-10 border-[1px] 
                                        ${confirmPassword && !passwordsMatch ? "border-red-500" : confirmPassword && passwordsMatch ? "border-green-500" : "border-[#AAACAD]"}`}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        autoComplete="new-password"
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        tabIndex="-1"
                                    >
                                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>

                                {/* Password match indicator */}
                                {confirmPassword && (
                                    <div className="mt-1 flex items-center text-xs">
                                        {passwordsMatch ? (
                                            <>
                                                <Check className="h-4 w-4 text-green-500 mr-1" />
                                                <span className="text-green-500">Passwords match</span>
                                            </>
                                        ) : (
                                            <>
                                                <X className="h-4 w-4 text-red-500 mr-1" />
                                                <span className="text-red-500">Passwords do not match</span>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            disabled={loading || !isFormComplete}
                            className={`bg-[#2C50C0] w-full py-2 rounded-lg text-xs capitalize text-white mt-3 hover:bg-[#436adf] ${(loading || !isFormComplete) ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Registering...' : 'register student'}
                        </button>

                        <p className="text-center mt-3 text-sm">
                            Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}


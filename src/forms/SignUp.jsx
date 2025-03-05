import { React, useState } from "react";

export default function SignUp() {
    const [gender, setGender] = useState("");
    const [graduationYear, setGraduationYear] = useState("");
    const [school, setSchool] = useState("");
    const [course, setCourse] = useState("");

    return (
        <body className="bg-[#EAE9EA]">
            <div className="mx-auto max-w-xl mt-10 bg-[#EAE9EA]">
                <div className="leading-tight border-l-2 border-[#1E3376] pl-2">
                    <p className="uppercase text-[#2C50C0]">student </p>
                    <span className="text-[#111B37]">Registration</span>
                </div>
                <form className="flex justify-between font-lexend">
                    <div className="">
                        {/* First Name Input */}
                        <div className="mb-3 flex flex-col">
                            <label htmlFor="FirstName" className="form-label">First Name</label>
                            <input
                                type="text"
                                className="form-control outline-none rounded-lg pl-2 pr-10 py-1 border-[1px] border-[#AAACAD]"
                                id="firstname"
                                required
                            />
                        </div>
                        <div className="mb-3 flex flex-col">
                            <label htmlFor="MiddleName" className="form-label">Middle Name</label>
                            <input
                                type="text"
                                className="form-control outline-none rounded-lg pl-2 pr-10 py-1 border-[1px] border-[#AAACAD]"
                                id="middlename"
                                required
                            />
                        </div>
                        {/* Last Name Input */}
                        <div className="mb-3 flex flex-col">
                            <label htmlFor="lastname" className="form-label">Last Name</label>
                            <input
                                type="text"
                                className="form-control outline-none rounded-lg pl-2 pr-10 py-1 border-[1px] border-[#AAACAD]"
                                id="lastname"
                                required
                            />
                        </div>

                        {/* Email Input */}
                        <div className="mb-3 flex flex-col">
                            <label htmlFor="email" className="form-label">Student Email</label>
                            <input
                                type="email"
                                className="form-control rounded-lg pl-2 py-1 border-[1px] border-[#AAACAD] outline-none"
                                id="email"
                                required
                            />
                        </div>
                        <div className="mb-3 flex flex-col">
                            <label htmlFor="date" className="form-label">Date of birth</label>
                            <input
                                type="date"
                                className="form-control rounded-lg px-5 py-1 border-[1px] border-[#AAACAD] outline-none"
                                id="date"
                                required
                            />
                        </div>

                        {/* Gender Dropdown */}
                        <div className="mb-3 flex flex-col">
                            <label htmlFor="gender" className="form-label">Gender</label>
                            <select
                                name="Gender"
                                id="gender"
                                className={`rounded-lg outline-none text-sm border-[1px] border-[#AAACAD] py-2 px-3 appearance-none 
                 ${gender ? "text-black" : "text-gray-400"}`}
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <option value="" disabled hidden>Select your gender</option>
                                <option value="Female" className="text-black">Female</option>
                                <option value="Male" className="text-black">Male</option>
                            </select>
                        </div>

                        <div className="mb-3 flex flex-col">
                            <label htmlFor="PhoneNo">Phone Number</label>
                            <input type="tel"
                                className="form-control outline-none rounded-lg px-1 py-1 border-[1px] border-[#AAACAD]"
                                id="phoneNo"
                                required />
                        </div>
                    </div>

                    <div className="">
                        <div className="mb-3 flex flex-col">
                            <label htmlFor="MatricNo">Matric Number</label>
                            <input type="text"
                                className="form-control outline-none rounded-lg px-1 py-1 border-[1px] border-[#AAACAD]"
                                id="MatricNo"
                                required />
                        </div>

                        {/* Graduation year*/}
                        <div className="mb-3 flex flex-col">
                            <label htmlFor="gender" className="form-label">Graduation year</label>
                            <select
                                name="GraduationYear"
                                id="GraduationYear"
                                className={`rounded-lg outline-none text-sm border-[1px] border-[#AAACAD] py-2 px-3 appearance-none 
                 ${graduationYear ? "text-black" : "text-gray-400"}`}
                                value={graduationYear}
                                onChange={(e) => setGraduationYear(e.target.value)}
                            >
                                <option value="" disabled hidden>Select your graduation year</option>
                                <option value="2025" className="text-black">2025</option>
                                <option value="2024" className="text-black">2024</option>
                                <option value="2023" className="text-black">2023</option>
                                <option value="2022" className="text-black">2022</option>
                                <option value="2021" className="text-black">2021</option>
                            </select>
                        </div>

                        {/* school Dropdown */}
                        <div className="mb-3 flex flex-col">
                            <label htmlFor="degree" className="form-label">Department</label>
                            <select
                                name="Degree"
                                id="degree"
                                className={`rounded-lg border-[1px] text-sm outline-none border-[#AAACAD] py-2 px-3 appearance-none
                 ${school ? "text-black" : "text-gray-400"}`}
                                value={school}
                                onChange={(e) => setSchool(e.target.value)}
                            >
                                <option value="" disabled hidden>Select your school/faculty</option>
                                <option value="B.Sc" className="text-black">Bachelor of Science (B.Sc)</option>
                                <option value="B.Eng" className="text-black">Bachelor of Engineering (B.Eng)</option>
                            </select>
                        </div>

                        <div className="mb-3 flex flex-col">
                            <label htmlFor="course" className="form-label">Course</label>
                            <select
                                name="course"
                                id="course"
                                className={`rounded-lg border-[1px] text-sm outline-none border-[#AAACAD] py-2 px-3 appearance-none
                 ${course ? "text-black" : "text-gray-400"}`}
                                value={course}
                                onChange={(e) => setCourse(e.target.value)}
                            >
                                <option value="" disabled hidden>Select your school/faculty</option>
                                <option value="B.Sc" className="text-black">Bachelor of Science (B.Sc)</option>
                                <option value="B.Eng" className="text-black">Bachelor of Engineering (B.Eng)</option>
                            </select>
                        </div>

                        <div className="mb-3 flex flex-col">
                            <label htmlFor="banumber">Bursary Account Number</label>
                            <input type="text"
                                className="form-control outline-none rounded-lg px-1 py-1 border-[1px] border-[#AAACAD]"
                                id="banumber"
                                required />
                        </div>

                        <div className="mb-3 flex flex-col">
                            <label htmlFor="Password">Password</label>
                            <input type="password"
                                className="form-control outline-none rounded-lg py-1 border-[1px] border-[#AAACAD]"
                                required
                            />

                        </div>
                        <div className="mb-3 flex flex-col">
                            <label htmlFor="ConfirmPassword">Confirm Password</label>
                            <input type="password"
                                className="form-control outline-none rounded-lg py-1 border-[1px] border-[#AAACAD]"
                                required
                            />

                        </div>
                    </div>
                </form>
            </div>
        </body>

    );
}

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ForgotPassword() {
    const [email, setEmail] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Password reset requested for:', email);

        navigate('/email-sent');
    };

    return (
        <div class="mx-auto max-w-lg px-5 lg:px-2 py-8">
            <div class="text-center">
                <h1 class="text-2xl font-semibold text-[#1e3a8a]">Forgot password</h1>
                <p class="mt-2 text-gray-600 text-justify">
                    Don't worry! It happens. Please enter your student email address.
                </p>
            </div>

            <form onSubmit={handleSubmit} class="mt-8 space-y-6 pr-1">
                <div class="space-y-2">
                    <label
                        htmlFor="email"
                        class="block text-sm font-medium text-gray-700"
                    >
                        Student Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Johnphilip@student.babcock.edu.ng"
                        class="w-full p-2 border border-gray-300 rounded bg-[#F9F9F9] outline-none focus:border-blue-500 focus:ring-1 focus:ring-[#20448F] "
                    />
                </div>
                    <button
                        type="submit"
                        class="mt-4 w-full rounded-md bg-[#1e3a8a]  py-2 text-white hover:bg-[#1e3a8a]/90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Submit
                    </button>
            </form>
        </div>
    );
}

export default ForgotPassword;


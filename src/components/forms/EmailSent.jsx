import React from 'react';
import ThumbsUp from '../../assets/images/ThumbsUp.svg'
import { Link } from 'react-router-dom';
const EmailSent = () => {
  return (
    <div class="mx-auto max-w-xl my-10 px-4 py-8 text-center">
      <div class="mb-6">
        <img
          src={ThumbsUp}
          alt="Success"
          class="mx-auto h-36 w-36 text-[#1e3a8a]"
        />
      </div>
      
      <h1 class="mb-2 text-2xl font-bold text-[#1e3a8a]">
        Thank you for submitting your email address
      </h1>
      
      <p class="text-gray-600 text-sm">
        Please check your mail for your new password and{' '}
        <Link to="/login" class="text-[#20448f] hover:underline">
          login
        </Link>
      </p>
    </div>
  );
};

export default EmailSent;


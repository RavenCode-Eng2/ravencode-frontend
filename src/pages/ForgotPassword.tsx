import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import { theme } from '../theme';

const ForgotPassword: React.FC = () => {
  // State for email input field
  const [email, setEmail] = useState('');

  // Function to handle sending password reset email
  const handlePasswordReset = () => {
    // Check if email is provided
    if (!email) {
      alert('Please enter your email address.');
      return;
    }
  };

  return (
    <main className="flex flex-1 items-center justify-center">
      <div className={`w-full ${theme.spacing.container.default} max-w-[512px]`}>
        <div className="flex justify-center mb-8">
          <div className={`w-16 h-16 rounded-2xl bg-[${theme.colors.primary.light}] flex items-center justify-center`}>
            <span className={`text-[${theme.colors.text.dark}] text-2xl font-bold`}>CQ</span>
          </div>
        </div>
        <h2 className={`${theme.typography.heading.h2} text-${theme.colors.text.primary} text-center mb-8`}>
          Forgot your password?
        </h2>
        <p className={`${theme.typography.body.default} text-${theme.colors.text.secondary} text-center mb-6`}>
          Enter your email address below and we'll send you a link to reset your password.
        </p>
        <div className="space-y-4">
          <Input
            type="email"
            id="email"
            label="Email"
            placeholder="Enter your email"
            value={email} // Bind input value to state
            onChange={(e) => setEmail(e.target.value)} // Update state on input change
          />
          {/* Button to trigger the password reset process */}
          <Button onClick={handlePasswordReset} size="lg" fullWidth> {/* Button to trigger the password reset process */}
            Send Reset Link
 {/* Button to trigger the password reset process */}
          </Button>
          <p className={`text-center ${theme.typography.body.default} text-[${theme.colors.text.secondary}]`}>
            Remember your password?{' '}
            <Link
              to="/login"
              className={`font-medium text-[${theme.colors.primary.main}] hover:text-[${theme.colors.primary.main}]/80`}
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default ForgotPassword;
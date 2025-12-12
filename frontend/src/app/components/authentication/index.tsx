'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SVGIcons } from '../../../../utils/svgConstants';
import {
  LoginValidationRules,
  SignUpValidationRules,
} from '../../../../utils/validations/AllValidationRules';
import { isValidForm } from '../../../../utils/validations/CommonValidator';
import { showSuccess, showError } from '../../../../utils/notification';
import Input from '../input';
// API Services
import TaskManagerServices from '../../../services/axios/apiServices/TaskManagerServices';
import { useAuth } from '../../context/AuthContext';

interface AuthPageProps {
  type: 'login' | 'register';
}

interface ValidationState {
  isValid: boolean;
  error: { [key: string]: string };
}

export default function AuthPage({ type }: AuthPageProps) {
  const [activeTab, setActiveTab] = useState('signin');
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [signupData, setSignupData] = useState({
    email: '',
    password: '',
    full_name: '',
    phone: '',
    confirmPassword: '',
  });
  const [validSignInState, isSignInValidState] = useState<ValidationState>({
    isValid: true,
    error: {},
  });
  const [validSignUpState, isSignUpValidState] = useState<ValidationState>({
    isValid: true,
    error: {},
  });
  const [showPassword, setShowPassword] = useState(false);
  const { login: authLogin } = useAuth();

  const isLogin = activeTab === 'signin';

  const router = useRouter();

  const resetSignUpForm = () => {
    setSignupData({
      email: '',
      password: '',
      full_name: '',
      phone: '',
      confirmPassword: '',
    });
    isSignUpValidState({
      isValid: true,
      error: {},
    });
  };

  const taskManagerServices = new TaskManagerServices();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLogin) {
      if (isValidateAllLoginFields()) {
        let request = loginData;
        try {
          const response: any = await taskManagerServices.signIn(request);
          console.log('response', response);
          if (response.statusCode === 201 && response.success == true) {
            // Store auth data in context
            authLogin(response.data.user, response.data.access_token);
            showSuccess(response.message || 'Login successfully!');
            router.push('/dashboard');
          } else {
            showError(response.message || 'Invalid credentials.');
          }
        } catch (error: any) {
          console.error('Login error:', error);
          if (error?.response?.status === 401) {
            showError('Invalid email or password. Please try again.');
          } else {
            showError(error?.response?.data?.message || error?.message || 'Login failed. Please try again.');
          }
        }
      } else {
        showError('Please fill all mendatory fields');
      }
    } else {
      if (isValidateAllSignUpFields()) {
        let request = signupData;
        try {
          const response: any = await taskManagerServices.signUp(request);
          console.log('response', response);
          if (response.statusCode === 201 && response.success == true) {
            resetSignUpForm();
            showSuccess('User created successfully!');
            setActiveTab('signin');
          } else {
            showError(response.message || 'Registration failed. Please try again.');
          }
        } catch (error: any) {
          console.error('Signup error:', error);
          if (error?.response?.status === 400) {
            showError('User already exists or invalid data. Please check your information.');
          } else {
            showError(error?.response?.data?.message || error?.message || 'Registration failed. Please try again.');
          }
        }
      } else {
        showError('Please fill all mendatory fields');
      }
    }
  };

  const isValidateAllLoginFields = () => {
    const newValidState = isValidForm(
      loginData,
      LoginValidationRules,
      validSignInState
    );
    isSignInValidState(newValidState);
    return newValidState.isValid;
  };

  const isValidateAllSignUpFields = () => {
    const newValidState = isValidForm(
      signupData,
      SignUpValidationRules,
      validSignUpState
    );
    isSignUpValidState(newValidState);
    return newValidState.isValid;
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/20">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        ></div>
      </div>

      <div className="relative w-full max-w-md z-10" suppressHydrationWarning>
        {/* Main Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Header */}
          <div
            className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-8 py-8"
            suppressHydrationWarning
          >
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative text-center">
              <div
                className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-white/30"
                suppressHydrationWarning
              >
                <SVGIcons.Lock className="w-10 h-10 text-white" />
              </div>
              <h1
                className="text-3xl font-bold text-white mb-2"
                suppressHydrationWarning
              >
                {isLogin ? 'Welcome Back!' : 'Join Us Today'}
              </h1>
              <p className="text-white/80 text-sm" suppressHydrationWarning>
                {isLogin
                  ? 'Sign in to continue to your account'
                  : 'Create your account to get started'}
              </p>

              {/* Tab Buttons */}
              <div className="flex bg-white/10 rounded-lg p-1 mt-4">
                <button
                  type="button"
                  onClick={() => setActiveTab('signin')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                    activeTab === 'signin'
                      ? 'bg-white text-indigo-600 shadow-sm'
                      : 'text-white/80 hover:text-white'
                  }`}
                  suppressHydrationWarning
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('signup')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                    activeTab === 'signup'
                      ? 'bg-white text-indigo-600 shadow-sm'
                      : 'text-white/80 hover:text-white'
                  }`}
                  suppressHydrationWarning
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="px-8 py-8" suppressHydrationWarning>
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
              suppressHydrationWarning
            >
              {/* Sign In Form */}
              {isLogin && (
                <>
                  <Input
                    type="email"
                    label="Email Address"
                    placeholder="Enter your email address"
                    value={loginData.email}
                    onChange={(e) =>
                      setLoginData({ ...loginData, email: e.target.value })
                    }
                    error={validSignInState.error?.email}
                    required
                  />

                  <Input
                    type={showPassword ? 'text' : 'password'}
                    label="Password"
                    placeholder="Enter your password"
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({ ...loginData, password: e.target.value })
                    }
                    error={validSignInState.error?.password}
                    className="pr-12"
                    required
                  />
                </>
              )}

              {/* Sign Up Form */}
              {!isLogin && (
                <>
                  <Input
                    type="text"
                    label="Full Name"
                    placeholder="Enter your full name"
                    value={signupData.full_name}
                    onChange={(e) =>
                      setSignupData({
                        ...signupData,
                        full_name: e.target.value,
                      })
                    }
                    error={validSignUpState.error?.full_name}
                    required
                  />

                  <Input
                    type="tel"
                    label="Phone Number"
                    placeholder="Enter your phone number"
                    value={signupData.phone}
                    onChange={(e) =>
                      setSignupData({ ...signupData, phone: e.target.value })
                    }
                    error={validSignUpState.error?.phone}
                    required
                  />

                  <Input
                    type="email"
                    label="Email Address"
                    placeholder="Enter your email address"
                    value={signupData.email}
                    onChange={(e) =>
                      setSignupData({ ...signupData, email: e.target.value })
                    }
                    error={validSignUpState.error?.email}
                    required
                  />

                  <Input
                    type={showPassword ? 'text' : 'password'}
                    label="Password"
                    placeholder="Enter your password"
                    value={signupData.password}
                    onChange={(e) =>
                      setSignupData({ ...signupData, password: e.target.value })
                    }
                    error={validSignUpState.error?.password}
                    className="pr-12"
                    required
                  />

                  <Input
                    type={showPassword ? 'text' : 'password'}
                    label="Confirm Password"
                    placeholder="Confirm your password"
                    value={signupData.confirmPassword}
                    onChange={(e) =>
                      setSignupData({
                        ...signupData,
                        confirmPassword: e.target.value,
                      })
                    }
                    error={validSignUpState.error?.confirmPassword}
                    required
                  />
                </>
              )}

              {/* Submit */}
              <button
                type="submit"
                // disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-4 px-6 rounded-xl hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-300 font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
                suppressHydrationWarning
              >
                {/* {loading ? 'Please wait...' : ( */}
                {isLogin ? 'Sign In' : 'Create Account'}
                {/* )} */}
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8" suppressHydrationWarning>
          <p className="text-white/60 text-sm" suppressHydrationWarning>
            © {new Date().getFullYear()} ACE Infoway. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

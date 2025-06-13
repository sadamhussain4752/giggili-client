"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginUserData, VerifyOTPCheck, ForgotPasswordThunk } from "@/reducer/thunks"; // <-- make sure this thunk exists

const Login: React.FC = () => {
  const dispatch = useDispatch<any>();

  const { loginData: loginResponse, loginerror: loginError } = useSelector((state: any) => state.loginData);
  const { otpVerificationResponse: otpVerification } = useSelector((state: any) => state.otpVerificationResponse);
  const { forgotPasswordResponse } = useSelector((state: any) => state.forgotPassword); // <-- add reducer if needed

  const [isMobileLogin, setIsMobileLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [mobilenumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [resetMsg, setResetMsg] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && loginResponse?.userId) {
      localStorage.setItem("tokenId", loginResponse.token);
      let checkid = localStorage.getItem('checkoutid');
      window.location.href = checkid ? `/checkout/${checkid}` : "/";
    }
  }, [loginResponse]);

  useEffect(() => {
    if (loginError?.message === "Invalid credentials" && !loginError.success) {
      setPassword("");
    }
  }, [loginError]);

  useEffect(() => {
    if (otpVerification && otpVerification !== "Invalid OTP") {
      if (otpVerification.UserType === "0") {
        localStorage.setItem("tokenId", otpVerification.token);
        window.location.reload();
        window.location.href = "/";
      }
    }
  }, [otpVerification]);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isMobileLogin) {
      if (!otpSent) {
        if (mobilenumber.length === 10) {
          dispatch(LoginUserData({ mobilenumber })).then(() => setOtpSent(true));
        }
      } else {
        if (otp.length === 4) {
          dispatch(VerifyOTPCheck({ mobilenumber, otp }));
        }
      }
    } else {
      if (email && password) {
        dispatch(LoginUserData({ email, password }));
      }
    }
  };

  const handleForgotPassword = async () => {
    if (forgotEmail) {
      dispatch(ForgotPasswordThunk({ email: forgotEmail }))
        .then(() => {
          setResetMsg("Reset password email sent successfully.");
          setTimeout(() => {
            setResetMsg("");
            setShowForgotPassword(false);
          }, 4000);
        });
    }
  };

  const toggleLoginMode = () => {
    setIsMobileLogin((prev) => !prev);
    setEmail("");
    setMobileNumber("");
    setPassword("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          {showForgotPassword ? "Forgot Password" : isMobileLogin ? "Login with Mobile" : "Sign In"}
        </h2>

        {!showForgotPassword ? (
          <form className="space-y-4" onSubmit={handleLogin}>
            {isMobileLogin ? (
              <>
                <label className="block mb-1 font-medium" htmlFor="mobilenumber">
                  Mobile Number *
                </label>
                <input
                  id="mobilenumber"
                  type="tel"
                  value={mobilenumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="Enter 10-digit mobile number"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  maxLength={10}
                  disabled={otpSent}
                />

                {otpSent && (
                  <div className="mt-4">
                    <label className="block mb-1 font-medium" htmlFor="otp">Enter OTP *</label>
                    <input
                      id="otp"
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="4-digit OTP"
                      maxLength={4}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                )}
              </>
            ) : (
              <>
                <div>
                  <label className="block mb-1 font-medium" htmlFor="email">Username or Email *</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Username or Email"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium" htmlFor="password">Password *</label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </>
            )}

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <input id="remember" type="checkbox" className="mr-2" />
                <label htmlFor="remember">Remember me</label>
              </div>
              <div
                className="text-orange-500 cursor-pointer hover:underline"
                onClick={() => setShowForgotPassword(true)}
              >
                Forgot Password
              </div>
            </div>

            <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition">
              {isMobileLogin ? "Login with Mobile" : "Login Now"}
            </button>

            <div className="text-center text-sm mt-4">
              <div className="text-green-600 cursor-pointer hover:underline" onClick={toggleLoginMode}>
                {isMobileLogin ? "Login with Email" : "Login with Mobile Number"}
              </div>
            </div>

            <div className="text-center text-sm mt-4">
              Don't have an account?{" "}
              <span className="font-semibold cursor-pointer hover:underline text-black">
                <a href="/register">Register</a>
              </span>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <label className="block mb-1 font-medium" htmlFor="forgotEmail">Enter your email</label>
            <input
              id="forgotEmail"
              type="email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              placeholder="Enter registered email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              onClick={handleForgotPassword}
              className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition"
            >
              Send Reset Link
            </button>
            {resetMsg && <p className="text-green-600 text-center">{resetMsg}</p>}

            <div className="text-center text-sm mt-4">
              <div
                className="text-gray-600 cursor-pointer hover:underline"
                onClick={() => setShowForgotPassword(false)}
              >
                Back to Login
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;

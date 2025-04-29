"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginUserData } from "@/reducer/thunks";

const Login: React.FC = () => {
  const dispatch = useDispatch<any>();
  const { loginData: loginResponse, loginerror: loginError } = useSelector((state: any) => state.loginData);

  const [isMobileLogin, setIsMobileLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [mobilenumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Ensure this code only runs in the client-side (browser)
    if (typeof window !== "undefined" && loginResponse?.userId) {
      // localStorage.setItem("userId", loginResponse.userId);
      localStorage.setItem("tokenId", loginResponse.token);

      // Redirect to home page after setting the localStorage
      window.location.href = "/";
    }
  }, [loginResponse]); // This runs when loginResponse changes


  useEffect(() => {
    if (loginError?.message === "Invalid credentials" && !loginError.success) {
      setPassword("");
    }
  }, [loginError]);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isMobileLogin) {
      if (mobilenumber.length === 10 && password) {
        const body = { mobilenumber, password };
        dispatch(LoginUserData(body));
      }
    } else {
      if (email && password) {
        const body = { email, password };
        dispatch(LoginUserData(body));
      }
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
          {isMobileLogin ? "Login with Mobile" : "Sign In"}
        </h2>

        <form className="space-y-4" onSubmit={handleLogin}>
          {isMobileLogin ? (
            <div>
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
              />
            </div>
          ) : (
            <div>
              <label className="block mb-1 font-medium" htmlFor="email">
                Username or Email *
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Username or Email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          )}

          <div>
            <label className="block mb-1 font-medium" htmlFor="password">
              Password *
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <input id="remember" type="checkbox" className="mr-2" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <div className="text-orange-500 cursor-pointer hover:underline">
              Forgot Password
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition"
          >
            {isMobileLogin ? "Login with Mobile" : "Login Now"}
          </button>

          <div className="text-center text-sm mt-4">
            <div
              className="text-green-600 cursor-pointer hover:underline"
              onClick={toggleLoginMode}
            >
              {isMobileLogin ? "Login with Email" : "Login with Mobile Number"}
            </div>
          </div>

          <div className="text-center text-sm mt-4">
            Don't have an account?{" "}
            <span className="font-semibold cursor-pointer hover:underline text-black">
              Register
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

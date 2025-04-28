import React from "react";

const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>

        <form className="space-y-4">
          <div>
            <label className="block mb-1 font-medium" htmlFor="email">
              Username or Email *
            </label>
            <input
              id="email"
              type="email"
              placeholder="Username Or Email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <div className="text-sm text-green-600 mt-1 cursor-pointer hover:underline">
              Login with OTP
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium" htmlFor="password">
              Password *
            </label>
            <input
              id="password"
              type="password"
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
            Login Now
          </button>

          <div className="text-center text-sm mt-4">
            Do not have Account?{" "}
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

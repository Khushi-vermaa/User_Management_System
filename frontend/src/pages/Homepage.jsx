// src/pages/Home.jsx
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-100 flex flex-col">
      <nav className="flex justify-between items-center p-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-blue-600">
          Systrome Networks Pvt. Ltd
        </h1>
        <div className="space-x-4">
          <Link to="/login">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
              Sign In
            </button>
          </Link>
          <Link to="/register">
            <button className="border border-blue-500 text-blue-500 hover:bg-blue-100 px-4 py-2 rounded">
              Sign Up
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex flex-col justify-center items-center flex-grow text-center px-4">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
          Welcome to Systrome Networks Pvt. Ltd
        </h2>
        <p className="text-gray-600 max-w-xl text-lg mb-8">
          We provide reliable, scalable, and modern IT solutions. Build your
          digital future with us — websites, apps, and beyond.
        </p>
        <Link to="/register">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg rounded-lg shadow">
            Get Started
          </button>
        </Link>
      </main>

      {/* Footer */}
      <footer className="bg-white text-center py-4 shadow-inner text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Systrome Networks Pvt. Ltd
      </footer>
    </div>
  );
}

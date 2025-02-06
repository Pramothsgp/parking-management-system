import { Link } from "react-router-dom";
import { FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";

function Header() {
  const [theme, setTheme] = useState("light");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.add(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-bold text-blue-600 dark:text-blue-400"
          >
            ParkEase
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/home" className="nav-link">
              Home
            </Link>
            <Link to="/home/my-slots" className="nav-link">
              My Slots
            </Link>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/signup" className="nav-link">
              Sign Up
            </Link>

            {/* <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {theme === "light" ? (
                <FaSun className="text-yellow-400" />
              ) : (
                <FaMoon className="text-gray-600" />
              )}
            </button> */}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FaBars className="text-xl text-gray-700 dark:text-white" />
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg transform ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out md:hidden`}
        >
          <button
            className="absolute top-5 right-5 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => setMenuOpen(false)}
          >
            <FaTimes className="text-xl text-gray-700 dark:text-white" />
          </button>

          <nav className="flex flex-col mt-16 space-y-6 text-center">
            <Link to="/home" className="nav-link" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
            <Link to="/home/my-slots" className="nav-link" onClick={() => setMenuOpen(false)}>
              My Slots
            </Link>
            <Link to="/login" className="nav-link" onClick={() => setMenuOpen(false)}>
              Login
            </Link>
            <Link to="/signup" className="nav-link" onClick={() => setMenuOpen(false)}>
              Sign Up
            </Link>

            {/* <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 mx-auto"
            >
              {theme === "light" ? (
                <FaSun className="text-yellow-400" />
              ) : (
                <FaMoon className="text-gray-600" />
              )}
            </button> */}
          </nav>
        </div>
      </nav>
    </header>
  );
}

export default Header;

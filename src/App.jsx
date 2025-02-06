import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import MySlots from "./pages/MySlots";

function App() {
  useEffect(() => {
    if (!localStorage.getItem("theme")) {
      const theme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      localStorage.setItem("theme", theme);
      document.documentElement.classList.add(theme);
      return;
    }
    const theme = localStorage.getItem("theme");
    if ((theme === "dark" || theme === "light") && theme) {
      document.documentElement.classList.add(theme);
    }
  }, []);

  const NestedRoute = () => {
    return (
      <div>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/my-slots" element={<MySlots />} />
        </Routes>
       </div>
    );
  };
  return (
    <BrowserRouter>
    <div className={`min-h-screen  bg-gray-500 dark:bg-gray-900`}>
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Navigate to={"/login"} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home/*" element={<NestedRoute />} />
        </Routes>
      </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

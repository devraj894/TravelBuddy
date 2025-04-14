import React, { useEffect, useState, useContext } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { ToggleThemeContext } from "../providers/ThemeToggleContextProvider";

const ThemeToggle = () => {
  const {darkMode, setDarkMode} = useContext(ToggleThemeContext);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full transition-all"
    >
      {darkMode ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-gray-700" />}
    </button>
  );
};

export default ThemeToggle;

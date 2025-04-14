import React, { createContext, useState, useEffect } from 'react'

export const ToggleThemeContext = createContext();

const ThemeToggleContextProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("theme") === "dark"
    );

    useEffect(() => {
        const theme = darkMode ? "dark" : "light";
        document.documentElement.classList.add(theme);
        document.documentElement.classList.remove(darkMode ? "light" : "dark");
        localStorage.setItem("theme", theme);
    }, [darkMode]);

    return (
        <ToggleThemeContext.Provider value={{ darkMode, setDarkMode }}>
            {children}
        </ToggleThemeContext.Provider>
    )
}

export default ThemeToggleContextProvider
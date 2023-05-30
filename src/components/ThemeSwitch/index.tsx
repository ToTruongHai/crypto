"use client";
import { useEffect, useState } from "react";

export const ThemeSwitch = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check if dark mode is enabled in the user's system preferences
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setIsDarkMode(prefersDarkMode);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`theme-switch ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <label htmlFor="theme-toggle" className="cursor-pointer">
        <input
          id="theme-toggle"
          type="checkbox"
          checked={isDarkMode}
          onChange={toggleTheme}
          className="hidden"
        />
        {isDarkMode ? "Dark Mode" : "Light Mode"}
      </label>
    </div>
  );
};

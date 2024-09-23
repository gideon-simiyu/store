import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

const useColorMode = () => {
  const getPreferredScheme = () => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    return mediaQuery.matches ? "dark" : "light";
  };

  const [colorMode, setColorMode] = useLocalStorage<"dark" | "light">(
    "color-theme",
    getPreferredScheme(),
  );
  
  const updateAutofillStyles = (isDarkMode: boolean) => {
    const style = document.createElement("style");
    style.innerHTML = `
      input:-webkit-autofill,
      input:-webkit-autofill:hover,
      input:-webkit-autofill:focus,
      textarea:-webkit-autofill,
      textarea:-webkit-autofill:hover,
      textarea:-webkit-autofill:focus,
      select:-webkit-autofill,
      select:-webkit-autofill:hover,
      select:-webkit-autofill:focus {
          border: 1px solid #253341;
          -webkit-text-fill-color: ${isDarkMode ? "white" : "black"};
          -webkit-box-shadow: 0 0 0px 1000px #253341 inset;
          box-shadow: 0 0 0px 1000px transparent inset;
          transition: background-color 5000s ease-in-out 0s;
          color: ${isDarkMode ? "white" : "black"};
      }
    `;
    document.head.appendChild(style);
  };

  useEffect(() => {
    const className = "dark";
    const bodyClass = document.documentElement.classList;

    colorMode === "dark"
      ? bodyClass.add(className)
      : bodyClass.remove(className);
      
    colorMode === "dark"
      ? updateAutofillStyles(true)
      : updateAutofillStyles(false);
  }, [colorMode]);

  return [colorMode, setColorMode];
};

export default useColorMode;

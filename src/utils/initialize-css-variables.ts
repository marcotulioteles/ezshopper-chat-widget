/**
 * Initializes global CSS variables.
 * @param primaryColor - The value for the primary color CSS variable.
 */
export const initializeCSSVariables = (primaryColor: string) => {
    document.documentElement.style.setProperty("--primary-color", primaryColor);
};
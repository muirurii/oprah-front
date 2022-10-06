/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,jsx}",
        "./components/**/*.{js,jsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                main: [" Poppins, BlinkMacSystemFont, Segoe UI, Roboto,sans-serif;"]
            },
            colors: {
                secondary: " rgb(90, 225, 200)",
            }
        },
    },
    plugins: [],
}
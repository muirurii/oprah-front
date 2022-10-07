/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,jsx}",
        "./components/**/*.{js,jsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                main: [" Poppins,sans-serif;"],
                sec: ["Comforter Brush", "serif"]
            },
            colors: {
                secondary: " #fa0036",
            }
        },
    },
    plugins: [],
}
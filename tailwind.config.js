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
                secondary: ["Comforter Brush", "serif"],
                sec: ["Allura", "cursive"]
            },
            colors: {
                secondary: " #fa0036",
            },
            translate: {
                hideMenu: "calc(100% + 70px)",
            },
            height: {
                loader: "calc(100vh - 100px)",
                screenLessHeader: "calc(100vh - 70px)",
            }
        },
    },
    plugins: [
        require("@tailwindcss/typography")
    ],
}
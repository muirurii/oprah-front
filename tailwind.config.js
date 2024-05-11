/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,jsx}",
        "./components/**/*.{js,jsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                main: ["Teachers", "sans-serif"],
                sec: ["Quicksand", "cursive"]
            },
            colors: {
                secondary: "#fa0036",
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
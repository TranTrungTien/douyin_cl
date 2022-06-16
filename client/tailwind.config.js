module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dark_blue: "#060716",
        light_blue: "#161722",
        fresh_red: "#fe2c55",
        red_hover: "#f22a51",
        bright_blue: "#00faf0",
        darkslategray: "#292b35",
        darkslategray2: "#47454e",
        darkslategray3: "#2e2f3b",
        dimgray: "#54575c",
        gray_button: "#323442",
        badge_yellow: "#face15",
        badge_orange: "#ff9113",
        badge_red: "#f01b5b",
      },
      lineHeight: {
        "24px": "24px",
        "22px": "22px",
        "36px": "36px",
      },
      width: {
        "36px": "36px",
        "62px": "62px",

        "88px": "88px",
        "246px": "246px",
        "132px": "132px",
      },
      height: {
        "36px": "36px",
        "62px": "62px",
        "176px": "176px",
        "328px": "328px",
      },
      maxWidth: {
        "172px": "172px",
      },
      padding: {
        "30px": "30px",
        "22px": "22px",
      },
      overflow: {
        overlay: "overlay",
      },
      animation: {
        scaleUpAndDown: "scaleUpDown 0.3s linear",
      },
      keyframes: {
        scaleUpDown: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.09)" },
        },
      },
    },
  },
  variants: {
    extend: {
      display: ["group-hover"],
    },
  },
  plugins: [],
};

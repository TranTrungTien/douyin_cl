module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        laptop: "1024px",
        desktop: "1280px",
        "extra-desktop": "1440px",
        "over-desktop": "1600px",
      },
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
        message_item_animated: "translateMessage 2s ease-in-out",
      },
      keyframes: {
        scaleUpDown: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.09)" },
        },
        translateForward: {
          "0%": {
            transform: "translateX(0%)",
          },
          "10%": {
            transform: "translateX(-110%)",
          },
          "100%": {
            transform: "translateX(-110%)",
          },
        },
        translateForwardAndBack: {
          "0%": {
            transform: "translateX(0%)",
          },
          "10%": {
            transform: "translateX(-110%)",
          },
          "70%": {
            transform: "translateX(-110%)",
          },
          "100%": {
            transform: "translateX(0%)",
          },
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

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: "Inter",
        serif: "Orbitron"
        
      },
       lineClamp: {
                     4: ['line-clamp-4', '-webkit-line-clamp: 4'],
                 },
    animation: {
        'bounceSlow': 'bounce 7s linear infinite ',
      },
      keyframes: {
        bounce: {
          '0%, 100%': {
            transform: 'translateY(-10%)',
            animationTimingFunction: 'cubic-bezier(1.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateY(-7%)',
            animationTimingFunction: 'cubic-bezier(1, 0, 1.2, 1)',
          },
        },
      },

      boxShadow: {
        shape:
          "0px 8px 8px rgba(0, 0, 0, 0.1), 0px 4px 4px rgba(0, 0, 0, 0.1), 0px 2px 2px rgba(0, 0, 0, 0.1), 0px 0px 0px 1px rgba(0, 0, 0, 0.1), inset 0px 0px 0px 1px rgba(255, 255, 255, 0.03), inset 0px 1px 0px rgba(255, 255, 255, 0.03)",
      }, 
      backgroundImage: {
        'custom-radial': 'radial-gradient(50% 50% at 50% 50%, #18181b 27.6%, #09090b 100%)',
        'image': "url('/src/img/sombratop.svg'), url('/src/img/bordatop.svg')",
        'imageBottom': "url('/src/img/sombrabottom.svg'), url('/src/img/bordabottom.svg')"
      },
     },
  },
  plugins: [],
};

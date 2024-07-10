"use client"
import * as React from "react"
import {motion} from "framer-motion"

const SvgComponent = ({cName}) => (
  <svg viewBox="0 0 144 393" fill="none" xmlns="http://www.w3.org/2000/svg" className={cName}>
    <path
      d="M14.5 0.5V242.5H143V392.5"
      stroke="#ADA8AE"
      strokeWidth={2}
      strokeLinejoin="round"
      strokeDasharray="8 12"
    />
    <motion.g id="circle"
        animate={{y:[0, -200, 0]} }
        transition={{
            times: [0,1],
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
        }}>
            <circle
              cx={15}
              cy={15}
              r={15}
              transform="matrix(-1 0 0 1 30 227)"
              fill="#F0DAC5"
            />
            <circle
              cx={8}
              cy={8}
              r={8}
              transform="matrix(-1 0 0 1 23 234)"
              fill="#FFAA5A"
            />
      </motion.g>
  </svg>
)

export default SvgComponent

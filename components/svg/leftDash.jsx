"use client"
import * as React from "react"
import {motion} from "framer-motion"

const SvgComponent = ({cName}) => (
  <svg viewBox="0 0 163 182" fill="none" xmlns="http://www.w3.org/2000/svg" className={cName}>
    <g id="Homepage">
      <g id="Left dashed line">
        <path
          id="dashed line"
          d="M-1.5 15.5H162V181.5"
          strokeWidth={2}
          stroke="#ADA8AE"
          strokeDasharray="8 12"
        />
        <motion.g id="circle"
        animate={{x:[0, 60, 0]} }
        transition={{
            times: [0,1],
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
        }}>
          
          <g id="Circle">
            <circle
              id="Ellipse 5"
              cx={15}
              cy={15}
              r={15}
              transform="matrix(-1 0 0 1 95 0)"
              fill="#A788B7"
            />
            <circle
              id="Ellipse 4"
              cx={8}
              cy={8}
              r={8}
              transform="matrix(-1 0 0 1 88 7)"
              fill="#543763"
            />
          </g>
        </motion.g>
      </g>
    </g>
  </svg>
)
export default SvgComponent

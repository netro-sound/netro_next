import * as React from "react";
import { classNames } from "@/utils";
import { className } from "postcss-selector-parser";

type Props = {
  className?: string
}
const NetroSoundLogo = ({ className }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 3010.29 1257.8"
    className={classNames(className)}
  >
    <defs>
      <style>
        {
          ".cls-2{fill:#f28c18}.cls-3{fill:none;stroke:#f28c18;stroke-miterlimit:10;stroke-width:30px}"
        }
      </style>
    </defs>
    <g id="Layer_2" data-name="Layer 2">
      <g id="Layer_1-2" data-name="Layer 1">
        <path
          d="M138.64 1138.72C62.19 1138.72 0 1076.5 0 1000V256.94c0-76.47 62.19-138.69 138.64-138.69a137.48 137.48 0 0 1 61.74 14.59l746.5 371.55c46.6 22.71 77.29 72.24 76.85 124.09.43 51.85-30.24 101.39-76.85 124.1-38.5 10.07-778.11 407.57-808.24 386.14Z"
          style={{
            fill: "#fff"
          }}
        />
        <path
          className="cls-2"
          d="M138.64 219.1a37.4 37.4 0 0 1 16.81 4l746.49 371.57a37.77 37.77 0 0 1 0 67.63l-746.49 371.54a37.65 37.65 0 0 1-54.6-33.82V256.94a37.85 37.85 0 0 1 37.79-37.84m0-30a67.89 67.89 0 0 0-67.79 67.84V1000a67.9 67.9 0 0 0 67.79 67.85 67.1 67.1 0 0 0 30.18-7.18l746.49-371.52a67.77 67.77 0 0 0 0-121.34L168.82 196.27a67.22 67.22 0 0 0-30.18-7.17Z"
        />
        <path
          className="cls-3"
          d="m86.44 783.34 566.09 10.89M86.44 465.96l848.08 162M116.2 208.29l537.75 587.35M560.43 405.26 86.44 787.14"
        />
        <path
          className="cls-2"
          d="M119.41 173.25a40 40 0 1 0 40 40 40 40 0 0 0-40-40ZM550.41 374.25a40 40 0 1 0 40 40 40 40 0 0 0-40-40ZM412.41 485.25a40 40 0 1 0 40 40 40 40 0 0 0-40-40ZM647.41 756.25a40 40 0 1 0 40 40 40 40 0 0 0-40-40ZM89.41 431.25a40 40 0 1 0 40 40 40 40 0 0 0-40-40ZM94.41 732.25a40 40 0 1 0 40 40 40 40 0 0 0-40-40ZM927.41 583.25a40 40 0 1 0 40 40 40 40 0 0 0-40-40Z"
        />
        <text
          transform="translate(1139.23 649.8)"
          style={{
            letterSpacing: "-.05em",
            fontSize: "764.02px",
            fontFamily: "Mograch-Regular,Mograch",
            fill: "#f28c18"
          }}
        >
          {"net"}
          <tspan
            x={948.14}
            y={0}
            style={{
              letterSpacing: "-.07em"
            }}
          >
            {"r"}
          </tspan>
          <tspan
            x={1157.48}
            y={0}
            style={{
              letterSpacing: "-.05em"
            }}
          >
            {"o"}
          </tspan>
          <tspan
            style={{
              letterSpacing: "-.06em"
            }}
          >
            <tspan x={0} y={417}>
              {"s"}
            </tspan>
            <tspan
              x={316.3}
              y={417}
              style={{
                letterSpacing: "-.05em"
              }}
            >
              {"ound"}
            </tspan>
          </tspan>
        </text>
      </g>
    </g>
  </svg>
);

export default NetroSoundLogo;

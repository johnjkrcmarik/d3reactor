import React, { useMemo } from "react"
import * as d3 from "d3"
import { useD3 } from "../hooks/useD3"
import { AxisProps } from "../../types"
import { getAxisLabelCoordinates } from "../utils"

const Axis = ({
  x,
  y,
  scale,
  type,
  label,
  width,
  height,
  margin,
  xGrid,
  yGrid,
}: AxisProps): JSX.Element => {
  const gRef = useD3(
    (anchor) => {
      let axis: d3.Axis<d3.NumberValue>

      switch (type) {
        case "bottom":
          axis = d3.axisBottom(scale).tickPadding(10)
          break
        case "top":
          axis = d3.axisTop(scale)
          break
        case "left":
          axis = d3.axisLeft(scale)
          break
        case "right":
          axis = d3.axisRight(scale)
          break
        default:
          axis = d3.axisRight(scale)
          break
      }

      anchor.call(axis)
    },
    [type, scale]
  )

  const { axisLabelX, axisLabelY, rotate } = useMemo(
    () => getAxisLabelCoordinates(x, y, height, width, margin, type),
    [x, y, width, height, margin, type]
  )

  let grid: JSX.Element[] = []
  switch (true) {
    case type === "bottom" && (xGrid || yGrid):
      grid = scale
        .ticks()
        .map((tick, i) => (
          <line
            key={i}
            x1={scale(tick)}
            x2={scale(tick)}
            y1={0}
            y2={-height + margin.bottom + margin.top}
            strokeDasharray={5}
            strokeOpacity="0.3"
            strokeWidth="0,3"
            stroke="currentColor"
          ></line>
        ))
      break
    case type === "top" && (xGrid || yGrid):
      grid = scale
        .ticks()
        .map((tick, i) => (
          <line
            key={i}
            x1={scale(tick)}
            x2={scale(tick)}
            y1={margin.bottom}
            y2={height - margin.bottom - margin.top}
            strokeDasharray={5}
            strokeOpacity="0.3"
            strokeWidth="0,3"
            stroke="currentColor"
          ></line>
        ))
      break
    case type === "left" && (xGrid || yGrid):
      grid = scale
        .ticks()
        .map((tick, i) => (
          <line
            key={i}
            x1={0}
            x2={width - margin.right - margin.left}
            y1={scale(tick)}
            y2={scale(tick)}
            strokeDasharray={5}
            strokeOpacity="0.3"
            strokeWidth="0,3"
            stroke="currentColor"
          ></line>
        ))
      break
    case type === "right" && (xGrid || yGrid):
      grid = scale
        .ticks()
        .map((tick, i) => (
          <line
            key={i}
            x1={0}
            x2={-(width - margin.right - margin.left)}
            y1={scale(tick)}
            y2={scale(tick)}
            strokeDasharray={5}
            strokeOpacity="0.3"
            strokeWidth="0,3"
            stroke="currentColor"
          ></line>
        ))
      break
  }

  return (
    <g>
      <g ref={gRef} transform={`translate(${x}, ${y})`}>
        {grid}
      </g>
      <text
        transform={`translate(${axisLabelX}, ${axisLabelY}) rotate(${rotate})`}
        textAnchor="middle"
      >
        {label}
      </text>
      ;
    </g>
  )
}

export default Axis

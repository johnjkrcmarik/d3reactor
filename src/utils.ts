import { Margin } from "../types"

export function getXAxisCoordinates(
  xAxis: "top" | "bottom" | false = "bottom",
  height: number,
  margin: Margin
) {
  let xAxisX: number = 0
  let xAxisY: number = height - margin.top - margin.bottom

  if (xAxis === "top") xAxisY = 0

  return {
    xAxisX,
    xAxisY,
  }
}

export function getYAxisCoordinates(
  yAxis: "left" | "right" | false = "left",
  width: number,
  margin: Margin
) {
  let yAxisX: number = 0
  let yAxisY: number = 0

  if (yAxis === "right") yAxisX = width - margin.left - margin.right

  return {
    yAxisX,
    yAxisY,
  }
}

export function getMargins(
  xAxis: "top" | "bottom" | false = "bottom",
  yAxis: "left" | "right" | false = "left",
  xAxisLabel: string | undefined,
  yAxisLabel: string | undefined
) {
  let left = 8,
    right = 8,
    top = 8,
    bottom = 8

  function addVerticalMargin() {
    switch (xAxis) {
      case "top":
        top += 40
        break
      case "bottom":
        bottom += 40
    }
  }

  function addHorizontalMargin() {
    switch (yAxis) {
      case "left":
        left += 40
        break
      case "right":
        right += 40
    }
  }

  if (xAxis) addVerticalMargin()
  if (xAxis && xAxisLabel) addVerticalMargin()
  if (yAxis) addHorizontalMargin()
  if (yAxis && yAxisLabel) addHorizontalMargin()

  return { left, right, top, bottom }
}

export function getAxisLabelCoordinates(
  x: number,
  y: number,
  height: number,
  width: number,
  margin: Margin,
  type: string
) {
  let rotate = 0
  let axisLabelX: number = 0
  let axisLabelY: number = 0
  let labelMargin: number = 40
  switch (type) {
    case "top":
      axisLabelX = width / 2 - margin.left / 2 - margin.right / 2
      axisLabelY = y - labelMargin
      rotate = 0
      break
    case "right":
      axisLabelX = x + labelMargin
      axisLabelY = (height - margin.top - margin.bottom) / 2
      rotate = 90
      break
    case "bottom":
      axisLabelX = width / 2 - margin.left / 2 - margin.right / 2
      axisLabelY = y + labelMargin
      rotate = 0
      break
    case "left":
      axisLabelX = -labelMargin
      axisLabelY = (height - margin.top - margin.bottom) / 2
      rotate = -90
      break
  }
  return {
    axisLabelX,
    axisLabelY,
    rotate,
  }
}



//############Area Chart Utils###############\\

interface CountryDataProps {
  key: string,
  values: Array<Array<number>>
}

interface CorrectedCountryDataProps {
  key: string,
  values: Array<Array<number>>
}

export function findYDomainMax(data: any, keyArr: string[]) {
  let yDomainMax = 0;
  data.forEach((obj: any) => {
    let stackedHeight = 0;
    for (const key of keyArr) {
      stackedHeight += obj[key];
      if (stackedHeight > yDomainMax) yDomainMax = stackedHeight;
    }
  });
  return yDomainMax;
}

interface CountryDataProps {
  key: string,
  values: Array<Array<number>>
}

export function transformCountryData(arr: CountryDataProps[]) {
  const transformed = [];
  for (let i = 0; i < arr[0].values.length; i++) {
    const entry: any = { // TODO: get rid of any?
      date: arr[0].values[i][0] 
    };
    for (let j = 0; j < arr.length; j++) {
      entry[arr[j].key] = arr[j].values[i][1];
    }
    transformed.push(entry);
  }
  return transformed;
}
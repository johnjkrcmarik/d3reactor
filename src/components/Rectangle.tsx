import React from 'react';
import { RectangleProps } from '../../types';

// eslint-disable-next-line @typescript-eslint/no-var-requires
import '../charts/BarChart/BarChart.css';

export const Rectangle = React.memo(
  ({
    data,
    dataTestId = 'rectangle',
    x,
    y,
    width,
    height,
    fill,
    setTooltip,
  }: RectangleProps): JSX.Element => {
    let cellCenter = {
      cx: 0,
      cy: 0,
      tooltipData: data,
    };

    const mouseOver = (e: any) => {
      if (setTooltip) {
        cellCenter = {
          cx: e.pageX - e.nativeEvent.offsetX + (x ?? 0),
          cy: e.pageY - e.nativeEvent.offsetY + (y ?? 0),
          tooltipData: data,
        };
        setTooltip(cellCenter);
      }
    };

    const mouseOut = (e: any) => {
      if (setTooltip) {
        setTooltip ? setTooltip(false) : null;
      }
    };

    return (
      <rect
        className="bar"
        data-testid={dataTestId}
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fill}
        onMouseOver={(e) => mouseOver(e)}
        onMouseOut={(e) => mouseOut(e)}
      />
    );
  }
);

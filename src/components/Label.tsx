import React, { useMemo } from 'react';
import { getAxisLabelCoordinates } from '../utils';
import { Margin } from '../../types';

import styled from 'styled-components';

export function Label({
  dataTestId = 'label',
  x,
  y,
  height,
  width,
  margin,
  type,
  axis,
  label,
  tickMargin,
}: {
  dataTestId?: string;
  x: number;
  y: number;
  height: number;
  width: number;
  margin: Margin;
  type: string;
  axis: boolean;
  label: string;
  tickMargin?: number;
}): JSX.Element {
  const AxisLabel = styled.text`
    font-size: 22px;
  `;

  const { axisLabelX, axisLabelY, rotate } = useMemo(
    () =>
      getAxisLabelCoordinates(
        x,
        y,
        height,
        width,
        margin,
        type,
        axis,
        tickMargin
      ),
    [x, y, width, height, margin, type, axis, tickMargin]
  );
  return (
    <AxisLabel
      data-testid={dataTestId}
      transform={`translate(${axisLabelX}, ${axisLabelY}) rotate(${rotate})`}
      textAnchor="middle"
    >
      {label}
    </AxisLabel>
  );
}

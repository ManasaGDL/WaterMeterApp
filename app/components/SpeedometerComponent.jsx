import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle, Line, G } from 'react-native-svg';
import * as d3 from 'd3-shape';

const SpeedometerComponent = ({ value = 150, max = 200 }) => {
  const size = 200; // Diameter of the gauge
  const strokeWidth = 10;
  const center = size / 2;
  const radius = center - strokeWidth;
  const angle = (value / max) * 180; // Converts value to degrees for the needle

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size / 2}>
        {/* Draw the gauge background */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#d3d3d3"
          strokeWidth={strokeWidth}
          startAngle={-90}
          endAngle={90}
          strokeDasharray={[Math.PI * radius, Math.PI * radius]}
          strokeLinecap="round"
          transform={`translate(0, ${center}) rotate(-90)`}
        />
        {/* Draw the gauge progress */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#ff0000"
          strokeWidth={strokeWidth}
          startAngle={-90}
          endAngle={angle - 90}
          strokeDasharray={[Math.PI * radius, Math.PI * radius]}
          strokeLinecap="round"
          transform={`translate(0, ${center}) rotate(-90)`}
        />
        {/* Draw the needle */}
        <Line
          x1={center}
          y1={center}
          x2={center}
          y2={strokeWidth}
          stroke="black"
          strokeWidth={2}
          transform={`rotate(${angle - 90}, ${center}, ${center})`}
        />
      </Svg>
      <Text style={{ fontSize: 24, marginTop: 10 }}>{value}</Text>
    </View>
  );
};

export default SpeedometerComponent;

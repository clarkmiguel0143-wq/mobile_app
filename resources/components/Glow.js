import Svg, { Defs, RadialGradient, Stop, Rect } from 'react-native-svg';

export default function Glow({ size, color, opacity = 0.55, style }) {
  const id = `glow${color.replace('#', '')}`;

  return (
    <Svg
      width={size}
      height={size}
      pointerEvents="none"
      style={[{ position: 'absolute' }, style]}
    >
      <Defs>
        <RadialGradient id={id} cx="50%" cy="50%" r="50%">
          <Stop offset="0" stopColor={color} stopOpacity={opacity} />
          <Stop offset="0.55" stopColor={color} stopOpacity={opacity * 0.45} />
          <Stop offset="1" stopColor={color} stopOpacity={0} />
        </RadialGradient>
      </Defs>
      <Rect width={size} height={size} fill={`url(#${id})`} />
    </Svg>
  );
}

import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

export default function FadeIn({ children, style }) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    });

    animation.start();

    return () => animation.stop();
  }, [opacity]);

  return (
    <Animated.View style={[style, { opacity }]}>
      {children}
    </Animated.View>
  );
}
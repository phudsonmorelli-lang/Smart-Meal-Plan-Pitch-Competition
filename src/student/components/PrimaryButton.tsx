import React from 'react';
import { Pressable, Text, ViewStyle } from 'react-native';
import { colors } from '../../theme/colors';

export default function PrimaryButton({
  title,
  onPress,
  variant = 'solid',
  style
}: {
  title: string;
  onPress: () => void;
  variant?: 'solid' | 'light' | 'soft';
  style?: ViewStyle;
}) {
  const solid = variant === 'solid';
  const soft = variant === 'soft';
  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: solid ? colors.forest : soft ? colors.softGreen : colors.paper,
        paddingVertical: 15,
        paddingHorizontal: 18,
        borderRadius: 18,
        alignItems: 'center',
        borderWidth: solid ? 0 : 1,
        borderColor: solid ? 'transparent' : soft ? '#D9E3D2' : colors.border,
        ...style
      }}
    >
      <Text
        style={{
          color: solid ? 'white' : soft ? colors.softGreenText : colors.text,
          fontWeight: '900',
          fontSize: 16
        }}
      >
        {title}
      </Text>
    </Pressable>
  );
}

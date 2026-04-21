import React from 'react';
import { Pressable, Text, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

export default function PrimaryButton({
  title,
  onPress,
  variant = 'solid',
  style,
  icon
}: {
  title: string;
  onPress: () => void;
  variant?: 'solid' | 'light' | 'soft';
  style?: ViewStyle;
  icon?: keyof typeof Ionicons.glyphMap;
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
        justifyContent: 'center',
        flexDirection: 'row',
        borderWidth: solid ? 0 : 1,
        borderColor: solid ? 'transparent' : soft ? '#D9E3D2' : colors.border,
        ...style
      }}
    >
      {icon ? <Ionicons name={icon} size={18} color={solid ? 'white' : soft ? colors.softGreenText : colors.text} style={{ marginRight: 8 }} /> : null}
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

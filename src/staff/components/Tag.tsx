import React from 'react';
import { Text, View } from 'react-native';
import { colors } from '../../theme/colors';

type Variant = 'default' | 'highlight' | 'soft';

export default function Tag({
  label,
  variant = 'default'
}: {
  label: string;
  variant?: Variant;
}) {
  const backgroundColor =
    variant === 'highlight' ? '#F4EEDF' : variant === 'soft' ? colors.softGreen : colors.chip;
  const color =
    variant === 'highlight' ? '#6C5B2A' : variant === 'soft' ? colors.softGreenText : colors.chipText;

  return (
    <View
      style={{
        backgroundColor,
        paddingHorizontal: 11,
        paddingVertical: 7,
        borderRadius: 999,
        marginRight: 8,
        marginBottom: 8,
        borderWidth: variant === 'highlight' ? 1 : 0,
        borderColor: variant === 'highlight' ? '#E4D4A8' : 'transparent'
      }}
    >
      <Text style={{ color, fontSize: 12, fontWeight: '800' }}>{label}</Text>
    </View>
  );
}

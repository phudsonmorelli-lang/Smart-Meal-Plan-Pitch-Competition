import React from 'react';
import { Text, View } from 'react-native';
import { colors } from '../../theme/colors';

export default function MetricCard({
  label,
  value,
  subvalue,
  progress
}: {
  label: string;
  value: string;
  subvalue: string;
  progress: number;
}) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.paper,
        borderRadius: 22,
        borderWidth: 1,
        borderColor: colors.border,
        padding: 16,
        marginRight: 12
      }}
    >
      <Text style={{ color: colors.text, fontSize: 18, fontWeight: '900' }}>{label}</Text>
      <Text style={{ color: colors.forestDark, fontWeight: '900', marginTop: 12, fontSize: 16 }}>{value}</Text>
      <View
        style={{
          height: 10,
          borderRadius: 999,
          backgroundColor: '#D9D4CA',
          overflow: 'hidden',
          marginTop: 16
        }}
      >
        <View
          style={{
            width: `${Math.max(6, Math.min(progress * 100, 100))}%`,
            height: '100%',
            backgroundColor: label === 'Water' ? colors.forestDark : '#5A8D3B',
            borderRadius: 999
          }}
        />
      </View>
      <Text style={{ color: colors.textSoft, marginTop: 10, fontWeight: '700' }}>{subvalue}</Text>
    </View>
  );
}

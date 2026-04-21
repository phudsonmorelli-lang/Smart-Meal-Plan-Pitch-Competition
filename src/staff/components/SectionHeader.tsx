import React from 'react';
import { Text, View } from 'react-native';
import { colors } from '../../theme/colors';

export default function SectionHeader({ title, subtitle, actionLabel }: { title: string; subtitle?: string; actionLabel?: string }) {
  return (
    <View style={{ marginBottom: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
      <View style={{ flex: 1, paddingRight: 12 }}>
        <Text style={{ color: colors.text, fontSize: 22, fontWeight: '900' }}>{title}</Text>
        {subtitle ? <Text style={{ color: colors.textSoft, marginTop: 4 }}>{subtitle}</Text> : null}
      </View>
      {actionLabel ? <Text style={{ color: colors.forestLight, fontWeight: '800' }}>{actionLabel}</Text> : null}
    </View>
  );
}

import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { colors } from '../../theme/colors';

export default function MetricCard({
  label,
  value,
  subtitle,
  tone = 'paper',
  icon
}: {
  label: string;
  value: string;
  subtitle: string;
  tone?: 'forest' | 'lime' | 'gold' | 'paper' | 'lavender';
  icon?: keyof typeof Ionicons.glyphMap;
}) {
  const palette = {
    forest: { bg: colors.forest, fg: 'white', sub: 'rgba(255,255,255,0.9)' },
    lime: { bg: colors.limeCard, fg: 'white', sub: 'rgba(255,255,255,0.95)' },
    gold: { bg: colors.goldCard, fg: 'white', sub: 'rgba(255,255,255,0.95)' },
    paper: { bg: colors.paper, fg: colors.forestDark, sub: colors.textSoft },
    lavender: { bg: colors.lavenderCard, fg: colors.forestDark, sub: colors.textSoft }
  }[tone];

  return (
    <View
      style={{
        backgroundColor: palette.bg,
        borderRadius: 22,
        borderWidth: tone === 'paper' || tone === 'lavender' ? 1 : 0,
        borderColor: colors.border,
        padding: 18,
        flex: 1,
        minWidth: 150,
        marginBottom: 12,
        minHeight: 120,
        justifyContent: 'space-between'
      }}
    >
      <View>
        <Text style={{ color: palette.sub, fontSize: 12, fontWeight: '800' }}>{label}</Text>
        <Text style={{ color: palette.fg, fontSize: 28, fontWeight: '900', marginTop: 8 }}>{value}</Text>
        <Text style={{ color: palette.sub, marginTop: 4, fontWeight: '600' }}>{subtitle}</Text>
      </View>
      {icon ? <Ionicons name={icon} size={20} color={palette.sub} /> : null}
    </View>
  );
}

import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';
import { colors } from '../../theme/colors';

export default function QuickActionCard({
  icon,
  label,
  subtitle,
  onPress
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  subtitle: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
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
      <Ionicons name={icon} size={26} color={colors.forestDark} />
      <Text style={{ fontSize: 17, color: colors.text, fontWeight: '900', marginTop: 10 }}>{label}</Text>
      <Text style={{ color: colors.textSoft, marginTop: 4 }}>{subtitle}</Text>
    </Pressable>
  );
}

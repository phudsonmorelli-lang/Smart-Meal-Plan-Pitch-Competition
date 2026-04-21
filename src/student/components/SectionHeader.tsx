import React from 'react';
import { Text, View, Pressable } from 'react-native';
import { colors, displayFont } from '../../theme/colors';

export default function SectionHeader({
  title,
  action,
  onActionPress
}: {
  title: string;
  action?: string;
  onActionPress?: () => void;
}) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
      <Text style={{ fontSize: 28, color: colors.forestDark, fontFamily: displayFont, fontWeight: '700' }}>{title}</Text>
      {action ? (
        <Pressable onPress={onActionPress}>
          <Text style={{ color: colors.text, fontWeight: '800' }}>{action}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

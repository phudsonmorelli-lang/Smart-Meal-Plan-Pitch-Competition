import React from 'react';
import { Image, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { Meal } from '../types';
import Tag from './Tag';

export default function ResultRow({
  meal,
  votes,
  share,
  insight
}: {
  meal: Meal;
  votes: number;
  share: number;
  insight?: 'top' | 'rising' | 'low';
}) {
  const insightMeta =
    insight === 'top'
      ? { label: 'Top pick', variant: 'soft' as const }
      : insight === 'rising'
      ? { label: 'Rising', variant: 'highlight' as const }
      : insight === 'low'
      ? { label: 'Low demand', variant: 'soft' as const }
      : null;

  return (
    <View
      style={{
        backgroundColor: colors.paper,
        borderRadius: 22,
        borderWidth: 1,
        borderColor: colors.border,
        padding: 12,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center'
      }}
    >
      <Image source={meal.image} style={{ width: 96, height: 96, borderRadius: 18, marginRight: 12 }} resizeMode="cover" />
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <View style={{ flex: 1, paddingRight: 10 }}>
            <Text style={{ color: colors.text, fontWeight: '900', fontSize: 16 }} numberOfLines={2}>{meal.name}</Text>
            <Text style={{ color: colors.forestDark, marginTop: 3, fontWeight: '800', fontSize: 14 }}>{votes} votes</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            {insightMeta ? <Tag label={insightMeta.label} variant={insightMeta.variant} /> : null}
          </View>
        </View>

        <View style={{ height: 10, backgroundColor: '#E7ECE3', borderRadius: 999, marginTop: 12, overflow: 'hidden' }}>
          <View style={{ width: `${Math.max(share, 4)}%`, height: '100%', backgroundColor: colors.forestLight, borderRadius: 999 }} />
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
          <Text style={{ color: colors.textSoft, fontSize: 12 }}>{share}% of service</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="trending-up-outline" size={16} color={colors.textSoft} />
            <Text style={{ color: colors.textSoft, fontSize: 12, marginLeft: 4 }}>decision signal</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

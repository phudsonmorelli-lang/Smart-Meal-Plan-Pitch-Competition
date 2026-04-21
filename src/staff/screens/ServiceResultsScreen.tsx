import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import ScreenShell from '../components/ScreenShell';
import ResultRow from '../components/ResultRow';
import SectionHeader from '../components/SectionHeader';
import { colors, displayFont } from '../../theme/colors';
import { resultMeal, serviceResults, slotMeta } from '../data/cafeteriaData';
import { MealSlot } from '../types';

function FilterPill({ icon, label, wide }: { icon: keyof typeof Ionicons.glyphMap; label: string; wide?: boolean }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.paper, borderRadius: 14, borderWidth: 1, borderColor: colors.border, paddingHorizontal: 14, paddingVertical: 10, minWidth: wide ? 170 : 120 }}>
      <Ionicons name={icon} size={16} color={colors.forestDark} style={{ marginRight: 8 }} />
      <Text style={{ color: colors.text, fontWeight: '800' }}>{label}</Text>
      <Ionicons name="chevron-down" size={16} color={colors.textSoft} style={{ marginLeft: 'auto' }} />
    </View>
  );
}

function insightForIndex(index: number, total: number, mode: 'default' | 'classic' | 'dessert') {
  if (index === 0) return 'top';
  if (mode === 'classic' && index === 1) return 'rising';
  if (index === total - 1) return 'low';
  return undefined;
}

export default function ServiceResultsScreen({ slot }: { slot: MealSlot }) {
  const service = serviceResults[slot];

  return (
    <ScreenShell>
      <Text style={{ color: colors.forestDark, fontFamily: displayFont, fontSize: 34, fontWeight: '700' }}>Survey Results</Text>
      <Text style={{ color: colors.textSoft, marginTop: 6, marginBottom: 18 }}>
        See what students are choosing and what the dining team should watch.
      </Text>

      <View style={{ flexDirection: 'row', gap: 10, marginBottom: 18 }}>
        <FilterPill icon="time-outline" label={slotMeta[slot].time} wide />
        <FilterPill icon="calendar-outline" label="Today" />
      </View>

      <View style={{ backgroundColor: colors.paper, borderRadius: 22, borderWidth: 1, borderColor: colors.border, padding: 16, marginBottom: 18 }}>
        <Text style={{ color: colors.textSoft, fontWeight: '800', letterSpacing: 0.5 }}>SERVICE SNAPSHOT</Text>
        <Text style={{ color: colors.forestDark, fontSize: 28, fontWeight: '900', marginTop: 6 }}>{service.totalSelections}</Text>
        <Text style={{ color: colors.textSoft, marginTop: 4 }}>{service.participationLabel}</Text>
      </View>

      <SectionHeader title={`Top ${slotMeta[slot].label} Choices`} actionLabel="View all" />
      {service.items.map((item, index) => (
        <ResultRow key={item.mealId} meal={resultMeal(item.mealId)} votes={item.votes} share={item.share} insight={insightForIndex(index, service.items.length, 'default') as any} />
      ))}

      {service.classics?.length ? <SectionHeader title="Craving something else?" subtitle="Students still choosing classics during this service" /> : null}
      {service.classics?.map((item, index) => (
        <ResultRow key={item.mealId} meal={resultMeal(item.mealId)} votes={item.votes} share={item.share} insight={insightForIndex(index, service.classics!.length, 'classic') as any} />
      ))}

      {service.desserts?.length ? <SectionHeader title="Dessert" subtitle="Dessert choices attached to this service" /> : null}
      {service.desserts?.map((item, index) => (
        <ResultRow key={item.mealId} meal={resultMeal(item.mealId)} votes={item.votes} share={item.share} insight={insightForIndex(index, service.desserts!.length, 'dessert') as any} />
      ))}
    </ScreenShell>
  );
}

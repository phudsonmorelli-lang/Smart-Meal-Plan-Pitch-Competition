import React, { useMemo, useState } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../navigation/types';
import ScreenShell from '../components/ScreenShell';
import PlanMealCard from '../components/PlanMealCard';
import PrimaryButton from '../components/PrimaryButton';
import Tag from '../components/Tag';
import { colors, displayFont } from '../../theme/colors';
import {
  findMeal,
  getGoalMetricsForPlan,
  getPlanFocusLabel,
  slotMeta,
  slotOrder,
  weekDayMeta,
  weeklyPlanDays
} from '../data/mockData';
import { Meal, MealSlot, StudentPlan, WeekDayKey } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Tabs'> & {
  currentDayKey: WeekDayKey;
  weeklySelections: Record<WeekDayKey, Record<MealSlot, string>>;
  weeklyExtraMeals: Record<WeekDayKey, Record<MealSlot, string[]>>;
  recommendedWeeklySelections: Record<WeekDayKey, Record<MealSlot, string>>;
  weekConfirmed: boolean;
  onConfirmWeek: () => void;
  onEditWeek: () => void;
  studentPlan: StudentPlan;
  planUpdatedAt: number;
};

type DaySummary = {
  key: WeekDayKey;
  label: string;
  fullLabel: string;
  state: 'planned' | 'draft';
  note: string;
  missingSlots: MealSlot[];
};

export default function MyPlanScreen({
  navigation,
  currentDayKey,
  weeklySelections,
  weeklyExtraMeals,
  recommendedWeeklySelections,
  weekConfirmed,
  onConfirmWeek,
  onEditWeek,
  studentPlan,
  planUpdatedAt
}: Props) {
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [dayPickerVisible, setDayPickerVisible] = useState(false);
  const [selectedDayKey, setSelectedDayKey] = useState<WeekDayKey>(currentDayKey);

  const daySummaries = useMemo<DaySummary[]>(() => {
    return weeklyPlanDays.map((day) => {
      const dayKey = day.key as WeekDayKey;
      const selections = weeklySelections[dayKey];
      const missingSlots = slotOrder.filter((slot) => !selections[slot]);
      const state = missingSlots.length ? 'draft' : 'planned';
      const note = missingSlots.length ? `Choose ${slotMeta[missingSlots[0]].label.toLowerCase()}` : 'All meals selected';
      return {
        key: dayKey,
        label: weekDayMeta[dayKey].label,
        fullLabel: weekDayMeta[dayKey].fullLabel,
        state,
        note,
        missingSlots
      };
    });
  }, [weeklySelections]);

  const activeSelections = weeklySelections[selectedDayKey];
  const activeExtras = weeklyExtraMeals[selectedDayKey];
  const recommendedSelections = recommendedWeeklySelections[selectedDayKey];
  const selectedDay = daySummaries.find((day) => day.key === selectedDayKey)!;
  const selectedDayInfo = weekDayMeta[selectedDayKey];
  const isToday = selectedDayKey === currentDayKey;

  const selectedList = slotOrder.map((slot) => {
    const mealId = activeSelections[slot];
    return {
      slot,
      meal: mealId ? findMeal(mealId) : null,
      extras: (activeExtras?.[slot] ?? []).map(findMeal)
    } as { slot: MealSlot; meal: Meal | null; extras: Meal[] };
  });

  const plannedCalories = selectedList.reduce((sum, item) => sum + (item.meal?.calories ?? 0) + item.extras.reduce((n, extra) => n + extra.calories, 0), 0);
  const plannedProtein = selectedList.reduce((sum, item) => sum + (item.meal?.protein ?? 0) + item.extras.reduce((n, extra) => n + extra.protein, 0), 0);
  const extrasCount = (Object.values(activeExtras ?? {}) as string[][]).reduce((sum, items) => sum + items.length, 0);
  const swappedCount = slotOrder.filter((slot) => activeSelections[slot] && recommendedSelections[slot] && activeSelections[slot] !== recommendedSelections[slot]).length;
  const plannedDays = daySummaries.filter((day) => day.state === 'planned').length;
  const draftDays = daySummaries.length - plannedDays;
  const goalMetrics = getGoalMetricsForPlan(studentPlan);

  const weeklyStatusLine = useMemo(() => {
    if (weekConfirmed) return 'Your week is locked in. You can still edit individual days before the nightly cutoff.';
    return `${plannedDays} days are ready to confirm. ${draftDays} still need one more choice.`;
  }, [weekConfirmed, plannedDays, draftDays]);

  const dayTitle = isToday ? `Today · ${selectedDayInfo.fullLabel}` : selectedDayInfo.fullLabel;
  const daySubtitle = isToday ? 'Jump straight into today’s meals or switch to another day.' : selectedDay.note;
  const updatedRecently = planUpdatedAt > 0;

  return (
    <ScreenShell onNotificationsPress={() => navigation.navigate('Favorites')} onScannerPress={() => navigation.navigate('Tabs', { screen: 'Menu' } as never)}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
        <View style={{ flex: 1, paddingRight: 12 }}>
          <Text style={{ color: colors.forestDark, fontSize: 30, fontFamily: displayFont, fontWeight: '700' }}>My Plan</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.paper, borderRadius: 20, borderWidth: 1, borderColor: colors.border, paddingHorizontal: 14, paddingVertical: 12 }}>
          <Ionicons name="calendar-outline" size={18} color={colors.forestDark} />
          <Text style={{ color: colors.text, fontWeight: '800', marginLeft: 8 }}>Week of Apr 24</Text>
        </View>
      </View>

      <View style={{ backgroundColor: colors.paper, borderRadius: 26, borderWidth: 1, borderColor: colors.border, padding: 18, marginBottom: 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flex: 1, paddingRight: 16 }}>
            <Text style={{ color: colors.forestDark, fontSize: 22, fontFamily: displayFont, fontWeight: '700' }}>Weekly Plan</Text>
            <Text style={{ color: colors.text, marginTop: 8, fontSize: 15 }}>{getPlanFocusLabel(studentPlan)}</Text>
          </View>
          <View style={{ backgroundColor: weekConfirmed ? '#E3F1D7' : '#F7F1E5', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 18 }}>
            <Text style={{ color: weekConfirmed ? colors.forestDark : colors.text, fontWeight: '900' }}>{weekConfirmed ? 'Week Confirmed' : 'Draft Week'}</Text>
          </View>
        </View>

        <Text style={{ color: colors.textSoft, marginTop: 12, lineHeight: 20 }}>{weeklyStatusLine}</Text>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 16, marginHorizontal: -4 }}>
          {daySummaries.map((day) => {
            const planned = day.state === 'planned';
            const active = day.key === selectedDayKey;
            return (
              <Pressable key={day.key} onPress={() => setSelectedDayKey(day.key)} style={{ width: '25%', paddingHorizontal: 4, marginBottom: 8 }}>
                <View style={{ backgroundColor: active ? '#E5EFE4' : planned ? '#EEF4E8' : '#FBF8F2', borderWidth: 1, borderColor: active ? colors.forest : planned ? '#D4E2CB' : colors.border, borderRadius: 18, paddingVertical: 12, paddingHorizontal: 8, minHeight: 88, justifyContent: 'space-between' }}>
                  <Text style={{ color: colors.forestDark, fontWeight: '900', textAlign: 'center' }}>{day.label}</Text>
                  <Ionicons name={planned ? 'checkmark-circle' : 'ellipse-outline'} size={20} color={planned ? colors.forest : '#B0AA9B'} style={{ alignSelf: 'center', marginVertical: 6 }} />
                  <Text style={{ color: colors.textSoft, fontSize: 11, textAlign: 'center' }}>{planned ? 'Ready' : 'Needs update'}</Text>
                </View>
              </Pressable>
            );
          })}
        </View>

        <View style={{ flexDirection: 'row', marginTop: 14, alignItems: 'center' }}>
          <View style={{ flex: 1, marginRight: 10 }}>
            <PrimaryButton title={weekConfirmed ? 'Edit Weekly Plan' : 'Confirm My Week'} onPress={() => (weekConfirmed ? onEditWeek() : setConfirmModalVisible(true))} />
          </View>
          <View style={{ flex: 1 }}>
            <PrimaryButton title="Review Days" onPress={() => setDayPickerVisible(true)} variant="light" />
          </View>
        </View>
      </View>

      <Pressable onPress={() => setDayPickerVisible(true)} style={{ backgroundColor: colors.paper, borderRadius: 24, borderWidth: 1, borderColor: colors.border, paddingHorizontal: 18, paddingVertical: 16, marginBottom: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flex: 1, paddingRight: 10 }}>
          <Text style={{ color: colors.forestDark, fontSize: 24, fontFamily: displayFont, fontWeight: '700' }}>{dayTitle}</Text>
          <Text style={{ color: colors.textSoft, marginTop: 5 }}>{daySubtitle}</Text>
        </View>
        <View style={{ width: 42, height: 42, borderRadius: 21, backgroundColor: '#EEF4E8', alignItems: 'center', justifyContent: 'center' }}>
          <Ionicons name="chevron-down" size={22} color={colors.forestDark} />
        </View>
      </Pressable>

      {selectedList.map(({ slot, meal, extras }) => {
        const status = meal && recommendedSelections[slot] && meal.id !== recommendedSelections[slot] ? 'Swapped' : 'Selected';
        return (
          <View key={`${selectedDayKey}-${slot}`}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
              <Ionicons name={slotMeta[slot].icon as keyof typeof Ionicons.glyphMap} size={20} color={colors.forestDark} />
              <Text style={{ color: colors.text, fontSize: 18, fontWeight: '900', marginLeft: 8 }}>{slotMeta[slot].label}</Text>
              <Text style={{ color: colors.textSoft, marginLeft: 10 }}>{slotMeta[slot].time}</Text>
            </View>

            {meal ? (
              <PlanMealCard
                meal={meal}
                statusLabel={status}
                extras={extras}
                onOpen={() => navigation.navigate('MealDetail', { mealId: meal.id, dayKey: selectedDayKey })}
                onSwap={() => navigation.navigate('Swap', { slot, dayKey: selectedDayKey })}
                onAddExtra={() => navigation.navigate('Extras', { slot, dayKey: selectedDayKey })}
              />
            ) : (
              <View style={{ backgroundColor: colors.paper, borderRadius: 24, borderWidth: 1, borderColor: colors.border, padding: 16, marginBottom: 18 }}>
                <Text style={{ color: colors.forestDark, fontSize: 18, fontWeight: '900' }}>No {slotMeta[slot].label.toLowerCase()} selected yet</Text>
                <Text style={{ color: colors.textSoft, marginTop: 6 }}>Choose an option for {selectedDayInfo.fullLabel.toLowerCase()}.</Text>
                <View style={{ marginTop: 14 }}>
                  <PrimaryButton title={`Choose ${slotMeta[slot].label}`} onPress={() => navigation.navigate('Swap', { slot, dayKey: selectedDayKey })} />
                </View>
              </View>
            )}

            {!meal ? null : !extras.length ? (
              <View style={{ backgroundColor: '#FBF8F2', borderWidth: 1, borderColor: colors.border, borderRadius: 18, padding: 14, marginTop: -8, marginBottom: 18 }}>
                <Text style={{ color: colors.textSoft }}>No extras added yet for {slotMeta[slot].label.toLowerCase()}.</Text>
              </View>
            ) : null}
          </View>
        );
      })}

      <View style={{ backgroundColor: colors.paper, borderRadius: 26, borderWidth: 1, borderColor: colors.border, padding: 18, marginBottom: 22 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ color: colors.forestDark, fontSize: 18, fontWeight: '900' }}>{selectedDayInfo.fullLabel} Snapshot</Text>
          {updatedRecently ? (
            <View style={{ backgroundColor: '#EEF4E8', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 }}>
              <Text style={{ color: colors.forestDark, fontSize: 12, fontWeight: '800' }}>Plan Updated</Text>
            </View>
          ) : null}
        </View>
        <Text style={{ color: colors.textSoft, marginTop: 6 }}>{studentPlan.goal} • {studentPlan.activity} • {studentPlan.preferences.join(' • ') || 'No extra preferences'}</Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
          <View style={{ flex: 1 }}>
            <Text style={{ color: colors.text, fontSize: 30, fontWeight: '900' }}>{plannedCalories}</Text>
            <Text style={{ color: colors.textSoft, marginTop: 2 }}>kcal planned</Text>
          </View>
          <View style={{ alignItems: 'flex-end', flex: 1 }}>
            <Text style={{ color: colors.text, fontSize: 30, fontWeight: '900' }}>{plannedProtein}g</Text>
            <Text style={{ color: colors.textSoft, marginTop: 2 }}>protein planned</Text>
          </View>
        </View>

        <View style={{ height: 10, borderRadius: 999, backgroundColor: '#D9D4CA', overflow: 'hidden', marginTop: 16 }}>
          <View style={{ width: `${Math.min((plannedCalories / 2000) * 100, 100)}%`, height: '100%', borderRadius: 999, backgroundColor: colors.forest }} />
        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 14 }}>
          <Tag label={`${extrasCount} extras added`} variant="soft" />
          <Tag label={swappedCount ? `${swappedCount} swaps today` : 'Plan matched to profile'} variant="soft" />
          <Tag label={studentPlan.goal === 'Build muscle' ? 'High protein focus' : studentPlan.goal === 'Eat lighter' ? 'Lighter picks' : 'Balanced week'} variant="soft" />
          <Tag label={`${selectedList.filter((item) => item.meal).length} meals set`} variant="soft" />
        </View>

        <View style={{ flexDirection: 'row', marginTop: 16 }}>
          <PrimaryButton title={goalMetrics[0].label} onPress={() => {}} variant="light" style={{ flex: 1, marginRight: 10 }} />
          <PrimaryButton title="Favorites" onPress={() => navigation.navigate('Favorites')} variant="light" style={{ flex: 1 }} />
        </View>
      </View>

      <Modal visible={confirmModalVisible} animationType="fade" transparent onRequestClose={() => setConfirmModalVisible(false)}>
        <View style={{ flex: 1, backgroundColor: 'rgba(25,32,23,0.38)', justifyContent: 'center', padding: 24 }}>
          <View style={{ backgroundColor: colors.paper, borderRadius: 28, padding: 22, borderWidth: 1, borderColor: colors.border }}>
            <View style={{ width: 56, height: 56, borderRadius: 28, backgroundColor: '#EEF4E8', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
              <Ionicons name="checkmark-done-outline" size={28} color={colors.forestDark} />
            </View>
            <Text style={{ color: colors.forestDark, fontSize: 24, fontFamily: displayFont, fontWeight: '700' }}>Confirm your weekly plan?</Text>
            <Text style={{ color: colors.text, marginTop: 10, lineHeight: 22 }}>
              Your selections will help the dining team prep more accurately for the week. You can still edit any day before the nightly cutoff.
            </Text>

            <View style={{ backgroundColor: '#FBF8F2', borderRadius: 18, padding: 14, marginTop: 16, borderWidth: 1, borderColor: colors.border }}>
              <Text style={{ color: colors.text, fontWeight: '800' }}>{plannedDays} days ready • {draftDays} still flexible</Text>
              <Text style={{ color: colors.textSoft, marginTop: 4 }}>Confirm now to lock in your current choices for the week.</Text>
            </View>

            <View style={{ flexDirection: 'row', marginTop: 18 }}>
              <PrimaryButton title="Cancel" onPress={() => setConfirmModalVisible(false)} variant="light" style={{ flex: 1, marginRight: 10 }} />
              <PrimaryButton title="Confirm Week" onPress={() => { setConfirmModalVisible(false); onConfirmWeek(); }} style={{ flex: 1 }} />
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={dayPickerVisible} animationType="fade" transparent onRequestClose={() => setDayPickerVisible(false)}>
        <Pressable onPress={() => setDayPickerVisible(false)} style={{ flex: 1, backgroundColor: 'rgba(25,32,23,0.28)', justifyContent: 'flex-end' }}>
          <Pressable onPress={() => {}} style={{ backgroundColor: colors.paper, borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 22, borderTopWidth: 1, borderColor: colors.border }}>
            <Text style={{ color: colors.forestDark, fontSize: 24, fontFamily: displayFont, fontWeight: '700' }}>Choose a day</Text>
            <Text style={{ color: colors.textSoft, marginTop: 8, marginBottom: 14 }}>Switch the menu below to review another day of the week.</Text>
            {daySummaries.map((day) => {
              const active = day.key === selectedDayKey;
              return (
                <Pressable
                  key={day.key}
                  onPress={() => { setSelectedDayKey(day.key); setDayPickerVisible(false); }}
                  style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 14, paddingHorizontal: 14, borderRadius: 18, backgroundColor: active ? '#EEF4E8' : '#FBF8F2', borderWidth: 1, borderColor: active ? colors.forest : colors.border, marginBottom: 10 }}
                >
                  <View>
                    <Text style={{ color: colors.text, fontWeight: '900', fontSize: 16 }}>{day.fullLabel}{day.key === currentDayKey ? ' · Today' : ''}</Text>
                    <Text style={{ color: colors.textSoft, marginTop: 4 }}>{day.note}</Text>
                  </View>
                  <Ionicons name={active ? 'checkmark-circle' : 'chevron-forward'} size={22} color={active ? colors.forest : colors.textSoft} />
                </Pressable>
              );
            })}
          </Pressable>
        </Pressable>
      </Modal>
    </ScreenShell>
  );
}

import React, { useMemo, useState } from 'react';
import { Modal, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../navigation/types';
import ScreenShell from '../components/ScreenShell';
import MenuMealCard from '../components/MenuMealCard';
import { colors, displayFont } from '../../theme/colors';
import { findMeal, getPlanFocusLabel, meals, slotMeta, slotOrder, sortMealsForPlan, weekDayMeta } from '../data/mockData';
import { Meal, MealSlot, StudentPlan, WeekDayKey } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Tabs'> & {
  favorites: string[];
  onToggleFavorite: (mealId: string) => void;
  selectedMeals: Record<MealSlot, string>;
  currentDayKey: WeekDayKey;
  studentPlan: StudentPlan;
};

const filters: { key: MealSlot | 'all'; label: string }[] = [
  { key: 'all', label: 'All Meals' },
  { key: 'breakfast', label: 'Breakfast' },
  { key: 'lunch', label: 'Lunch' },
  { key: 'dinner', label: 'Dinner' },
  { key: 'grab_go', label: 'Grab & Go' }
];

function renderMealRow(title: string, items: Meal[], favorites: string[], onToggleFavorite: (id: string) => void, onPressMeal: (id: string) => void) {
  if (!items.length) return null;
  return (
    <View style={{ marginTop: 12 }}>
      <Text style={{ color: colors.text, fontSize: 16, fontWeight: '900', marginBottom: 10 }}>{title}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {items.map((meal) => (
          <MenuMealCard
            key={meal.id}
            meal={meal}
            isFavorite={favorites.includes(meal.id)}
            onToggleFavorite={() => onToggleFavorite(meal.id)}
            onPress={() => onPressMeal(meal.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

export default function MenuScreen({ navigation, favorites, onToggleFavorite, currentDayKey, studentPlan }: Props) {
  const [activeFilter, setActiveFilter] = useState<MealSlot | 'all'>('all');
  const [query, setQuery] = useState('');
  const [selectedDayKey, setSelectedDayKey] = useState<WeekDayKey>(currentDayKey);
  const [dayPickerVisible, setDayPickerVisible] = useState(false);

  const sections = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const matchesQuery = (meal: Meal) =>
      !normalized ||
      meal.name.toLowerCase().includes(normalized) ||
      meal.subtitle.toLowerCase().includes(normalized) ||
      meal.tags.join(' ').toLowerCase().includes(normalized);

    return slotOrder
      .filter((slot) => activeFilter === 'all' || activeFilter === slot)
      .map((slot) => {
        const items = sortMealsForPlan(studentPlan, meals.filter((meal) => meal.slot === slot && matchesQuery(meal)));
        const featured = items.filter((meal) => (meal.category ?? 'core') === 'core');
        const classics = items.filter((meal) => meal.category === 'classic');
        const desserts = items.filter((meal) => meal.category === 'dessert');
        const menuItems = slot === 'lunch' || slot === 'dinner' ? [...featured, ...classics] : featured;
        return { slot, featured, classics, desserts, menuItems };
      })
      .filter((section) => section.menuItems.length > 0 || section.desserts.length > 0);
  }, [activeFilter, query, studentPlan]);

  const activeDayInfo = weekDayMeta[selectedDayKey];
  const dayPillLabel = selectedDayKey === currentDayKey ? `Today · ${activeDayInfo.fullLabel}` : `${activeDayInfo.fullLabel} · ${activeDayInfo.shortDate}`;
  const openMealDetail = (mealId: string) => navigation.navigate('MealDetail', { mealId, dayKey: selectedDayKey });

  return (
    <ScreenShell
      onNotificationsPress={() => navigation.navigate('Favorites')}
      onScannerPress={() => navigation.navigate('Tabs', { screen: 'MyPlan' } as never)}
    >
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 18 }}>
        <View style={{ flex: 1, paddingRight: 12 }}>
          <Text style={{ color: colors.forestDark, fontSize: 30, fontFamily: displayFont, fontWeight: '700' }}>Menu</Text>
          <Text style={{ color: colors.textSoft, marginTop: 6 }}>Switch days and see meals ranked around your current plan.</Text>
        </View>
        <Pressable
          onPress={() => setDayPickerVisible(true)}
          style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.paper, borderRadius: 20, borderWidth: 1, borderColor: colors.border, paddingHorizontal: 14, paddingVertical: 12, maxWidth: 210 }}
        >
          <Ionicons name="calendar-outline" size={18} color={colors.forestDark} />
          <Text numberOfLines={1} style={{ color: colors.text, fontWeight: '800', marginLeft: 8, flex: 1 }}>{dayPillLabel}</Text>
          <Ionicons name="chevron-down" size={16} color={colors.textSoft} />
        </Pressable>
      </View>

      <View style={{ backgroundColor: colors.paper, borderRadius: 20, borderWidth: 1, borderColor: colors.border, padding: 16, marginBottom: 16 }}>
        <Text style={{ color: colors.forestDark, fontSize: 17, fontWeight: '900' }}>Built around {studentPlan.goal}</Text>
        <Text style={{ color: colors.textSoft, marginTop: 6 }}>{getPlanFocusLabel(studentPlan)}</Text>
      </View>

      <View style={{ backgroundColor: colors.paper, borderRadius: 18, borderWidth: 1, borderColor: colors.border, paddingHorizontal: 16, marginBottom: 16 }}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search meals, pizza, fruit, dessert"
          placeholderTextColor="#8A8C84"
          style={{ height: 48, color: colors.text, fontWeight: '600' }}
        />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
        {filters.map((filter) => {
          const active = activeFilter === filter.key;
          return (
            <Pressable key={filter.key} onPress={() => setActiveFilter(filter.key)} style={{ backgroundColor: active ? colors.forest : colors.paper, borderRadius: 999, paddingHorizontal: 18, paddingVertical: 11, borderWidth: 1, borderColor: active ? colors.forest : colors.border, marginRight: 10 }}>
              <Text style={{ color: active ? 'white' : colors.text, fontWeight: '900' }}>{filter.label}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {sections.map((section) => {
        const isFocusedMeal = activeFilter !== 'all' && (section.slot === 'lunch' || section.slot === 'dinner');
        return (
          <View key={`${selectedDayKey}-${section.slot}`} style={{ backgroundColor: colors.paper, borderRadius: 24, borderWidth: 1, borderColor: colors.border, padding: 14, marginBottom: 16 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name={slotMeta[section.slot].icon as keyof typeof Ionicons.glyphMap} size={20} color={colors.forestDark} />
                <Text style={{ color: colors.text, fontSize: 18, fontWeight: '900', marginLeft: 8 }}>{slotMeta[section.slot].label}</Text>
                <Text style={{ color: colors.textSoft, marginLeft: 10 }}>{slotMeta[section.slot].time}</Text>
              </View>
              {activeFilter === 'all' ? (
                <Pressable onPress={() => setActiveFilter(section.slot)}><Text style={{ color: colors.text, fontWeight: '800' }}>View all</Text></Pressable>
              ) : null}
            </View>

            {section.slot === 'lunch' || section.slot === 'dinner' ? (
              isFocusedMeal ? (
                <>
                  {renderMealRow('Featured options', section.featured, favorites, onToggleFavorite, openMealDetail)}
                  {renderMealRow('Craving something else?', section.classics, favorites, onToggleFavorite, openMealDetail)}
                  {renderMealRow('Dessert', section.desserts, favorites, onToggleFavorite, openMealDetail)}
                </>
              ) : (
                <>
                  {renderMealRow('Today’s options', section.menuItems, favorites, onToggleFavorite, openMealDetail)}
                  {renderMealRow('Dessert', section.desserts, favorites, onToggleFavorite, openMealDetail)}
                </>
              )
            ) : renderMealRow(section.slot === 'grab_go' ? 'Available now' : 'Featured options', section.menuItems, favorites, onToggleFavorite, openMealDetail)}
          </View>
        );
      })}

      <Modal visible={dayPickerVisible} animationType="fade" transparent onRequestClose={() => setDayPickerVisible(false)}>
        <Pressable onPress={() => setDayPickerVisible(false)} style={{ flex: 1, backgroundColor: 'rgba(25,32,23,0.28)', justifyContent: 'flex-end' }}>
          <Pressable onPress={() => {}} style={{ backgroundColor: colors.paper, borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 22, borderTopWidth: 1, borderColor: colors.border }}>
            <Text style={{ color: colors.forestDark, fontSize: 24, fontFamily: displayFont, fontWeight: '700' }}>Choose a day</Text>
            <Text style={{ color: colors.textSoft, marginTop: 8, marginBottom: 14 }}>Switch the menu to review another day of the week.</Text>
            {(Object.keys(weekDayMeta) as WeekDayKey[]).map((dayKey) => {
              const active = dayKey === selectedDayKey;
              const meta = weekDayMeta[dayKey];
              return (
                <Pressable
                  key={dayKey}
                  onPress={() => {
                    setSelectedDayKey(dayKey);
                    setDayPickerVisible(false);
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingVertical: 14,
                    paddingHorizontal: 14,
                    borderRadius: 18,
                    backgroundColor: active ? '#EEF4E8' : '#FBF8F2',
                    borderWidth: 1,
                    borderColor: active ? colors.forest : colors.border,
                    marginBottom: 10
                  }}
                >
                  <View>
                    <Text style={{ color: colors.text, fontWeight: '900', fontSize: 16 }}>{meta.fullLabel}{dayKey === currentDayKey ? ' · Today' : ''}</Text>
                    <Text style={{ color: colors.textSoft, marginTop: 4 }}>{meta.shortDate}</Text>
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

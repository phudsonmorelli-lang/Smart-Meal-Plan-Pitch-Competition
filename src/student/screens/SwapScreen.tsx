import React from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../navigation/types';
import ScreenShell from '../components/ScreenShell';
import Tag from '../components/Tag';
import { colors, displayFont } from '../../theme/colors';
import { findMeal, meals, slotMeta } from '../data/mockData';
import { Meal, MealSlot } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Swap'> & {
  selectedMeals: Record<MealSlot, string>;
  onSelectMeal: (slot: MealSlot, mealId: string) => void;
};

function OptionRow({ meal, ctaLabel, onPress }: { meal: Meal; ctaLabel: string; onPress: () => void }) {
  return (
    <View style={{ paddingHorizontal: 14, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border, flexDirection: 'row', alignItems: 'center' }}>
      <Image source={meal.image} style={{ width: 104, height: 86, borderRadius: 18, marginRight: 14 }} resizeMode="cover" />
      <View style={{ flex: 1 }}>
        <Text style={{ color: colors.text, fontSize: 18, fontWeight: '900' }}>{meal.name}</Text>
        <Text style={{ color: colors.textSoft, marginTop: 4 }}>{meal.subtitle}</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 }}>{meal.tags.slice(0, 2).map((tag) => <Tag key={tag} label={tag} />)}</View>
      </View>
      <Pressable onPress={onPress} style={{ backgroundColor: colors.softGreen, borderRadius: 999, paddingHorizontal: 18, paddingVertical: 12, marginLeft: 10 }}>
        <Text style={{ color: colors.softGreenText, fontWeight: '900' }}>{ctaLabel}</Text>
      </Pressable>
    </View>
  );
}

export default function SwapScreen({ route, navigation, selectedMeals, onSelectMeal }: Props) {
  const { slot } = route.params;
  const currentMealId = selectedMeals[slot];
  const currentMeal = currentMealId ? findMeal(currentMealId) : null;
  const scoped = meals.filter((meal) => meal.slot === slot && meal.id !== currentMealId);
  const mainOptions = scoped.filter((meal) => (meal.category ?? 'core') === 'core');
  const classicOptions = scoped.filter((meal) => meal.category === 'classic');
  const dessertOptions = scoped.filter((meal) => meal.category === 'dessert');

  return (
    <ScreenShell onNotificationsPress={() => navigation.goBack()} onScannerPress={() => navigation.goBack()}>
      <ScrollView style={{ backgroundColor: colors.paper, borderRadius: 26, borderWidth: 1, borderColor: colors.border, overflow: 'hidden' }}>
        <View style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: colors.border }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <View style={{ flex: 1, paddingRight: 12 }}>
              <Text style={{ color: colors.forestDark, fontFamily: displayFont, fontSize: 30, fontWeight: '700' }}>Choose Your {slotMeta[slot].label}</Text>
              <Text style={{ color: colors.textSoft, marginTop: 8 }}>Pick the best option for your {slotMeta[slot].label.toLowerCase()} meal.</Text>
            </View>
            <Pressable onPress={() => navigation.goBack()}><Ionicons name="close" size={28} color={colors.text} /></Pressable>
          </View>
        </View>

        <View style={{ padding: 14, borderBottomWidth: 1, borderBottomColor: colors.border }}>
          <Text style={{ color: colors.textSoft, fontWeight: '800', marginBottom: 10 }}>CURRENT PICK</Text>
          {currentMeal ? (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={currentMeal.image} style={{ width: 104, height: 86, borderRadius: 18, marginRight: 14 }} resizeMode="cover" />
              <View style={{ flex: 1 }}>
                <Text style={{ color: colors.text, fontSize: 22, fontWeight: '900' }}>{currentMeal.name}</Text>
                <Text style={{ color: colors.textSoft, marginTop: 4 }}>{currentMeal.subtitle}</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 }}>{currentMeal.tags.slice(0, 2).map((tag) => <Tag key={tag} label={tag} />)}</View>
              </View>
            </View>
          ) : (
            <View style={{ backgroundColor: '#FBF8F2', borderRadius: 18, borderWidth: 1, borderColor: colors.border, padding: 14 }}>
              <Text style={{ color: colors.text, fontWeight: '900' }}>No current selection</Text>
              <Text style={{ color: colors.textSoft, marginTop: 6 }}>Choose one of the options below to add this meal.</Text>
            </View>
          )}
        </View>

        {mainOptions.length ? <Text style={{ paddingHorizontal: 14, paddingTop: 12, color: colors.textSoft, fontWeight: '800' }}>FEATURED OPTIONS</Text> : null}
        {mainOptions.map((meal) => <OptionRow key={meal.id} meal={meal} ctaLabel="Select" onPress={() => { onSelectMeal(slot, meal.id); navigation.navigate('Tabs', { screen: 'MyPlan' } as never); }} />)}

        {(slot === 'lunch' || slot === 'dinner') && classicOptions.length ? <Text style={{ paddingHorizontal: 14, paddingTop: 12, color: colors.textSoft, fontWeight: '800' }}>CRAVING SOMETHING ELSE?</Text> : null}
        {(slot === 'lunch' || slot === 'dinner') && classicOptions.map((meal) => <OptionRow key={meal.id} meal={meal} ctaLabel="Select" onPress={() => { onSelectMeal(slot, meal.id); navigation.navigate('Tabs', { screen: 'MyPlan' } as never); }} />)}

        {(slot === 'lunch' || slot === 'dinner') && dessertOptions.length ? <Text style={{ paddingHorizontal: 14, paddingTop: 12, color: colors.textSoft, fontWeight: '800' }}>DESSERT</Text> : null}
        {(slot === 'lunch' || slot === 'dinner') && dessertOptions.map((meal) => <OptionRow key={meal.id} meal={meal} ctaLabel="Select" onPress={() => { onSelectMeal(slot, meal.id); navigation.navigate('Tabs', { screen: 'MyPlan' } as never); }} />)}
      </ScrollView>
    </ScreenShell>
  );
}

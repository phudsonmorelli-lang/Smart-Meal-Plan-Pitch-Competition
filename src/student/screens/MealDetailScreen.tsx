import React from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../navigation/types';
import ScreenShell from '../components/ScreenShell';
import Tag from '../components/Tag';
import PrimaryButton from '../components/PrimaryButton';
import { colors, displayFont } from '../../theme/colors';
import { findMeal, slotMeta } from '../data/mockData';
import { MealSlot } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'MealDetail'> & {
  selectedMeals: Record<MealSlot, string>;
  favorites: string[];
  onToggleFavorite: (mealId: string) => void;
  onSelectMeal: (slot: MealSlot, mealId: string) => void;
};

const mealInfo: Record<string, { ingredients: string[]; allergens: string[]; why: string[] }> = {
  'grilled-chicken-bowl': { ingredients: ['grilled chicken', 'brown rice', 'roasted vegetables'], allergens: ['none listed'], why: ['strong protein for the afternoon', 'balanced and filling without being too heavy'] },
  'grilled-salmon': { ingredients: ['salmon', 'quinoa', 'asparagus'], allergens: ['fish'], why: ['great midday energy', 'high protein with lighter carbs'] },
  'baked-salmon': { ingredients: ['salmon', 'quinoa', 'broccoli'], allergens: ['fish'], why: ['lean protein at dinner', 'works well for an eat lighter goal'] },
  'pepperoni-pizza-lunch': { ingredients: ['pizza dough', 'pepperoni', 'mozzarella'], allergens: ['gluten', 'dairy'], why: ['classic comfort option', 'easy crowd-pleaser when craving something else'] },
  'cheeseburger-lunch': { ingredients: ['beef patty', 'bun', 'american cheese'], allergens: ['gluten', 'dairy'], why: ['hearty pick for bigger hunger days', 'campus favorite'] },
  'yogurt-parfait': { ingredients: ['greek yogurt', 'berries', 'granola'], allergens: ['dairy'], why: ['easy to carry between classes', 'quick snack with some protein'] }
};

export default function MealDetailScreen({ route, navigation, selectedMeals, favorites, onToggleFavorite, onSelectMeal }: Props) {
  const meal = findMeal(route.params.mealId);
  const selected = selectedMeals[meal.slot] === meal.id;
  const info = mealInfo[meal.id] || {
    ingredients: meal.subtitle.split('&').map((item) => item.trim()).filter(Boolean),
    allergens: ['check dining hall label'],
    why: meal.goalBadges || ['popular on campus', 'fits your meal plan well']
  };

  return (
    <ScreenShell onNotificationsPress={() => onToggleFavorite(meal.id)} onScannerPress={() => navigation.goBack()}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable onPress={() => navigation.goBack()} style={{ marginBottom: 14, flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="chevron-back" size={18} color={colors.text} />
          <Text style={{ color: colors.text, fontWeight: '800' }}>Back</Text>
        </Pressable>

        <View style={{ alignSelf: 'flex-start', backgroundColor: colors.forestLight, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 18, marginBottom: 16 }}>
          <Text style={{ color: 'white', fontSize: 16 }}>{slotMeta[meal.slot].label}</Text>
        </View>

        <Text style={{ color: colors.forestDark, fontFamily: displayFont, fontSize: 28, fontWeight: '700', lineHeight: 40 }}>{meal.name}</Text>
        <Text style={{ color: colors.forestDark, fontFamily: displayFont, fontSize: 22, fontWeight: '700', lineHeight: 30, marginTop: 2, marginBottom: 14 }}>{meal.subtitle}</Text>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 12 }}>
          {meal.tags.map((tag) => <Tag key={tag} label={tag} />)}
        </View>

        <Image source={meal.image} style={{ width: '100%', height: 294, borderRadius: 26, marginBottom: 18 }} resizeMode="cover" />

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 18 }}>
          <View style={{ marginRight: 12, marginBottom: 10 }}><Text style={{ color: colors.forestDark, fontSize: 30, fontFamily: displayFont, fontWeight: '700' }}>{meal.calories} kcal</Text></View>
          <Tag label={`${meal.protein}g Protein`} variant="soft" />
          <Tag label={`${meal.carbs}g Carbs`} variant="soft" />
          <Tag label={`${meal.fat}g Fat`} variant="soft" />
        </View>

        <PrimaryButton title={selected ? `Selected for ${slotMeta[meal.slot].label}` : `Select for ${slotMeta[meal.slot].label}`} onPress={() => { onSelectMeal(meal.slot, meal.id); navigation.navigate('Tabs', { screen: 'MyPlan' } as never); }} variant={selected ? 'soft' : 'solid'} />
        <View style={{ height: 12 }} />
        <PrimaryButton title="Add Extra" onPress={() => navigation.navigate('Extras', { slot: meal.slot, dayKey: route.params.dayKey })} variant="solid" />
        <View style={{ height: 12 }} />
        <PrimaryButton title={favorites.includes(meal.id) ? 'Saved to Favorites' : 'Save to Favorites'} onPress={() => onToggleFavorite(meal.id)} variant="light" />

        <View style={{ marginTop: 22, backgroundColor: colors.paper, borderWidth: 1, borderColor: colors.border, borderRadius: 24, padding: 18 }}>
          <Text style={{ color: colors.forestDark, fontSize: 20, fontWeight: '900' }}>Why this is a good pick for you</Text>
          {info.why.map((item) => (
            <Text key={item} style={{ color: colors.textSoft, marginTop: 10, lineHeight: 21 }}>• {item}</Text>
          ))}
        </View>

        <View style={{ marginTop: 16, backgroundColor: colors.paper, borderWidth: 1, borderColor: colors.border, borderRadius: 24, padding: 18 }}>
          <Text style={{ color: colors.forestDark, fontSize: 20, fontWeight: '900' }}>Ingredients</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 12 }}>
            {info.ingredients.map((item) => <Tag key={item} label={item} variant="soft" />)}
          </View>
        </View>

        <View style={{ marginTop: 16, backgroundColor: colors.paper, borderWidth: 1, borderColor: colors.border, borderRadius: 24, padding: 18 }}>
          <Text style={{ color: colors.forestDark, fontSize: 20, fontWeight: '900' }}>Allergens</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 12 }}>
            {info.allergens.map((item) => <Tag key={item} label={item} variant="default" />)}
          </View>
        </View>
      </ScrollView>
    </ScreenShell>
  );
}

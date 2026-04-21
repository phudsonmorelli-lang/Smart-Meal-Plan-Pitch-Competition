import React, { useMemo } from 'react';
import { ImageBackground, Pressable, ScrollView, Text, View, useWindowDimensions } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList } from '../navigation/types';
import ScreenShell from '../components/ScreenShell';
import SectionHeader from '../components/SectionHeader';
import MenuMealCard from '../components/MenuMealCard';
import QuickActionCard from '../components/QuickActionCard';
import MetricCard from '../components/MetricCard';
import { colors, displayFont } from '../../theme/colors';
import {
  campusClassicIds,
  favoriteSpotlightIds,
  findMeal,
  getDessertSpotlightIdsForPlan,
  getGoalMetricsForPlan,
  getHeroCopyForPlan,
  getHomeSpecialIdsForPlan,
  grabGoSpotlightIds,
  heroImage,
  quickActions
} from '../data/mockData';
import { MealSlot, StudentPlan } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Tabs'> & {
  favorites: string[];
  onToggleFavorite: (mealId: string) => void;
  selectedMeals: Record<MealSlot, string>;
  studentPlan: StudentPlan;
  planUpdatedAt: number;
};

export default function HomeScreen({ navigation, favorites, onToggleFavorite, selectedMeals, studentPlan }: Props) {
  const heroCopy = getHeroCopyForPlan(studentPlan);
  const specials = useMemo(() => {
    const ids = [selectedMeals.breakfast, selectedMeals.lunch, ...getHomeSpecialIdsForPlan(studentPlan)].filter(Boolean);
    return [...new Set(ids)].slice(0, 3).map(findMeal);
  }, [selectedMeals, studentPlan]);
  const classics = campusClassicIds.map(findMeal);
  const desserts = getDessertSpotlightIdsForPlan(studentPlan).map(findMeal);
  const grabGoItems = grabGoSpotlightIds.map(findMeal);
  const favoriteSpotlight = favoriteSpotlightIds.map(findMeal);
  const metrics = getGoalMetricsForPlan(studentPlan);
  const { width } = useWindowDimensions();
  const cardWidth = Math.min(194, width * 0.46);
  const miniCardWidth = Math.min(170, width * 0.42);

  return (
    <ScreenShell onNotificationsPress={() => navigation.navigate('Favorites')} onScannerPress={() => navigation.navigate('Tabs', { screen: 'Menu' } as never)}>
      <ImageBackground source={heroImage} resizeMode="cover" imageStyle={{ borderRadius: 28 }} style={{ width: '100%', height: 208, borderRadius: 28, marginBottom: 18, overflow: 'hidden', justifyContent: 'space-between' }}>
        <LinearGradient colors={['rgba(34,27,20,0.74)', 'rgba(34,27,20,0.18)']} start={{ x: 0, y: 0.15 }} end={{ x: 1, y: 1 }} style={{ flex: 1, padding: 20, justifyContent: 'space-between' }}>
          <View style={{ width: '72%' }}>
            <Text style={{ color: 'white', fontFamily: displayFont, fontSize: 26, fontWeight: '700' }}>{heroCopy.title}</Text>
            <Text style={{ color: 'rgba(255,255,255,0.92)', marginTop: 8, lineHeight: 22 }}>{heroCopy.subtitle}</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(32,23,19,0.46)', borderRadius: 999, paddingVertical: 6, paddingHorizontal: 10 }}>
              <View style={{ backgroundColor: colors.softOrange, width: 10, height: 10, borderRadius: 5, marginRight: 8 }} />
              <Text style={{ color: 'white', fontWeight: '800' }}>{heroCopy.banner}</Text>
            </View>
            <Pressable onPress={() => navigation.navigate('Tabs', { screen: 'MyPlan' } as never)} style={{ width: 42, height: 42, borderRadius: 21, backgroundColor: 'rgba(255,255,255,0.9)', alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons name="arrow-forward" size={20} color={colors.forestDark} />
            </Pressable>
          </View>
        </LinearGradient>
      </ImageBackground>

      <View style={{ backgroundColor: colors.forest, borderRadius: 22, padding: 16, marginBottom: 18 }}>
        <Text style={{ color: 'white', fontWeight: '900', fontSize: 17 }}>{studentPlan.goal} plan is active</Text>
        <Text style={{ color: 'rgba(255,255,255,0.86)', marginTop: 4 }}>{studentPlan.preferences.length ? studentPlan.preferences.join(' • ') : 'No extra preferences selected'}.</Text>
      </View>

      <SectionHeader title="Today’s Special" actionLabel="See all" onPress={() => navigation.navigate('Tabs', { screen: 'Menu' } as never)} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 18 }}>
        {specials.map((meal) => (
          <MenuMealCard key={meal.id} meal={meal} width={cardWidth} isFavorite={favorites.includes(meal.id)} onToggleFavorite={() => onToggleFavorite(meal.id)} onPress={() => navigation.navigate('MealDetail', { mealId: meal.id })} showNutrition />
        ))}
      </ScrollView>

      <SectionHeader title="Quick Actions" />
      <View style={{ flexDirection: 'row', marginBottom: 18 }}>
        {quickActions.map((action) => (
          <QuickActionCard
            key={action.id}
            icon={action.icon as keyof typeof Ionicons.glyphMap}
            label={action.label}
            subtitle={action.subtitle}
            onPress={() => {
              if (action.id === 'favorites') navigation.navigate('Favorites');
              else if (action.id === 'grab') navigation.navigate('Tabs', { screen: 'Menu' } as never);
              else navigation.navigate('Tabs', { screen: 'MyPlan' } as never);
            }}
          />
        ))}
      </View>

      <SectionHeader title="Today’s progress" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 18 }}>
        {metrics.map((metric) => <MetricCard key={metric.label} {...metric} />)}
      </ScrollView>

      <SectionHeader title="Dessert of the Day" actionLabel="Desserts" onPress={() => navigation.navigate('Tabs', { screen: 'Menu' } as never)} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 18 }}>
        {desserts.map((meal) => (
          <MenuMealCard key={meal.id} meal={meal} width={miniCardWidth} isFavorite={favorites.includes(meal.id)} onToggleFavorite={() => onToggleFavorite(meal.id)} onPress={() => navigation.navigate('MealDetail', { mealId: meal.id })} />
        ))}
      </ScrollView>

      <SectionHeader title="Favorites, ready to reorder" actionLabel="My Favorites" onPress={() => navigation.navigate('Favorites')} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 18 }}>
        {favoriteSpotlight.map((meal) => (
          <MenuMealCard key={meal.id} meal={meal} width={miniCardWidth} isFavorite={favorites.includes(meal.id)} onToggleFavorite={() => onToggleFavorite(meal.id)} onPress={() => navigation.navigate('MealDetail', { mealId: meal.id })} />
        ))}
      </ScrollView>

      <SectionHeader title="Grab & Go" actionLabel="Open menu" onPress={() => navigation.navigate('Tabs', { screen: 'Menu' } as never)} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 18 }}>
        {grabGoItems.map((meal) => (
          <MenuMealCard key={meal.id} meal={meal} width={miniCardWidth} isFavorite={favorites.includes(meal.id)} onToggleFavorite={() => onToggleFavorite(meal.id)} onPress={() => navigation.navigate('MealDetail', { mealId: meal.id })} />
        ))}
      </ScrollView>

      <SectionHeader title="Craving something else?" actionLabel="Lunch classics" onPress={() => navigation.navigate('Tabs', { screen: 'Menu' } as never)} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {classics.map((meal) => (
          <MenuMealCard key={meal.id} meal={meal} width={miniCardWidth} isFavorite={favorites.includes(meal.id)} onToggleFavorite={() => onToggleFavorite(meal.id)} onPress={() => navigation.navigate('MealDetail', { mealId: meal.id })} />
        ))}
      </ScrollView>
    </ScreenShell>
  );
}

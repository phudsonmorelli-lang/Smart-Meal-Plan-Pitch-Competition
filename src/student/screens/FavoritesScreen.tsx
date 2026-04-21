import React from 'react';
import { Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import ScreenShell from '../components/ScreenShell';
import MenuMealCard from '../components/MenuMealCard';
import { colors, displayFont } from '../../theme/colors';
import { findMeal } from '../data/mockData';

type Props = NativeStackScreenProps<RootStackParamList, 'Favorites'> & {
  favorites: string[];
  onToggleFavorite: (mealId: string) => void;
};

export default function FavoritesScreen({ navigation, favorites, onToggleFavorite }: Props) {
  const items = favorites.map(findMeal);

  return (
    <ScreenShell onNotificationsPress={() => navigation.goBack()} onScannerPress={() => navigation.goBack()}>
      <Text style={{ color: colors.forestDark, fontFamily: displayFont, fontSize: 32, fontWeight: '700', marginBottom: 8 }}>
        My Favorites
      </Text>
      <Text style={{ color: colors.textSoft, marginBottom: 18 }}>
        Saved meals Sarah can come back to quickly.
      </Text>

      {items.length ? (
        items.map((meal) => (
          <View key={meal.id} style={{ marginBottom: 14, width: '100%' }}>
            <MenuMealCard
              meal={meal}
              width={0}
              isFavorite={favorites.includes(meal.id)}
              onToggleFavorite={() => onToggleFavorite(meal.id)}
              onPress={() => navigation.navigate('MealDetail', { mealId: meal.id })}
            />
          </View>
        ))
      ) : (
        <Text style={{ color: colors.textSoft }}>No favorites saved yet.</Text>
      )}
    </ScreenShell>
  );
}

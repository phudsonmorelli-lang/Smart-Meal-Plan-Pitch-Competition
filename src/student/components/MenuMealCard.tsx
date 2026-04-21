import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Meal } from '../types';
import { colors } from '../../theme/colors';
import Tag from './Tag';

export default function MenuMealCard({
  meal,
  isFavorite,
  onToggleFavorite,
  onPress,
  width = 212,
  showNutrition = false
}: {
  meal: Meal;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  onPress: () => void;
  width?: number;
  showNutrition?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        width: width || '100%',
        backgroundColor: colors.paper,
        borderRadius: 22,
        borderWidth: 1,
        borderColor: colors.border,
        overflow: 'hidden',
        marginRight: 12
      }}
    >
      <View>
        <Image source={meal.image} style={{ width: '100%', height: 118 }} resizeMode="cover" />
        {onToggleFavorite ? (
          <Pressable
            onPress={onToggleFavorite}
            style={{
              position: 'absolute',
              right: 10,
              top: 10,
              width: 34,
              height: 34,
              borderRadius: 17,
              backgroundColor: 'rgba(255,255,255,0.92)',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={20}
              color={isFavorite ? colors.danger : colors.forestDark}
            />
          </Pressable>
        ) : null}
      </View>

      <View style={{ padding: 12 }}>
        <Text numberOfLines={2} style={{ color: colors.text, fontSize: 17, lineHeight: 21, fontWeight: '900' }}>{meal.name}</Text>
        <Text numberOfLines={2} style={{ color: colors.textSoft, marginTop: 4, lineHeight: 18 }}>{meal.subtitle}</Text>
        <Text numberOfLines={1} style={{ color: colors.forestDark, marginTop: 10, fontWeight: '800' }}>
          {meal.calories} kcal{showNutrition ? ` • ${meal.protein} g protein` : ''}
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 }}>
          {meal.tags.slice(0, 2).map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </View>
      </View>
    </Pressable>
  );
}

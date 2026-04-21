import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Meal } from '../types';
import { colors } from '../../theme/colors';
import Tag from './Tag';

export default function PlanMealCard({
  meal,
  statusLabel,
  onOpen,
  onSwap,
  onAddExtra,
  extras = []
}: {
  meal: Meal;
  statusLabel?: string;
  onOpen: () => void;
  onSwap: () => void;
  onAddExtra: () => void;
  extras?: Meal[];
}) {
  return (
    <View style={{ marginBottom: 18 }}>
      <Pressable
        onPress={onOpen}
        style={{
          backgroundColor: colors.paper,
          borderRadius: 24,
          borderWidth: 1,
          borderColor: colors.border,
          padding: 14
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <Image source={meal.image} style={{ width: 100, height: 88, borderRadius: 18, marginRight: 14 }} resizeMode="cover" />
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <View style={{ flex: 1, paddingRight: 10 }}>
                <Text numberOfLines={2} style={{ color: colors.text, fontSize: 18, lineHeight: 22, fontWeight: '900' }}>
                  {meal.name}
                </Text>
                <Text numberOfLines={2} style={{ color: colors.textSoft, marginTop: 5, lineHeight: 18 }}>
                  {meal.subtitle}
                </Text>
              </View>
              <View style={{ alignItems: 'flex-end', minWidth: 74 }}>
                <Text style={{ color: colors.text, fontSize: 16, fontWeight: '800' }}>{meal.calories} kcal</Text>
                {statusLabel ? (
                  <View
                    style={{
                      backgroundColor: statusLabel === 'Swapped' ? colors.softGreen : colors.chip,
                      borderRadius: 999,
                      paddingHorizontal: 10,
                      paddingVertical: 6,
                      marginTop: 8
                    }}
                  >
                    <Text style={{ color: colors.forestDark, fontSize: 12, fontWeight: '800' }}>{statusLabel}</Text>
                  </View>
                ) : null}
              </View>
            </View>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 }}>
              {meal.tags.slice(0, 2).map((tag) => (
                <Tag key={tag} label={tag} />
              ))}
            </View>
          </View>
        </View>

        <View style={{ flexDirection: 'row', marginTop: 14 }}>
          <Pressable
            onPress={onSwap}
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colors.softGreen,
              borderRadius: 999,
              paddingHorizontal: 14,
              paddingVertical: 12,
              marginRight: 8
            }}
          >
            <Ionicons name="swap-horizontal-outline" size={18} color={colors.softGreenText} />
            <Text style={{ color: colors.softGreenText, fontWeight: '900', marginLeft: 6 }}>Swap</Text>
          </Pressable>
          <Pressable
            onPress={onAddExtra}
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colors.paper,
              borderRadius: 999,
              borderWidth: 1,
              borderColor: colors.border,
              paddingHorizontal: 14,
              paddingVertical: 12
            }}
          >
            <Ionicons name="add-outline" size={18} color={colors.text} />
            <Text numberOfLines={1} style={{ color: colors.text, fontWeight: '900', marginLeft: 6 }}>Add Extra</Text>
          </Pressable>
        </View>
      </Pressable>

      {extras.length ? (
        <View style={{ marginTop: 10 }}>
          {extras.map((extra, index) => (
            <View
              key={`${extra.id}-${index}`}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#FBF8F2',
                borderRadius: 20,
                borderWidth: 1,
                borderColor: colors.border,
                padding: 10,
                marginBottom: 8
              }}
            >
              <Image source={extra.image} style={{ width: 62, height: 48, borderRadius: 14, marginRight: 12 }} resizeMode="cover" />
              <View style={{ flex: 1 }}>
                <Text numberOfLines={1} style={{ color: colors.text, fontWeight: '800' }}>Extra • {extra.name}</Text>
                <Text style={{ color: colors.textSoft, marginTop: 2 }}>{extra.calories} kcal</Text>
              </View>
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
}

import React, { useEffect, useMemo, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import {
  buildWeeklyExtraSelectionsForPlan,
  buildWeeklySelectionsForPlan,
  currentWeekDayKey,
  defaultStudentPlan
} from '../data/mockData';
import { MealSlot, StudentPlan, WeekDayKey } from '../types';
import { RootStackParamList, TabParamList } from './types';
import HomeScreen from '../screens/HomeScreen';
import MenuScreen from '../screens/MenuScreen';
import MyPlanScreen from '../screens/MyPlanScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import SwapScreen from '../screens/SwapScreen';
import ExtrasScreen from '../screens/ExtrasScreen';
import SetupPlanScreen from '../screens/SetupPlanScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.cream,
    card: colors.paper,
    text: colors.text,
    primary: colors.forest,
    border: colors.border
  }
};

type WeeklySelections = Record<WeekDayKey, Record<MealSlot, string>>;
type WeeklyExtras = Record<WeekDayKey, Record<MealSlot, string[]>>;

function TabsNavigator({
  favorites,
  onToggleFavorite,
  selectedMeals,
  weeklySelections,
  weeklyExtraMeals,
  recommendedWeeklySelections,
  weekConfirmed,
  onConfirmWeek,
  onEditWeek,
  studentPlan,
  onUpdateStudentPlan,
  planUpdatedAt
}: {
  favorites: string[];
  onToggleFavorite: (mealId: string) => void;
  selectedMeals: Record<MealSlot, string>;
  weeklySelections: WeeklySelections;
  weeklyExtraMeals: WeeklyExtras;
  recommendedWeeklySelections: WeeklySelections;
  weekConfirmed: boolean;
  onConfirmWeek: () => void;
  onEditWeek: () => void;
  studentPlan: StudentPlan;
  onUpdateStudentPlan: (nextPlan: StudentPlan) => void;
  planUpdatedAt: number;
}) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          height: 88,
          paddingTop: 8,
          paddingBottom: 12,
          backgroundColor: colors.paper,
          borderTopColor: colors.border
        },
        tabBarActiveTintColor: colors.forestDark,
        tabBarInactiveTintColor: '#70756C',
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: '800'
        },
        tabBarIcon: ({ color, focused }) => {
          const iconMap: Record<string, { active: keyof typeof Ionicons.glyphMap; inactive: keyof typeof Ionicons.glyphMap }> = {
            Home: { active: 'home', inactive: 'home-outline' },
            Menu: { active: 'restaurant', inactive: 'restaurant-outline' },
            MyPlan: { active: 'repeat', inactive: 'repeat-outline' },
            Profile: { active: 'person', inactive: 'person-outline' }
          };
          const icons = iconMap[route.name];
          return <Ionicons name={focused ? icons.active : icons.inactive} size={24} color={color} />;
        },
        tabBarItemStyle: {
          marginHorizontal: 6,
          borderRadius: 18
        },
        tabBarActiveBackgroundColor: '#EEF2E8'
      })}
    >
      <Tab.Screen name="Home">
        {(props) => (
          <HomeScreen
            {...props}
            favorites={favorites}
            onToggleFavorite={onToggleFavorite}
            selectedMeals={selectedMeals}
            studentPlan={studentPlan}
            planUpdatedAt={planUpdatedAt}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name="Menu">
        {(props) => (
          <MenuScreen
            {...props}
            favorites={favorites}
            onToggleFavorite={onToggleFavorite}
            selectedMeals={selectedMeals}
            currentDayKey={currentWeekDayKey}
            studentPlan={studentPlan}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name="MyPlan">
        {(props) => (
          <MyPlanScreen
            {...props}
            currentDayKey={currentWeekDayKey}
            weeklySelections={weeklySelections}
            weeklyExtraMeals={weeklyExtraMeals}
            recommendedWeeklySelections={recommendedWeeklySelections}
            weekConfirmed={weekConfirmed}
            onConfirmWeek={onConfirmWeek}
            onEditWeek={onEditWeek}
            studentPlan={studentPlan}
            planUpdatedAt={planUpdatedAt}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name="Profile">
        {(props) => (
          <ProfileScreen
            {...props}
            studentPlan={studentPlan}
            onUpdateStudentPlan={onUpdateStudentPlan}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

type Props = {
  onSwitchRole: () => void;
};

export default function StudentRoot({ onSwitchRole }: Props) {
  const [favorites, setFavorites] = useState<string[]>(['berry-smoothie', 'baked-salmon', 'hummus-box']);
  const [studentPlan, setStudentPlan] = useState<StudentPlan>(defaultStudentPlan);
  const [weeklySelections, setWeeklySelections] = useState<WeeklySelections>(() => buildWeeklySelectionsForPlan(defaultStudentPlan));
  const [weeklyExtraMeals, setWeeklyExtraMeals] = useState<WeeklyExtras>(() => buildWeeklyExtraSelectionsForPlan(defaultStudentPlan));
  const [toastMessage, setToastMessage] = useState('');
  const [weekConfirmed, setWeekConfirmed] = useState(false);
  const [planUpdatedAt, setPlanUpdatedAt] = useState(0);

  const recommendedWeeklySelections = useMemo(() => buildWeeklySelectionsForPlan(studentPlan), [studentPlan]);
  const selectedMeals = useMemo(() => weeklySelections[currentWeekDayKey], [weeklySelections]);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(''), 2200);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const toggleFavorite = (mealId: string) => {
    setFavorites((current) => {
      const next = current.includes(mealId) ? current.filter((id) => id !== mealId) : [...current, mealId];
      setToastMessage(current.includes(mealId) ? 'Removed from favorites' : 'Saved to favorites');
      return next;
    });
  };

  const selectMeal = (dayKey: WeekDayKey, slot: MealSlot, mealId: string) => {
    setWeeklySelections((current) => ({
      ...current,
      [dayKey]: {
        ...current[dayKey],
        [slot]: mealId
      }
    }));
    setToastMessage('Meal updated');
  };

  const addExtraMeal = (dayKey: WeekDayKey, slot: MealSlot, mealId: string) => {
    setWeeklyExtraMeals((current) => ({
      ...current,
      [dayKey]: {
        ...current[dayKey],
        [slot]: current[dayKey][slot].includes(mealId) ? current[dayKey][slot] : [...current[dayKey][slot], mealId]
      }
    }));
    setToastMessage('Added to your plan');
  };

  const confirmWeek = () => {
    setWeekConfirmed(true);
    setToastMessage('Weekly plan confirmed');
  };

  const editWeek = () => {
    setWeekConfirmed(false);
    setToastMessage('Weekly plan unlocked');
  };

  const updateStudentPlan = (nextPlan: StudentPlan) => {
    setStudentPlan(nextPlan);
    setWeeklySelections(buildWeeklySelectionsForPlan(nextPlan));
    setWeeklyExtraMeals(buildWeeklyExtraSelectionsForPlan(nextPlan));
    setWeekConfirmed(false);
    setPlanUpdatedAt(Date.now());
    setToastMessage('Plan updated across Home, My Plan, and Menu');
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.cream }}>
      <NavigationContainer theme={navTheme}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Tabs">
            {(props) => (
              <TabsNavigator
                {...props}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
                selectedMeals={selectedMeals}
                weeklySelections={weeklySelections}
                weeklyExtraMeals={weeklyExtraMeals}
                recommendedWeeklySelections={recommendedWeeklySelections}
                weekConfirmed={weekConfirmed}
                onConfirmWeek={confirmWeek}
                onEditWeek={editWeek}
                studentPlan={studentPlan}
                onUpdateStudentPlan={updateStudentPlan}
                planUpdatedAt={planUpdatedAt}
              />
            )}
          </Stack.Screen>

          <Stack.Screen name="MealDetail">
            {(props) => {
              const dayKey = props.route.params.dayKey ?? currentWeekDayKey;
              return (
                <MealDetailScreen
                  {...props}
                  selectedMeals={weeklySelections[dayKey]}
                  favorites={favorites}
                  onToggleFavorite={toggleFavorite}
                  onSelectMeal={(slot, mealId) => selectMeal(dayKey, slot, mealId)}
                />
              );
            }}
          </Stack.Screen>

          <Stack.Screen name="Swap">
            {(props) => {
              const dayKey = props.route.params.dayKey ?? currentWeekDayKey;
              return <SwapScreen {...props} selectedMeals={weeklySelections[dayKey]} onSelectMeal={(slot, mealId) => selectMeal(dayKey, slot, mealId)} />;
            }}
          </Stack.Screen>

          <Stack.Screen name="Extras">
            {(props) => {
              const dayKey = props.route.params.dayKey ?? currentWeekDayKey;
              return <ExtrasScreen {...props} selectedMeals={weeklySelections[dayKey]} onAddExtraMeal={(slot, mealId) => addExtraMeal(dayKey, slot, mealId)} />;
            }}
          </Stack.Screen>

          <Stack.Screen name="SetupPlan" component={SetupPlanScreen} />
          <Stack.Screen name="Favorites">
            {(props) => <FavoritesScreen {...props} favorites={favorites} onToggleFavorite={toggleFavorite} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>

      {/* Floating "Switch role" pill */}
      <Pressable
        onPress={onSwitchRole}
        style={({ pressed }) => ({
          position: 'absolute',
          top: 54,
          right: 14,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'rgba(20, 60, 52, 0.92)',
          paddingHorizontal: 12,
          paddingVertical: 7,
          borderRadius: 16,
          gap: 5,
          shadowColor: '#000',
          shadowOpacity: 0.18,
          shadowRadius: 6,
          shadowOffset: { width: 0, height: 3 },
          elevation: 4,
          opacity: pressed ? 0.8 : 1
        })}
      >
        <Ionicons name="swap-horizontal" size={13} color="white" />
        <Text style={{ color: 'white', fontWeight: '700', fontSize: 11.5, letterSpacing: 0.3 }}>Switch role</Text>
      </Pressable>

      {toastMessage ? (
        <View
          pointerEvents="none"
          style={{
            position: 'absolute',
            left: 20,
            right: 20,
            bottom: 106,
            backgroundColor: colors.forestDark,
            paddingHorizontal: 18,
            paddingVertical: 14,
            borderRadius: 18,
            shadowColor: '#000',
            shadowOpacity: 0.16,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 6 },
            elevation: 6
          }}
        >
          <Text style={{ color: 'white', fontWeight: '800', textAlign: 'center' }}>{toastMessage}</Text>
        </View>
      ) : null}
    </View>
  );
}

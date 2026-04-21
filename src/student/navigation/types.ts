import { MealSlot, WeekDayKey } from '../types';

export type RootStackParamList = {
  Tabs: undefined;
  MealDetail: { mealId: string; dayKey?: WeekDayKey };
  Swap: { slot: MealSlot; dayKey?: WeekDayKey };
  Extras: { slot: MealSlot; dayKey?: WeekDayKey };
  SetupPlan: undefined;
  Favorites: undefined;
};

export type TabParamList = {
  Home: undefined;
  Menu: undefined;
  MyPlan: undefined;
  Profile: undefined;
};

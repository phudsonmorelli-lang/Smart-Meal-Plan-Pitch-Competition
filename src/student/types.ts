import { ImageSourcePropType } from 'react-native';

export type MealSlot = 'breakfast' | 'lunch' | 'dinner' | 'grab_go';
export type MealCategory = 'core' | 'classic' | 'dessert';
export type WeekDayKey = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

export type Meal = {
  id: string;
  slot: MealSlot;
  category?: MealCategory;
  name: string;
  subtitle: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  tags: string[];
  image: ImageSourcePropType;
  featured?: boolean;
  homeSpecial?: boolean;
  goalBadges?: string[];
};

export type SlotMeta = {
  label: string;
  time: string;
  icon: string;
};

export type GoalMetric = {
  label: string;
  value: string;
  subvalue: string;
  progress: number;
};


export type StudentGoal = 'Eat lighter' | 'Maintain' | 'Build muscle';
export type ActivityLevel = 'Low' | 'Moderate' | 'High';
export type StudentPreference = 'Vegetarian' | 'High Protein' | 'Low Sugar' | 'Quick Meals';

export type StudentPlan = {
  goal: StudentGoal;
  activity: ActivityLevel;
  preferences: StudentPreference[];
};

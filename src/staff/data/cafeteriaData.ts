import { meals, findMeal, slotMeta } from './mockData';
import { Meal, MealSlot } from '../types';

export type ItemResult = {
  mealId: string;
  votes: number;
  share: number;
};

export type ServiceResult = {
  slot: MealSlot;
  totalSelections: number;
  participationLabel: string;
  heroMealId: string;
  items: ItemResult[];
  classics?: ItemResult[];
  desserts?: ItemResult[];
};

export const campusResponseCount = 500;

const pct = (votes: number, total: number) => Math.round((votes / total) * 100);

export const serviceResults: Record<MealSlot, ServiceResult> = {
  breakfast: {
    slot: 'breakfast',
    totalSelections: 328,
    participationLabel: '66% of students picked breakfast',
    heroMealId: 'overnight-oats',
    items: [
      { mealId: 'overnight-oats', votes: 126, share: pct(126, 328) },
      { mealId: 'avocado-toast', votes: 88, share: pct(88, 328) },
      { mealId: 'scrambled-eggs', votes: 74, share: pct(74, 328) },
      { mealId: 'berry-smoothie', votes: 40, share: pct(40, 328) }
    ]
  },
  lunch: {
    slot: 'lunch',
    totalSelections: 500,
    participationLabel: '100% of students picked lunch',
    heroMealId: 'grilled-chicken-bowl',
    items: [
      { mealId: 'grilled-chicken-bowl', votes: 118, share: pct(118, 500) },
      { mealId: 'grilled-salmon', votes: 84, share: pct(84, 500) },
      { mealId: 'whole-wheat-pasta', votes: 57, share: pct(57, 500) },
      { mealId: 'chickpea-salad', votes: 44, share: pct(44, 500) }
    ],
    classics: [
      { mealId: 'pepperoni-pizza-lunch', votes: 72, share: pct(72, 500) },
      { mealId: 'cheeseburger-lunch', votes: 63, share: pct(63, 500) },
      { mealId: 'chicken-tenders-lunch', votes: 38, share: pct(38, 500) },
      { mealId: 'french-fries-lunch', votes: 24, share: pct(24, 500) }
    ],
    desserts: [
      { mealId: 'strawberries-lunch', votes: 142, share: pct(142, 500) },
      { mealId: 'pineapple-lunch', votes: 96, share: pct(96, 500) },
      { mealId: 'green-grapes-lunch', votes: 84, share: pct(84, 500) },
      { mealId: 'cookie-lunch', votes: 104, share: pct(104, 500) },
      { mealId: 'brownie-lunch', votes: 74, share: pct(74, 500) }
    ]
  },
  dinner: {
    slot: 'dinner',
    totalSelections: 412,
    participationLabel: '82% of students picked dinner',
    heroMealId: 'baked-salmon',
    items: [
      { mealId: 'baked-salmon', votes: 96, share: pct(96, 412) },
      { mealId: 'tofu-stir-fry', votes: 61, share: pct(61, 412) },
      { mealId: 'lentil-soup', votes: 33, share: pct(33, 412) }
    ],
    classics: [
      { mealId: 'pepperoni-pizza-dinner', votes: 74, share: pct(74, 412) },
      { mealId: 'cheeseburger-dinner', votes: 52, share: pct(52, 412) },
      { mealId: 'chicken-tenders-dinner', votes: 47, share: pct(47, 412) },
      { mealId: 'french-fries-dinner', votes: 21, share: pct(21, 412) }
    ],
    desserts: [
      { mealId: 'watermelon-dinner', votes: 128, share: pct(128, 412) },
      { mealId: 'mango-dinner', votes: 68, share: pct(68, 412) },
      { mealId: 'cantaloupe-dinner', votes: 54, share: pct(54, 412) },
      { mealId: 'cookie-dinner', votes: 92, share: pct(92, 412) },
      { mealId: 'brownie-dinner', votes: 70, share: pct(70, 412) }
    ]
  },
  grab_go: {
    slot: 'grab_go',
    totalSelections: 146,
    participationLabel: '29% of students reserved Grab & Go',
    heroMealId: 'caesar-wrap',
    items: [
      { mealId: 'caesar-wrap', votes: 54, share: pct(54, 146) },
      { mealId: 'hummus-box', votes: 32, share: pct(32, 146) },
      { mealId: 'turkey-sandwich', votes: 28, share: pct(28, 146) },
      { mealId: 'yogurt-parfait', votes: 18, share: pct(18, 146) },
      { mealId: 'protein-box', votes: 14, share: pct(14, 146) }
    ]
  }
};

export const dashboardKpis = [
  { label: 'Students who responded', value: '500', subtitle: 'today' },
  { label: 'Lunch selections', value: '500', subtitle: 'highest demand' },
  { label: 'Dinner selections', value: '412', subtitle: 'strong evening demand' },
  { label: 'Grab & Go reservations', value: '146', subtitle: 'all-day pickup' }
];

export const serviceMix = [
  { label: 'Breakfast', value: 328 },
  { label: 'Lunch', value: 500 },
  { label: 'Dinner', value: 412 },
  { label: 'Grab & Go', value: 146 }
];

export const topCampusItems = [
  { mealId: 'grilled-chicken-bowl', votes: 118 },
  { mealId: 'overnight-oats', votes: 126 },
  { mealId: 'baked-salmon', votes: 96 },
  { mealId: 'caesar-wrap', votes: 54 }
];

export const dessertSummary = [
  { label: 'Fruit', value: 572 },
  { label: 'Cookie', value: 196 },
  { label: 'Brownie', value: 144 }
];

export const dashboardNotes = [
  'Lunch remains the most predictable service with full student participation.',
  'Fruit still leads dessert choices across both lunch and dinner.',
  'Grab & Go is a smaller service, but wraps and snack boxes have steady interest.'
];

export const resultMeal = (mealId: string): Meal => findMeal(mealId);
export { slotMeta };

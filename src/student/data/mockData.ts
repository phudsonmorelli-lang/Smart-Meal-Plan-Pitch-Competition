import { ActivityLevel, GoalMetric, Meal, MealSlot, SlotMeta, StudentGoal, StudentPlan, StudentPreference, WeekDayKey } from '../types';

const images = {
  heroCoffee: require('../../../assets/hero-coffee.jpg'),
  scrambledEggs: require('../../../assets/scrambled-eggs.jpg'),
  overnightOats: require('../../../assets/overnight-oats.jpg'),
  orangeJuice: require('../../../assets/orange-juice.jpg'),
  avocadoToast: require('../../../assets/avocado-toast.jpg'),
  berrySmoothie: require('../../../assets/berry-smoothie.jpg'),
  grilledChickenBowl: require('../../../assets/grilled-chicken-bowl.jpg'),
  chickpeaSalad: require('../../../assets/chickpea-salad.jpg'),
  wholeWheatPasta: require('../../../assets/whole-wheat-pasta.jpg'),
  bakedSalmon: require('../../../assets/baked-salmon.jpg'),
  tofuStirFry: require('../../../assets/tofu-stir-fry.jpg'),
  lentilSoup: require('../../../assets/lentil-soup.jpg'),
  caesarWrap: require('../../../assets/caesar-wrap.jpg'),
  hummusBox: require('../../../assets/hummus-box.jpg'),
  salmonDetail: require('../../../assets/salmon-detail.jpg'),
  grilledSalmon: require('../../../assets/swap-grilled-salmon.jpg'),
  turkeyWrap: require('../../../assets/swap-turkey-wrap.jpg'),
  capreseSalad: require('../../../assets/swap-caprese-salad.jpg'),
  buddhaBowl: require('../../../assets/swap-buddha-bowl.jpg'),
  sarahAvatar: require('../../../assets/sarah-avatar-v2.png'),
  pepperoniPizza: require('../../../assets/pepperoni-pizza.jpg'),
  cheeseburger: require('../../../assets/cheeseburger.jpg'),
  frenchFries: require('../../../assets/french-fries.jpg'),
  chickenTenders: require('../../../assets/chicken-tenders.jpg'),
  cookie: require('../../../assets/brownie-bite.jpg'),
  brownie: require('../../../assets/chocolate-chip-cookie.jpg'),
  fruitCup: require('../../../assets/fruit-cup.jpg'),
  strawberries: require('../../../assets/strawberries.jpg'),
  pineapple: require('../../../assets/pineapple.jpg'),
  greenGrapes: require('../../../assets/green-grapes.jpg'),
  watermelon: require('../../../assets/watermelon.jpg'),
  mango: require('../../../assets/mango.jpg'),
  cantaloupe: require('../../../assets/cantaloupe.jpg')
};

export const avatarImage = images.sarahAvatar;
export const heroImage = images.heroCoffee;

export const studentProfile = {
  firstName: 'Sarah',
  fullName: 'Sarah Johnson',
  avatar: avatarImage,
  studentId: 'TXW-284731'
};

export const meals: Meal[] = [
  { id: 'scrambled-eggs', slot: 'breakfast', category: 'core', name: 'Scrambled Eggs', subtitle: 'with spinach & toast', calories: 400, protein: 18, carbs: 28, fat: 18, tags: ['High Protein', 'Campus Classic'], image: images.scrambledEggs, homeSpecial: true, goalBadges: ['Steady energy', 'Morning protein'] },
  { id: 'overnight-oats', slot: 'breakfast', category: 'core', name: 'Overnight Oats', subtitle: 'with berries & nuts', calories: 362, protein: 16, carbs: 42, fat: 11, tags: ['High Protein', 'Vegetarian'], image: images.overnightOats, featured: true, homeSpecial: true, goalBadges: ['Light morning', 'Easy to digest'] },
  { id: 'orange-juice', slot: 'breakfast', category: 'core', name: 'Orange Juice', subtitle: 'freshly squeezed', calories: 110, protein: 2, carbs: 26, fat: 0, tags: ['Fresh', 'Vitamin C'], image: images.orangeJuice, homeSpecial: true, goalBadges: ['Light add-on', 'Bright flavor'] },
  { id: 'avocado-toast', slot: 'breakfast', category: 'core', name: 'Avocado Toast', subtitle: 'with egg', calories: 410, protein: 17, carbs: 31, fat: 22, tags: ['Vegetarian', 'Quick'], image: images.avocadoToast, goalBadges: ['Balanced start', 'Popular pick'] },
  { id: 'berry-smoothie', slot: 'breakfast', category: 'core', name: 'Berry Smoothie', subtitle: 'with banana', calories: 240, protein: 8, carbs: 34, fat: 7, tags: ['Vegetarian', 'Low Sugar'], image: images.berrySmoothie, featured: true, goalBadges: ['Quick fuel', 'Fresh choice'] },

  { id: 'grilled-chicken-bowl', slot: 'lunch', category: 'core', name: 'Grilled Chicken Bowl', subtitle: 'with rice & vegetables', calories: 552, protein: 36, carbs: 42, fat: 18, tags: ['High Protein', 'Balanced'], image: images.grilledChickenBowl, featured: true, goalBadges: ['Lunch favorite', 'Strong protein'] },
  { id: 'chickpea-salad', slot: 'lunch', category: 'core', name: 'Chickpea Salad', subtitle: 'with feta & olive oil', calories: 472, protein: 19, carbs: 39, fat: 18, tags: ['Vegetarian', 'High Fiber'], image: images.chickpeaSalad, goalBadges: ['Lighter lunch', 'Plant based'] },
  { id: 'whole-wheat-pasta', slot: 'lunch', category: 'core', name: 'Whole Wheat Pasta', subtitle: 'with tomato sauce', calories: 508, protein: 20, carbs: 58, fat: 15, tags: ['Vegetarian', 'Balanced'], image: images.wholeWheatPasta, goalBadges: ['Comfort pick', 'Midday energy'] },
  { id: 'grilled-salmon', slot: 'lunch', category: 'core', name: 'Grilled Salmon', subtitle: 'with quinoa & asparagus', calories: 498, protein: 34, carbs: 28, fat: 26, tags: ['High Protein', 'Low Carb'], image: images.salmonDetail, featured: true, goalBadges: ['Lower calorie', 'Great midday energy'] },
  { id: 'turkey-avocado-wrap', slot: 'lunch', category: 'core', name: 'Turkey & Avocado Wrap', subtitle: 'with veggies', calories: 508, protein: 29, carbs: 44, fat: 21, tags: ['Quick', 'Balanced'], image: images.turkeyWrap, goalBadges: ['Grab friendly', 'Balanced macros'] },
  { id: 'caprese-chicken-salad', slot: 'lunch', category: 'core', name: 'Caprese Chicken Salad', subtitle: 'high protein • low carb', calories: 472, protein: 35, carbs: 16, fat: 21, tags: ['High Protein', 'Low Carb'], image: images.capreseSalad, goalBadges: ['Lighter lunch', 'Protein boost'] },
  { id: 'vegetarian-buddha-bowl', slot: 'lunch', category: 'core', name: 'Vegetarian Buddha Bowl', subtitle: 'vegetarian • balanced', calories: 475, protein: 18, carbs: 41, fat: 17, tags: ['Vegetarian', 'Balanced'], image: images.buddhaBowl, goalBadges: ['Plant based', 'Clean energy'] },
  { id: 'pepperoni-pizza-lunch', slot: 'lunch', category: 'classic', name: 'Pepperoni Pizza', subtitle: 'campus classic slice', calories: 610, protein: 22, carbs: 54, fat: 31, tags: ['Campus Classic', 'Comfort Food'], image: images.pepperoniPizza, goalBadges: ['Popular pick', 'Hot & cheesy'] },
  { id: 'cheeseburger-lunch', slot: 'lunch', category: 'classic', name: 'Cheeseburger', subtitle: 'with lettuce & tomato', calories: 740, protein: 31, carbs: 46, fat: 41, tags: ['Campus Classic', 'Grill'], image: images.cheeseburger, goalBadges: ['Hearty lunch', 'Student favorite'] },
  { id: 'french-fries-lunch', slot: 'lunch', category: 'classic', name: 'French Fries', subtitle: 'crispy golden side', calories: 360, protein: 4, carbs: 43, fat: 18, tags: ['Campus Classic', 'Side'], image: images.frenchFries, goalBadges: ['Easy add-on', 'Crunchy side'] },
  { id: 'chicken-tenders-lunch', slot: 'lunch', category: 'classic', name: 'Chicken Tenders', subtitle: 'crispy strips', calories: 540, protein: 27, carbs: 29, fat: 33, tags: ['Campus Classic', 'Crispy'], image: images.chickenTenders, goalBadges: ['Crowd favorite', 'Crunchy bite'] },
  { id: 'strawberries-lunch', slot: 'lunch', category: 'dessert', name: 'Strawberries', subtitle: 'fresh cut berries', calories: 60, protein: 1, carbs: 14, fat: 0, tags: ['Dessert', 'Fresh Fruit'], image: images.strawberries, goalBadges: ['Light finish', 'Fresh option'] },
  { id: 'pineapple-lunch', slot: 'lunch', category: 'dessert', name: 'Pineapple', subtitle: 'chilled pineapple cubes', calories: 82, protein: 1, carbs: 22, fat: 0, tags: ['Dessert', 'Fresh Fruit'], image: images.pineapple, goalBadges: ['Sweet and fresh', 'Tropical pick'] },
  { id: 'green-grapes-lunch', slot: 'lunch', category: 'dessert', name: 'Green Grapes', subtitle: 'crisp chilled grapes', calories: 90, protein: 1, carbs: 23, fat: 0, tags: ['Dessert', 'Fresh Fruit'], image: images.greenGrapes, goalBadges: ['Easy pick', 'Fresh finish'] },
  { id: 'cookie-lunch', slot: 'lunch', category: 'dessert', name: 'Chocolate Chip Cookie', subtitle: 'fresh baked', calories: 220, protein: 3, carbs: 28, fat: 11, tags: ['Dessert', 'Fresh Baked'], image: images.cookie, goalBadges: ['Sweet bite', 'Bakery case'] },
  { id: 'brownie-lunch', slot: 'lunch', category: 'dessert', name: 'Brownie Bite', subtitle: 'rich chocolate square', calories: 260, protein: 3, carbs: 31, fat: 14, tags: ['Dessert', 'Chocolate'], image: images.brownie, goalBadges: ['Sweet finish', 'Chocolate fix'] },

  { id: 'baked-salmon', slot: 'dinner', category: 'core', name: 'Baked Salmon', subtitle: 'with quinoa & broccoli', calories: 498, protein: 34, carbs: 28, fat: 26, tags: ['High Protein', 'Low Sugar'], image: images.bakedSalmon, featured: true, goalBadges: ['Dinner favorite', 'Lean protein'] },
  { id: 'tofu-stir-fry', slot: 'dinner', category: 'core', name: 'Tofu Stir-Fry', subtitle: 'with vegetable & rice', calories: 468, protein: 24, carbs: 46, fat: 14, tags: ['Vegetarian', 'Quick'], image: images.tofuStirFry, goalBadges: ['Plant protein', 'Light dinner'] },
  { id: 'lentil-soup', slot: 'dinner', category: 'core', name: 'Lentil Soup', subtitle: 'with whole grain bread', calories: 384, protein: 17, carbs: 43, fat: 8, tags: ['Vegetarian', 'High Fiber'], image: images.lentilSoup, goalBadges: ['Light dinner', 'Comfort bowl'] },
  { id: 'pepperoni-pizza-dinner', slot: 'dinner', category: 'classic', name: 'Pepperoni Pizza', subtitle: 'campus classic slice', calories: 610, protein: 22, carbs: 54, fat: 31, tags: ['Campus Classic', 'Comfort Food'], image: images.pepperoniPizza, goalBadges: ['Popular pick', 'Hot & cheesy'] },
  { id: 'cheeseburger-dinner', slot: 'dinner', category: 'classic', name: 'Cheeseburger', subtitle: 'with lettuce & tomato', calories: 740, protein: 31, carbs: 46, fat: 41, tags: ['Campus Classic', 'Grill'], image: images.cheeseburger, goalBadges: ['Hearty dinner', 'Student favorite'] },
  { id: 'french-fries-dinner', slot: 'dinner', category: 'classic', name: 'French Fries', subtitle: 'crispy golden side', calories: 360, protein: 4, carbs: 43, fat: 18, tags: ['Campus Classic', 'Side'], image: images.frenchFries, goalBadges: ['Easy add-on', 'Crunchy side'] },
  { id: 'chicken-tenders-dinner', slot: 'dinner', category: 'classic', name: 'Chicken Tenders', subtitle: 'crispy strips', calories: 540, protein: 27, carbs: 29, fat: 33, tags: ['Campus Classic', 'Crispy'], image: images.chickenTenders, goalBadges: ['Crowd favorite', 'Crunchy bite'] },
  { id: 'watermelon-dinner', slot: 'dinner', category: 'dessert', name: 'Watermelon', subtitle: 'cold juicy slices', calories: 50, protein: 1, carbs: 13, fat: 0, tags: ['Dessert', 'Fresh Fruit'], image: images.watermelon, goalBadges: ['Refreshing finish', 'Light option'] },
  { id: 'mango-dinner', slot: 'dinner', category: 'dessert', name: 'Banana', subtitle: 'fresh banana slices', calories: 105, protein: 1, carbs: 27, fat: 0, tags: ['Dessert', 'Fresh Fruit'], image: images.mango, goalBadges: ['Sweet and fresh', 'Easy dessert'] },
  { id: 'cantaloupe-dinner', slot: 'dinner', category: 'dessert', name: 'Red Grapes', subtitle: 'sweet chilled grapes', calories: 92, protein: 1, carbs: 24, fat: 0, tags: ['Dessert', 'Fresh Fruit'], image: images.cantaloupe, goalBadges: ['Fresh finish', 'Sweet and easy'] },
  { id: 'cookie-dinner', slot: 'dinner', category: 'dessert', name: 'Chocolate Chip Cookie', subtitle: 'fresh baked', calories: 220, protein: 3, carbs: 28, fat: 11, tags: ['Dessert', 'Fresh Baked'], image: images.cookie, goalBadges: ['Sweet bite', 'Bakery case'] },
  { id: 'brownie-dinner', slot: 'dinner', category: 'dessert', name: 'Brownie Bite', subtitle: 'rich chocolate square', calories: 260, protein: 3, carbs: 31, fat: 14, tags: ['Dessert', 'Chocolate'], image: images.brownie, goalBadges: ['Sweet finish', 'Chocolate fix'] },

  { id: 'caesar-wrap', slot: 'grab_go', category: 'core', name: 'Chicken Caesar Wrap', subtitle: 'high protein', calories: 420, protein: 28, carbs: 31, fat: 18, tags: ['High Protein', 'Quick'], image: images.caesarWrap, goalBadges: ['Easy between classes', 'Popular pick'] },
  { id: 'hummus-box', slot: 'grab_go', category: 'core', name: 'Hummus & Veggie Box', subtitle: 'vegetarian • quick', calories: 310, protein: 11, carbs: 22, fat: 15, tags: ['Vegetarian', 'Quick'], image: images.hummusBox, featured: true, goalBadges: ['Light add-on', 'Fresh snack'] },
  { id: 'turkey-sandwich', slot: 'grab_go', category: 'core', name: 'Turkey Club Sandwich', subtitle: 'grab-and-go favorite', calories: 390, protein: 24, carbs: 29, fat: 17, tags: ['Popular', 'Quick'], image: images.turkeyWrap, goalBadges: ['Easy between classes', 'Classic pick'] },
  { id: 'yogurt-parfait', slot: 'grab_go', category: 'core', name: 'Berry Yogurt Parfait', subtitle: 'granola & berries', calories: 280, protein: 14, carbs: 32, fat: 9, tags: ['Fresh', 'Quick'], image: images.overnightOats, goalBadges: ['Sweet snack', 'Lighter option'] },
  { id: 'protein-box', slot: 'grab_go', category: 'core', name: 'Protein Snack Box', subtitle: 'cheese, fruit & crackers', calories: 340, protein: 18, carbs: 27, fat: 14, tags: ['High Protein', 'Snack Box'], image: images.hummusBox, goalBadges: ['Afternoon fuel', 'Easy add-on'] }
];

export const slotMeta: Record<MealSlot, SlotMeta> = {
  breakfast: { label: 'Breakfast', time: '7:30 - 10:00 AM', icon: 'sunny-outline' },
  lunch: { label: 'Lunch', time: '11:00 AM - 2:00 PM', icon: 'sunny-outline' },
  dinner: { label: 'Dinner', time: '5:00 - 8:00 PM', icon: 'moon-outline' },
  grab_go: { label: 'Grab & Go', time: 'All day', icon: 'bag-handle-outline' }
};

export const todaysPlan: Record<MealSlot, string> = {
  breakfast: 'overnight-oats',
  lunch: 'grilled-chicken-bowl',
  dinner: 'baked-salmon',
  grab_go: 'caesar-wrap'
};

export const initialExtras: Record<MealSlot, string[]> = {
  breakfast: [],
  lunch: ['strawberries-lunch'],
  dinner: ['watermelon-dinner'],
  grab_go: []
};

export const slotOrder: MealSlot[] = ['breakfast', 'lunch', 'dinner', 'grab_go'];

export const homeGoalMetrics: GoalMetric[] = [
  { label: 'Calories', value: '1,400 / 1,800 kcal', subvalue: 'On track', progress: 0.78 },
  { label: 'Protein', value: '95 / 120 g', subvalue: 'Strong', progress: 0.79 },
  { label: 'Water', value: '5 / 8 glasses', subvalue: 'Keep going', progress: 0.62 }
];

export const quickActions = [
  { id: 'plan', label: 'My Plan', subtitle: "Today's targets", icon: 'calendar-outline' },
  { id: 'grab', label: 'Grab & Go', subtitle: 'Pre-made meals', icon: 'bag-handle-outline' },
  { id: 'favorites', label: 'My Favorites', subtitle: 'Saved for later', icon: 'heart-outline' }
];

export const setupGoals = ['Eat lighter', 'Maintain', 'Build muscle'];
export const setupPreferences = ['Vegetarian', 'High Protein', 'Low Sugar', 'Quick Meals'];


export const defaultStudentPlan: StudentPlan = {
  goal: 'Eat lighter',
  activity: 'Moderate',
  preferences: ['Vegetarian', 'Quick Meals']
};

const weekDayKeys: WeekDayKey[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const goalMealRotations: Record<StudentGoal, Record<MealSlot, string[]>> = {
  'Eat lighter': {
    breakfast: ['overnight-oats', 'berry-smoothie', 'avocado-toast', 'scrambled-eggs'],
    lunch: ['grilled-salmon', 'chickpea-salad', 'caprese-chicken-salad', 'vegetarian-buddha-bowl', 'grilled-chicken-bowl'],
    dinner: ['lentil-soup', 'tofu-stir-fry', 'baked-salmon'],
    grab_go: ['hummus-box', 'yogurt-parfait', 'protein-box']
  },
  Maintain: {
    breakfast: ['scrambled-eggs', 'overnight-oats', 'avocado-toast', 'berry-smoothie'],
    lunch: ['grilled-chicken-bowl', 'whole-wheat-pasta', 'turkey-avocado-wrap', 'chickpea-salad'],
    dinner: ['baked-salmon', 'tofu-stir-fry', 'pepperoni-pizza-dinner', 'lentil-soup'],
    grab_go: ['caesar-wrap', 'hummus-box', 'turkey-sandwich', 'yogurt-parfait']
  },
  'Build muscle': {
    breakfast: ['scrambled-eggs', 'overnight-oats', 'avocado-toast'],
    lunch: ['grilled-chicken-bowl', 'grilled-salmon', 'caprese-chicken-salad', 'turkey-avocado-wrap'],
    dinner: ['baked-salmon', 'chicken-tenders-dinner', 'pepperoni-pizza-dinner', 'tofu-stir-fry'],
    grab_go: ['caesar-wrap', 'protein-box', 'turkey-sandwich', 'yogurt-parfait']
  }
};

const vegetarianMealRotations: Record<MealSlot, string[]> = {
  breakfast: ['overnight-oats', 'avocado-toast', 'berry-smoothie', 'scrambled-eggs'],
  lunch: ['vegetarian-buddha-bowl', 'chickpea-salad', 'whole-wheat-pasta'],
  dinner: ['tofu-stir-fry', 'lentil-soup'],
  grab_go: ['hummus-box', 'yogurt-parfait']
};

const lunchDessertRotations: Record<StudentGoal, string[]> = {
  'Eat lighter': ['strawberries-lunch', 'pineapple-lunch', 'green-grapes-lunch'],
  Maintain: ['strawberries-lunch', 'cookie-lunch', 'pineapple-lunch'],
  'Build muscle': ['cookie-lunch', 'pineapple-lunch', 'green-grapes-lunch']
};

const dinnerDessertRotations: Record<StudentGoal, string[]> = {
  'Eat lighter': ['watermelon-dinner', 'mango-dinner', 'cantaloupe-dinner'],
  Maintain: ['watermelon-dinner', 'cookie-dinner', 'brownie-dinner'],
  'Build muscle': ['brownie-dinner', 'cookie-dinner', 'watermelon-dinner']
};

const homeSpecialRotations: Record<StudentGoal, string[]> = {
  'Eat lighter': ['overnight-oats', 'grilled-salmon', 'strawberries-lunch'],
  Maintain: ['scrambled-eggs', 'grilled-chicken-bowl', 'orange-juice'],
  'Build muscle': ['scrambled-eggs', 'grilled-chicken-bowl', 'caesar-wrap']
};

const dessertSpotlights: Record<StudentGoal, string[]> = {
  'Eat lighter': ['strawberries-lunch', 'pineapple-lunch', 'watermelon-dinner'],
  Maintain: ['strawberries-lunch', 'cookie-dinner', 'brownie-dinner'],
  'Build muscle': ['cookie-lunch', 'brownie-dinner', 'pineapple-lunch']
};

const homeMetricsByGoal: Record<StudentGoal, GoalMetric[]> = {
  'Eat lighter': [
    { label: 'Calories', value: '1,420 / 1,800 kcal', subvalue: 'Lighter picks', progress: 0.79 },
    { label: 'Protein', value: '96 / 120 g', subvalue: 'Lean fuel', progress: 0.8 },
    { label: 'Water', value: '5 / 8 glasses', subvalue: 'Keep going', progress: 0.62 }
  ],
  Maintain: [
    { label: 'Calories', value: '1,860 / 2,050 kcal', subvalue: 'Steady week', progress: 0.91 },
    { label: 'Protein', value: '112 / 125 g', subvalue: 'Balanced', progress: 0.9 },
    { label: 'Water', value: '6 / 8 glasses', subvalue: 'On track', progress: 0.75 }
  ],
  'Build muscle': [
    { label: 'Calories', value: '2,180 / 2,400 kcal', subvalue: 'Fueling gains', progress: 0.91 },
    { label: 'Protein', value: '138 / 145 g', subvalue: 'Protein focus', progress: 0.95 },
    { label: 'Water', value: '6 / 8 glasses', subvalue: 'Recovery', progress: 0.75 }
  ]
};

const heroCopyByGoal: Record<StudentGoal, { title: string; subtitle: string; banner: string }> = {
  'Eat lighter': {
    title: 'Built around lighter choices',
    subtitle: 'Fresh picks, balanced portions, and easier defaults for your week.',
    banner: 'Current plan · Eat lighter'
  },
  Maintain: {
    title: 'Built around balance',
    subtitle: 'Steady energy, familiar favorites, and meals that fit your routine.',
    banner: 'Current plan · Maintain'
  },
  'Build muscle': {
    title: 'Built around muscle goals',
    subtitle: 'Protein-forward meals and stronger recovery picks are ready.',
    banner: 'Current plan · Build muscle'
  }
};

function hasPreference(plan: StudentPlan, preference: StudentPreference) {
  return plan.preferences.includes(preference);
}

function mealPriorityScore(meal: Meal, plan: StudentPlan): number {
  let score = 0;
  if (plan.goal === 'Build muscle') {
    score += meal.protein * 2 - meal.calories * 0.08;
    if (meal.tags.includes('High Protein')) score += 18;
  } else if (plan.goal === 'Eat lighter') {
    score += 500 - meal.calories;
    if (meal.tags.includes('Low Sugar')) score += 10;
    if (meal.tags.includes('Vegetarian')) score += 6;
    if (meal.tags.includes('High Fiber')) score += 10;
  } else {
    score += 100 - Math.abs(meal.calories - 480);
    if (meal.tags.includes('Balanced')) score += 14;
  }
  if (hasPreference(plan, 'Vegetarian') && meal.tags.includes('Vegetarian')) score += 26;
  if (hasPreference(plan, 'High Protein') && meal.tags.includes('High Protein')) score += 18;
  if (hasPreference(plan, 'Low Sugar') && meal.tags.includes('Low Sugar')) score += 14;
  if (hasPreference(plan, 'Quick Meals') && meal.tags.includes('Quick')) score += 10;
  if (meal.category === 'classic' && plan.goal === 'Eat lighter') score -= 12;
  return score;
}

function getRotationForSlot(plan: StudentPlan, slot: MealSlot) {
  if (hasPreference(plan, 'Vegetarian')) {
    const vegetarianPool = vegetarianMealRotations[slot];
    if (vegetarianPool?.length) return vegetarianPool;
  }
  return goalMealRotations[plan.goal][slot];
}

export function buildWeeklySelectionsForPlan(plan: StudentPlan): Record<WeekDayKey, Record<MealSlot, string>> {
  const next = {} as Record<WeekDayKey, Record<MealSlot, string>>;
  weekDayKeys.forEach((dayKey, index) => {
    next[dayKey] = {
      breakfast: getRotationForSlot(plan, 'breakfast')[index % getRotationForSlot(plan, 'breakfast').length],
      lunch: getRotationForSlot(plan, 'lunch')[index % getRotationForSlot(plan, 'lunch').length],
      dinner: dayKey === 'sun' ? '' : getRotationForSlot(plan, 'dinner')[index % getRotationForSlot(plan, 'dinner').length],
      grab_go: getRotationForSlot(plan, 'grab_go')[index % getRotationForSlot(plan, 'grab_go').length]
    };
  });
  return next;
}

export function buildWeeklyExtraSelectionsForPlan(plan: StudentPlan): Record<WeekDayKey, Record<MealSlot, string[]>> {
  const lunchRotation = lunchDessertRotations[plan.goal];
  const dinnerRotation = dinnerDessertRotations[plan.goal];
  return {
    mon: { breakfast: [], lunch: [lunchRotation[0]], dinner: [dinnerRotation[0]], grab_go: [] },
    tue: { breakfast: [], lunch: [lunchRotation[1 % lunchRotation.length]], dinner: [], grab_go: [] },
    wed: { breakfast: [], lunch: [], dinner: [dinnerRotation[1 % dinnerRotation.length]], grab_go: [] },
    thu: { breakfast: [], lunch: [lunchRotation[2 % lunchRotation.length]], dinner: [dinnerRotation[2 % dinnerRotation.length]], grab_go: [] },
    fri: { breakfast: [], lunch: [lunchRotation[0]], dinner: [dinnerRotation[1 % dinnerRotation.length]], grab_go: [] },
    sat: { breakfast: [], lunch: [], dinner: [dinnerRotation[0]], grab_go: [] },
    sun: { breakfast: [], lunch: [lunchRotation[1 % lunchRotation.length]], dinner: [], grab_go: [] }
  };
}

export function getGoalMetricsForPlan(plan: StudentPlan): GoalMetric[] {
  return homeMetricsByGoal[plan.goal];
}

export function getHeroCopyForPlan(plan: StudentPlan) {
  return heroCopyByGoal[plan.goal];
}

export function getHomeSpecialIdsForPlan(plan: StudentPlan) {
  return homeSpecialRotations[plan.goal];
}

export function getDessertSpotlightIdsForPlan(plan: StudentPlan) {
  return dessertSpotlights[plan.goal];
}

export function getPlanFocusLabel(plan: StudentPlan) {
  const preferenceText = plan.preferences.length ? ` • ${plan.preferences.slice(0, 2).join(' • ')}` : '';
  return `${plan.goal}${preferenceText}`;
}

export function sortMealsForPlan(plan: StudentPlan, items: Meal[]) {
  return [...items].sort((a, b) => mealPriorityScore(b, plan) - mealPriorityScore(a, plan));
}

export const campusClassicIds = ['pepperoni-pizza-lunch', 'cheeseburger-lunch', 'french-fries-lunch', 'chicken-tenders-lunch'];
export const dessertIds = ['strawberries-lunch', 'brownie-dinner', 'cookie-dinner'];
export const favoriteSpotlightIds = ['grilled-salmon', 'baked-salmon', 'yogurt-parfait'];
export const grabGoSpotlightIds = ['caesar-wrap', 'turkey-sandwich', 'yogurt-parfait', 'protein-box'];

export const findMeal = (mealId: string) => meals.find((meal) => meal.id === mealId)!;

export const weeklyPlanDays = [
  { key: 'mon', label: 'Mon', state: 'planned', note: 'All meals selected' },
  { key: 'tue', label: 'Tue', state: 'planned', note: 'Lunch swapped' },
  { key: 'wed', label: 'Wed', state: 'planned', note: 'Dessert added' },
  { key: 'thu', label: 'Thu', state: 'planned', note: 'Grab & Go added' },
  { key: 'fri', label: 'Fri', state: 'planned', note: 'All meals selected' },
  { key: 'sat', label: 'Sat', state: 'planned', note: 'All meals selected' },
  { key: 'sun', label: 'Sun', state: 'planned', note: 'All meals selected' }
] as const;


export const currentWeekDayKey = 'fri' as const;

export const weekDayMeta = {
  mon: { label: 'Mon', fullLabel: 'Monday', shortDate: 'Apr 21' },
  tue: { label: 'Tue', fullLabel: 'Tuesday', shortDate: 'Apr 22' },
  wed: { label: 'Wed', fullLabel: 'Wednesday', shortDate: 'Apr 23' },
  thu: { label: 'Thu', fullLabel: 'Thursday', shortDate: 'Apr 24' },
  fri: { label: 'Fri', fullLabel: 'Friday', shortDate: 'Apr 25' },
  sat: { label: 'Sat', fullLabel: 'Saturday', shortDate: 'Apr 26' },
  sun: { label: 'Sun', fullLabel: 'Sunday', shortDate: 'Apr 27' }
} as const;

export const weeklyPlanSelections: Record<keyof typeof weekDayMeta, Record<MealSlot, string>> = {
  mon: {
    breakfast: 'scrambled-eggs',
    lunch: 'grilled-chicken-bowl',
    dinner: 'baked-salmon',
    grab_go: 'caesar-wrap'
  },
  tue: {
    breakfast: 'overnight-oats',
    lunch: 'grilled-salmon',
    dinner: 'tofu-stir-fry',
    grab_go: 'protein-box'
  },
  wed: {
    breakfast: 'berry-smoothie',
    lunch: 'turkey-avocado-wrap',
    dinner: 'lentil-soup',
    grab_go: 'yogurt-parfait'
  },
  thu: {
    breakfast: 'avocado-toast',
    lunch: 'caprese-chicken-salad',
    dinner: 'pepperoni-pizza-dinner',
    grab_go: 'hummus-box'
  },
  fri: todaysPlan,
  sat: {
    breakfast: 'overnight-oats',
    lunch: 'vegetarian-buddha-bowl',
    dinner: 'chicken-tenders-dinner',
    grab_go: 'turkey-sandwich'
  },
  sun: {
    breakfast: 'scrambled-eggs',
    lunch: 'pepperoni-pizza-lunch',
    dinner: '',
    grab_go: 'protein-box'
  }
};

export const weeklyExtraSelections: Record<keyof typeof weekDayMeta, Record<MealSlot, string[]>> = {
  mon: {
    breakfast: [],
    lunch: ['strawberries-lunch'],
    dinner: ['watermelon-dinner'],
    grab_go: []
  },
  tue: {
    breakfast: [],
    lunch: ['pineapple-lunch'],
    dinner: [],
    grab_go: []
  },
  wed: {
    breakfast: [],
    lunch: [],
    dinner: ['cookie-dinner'],
    grab_go: []
  },
  thu: {
    breakfast: [],
    lunch: ['green-grapes-lunch'],
    dinner: ['brownie-dinner'],
    grab_go: []
  },
  fri: initialExtras,
  sat: {
    breakfast: [],
    lunch: [],
    dinner: ['brownie-dinner'],
    grab_go: []
  },
  sun: {
    breakfast: [],
    lunch: ['cookie-lunch'],
    dinner: [],
    grab_go: []
  }
};

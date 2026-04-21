import { GoalMetric, Meal, MealSlot, SlotMeta } from '../types';

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
  sarahAvatar: require('../../../assets/sarah-avatar.jpg'),
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

export const campusClassicIds = ['pepperoni-pizza-lunch', 'cheeseburger-lunch', 'french-fries-lunch', 'chicken-tenders-lunch'];
export const dessertIds = ['strawberries-lunch', 'brownie-dinner', 'cookie-dinner'];
export const favoriteSpotlightIds = ['grilled-salmon', 'baked-salmon', 'yogurt-parfait'];
export const grabGoSpotlightIds = ['caesar-wrap', 'turkey-sandwich', 'yogurt-parfait', 'protein-box'];

export const findMeal = (mealId: string) => meals.find((meal) => meal.id === mealId)!;

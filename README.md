# Smart Meal Plan — Unified

Combines the Student and Staff (Cafeteria) apps into a single Expo project with a role-selection home screen.

## What you get

- **Role Select (home)** — the first screen you see. Choose *Student* or *Staff*.
- **Student app** — Home, Menu, My Plan, Profile + MealDetail / Swap / Extras / SetupPlan / Favorites (all original functionality from `student_v19`).
- **Staff app** — Dashboard, Breakfast, Lunch, Dinner, Grab & Go, Upload (all original functionality from `cafev5`).
- **Switch role pill** — floating top-right button in both apps that returns to the Role Select screen.

## Run it

```bash
npm install
npx expo start
```

Then press `i` (iOS simulator), `a` (Android), or scan the QR with Expo Go.

## Structure

```
App.tsx                     Root — holds role state and routes to the right navigator
app.json, package.json, tsconfig.json
assets/                     All meal images (merged from both projects, deduped)
src/
├── screens/
│   └── RoleSelectScreen.tsx     Initial home: Student vs Staff
├── theme/
│   └── colors.ts                Merged color palette
├── student/
│   ├── navigation/
│   │   ├── StudentRoot.tsx      Stack + Tabs (the whole original student App)
│   │   └── types.ts             RootStackParamList + TabParamList
│   ├── screens/                 Home, Menu, MyPlan, Profile, MealDetail, Swap, Extras, SetupPlan, Favorites
│   ├── components/              MenuMealCard, PlanMealCard, etc.
│   ├── data/mockData.ts
│   └── types.ts
└── staff/
    ├── navigation/
    │   └── StaffRoot.tsx        Tab Navigator (the whole original cafe App)
    ├── screens/                 CafeDashboard, ServiceResults, MenuUpload
    ├── components/              ResultRow, MetricCard, etc.
    ├── data/                    mockData.ts + cafeteriaData.ts
    └── types.ts
```

Student and Staff code is kept in separate folders because both originally had their own `types.ts` and `mockData.ts` with overlapping names. Keeping them isolated means either app can be updated without affecting the other.

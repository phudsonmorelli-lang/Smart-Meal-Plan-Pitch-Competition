import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import CafeDashboardScreen from '../screens/CafeDashboardScreen';
import ServiceResultsScreen from '../screens/ServiceResultsScreen';
import MenuUploadScreen from '../screens/MenuUploadScreen';

export type StaffTabParamList = {
  Dashboard: undefined;
  Breakfast: undefined;
  Lunch: undefined;
  Dinner: undefined;
  GrabGo: undefined;
  WeeklyMenu: undefined;
};

const Tab = createBottomTabNavigator<StaffTabParamList>();

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

type Props = {
  onSwitchRole: () => void;
};

export default function StaffRoot({ onSwitchRole }: Props) {
  return (
    <View style={{ flex: 1, backgroundColor: colors.cream }}>
      <NavigationContainer theme={navTheme}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: {
              height: 92,
              paddingTop: 8,
              paddingBottom: 12,
              backgroundColor: colors.paper,
              borderTopColor: colors.border
            },
            tabBarActiveTintColor: colors.forestDark,
            tabBarInactiveTintColor: '#70756C',
            tabBarLabelStyle: {
              fontSize: 11,
              fontWeight: '800'
            },
            tabBarIcon: ({ color, focused }) => {
              const iconMap: Record<string, { active: keyof typeof Ionicons.glyphMap; inactive: keyof typeof Ionicons.glyphMap }> = {
                Dashboard: { active: 'briefcase', inactive: 'briefcase-outline' },
                Breakfast: { active: 'sunny', inactive: 'sunny-outline' },
                Lunch: { active: 'restaurant', inactive: 'restaurant-outline' },
                Dinner: { active: 'moon', inactive: 'moon-outline' },
                GrabGo: { active: 'bag-handle', inactive: 'bag-handle-outline' },
                WeeklyMenu: { active: 'cloud-upload', inactive: 'cloud-upload-outline' }
              };
              const icons = iconMap[route.name];
              return <Ionicons name={focused ? icons.active : icons.inactive} size={22} color={color} />;
            },
            tabBarItemStyle: {
              marginHorizontal: 2,
              borderRadius: 18
            },
            tabBarActiveBackgroundColor: '#E7F0D6'
          })}
        >
          <Tab.Screen name="Dashboard" component={CafeDashboardScreen} options={{ title: 'Results' }} />
          <Tab.Screen name="Breakfast">{() => <ServiceResultsScreen slot="breakfast" />}</Tab.Screen>
          <Tab.Screen name="Lunch">{() => <ServiceResultsScreen slot="lunch" />}</Tab.Screen>
          <Tab.Screen name="Dinner">{() => <ServiceResultsScreen slot="dinner" />}</Tab.Screen>
          <Tab.Screen name="GrabGo" options={{ title: 'Grab & Go' }}>{() => <ServiceResultsScreen slot="grab_go" />}</Tab.Screen>
          <Tab.Screen name="WeeklyMenu" component={MenuUploadScreen} options={{ title: 'Upload' }} />
        </Tab.Navigator>
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
    </View>
  );
}

import React from 'react';
import { View, Text, Pressable, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, displayFont } from '../theme/colors';

export type Role = 'student' | 'staff';

type Props = {
  onSelectRole: (role: Role) => void;
};

export default function RoleSelectScreen({ onSelectRole }: Props) {
  return (
    <View style={{ flex: 1, backgroundColor: colors.forestDark }}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={[colors.forestDark, colors.forest, colors.forestLight]}
        style={StyleSheet.absoluteFill}
      />
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.logoBubble}>
              <Ionicons name="leaf" size={32} color={colors.forestDark} />
            </View>
            <Text style={styles.brand}>Smart Meal Plan</Text>
            <Text style={styles.tagline}>Choose how you want to sign in today</Text>
          </View>

          <View style={styles.cards}>
            <Pressable
              onPress={() => onSelectRole('student')}
              style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
              android_ripple={{ color: 'rgba(255,255,255,0.12)' }}
            >
              <View style={[styles.cardIcon, { backgroundColor: colors.softGreen }]}>
                <Ionicons name="school" size={30} color={colors.forestDark} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>Student</Text>
                <Text style={styles.cardSub}>Plan your week, swap meals, and track goals.</Text>
              </View>
              <Ionicons name="chevron-forward" size={22} color={colors.textSoft} />
            </Pressable>

            <Pressable
              onPress={() => onSelectRole('staff')}
              style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
              android_ripple={{ color: 'rgba(255,255,255,0.12)' }}
            >
              <View style={[styles.cardIcon, { backgroundColor: '#F7E6C4' }]}>
                <Ionicons name="briefcase" size={28} color={colors.softOrangeDark} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>Staff</Text>
                <Text style={styles.cardSub}>View campus results and upload weekly menus.</Text>
              </View>
              <Ionicons name="chevron-forward" size={22} color={colors.textSoft} />
            </Pressable>
          </View>

          <Text style={styles.footer}>You can switch roles anytime from inside the app.</Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
    justifyContent: 'space-between'
  },
  header: {
    alignItems: 'center',
    marginTop: 40
  },
  logoBubble: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.cream,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8
  },
  brand: {
    fontFamily: displayFont,
    fontSize: 34,
    fontWeight: '700',
    color: colors.cream,
    letterSpacing: 0.3,
    marginBottom: 10
  },
  tagline: {
    fontSize: 15,
    color: 'rgba(246, 242, 235, 0.78)',
    textAlign: 'center',
    maxWidth: 280,
    lineHeight: 21
  },
  cards: {
    gap: 16,
    marginBottom: 40
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.paper,
    borderRadius: 22,
    paddingVertical: 20,
    paddingHorizontal: 18,
    gap: 16,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6
  },
  cardPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.985 }]
  },
  cardIcon: {
    width: 56,
    height: 56,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardTitle: {
    fontFamily: displayFont,
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4
  },
  cardSub: {
    fontSize: 13.5,
    color: colors.textSoft,
    lineHeight: 19
  },
  footer: {
    textAlign: 'center',
    fontSize: 12.5,
    color: 'rgba(246, 242, 235, 0.65)',
    letterSpacing: 0.3
  }
});

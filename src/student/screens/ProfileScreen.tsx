import React, { useEffect, useMemo, useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../navigation/types';
import ScreenShell from '../components/ScreenShell';
import PrimaryButton from '../components/PrimaryButton';
import { studentProfile, setupGoals, setupPreferences } from '../data/mockData';
import { ActivityLevel, StudentPlan, StudentPreference } from '../types';
import { colors, displayFont } from '../../theme/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'Tabs'> & {
  studentPlan: StudentPlan;
  onUpdateStudentPlan: (nextPlan: StudentPlan) => void;
};

const goalSubtitles: Record<string, string> = {
  'Eat lighter': 'Feel good, day to day',
  Maintain: 'Stay balanced',
  'Build muscle': 'Get stronger'
};

const activityDescriptions: Record<ActivityLevel, string> = {
  Low: 'Mostly sitting',
  Moderate: 'Some exercise',
  High: 'Very active'
};

export default function ProfileScreen({ navigation, studentPlan, onUpdateStudentPlan }: Props) {
  const [selectedGoal, setSelectedGoal] = useState(studentPlan.goal);
  const [selectedActivity, setSelectedActivity] = useState(studentPlan.activity);
  const [selectedPreferences, setSelectedPreferences] = useState<StudentPreference[]>(studentPlan.preferences);
  const [savedAt, setSavedAt] = useState(0);

  useEffect(() => {
    setSelectedGoal(studentPlan.goal);
    setSelectedActivity(studentPlan.activity);
    setSelectedPreferences(studentPlan.preferences);
  }, [studentPlan]);

  const selectedPreferenceLabel = useMemo(() => {
    if (selectedPreferences.length === 0) return 'No preferences selected';
    if (selectedPreferences.length <= 2) return selectedPreferences.join(' • ');
    return `${selectedPreferences.slice(0, 2).join(' • ')} +${selectedPreferences.length - 2}`;
  }, [selectedPreferences]);

  const hasChanges =
    selectedGoal !== studentPlan.goal ||
    selectedActivity !== studentPlan.activity ||
    selectedPreferences.join('|') !== studentPlan.preferences.join('|');

  const togglePreference = (preference: StudentPreference) => {
    setSelectedPreferences((current) =>
      current.includes(preference)
        ? current.filter((item) => item !== preference)
        : [...current, preference]
    );
  };

  return (
    <ScreenShell
      onNotificationsPress={() => navigation.navigate('Favorites')}
      onScannerPress={() => navigation.navigate('Tabs', { screen: 'MyPlan' } as never)}
    >
      <View
        style={{
          backgroundColor: colors.paper,
          borderRadius: 28,
          borderWidth: 1,
          borderColor: colors.border,
          overflow: 'visible',
          marginBottom: 18
        }}
      >
        <View style={{ height: 118, backgroundColor: '#6C4B35' }} />
        <View style={{ paddingHorizontal: 20, paddingBottom: 20, paddingTop: 54 }}>
          <View
            style={{
              position: 'absolute',
              right: 22,
              top: 54,
              width: 124,
              height: 124,
              borderRadius: 62,
              backgroundColor: colors.paper,
              borderWidth: 5,
              borderColor: colors.paper,
              shadowColor: '#000',
              shadowOpacity: 0.12,
              shadowRadius: 10,
              shadowOffset: { width: 0, height: 5 },
              elevation: 5,
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden'
            }}
          >
            <Image
              source={studentProfile.avatar}
              style={{ width: 118, height: 118, borderRadius: 59 }}
            />
            <View
              style={{
                position: 'absolute',
                right: 2,
                bottom: 4,
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: colors.paper,
                borderWidth: 1,
                borderColor: colors.border,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Ionicons name="camera-outline" size={16} color={colors.forestDark} />
            </View>
          </View>
          <Text style={{ color: colors.forestDark, fontFamily: displayFont, fontSize: 30, fontWeight: '700', paddingRight: 118 }}>
            {studentProfile.fullName}
          </Text>
          <Text style={{ color: colors.textSoft, marginTop: 4 }}>Always fueling my best days 🌿</Text>

          <View style={{ flexDirection: 'row', gap: 10, marginTop: 16 }}>
            <View
              style={{
                flex: 1,
                backgroundColor: '#F7F3EC',
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: 18,
                padding: 14
              }}
            >
              <Text style={{ color: colors.textSoft, fontSize: 12, fontWeight: '800', letterSpacing: 0.4 }}>PRIMARY GOAL</Text>
              <Text style={{ color: colors.text, fontSize: 18, fontWeight: '900', marginTop: 6 }}>{selectedGoal}</Text>
              <Text numberOfLines={1} style={{ color: colors.textSoft, fontSize: 13, marginTop: 6 }}>{selectedPreferenceLabel}</Text>
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: '#F7F3EC',
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: 18,
                padding: 14
              }}
            >
              <Text style={{ color: colors.textSoft, fontSize: 12, fontWeight: '800', letterSpacing: 0.4 }}>STUDENT ID</Text>
              <Text style={{ color: colors.text, fontSize: 18, fontWeight: '900', marginTop: 6 }}>284731</Text>
              <Text numberOfLines={1} style={{ color: colors.textSoft, fontSize: 13, marginTop: 6 }}>{selectedActivity}</Text>
            </View>
          </View>
        </View>
      </View>

      <View
        style={{
          backgroundColor: colors.paper,
          borderRadius: 28,
          borderWidth: 1,
          borderColor: colors.border,
          padding: 20
        }}
      >
        <Text style={{ color: colors.forestDark, fontFamily: displayFont, fontSize: 30, fontWeight: '700', textAlign: 'center' }}>
          Set up your plan
        </Text>
        <Text style={{ color: colors.textSoft, marginTop: 10, textAlign: 'center', lineHeight: 22 }}>
          Update your goal once and Smart Meal Plan will refresh Home, My Plan, and Menu.
        </Text>

        <View
          style={{
            marginTop: 22,
            backgroundColor: '#F7F3EC',
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 20,
            padding: 14,
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <Image source={studentProfile.avatar} style={{ width: 64, height: 64, borderRadius: 32, marginRight: 14 }} />
          <View style={{ flex: 1 }}>
            <Text style={{ color: colors.text, fontWeight: '900', fontSize: 17 }}>Profile photo</Text>
            <Text style={{ color: colors.textSoft, marginTop: 4 }}>Updated Sarah profile portrait</Text>
          </View>
          <View
            style={{
              width: 34,
              height: 34,
              borderRadius: 17,
              backgroundColor: colors.paper,
              borderWidth: 1,
              borderColor: colors.border,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Ionicons name="image-outline" size={18} color={colors.forestDark} />
          </View>
        </View>

        <View style={{ marginTop: 22 }}>
          <Text style={{ color: colors.text, fontSize: 18, fontWeight: '900', marginBottom: 12 }}>What should we call you?</Text>
          <View
            style={{
              backgroundColor: '#FBF9F4',
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: 16,
              paddingHorizontal: 16,
              paddingVertical: 15,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Text style={{ color: colors.textSoft, fontSize: 17 }}>{studentProfile.firstName}</Text>
            <Ionicons name="person-outline" size={18} color={colors.textSoft} />
          </View>
        </View>

        <View style={{ marginTop: 22 }}>
          <Text style={{ color: colors.text, fontSize: 18, fontWeight: '900', marginBottom: 12 }}>What’s your main goal?</Text>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            {setupGoals.map((goal) => {
              const selected = goal === selectedGoal;
              return (
                <Pressable
                  key={goal}
                  onPress={() => setSelectedGoal(goal as StudentPlan['goal'])}
                  style={{
                    flex: 1,
                    minWidth: 0,
                    backgroundColor: selected ? '#EEF4E5' : '#FBF8F2',
                    borderWidth: 1,
                    borderColor: selected ? '#C9DAB9' : colors.border,
                    borderRadius: 20,
                    paddingHorizontal: 12,
                    paddingVertical: 16,
                    justifyContent: 'space-between'
                  }}
                >
                  {selected ? (
                    <View style={{ alignSelf: 'flex-end', marginBottom: 6 }}>
                      <Ionicons name="checkmark-circle" size={22} color={colors.forest} />
                    </View>
                  ) : (
                    <View style={{ height: 28 }} />
                  )}
                  <Text numberOfLines={2} adjustsFontSizeToFit minimumFontScale={0.82} style={{ color: colors.text, fontWeight: '900', fontSize: 16, lineHeight: 20 }}>
                    {goal}
                  </Text>
                  <Text numberOfLines={2} style={{ color: colors.textSoft, marginTop: 8, lineHeight: 17, fontSize: 13 }}>
                    {goalSubtitles[goal]}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={{ marginTop: 22 }}>
          <Text style={{ color: colors.text, fontSize: 18, fontWeight: '900', marginBottom: 12 }}>How active are you?</Text>
          <View
            style={{
              flexDirection: 'row',
              borderRadius: 18,
              overflow: 'visible',
              borderWidth: 1,
              borderColor: colors.border
            }}
          >
            {(['Low', 'Moderate', 'High'] as ActivityLevel[]).map((item) => {
              const active = item === selectedActivity;
              return (
                <Pressable
                  key={item}
                  onPress={() => setSelectedActivity(item)}
                  style={{
                    flex: 1,
                    paddingVertical: 14,
                    paddingHorizontal: 6,
                    backgroundColor: active ? colors.forest : colors.paper,
                    alignItems: 'center'
                  }}
                >
                  <Text style={{ color: active ? 'white' : colors.text, fontWeight: '900', fontSize: 17 }}>{item}</Text>
                  <Text numberOfLines={2} style={{ color: active ? 'rgba(255,255,255,0.82)' : colors.textSoft, marginTop: 4, textAlign: 'center', fontSize: 12, lineHeight: 16 }}>
                    {activityDescriptions[item]}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={{ marginTop: 22 }}>
          <Text style={{ color: colors.text, fontSize: 18, fontWeight: '900', marginBottom: 12 }}>Any preferences?</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {setupPreferences.map((preference) => {
              const pref = preference as StudentPreference;
              const selected = selectedPreferences.includes(pref);
              return (
                <Pressable
                  key={preference}
                  onPress={() => togglePreference(pref)}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: selected ? colors.softGreen : colors.chip,
                    paddingHorizontal: 12,
                    paddingVertical: 10,
                    borderRadius: 999,
                    marginRight: 8,
                    marginBottom: 8,
                    borderWidth: 1,
                    borderColor: selected ? '#C9DAB9' : colors.border
                  }}
                >
                  <Ionicons
                    name={selected ? 'checkmark-circle' : 'ellipse-outline'}
                    size={16}
                    color={selected ? colors.softGreenText : colors.textSoft}
                    style={{ marginRight: 7 }}
                  />
                  <Text style={{ color: selected ? colors.softGreenText : colors.chipText, fontSize: 13, fontWeight: '800' }}>{preference}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={{ marginTop: 24 }}>
          <PrimaryButton
            title={hasChanges ? 'Update Plan' : 'Plan is up to date'}
            onPress={() => {
              onUpdateStudentPlan({
                goal: selectedGoal,
                activity: selectedActivity,
                preferences: selectedPreferences
              });
              setSavedAt(Date.now());
            }}
            style={{ backgroundColor: hasChanges ? colors.softOrange : colors.forest }}
          />
          {savedAt ? (
            <View style={{ backgroundColor: '#EEF4E8', borderRadius: 18, padding: 12, marginTop: 12, borderWidth: 1, borderColor: '#C9DAB9' }}>
              <Text style={{ color: colors.forestDark, fontWeight: '800', textAlign: 'center' }}>Plan updated across Home, My Plan, and Menu</Text>
            </View>
          ) : null}
          <View style={{ height: 12 }} />
          <PrimaryButton title="Review My Plan" onPress={() => navigation.navigate('Tabs', { screen: 'MyPlan' } as never)} variant="light" />
        </View>
      </View>
    </ScreenShell>
  );
}

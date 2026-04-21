import React from 'react';
import { Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import ScreenShell from '../components/ScreenShell';
import Tag from '../components/Tag';
import PrimaryButton from '../components/PrimaryButton';
import { colors, displayFont } from '../../theme/colors';
import { setupGoals, setupPreferences } from '../data/mockData';

type Props = NativeStackScreenProps<RootStackParamList, 'SetupPlan'>;

export default function SetupPlanScreen({ navigation }: Props) {
  return (
    <ScreenShell onNotificationsPress={() => navigation.goBack()} onScannerPress={() => navigation.goBack()}>
      <Text style={{ color: colors.forestDark, fontFamily: displayFont, fontSize: 32, fontWeight: '700', marginBottom: 10 }}>
        Plan updated
      </Text>
      <Text style={{ color: colors.textSoft, marginBottom: 20, lineHeight: 22 }}>
        This is the presentable setup flow version of the demo. You can keep iterating goal logic and connected data later.
      </Text>

      <View
        style={{
          backgroundColor: colors.paper,
          borderRadius: 26,
          borderWidth: 1,
          borderColor: colors.border,
          padding: 20
        }}
      >
        <Text style={{ color: colors.text, fontWeight: '900', fontSize: 20 }}>Sarah’s current setup</Text>
        <Text style={{ color: colors.textSoft, marginTop: 8 }}>Texas Wesleyan University • Eat lighter • Moderate activity</Text>

        <Text style={{ color: colors.text, fontWeight: '900', fontSize: 18, marginTop: 20 }}>Goals</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 12 }}>
          {setupGoals.map((goal, index) => (
            <Tag key={goal} label={goal} variant={index === 0 ? 'soft' : 'default'} />
          ))}
        </View>

        <Text style={{ color: colors.text, fontWeight: '900', fontSize: 18, marginTop: 20 }}>Preferences</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 12 }}>
          {setupPreferences.map((preference) => (
            <Tag key={preference} label={preference} />
          ))}
        </View>

        <View style={{ marginTop: 24 }}>
          <PrimaryButton title="Back to Profile" onPress={() => navigation.navigate('Tabs', { screen: 'Profile' } as never)} />
        </View>
      </View>
    </ScreenShell>
  );
}

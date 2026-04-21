import React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenShell from '../components/ScreenShell';
import SectionHeader from '../components/SectionHeader';
import PrimaryButton from '../components/PrimaryButton';
import Tag from '../components/Tag';
import { colors, displayFont } from '../../theme/colors';

const services = [
  { label: 'Breakfast', time: '7:30 - 10:00 AM', status: 'Uploaded', note: '8 items loaded for Mon–Sun', icon: 'sunny-outline' as const, tag: '8 items' },
  { label: 'Lunch', time: '11:00 AM - 2:00 PM', status: 'Uploaded', note: '22 items loaded for Mon–Sun', icon: 'restaurant-outline' as const, tag: '22 items' },
  { label: 'Dinner', time: '5:00 - 8:00 PM', status: 'Draft saved', note: 'Main entrees uploaded, specials pending', icon: 'moon-outline' as const, tag: 'Draft' },
  { label: 'Grab & Go', time: 'All day', status: 'Uploaded', note: '6 ready-to-go items scheduled for Mon–Sun', icon: 'bag-handle-outline' as const, tag: '6 items' }
];

function UploadCard({ label, time, status, note, icon, tag }: (typeof services)[number]) {
  const statusVariant = status === 'Uploaded' ? 'soft' : 'highlight';
  return (
    <View style={{ backgroundColor: colors.paper, borderRadius: 24, borderWidth: 1, borderColor: colors.border, padding: 18, marginBottom: 14 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          <View style={{ width: 48, height: 48, borderRadius: 16, backgroundColor: '#F5E8B8', alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
            <Ionicons name={icon} size={22} color={label === 'Breakfast' ? '#B68B17' : colors.forestDark} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ color: colors.text, fontWeight: '900', fontSize: 18 }}>{label}</Text>
            <Text style={{ color: colors.textSoft, marginTop: 2 }}>{time}</Text>
          </View>
        </View>
        <Tag label={status} variant={statusVariant as any} />
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
        <Tag label={tag} variant="soft" />
        <Text style={{ color: colors.textSoft, marginLeft: 8, flex: 1 }}>{note}</Text>
        {status === 'Uploaded' ? <Ionicons name="checkmark-circle" size={20} color={colors.forestLight} /> : null}
      </View>

      <View style={{ flexDirection: 'row', gap: 10, marginTop: 16 }}>
        <PrimaryButton title="Upload menu" onPress={() => {}} style={{ flex: 1 }} icon="arrow-up-outline" />
        <PrimaryButton title="View file" variant="light" onPress={() => {}} style={{ flex: 1 }} icon="document-text-outline" />
      </View>
    </View>
  );
}

export default function MenuUploadScreen() {
  return (
    <ScreenShell>
      <Text style={{ color: colors.forestDark, fontFamily: displayFont, fontSize: 34, fontWeight: '700' }}>Weekly Menu</Text>
      <Text style={{ color: colors.textSoft, marginTop: 8, marginBottom: 18 }}>
        Upload or replace the weekly cafeteria menu for each service in one place.
      </Text>

      <View style={{ backgroundColor: colors.forestDark, borderRadius: 24, padding: 18, marginBottom: 18 }}>
        <Text style={{ color: 'rgba(255,255,255,0.76)', fontWeight: '800' }}>THIS WEEK'S MENU STATUS</Text>
        <Text style={{ color: 'white', fontSize: 28, fontWeight: '900', marginTop: 6 }}>3 of 4 services ready</Text>
        <Text style={{ color: 'rgba(255,255,255,0.86)', marginTop: 6 }}>Breakfast, Lunch and Grab & Go are uploaded. Dinner is still in progress.</Text>
        <View style={{ height: 10, borderRadius: 999, backgroundColor: 'rgba(255,255,255,0.18)', marginTop: 14, overflow: 'hidden' }}>
          <View style={{ width: '75%', height: '100%', backgroundColor: '#B9D979' }} />
        </View>
      </View>

      <View style={{ backgroundColor: colors.paper, borderRadius: 24, borderWidth: 1, borderColor: colors.border, padding: 18, marginBottom: 18 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={{ color: colors.textSoft, fontWeight: '800' }}>THIS WEEK</Text>
            <Text style={{ color: colors.forestDark, fontSize: 26, fontWeight: '900', marginTop: 4 }}>April 29 – May 5</Text>
          </View>
          <View style={{ width: 44, height: 44, borderRadius: 14, backgroundColor: '#EEF2E8', alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name="calendar-outline" size={22} color={colors.forestDark} />
          </View>
        </View>
        <View style={{ gap: 10, marginTop: 16 }}>
          <PrimaryButton title="Upload weekly menu" onPress={() => {}} icon="cloud-upload-outline" />
          <PrimaryButton title="Download template" variant="light" onPress={() => {}} icon="download-outline" />
        </View>
      </View>

      <SectionHeader title="Service uploads" subtitle="Track which service is complete before publishing the full week." />
      {services.map((service) => (
        <UploadCard key={service.label} {...service} />
      ))}
    </ScreenShell>
  );
}

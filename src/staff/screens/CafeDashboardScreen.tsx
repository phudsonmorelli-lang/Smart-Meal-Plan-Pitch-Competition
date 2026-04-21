import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenShell from '../components/ScreenShell';
import MetricCard from '../components/MetricCard';
import SectionHeader from '../components/SectionHeader';
import Tag from '../components/Tag';
import { colors, displayFont } from '../../theme/colors';
import { dashboardNotes, dessertSummary, serviceMix, topCampusItems, campusResponseCount, resultMeal } from '../data/cafeteriaData';

const trendValues = [180, 260, 390, 330, 500, 380, 520];

function MiniTrendChart() {
  const max = Math.max(...trendValues);
  return (
    <View style={{ marginTop: 8 }}>
      <View style={{ height: 150, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        {trendValues.map((value, idx) => {
          const h = Math.max(36, (value / max) * 120);
          const isPeak = value === 500;
          return (
            <View key={idx} style={{ alignItems: 'center', flex: 1 }}>
              {isPeak ? (
                <View style={{ backgroundColor: '#8AC15B', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 14, marginBottom: 8, minWidth: 60 }}>
                  <Text style={{ color: 'white', fontWeight: '800', textAlign: 'center', lineHeight: 15 }}>Peak{`\n`}600</Text>
                </View>
              ) : <View style={{ height: 44 }} />}
              <View style={{ width: 22, height: h, borderRadius: 999, backgroundColor: idx >= 4 ? '#7EB84F' : '#B7D19F' }} />
            </View>
          );
        })}
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8, paddingHorizontal: 3 }}>
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((label) => (
          <Text key={label} style={{ color: colors.textSoft, fontSize: 12 }}>{label}</Text>
        ))}
      </View>
    </View>
  );
}

function InsightCard({ title, text, icon }: { title: string; text: string; icon: keyof typeof Ionicons.glyphMap }) {
  return (
    <View style={{ flex: 1, backgroundColor: colors.paper, borderRadius: 20, borderWidth: 1, borderColor: colors.border, padding: 14 }}>
      <Ionicons name={icon} size={20} color={colors.forestDark} />
      <Text style={{ color: colors.forestDark, fontWeight: '900', marginTop: 10 }}>{title}</Text>
      <Text style={{ color: colors.textSoft, marginTop: 6, lineHeight: 19 }}>{text}</Text>
    </View>
  );
}

export default function CafeDashboardScreen() {
  const leadMeal = resultMeal(topCampusItems[0].mealId);

  return (
    <ScreenShell>
      <Text style={{ color: colors.forestDark, fontFamily: displayFont, fontSize: 34, fontWeight: '700' }}>Dining Dashboard</Text>
      <Text style={{ color: colors.textSoft, marginTop: 6, marginBottom: 18 }}>
        Student choices translated into clear dining insights.
      </Text>

      <View style={{ backgroundColor: colors.forestDark, borderRadius: 28, padding: 18, marginBottom: 18, overflow: 'hidden' }}>
        <Text style={{ color: 'rgba(255,255,255,0.76)', fontWeight: '800', letterSpacing: 0.5 }}>TODAY'S LEAD SIGNAL</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
          <Image source={leadMeal.image} style={{ width: 88, height: 88, borderRadius: 22, marginRight: 14 }} />
          <View style={{ flex: 1 }}>
            <Text style={{ color: 'white', fontSize: 24, fontWeight: '900' }} numberOfLines={2}>{leadMeal.name}</Text>
            <Text style={{ color: 'rgba(255,255,255,0.86)', marginTop: 6, lineHeight: 20 }}>
              Highest demand item today with {topCampusItems[0].votes} student selections already driving lunch prep.
            </Text>
            <View style={{ flexDirection: 'row', gap: 8, marginTop: 12 }}>
              <Tag label="Top pick" variant="highlight" />
              <Tag label="Lunch leader" variant="soft" />
            </View>
          </View>
        </View>
      </View>

      <Text style={{ color: colors.forestDark, fontWeight: '900', marginBottom: 12 }}>TODAY AT A GLANCE</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 20 }} style={{ marginBottom: 18 }}>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <MetricCard label="Responses" value="500" subtitle="Submitted today" tone="forest" icon="people-outline" />
          <MetricCard label="Lunch" value="500" subtitle="Strongest service" tone="lime" icon="restaurant-outline" />
          <MetricCard label="Dinner" value="412" subtitle="Evening demand" tone="paper" icon="moon-outline" />
          <MetricCard label="Grab & Go" value="146" subtitle="Pickup requests" tone="gold" icon="bag-handle-outline" />
          <MetricCard label="Dessert" value="Fruit" subtitle="Default favorite" tone="lavender" icon="nutrition-outline" />
        </View>
      </ScrollView>

      <View style={{ backgroundColor: colors.paper, borderRadius: 24, borderWidth: 1, borderColor: colors.border, padding: 18, marginBottom: 18 }}>
        <SectionHeader title="Trend snapshot" subtitle="Weekly participation trend" />
        <MiniTrendChart />
      </View>

      <View style={{ flexDirection: 'row', gap: 12, marginBottom: 18 }}>
        <InsightCard title="Most selected meal" text="Grilled Chicken Bowl is leading lunch demand and setting the pace for production." icon="flame-outline" />
        <InsightCard title="Lowest demand watch" text="Lentil Soup remains the weakest dinner item and may need lower prep volume." icon="leaf-outline" />
      </View>

      <View style={{ backgroundColor: colors.paper, borderRadius: 24, borderWidth: 1, borderColor: colors.border, padding: 18, marginBottom: 18 }}>
        <SectionHeader title="Most selected today" subtitle={`Based on ${campusResponseCount} student responses`} />
        {topCampusItems.slice(0, 4).map((item, index) => {
          const meal = resultMeal(item.mealId);
          return (
            <View key={item.mealId} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
              <Image source={meal.image} style={{ width: 62, height: 62, borderRadius: 18, marginRight: 12 }} />
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <Text style={{ color: colors.text, fontWeight: '900', flex: 1 }}>{meal.name}</Text>
                  {index === 0 ? <Tag label="Top pick" variant="highlight" /> : null}
                </View>
                <Text style={{ color: colors.forestDark, fontWeight: '800', marginTop: 2 }}>{item.votes} votes</Text>
                <View style={{ height: 9, backgroundColor: '#E8EDE4', borderRadius: 999, marginTop: 10, overflow: 'hidden' }}>
                  <View style={{ width: `${Math.round((item.votes / campusResponseCount) * 100)}%`, height: '100%', backgroundColor: colors.forestLight }} />
                </View>
              </View>
              <Text style={{ color: colors.textSoft, marginLeft: 12, fontWeight: '700' }}>{Math.round((item.votes / campusResponseCount) * 100)}%</Text>
            </View>
          );
        })}
      </View>

      <View style={{ backgroundColor: colors.paper, borderRadius: 24, borderWidth: 1, borderColor: colors.border, padding: 18, marginBottom: 18 }}>
        <SectionHeader title="Service mix" subtitle="Selection volume by service" />
        {serviceMix.map((item) => (
          <View key={item.label} style={{ marginBottom: 12 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
              <Text style={{ color: colors.text, fontWeight: '800' }}>{item.label}</Text>
              <Text style={{ color: colors.textSoft }}>{item.value}</Text>
            </View>
            <View style={{ height: 10, borderRadius: 999, backgroundColor: '#EBEFE8', overflow: 'hidden' }}>
              <View style={{ width: `${(item.value / 500) * 100}%`, height: '100%', backgroundColor: item.label === 'Lunch' ? '#7EB84F' : item.label === 'Grab & Go' ? '#F0B23A' : colors.forest }} />
            </View>
          </View>
        ))}
      </View>

      <View style={{ backgroundColor: colors.paper, borderRadius: 24, borderWidth: 1, borderColor: colors.border, padding: 18 }}>
        <SectionHeader title="Quick read" subtitle="Signals for the dining team" />
        {dashboardNotes.map((note) => (
          <View key={note} style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 }}>
            <Ionicons name="checkmark-circle" size={18} color={colors.forestLight} style={{ marginRight: 8, marginTop: 2 }} />
            <Text style={{ color: colors.textSoft, flex: 1, lineHeight: 20 }}>{note}</Text>
          </View>
        ))}
        <View style={{ flexDirection: 'row', gap: 10, marginTop: 6 }}>
          {dessertSummary.map((item) => (
            <View key={item.label} style={{ flex: 1, backgroundColor: colors.chip, borderRadius: 18, padding: 12 }}>
              <Text style={{ color: colors.chipText, fontWeight: '800' }}>{item.label}</Text>
              <Text style={{ color: colors.forestDark, fontWeight: '900', fontSize: 18, marginTop: 6 }}>{item.value}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScreenShell>
  );
}

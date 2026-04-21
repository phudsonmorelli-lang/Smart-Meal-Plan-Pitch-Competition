import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, ScrollView, Text, View, Pressable, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, displayFont } from '../../theme/colors';
import { studentProfile } from '../data/mockData';

export default function ScreenShell({
  children,
  onNotificationsPress,
  onScannerPress,
  contentStyle
}: {
  children?: any;
  onNotificationsPress?: () => void;
  onScannerPress?: () => void;
  contentStyle?: ViewStyle;
}) {
  const [showIdCard, setShowIdCard] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: colors.forestDark }}>
      <LinearGradient
        colors={[colors.forestDark, colors.forest]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ paddingHorizontal: 20, paddingBottom: 18 }}
      >
        <SafeAreaView edges={['top']}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 16,
                  borderWidth: 1.5,
                  borderColor: 'rgba(255,255,255,0.8)',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 12
                }}
              >
                <Ionicons name="leaf-outline" size={24} color="white" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: 'white', fontSize: 18, fontFamily: displayFont, fontWeight: '700' }}>
                  Smart Meal Plan
                </Text>
                <Text style={{ color: 'rgba(255,255,255,0.88)', marginTop: 2 }}>Texas Wesleyan University</Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Pressable
                onPress={() => setShowIdCard((current) => !current)}
                style={{ width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', marginRight: 8 }}
              >
                <Ionicons name="scan-outline" size={24} color="white" />
              </Pressable>
              <Pressable
                onPress={onNotificationsPress}
                style={{ width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' }}
              >
                <Ionicons name="notifications-outline" size={24} color="white" />
              </Pressable>
            </View>
          </View>

          {showIdCard ? (
            <View
              style={{
                alignSelf: 'flex-end',
                marginTop: 12,
                backgroundColor: colors.paper,
                borderRadius: 22,
                borderWidth: 1,
                borderColor: 'rgba(20,60,52,0.12)',
                padding: 12,
                width: 254,
                shadowColor: '#000',
                shadowOpacity: 0.12,
                shadowRadius: 12,
                shadowOffset: { width: 0, height: 8 },
                elevation: 6
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={studentProfile.avatar} style={{ width: 54, height: 54, borderRadius: 27, marginRight: 12, resizeMode: 'cover' }} />
                <View style={{ flex: 1 }}>
                  <Text style={{ color: colors.text, fontWeight: '900', fontSize: 16 }}>{studentProfile.fullName}</Text>
                  <Text style={{ color: colors.textSoft, marginTop: 4, fontSize: 12, fontWeight: '800', letterSpacing: 0.4 }}>STUDENT ID</Text>
                  <Text style={{ color: colors.forestDark, marginTop: 2, fontWeight: '900' }}>{studentProfile.studentId}</Text>
                </View>
              </View>
            </View>
          ) : null}
        </SafeAreaView>
      </LinearGradient>

      <View
        style={{
          flex: 1,
          backgroundColor: colors.cream,
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
          overflow: 'hidden',
          marginTop: -6
        }}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingTop: 20,
            paddingBottom: 130,
            ...contentStyle
          }}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </View>
    </View>
  );
}

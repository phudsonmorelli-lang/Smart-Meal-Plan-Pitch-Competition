import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, Text, View, Pressable, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, displayFont } from '../../theme/colors';

function LeafAccent({ style }: { style?: any }) {
  return (
    <View style={[{ position: 'absolute' }, style]}>
      <Ionicons name="leaf" size={42} color="rgba(215, 233, 204, 0.22)" />
    </View>
  );
}

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
  return (
    <View style={{ flex: 1, backgroundColor: colors.forestDark }}>
      <LinearGradient
        colors={[colors.forestDark, colors.forest]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ paddingHorizontal: 20, paddingBottom: 18, overflow: 'hidden' }}
      >
        <LeafAccent style={{ right: 70, top: 46, transform: [{ rotate: '8deg' }] }} />
        <LeafAccent style={{ right: 32, top: 74, transform: [{ rotate: '-16deg' }], opacity: 0.75 }} />
        <SafeAreaView edges={['top']}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <View
                style={{
                  width: 52,
                  height: 52,
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
                <Text style={{ color: '#E6CA79', marginTop: 2, fontWeight: '600' }}>Texas Wesleyan University</Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Pressable
                onPress={onScannerPress}
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

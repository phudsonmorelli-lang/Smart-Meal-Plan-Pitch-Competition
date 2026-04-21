import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RoleSelectScreen, { Role } from './src/screens/RoleSelectScreen';
import StudentRoot from './src/student/navigation/StudentRoot';
import StaffRoot from './src/staff/navigation/StaffRoot';

export default function App() {
  const [role, setRole] = useState<Role | null>(null);

  const handleSwitchRole = () => setRole(null);

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      {role === null && <RoleSelectScreen onSelectRole={setRole} />}
      {role === 'student' && <StudentRoot onSwitchRole={handleSwitchRole} />}
      {role === 'staff' && <StaffRoot onSwitchRole={handleSwitchRole} />}
    </SafeAreaProvider>
  );
}

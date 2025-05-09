import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Switch, Alert, SafeAreaView } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const ProfileScreen = () => {
  const [notifications, setNotifications] = useState(true);
  const { theme, isDarkMode, toggleTheme } = useTheme();
  
  // Mock user data
  const user = {
    username: 'sports_fan123',
    email: 'user@example.com',
    joinDate: 'January 2023',
    balance: 250.75,
    stats: {
      contestsEntered: 42,
      contestsWon: 8,
      totalWinnings: 1250.50
    }
  };
  
  const handleLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => console.log('User logged out') }
      ]
    );
  };
  
  // Create dynamic styles based on theme
  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    header: {
      padding: 24,
      backgroundColor: theme.primary,
      alignItems: 'center',
    },
    username: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: 4,
    },
    email: {
      fontSize: 16,
      color: 'rgba(255, 255, 255, 0.8)',
      marginBottom: 4,
    },
    joinDate: {
      fontSize: 14,
      color: 'rgba(255, 255, 255, 0.6)',
    },
    card: {
      margin: 16,
      padding: 16,
      backgroundColor: theme.card,
      borderRadius: 8,
      shadowColor: isDarkMode ? '#000' : '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: isDarkMode ? 0.3 : 0.1,
      shadowRadius: 2,
      elevation: 1,
    },
    balanceLabel: {
      fontSize: 14,
      color: theme.secondaryText,
      marginBottom: 4,
    },
    balanceAmount: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.success,
      marginBottom: 16,
    },
    balanceActions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    balanceButton: {
      backgroundColor: isDarkMode ? '#2c2c2c' : '#f8f9fa',
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 4,
      width: '48%',
      alignItems: 'center',
    },
    balanceButtonText: {
      color: theme.primary,
      fontWeight: '600',
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 16,
      color: theme.text,
    },
    statsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    statItem: {
      alignItems: 'center',
      flex: 1,
    },
    statValue: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 4,
    },
    statLabel: {
      fontSize: 12,
      color: theme.secondaryText,
      textAlign: 'center',
    },
    settingItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    settingLabel: {
      fontSize: 16,
      color: theme.text,
    },
    settingButton: {
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    settingButtonText: {
      fontSize: 16,
      color: theme.primary,
    },
    logoutButton: {
      margin: 16,
      marginTop: 0,
      marginBottom: 32,
      padding: 16,
      backgroundColor: isDarkMode ? '#2c2c2c' : '#f8f9fa',
      borderRadius: 8,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.error,
    },
    logoutButtonText: {
      color: theme.error,
      fontSize: 16,
      fontWeight: '600',
    },
  });
  
  return (
    <SafeAreaView style={dynamicStyles.container}>
      <ScrollView>
        <View style={dynamicStyles.header}>
          <Text style={dynamicStyles.username}>{user.username}</Text>
          <Text style={dynamicStyles.email}>{user.email}</Text>
          <Text style={dynamicStyles.joinDate}>Member since {user.joinDate}</Text>
        </View>
        
        <View style={dynamicStyles.card}>
          <Text style={dynamicStyles.balanceLabel}>Account Balance</Text>
          <Text style={dynamicStyles.balanceAmount}>${user.balance.toFixed(2)}</Text>
          <View style={dynamicStyles.balanceActions}>
            <TouchableOpacity style={dynamicStyles.balanceButton}>
              <Text style={dynamicStyles.balanceButtonText}>Deposit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={dynamicStyles.balanceButton}>
              <Text style={dynamicStyles.balanceButtonText}>Withdraw</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={dynamicStyles.card}>
          <Text style={dynamicStyles.sectionTitle}>Your Stats</Text>
          <View style={dynamicStyles.statsRow}>
            <View style={dynamicStyles.statItem}>
              <Text style={dynamicStyles.statValue}>{user.stats.contestsEntered}</Text>
              <Text style={dynamicStyles.statLabel}>Contests Entered</Text>
            </View>
            <View style={dynamicStyles.statItem}>
              <Text style={dynamicStyles.statValue}>{user.stats.contestsWon}</Text>
              <Text style={dynamicStyles.statLabel}>Contests Won</Text>
            </View>
            <View style={dynamicStyles.statItem}>
              <Text style={dynamicStyles.statValue}>${user.stats.totalWinnings.toFixed(2)}</Text>
              <Text style={dynamicStyles.statLabel}>Total Winnings</Text>
            </View>
          </View>
        </View>
        
        <View style={dynamicStyles.card}>
          <Text style={dynamicStyles.sectionTitle}>Settings</Text>
          
          <View style={dynamicStyles.settingItem}>
            <Text style={dynamicStyles.settingLabel}>Push Notifications</Text>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#767577', true: theme.primary }}
              thumbColor="#f4f3f4"
            />
          </View>
          
          <View style={dynamicStyles.settingItem}>
            <Text style={dynamicStyles.settingLabel}>Dark Mode</Text>
            <Switch
              value={isDarkMode}
              onValueChange={toggleTheme}
              trackColor={{ false: '#767577', true: theme.primary }}
              thumbColor="#f4f3f4"
            />
          </View>
          
          <TouchableOpacity style={dynamicStyles.settingButton}>
            <Text style={dynamicStyles.settingButtonText}>Change Password</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={dynamicStyles.settingButton}>
            <Text style={dynamicStyles.settingButtonText}>Payment Methods</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={dynamicStyles.settingButton}>
            <Text style={dynamicStyles.settingButtonText}>Transaction History</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={dynamicStyles.logoutButton} onPress={handleLogout}>
          <Text style={dynamicStyles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import ContestDetailsScreen from './src/screens/ContestDetailsScreen';
import CreateTeamScreen from './src/screens/CreateTeamScreen';
import MyContestsScreen from './src/screens/MyContestsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import LoginScreen from './src/screens/LoginScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Mock authentication state
const isAuthenticated = true;

// Main tab navigator
function MainTabs() {
  const { theme, isDarkMode } = useTheme();
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'My Contests') {
            iconName = focused ? 'trophy' : 'trophy-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.secondaryText,
        tabBarStyle: { 
          backgroundColor: theme.card,
          borderTopColor: theme.border
        },
        headerStyle: {
          backgroundColor: theme.card,
        },
        headerTintColor: theme.text,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="My Contests" component={MyContestsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function AppContent() {
  const { theme, isDarkMode } = useTheme();
  
  // Create custom navigation theme
  const navigationTheme = {
    ...(isDarkMode ? DarkTheme : DefaultTheme),
    colors: {
      ...(isDarkMode ? DarkTheme.colors : DefaultTheme.colors),
      background: theme.background,
      card: theme.card,
      text: theme.text,
      primary: theme.primary,
      border: theme.border,
    },
  };
  
  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.card,
          },
          headerTintColor: theme.text,
          cardStyle: { backgroundColor: theme.background }
        }}
      >
        {isAuthenticated ? (
          <>
            <Stack.Screen 
              name="Main" 
              component={MainTabs} 
              options={{ headerShown: false }}
            />
            <Stack.Screen name="ContestDetails" component={ContestDetailsScreen} />
            <Stack.Screen name="CreateTeam" component={CreateTeamScreen} />
          </>
        ) : (
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
} 
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const SportSelector = ({ sports, selectedSport, onSelectSport }) => {
  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {sports.map((sport) => (
          <TouchableOpacity
            key={sport.id}
            style={[
              styles.sportButton,
              selectedSport === sport.id && styles.selectedSportButton
            ]}
            onPress={() => onSelectSport(sport.id)}
            disabled={!sport.active}
          >
            <Text style={styles.sportIcon}>{sport.icon}</Text>
            <Text
              style={[
                styles.sportText,
                selectedSport === sport.id && styles.selectedSportText,
                !sport.active && styles.inactiveSportText
              ]}
            >
              {sport.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  scrollContent: {
    paddingVertical: 8,
  },
  sportButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
    minWidth: 80,
  },
  selectedSportButton: {
    backgroundColor: '#007bff',
  },
  sportIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  sportText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  selectedSportText: {
    color: '#fff',
  },
  inactiveSportText: {
    color: '#adb5bd',
  },
});

export default SportSelector;
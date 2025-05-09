import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const PositionFilter = ({ positions, selectedPosition, onSelectPosition }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Filter by Position:</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
        {positions.map((position) => (
          <TouchableOpacity
            key={position}
            style={[
              styles.positionButton,
              selectedPosition === position && styles.selectedPositionButton
            ]}
            onPress={() => onSelectPosition(position)}
          >
            <Text
              style={[
                styles.positionText,
                selectedPosition === position && styles.selectedPositionText
              ]}
            >
              {position}
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
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  scrollView: {
    flexDirection: 'row',
  },
  positionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 8,
  },
  selectedPositionButton: {
    backgroundColor: '#007bff',
  },
  positionText: {
    fontSize: 14,
    color: '#333',
  },
  selectedPositionText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default PositionFilter;
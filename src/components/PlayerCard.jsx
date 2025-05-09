import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const PlayerCard = ({ player, isSelected, onSelect }) => {
  return (
    <TouchableOpacity 
      style={[styles.card, isSelected && styles.selectedCard]} 
      onPress={() => onSelect(player)}
    >
      <View style={styles.header}>
        <Text style={styles.position}>{player.position}</Text>
        <Text style={styles.salary}>${player.salary.toLocaleString()}</Text>
      </View>
      
      <Text style={styles.name}>{player.name}</Text>
      <Text style={styles.team}>{player.team}</Text>
      
      <View style={styles.stats}>
        <Text style={styles.statLabel}>Avg: </Text>
        <Text style={styles.statValue}>{player.avgPoints.toFixed(1)} pts</Text>
      </View>
      
      {isSelected && (
        <View style={styles.selectedBadge}>
          <Text style={styles.selectedText}>Selected</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: '#007bff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  position: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: 12,
    fontWeight: 'bold',
  },
  salary: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007bff',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  team: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  statValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  selectedBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#007bff',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
  selectedText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default PlayerCard;
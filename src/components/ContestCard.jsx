import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ContestCard = ({ contest, onPress }) => {
  // Format currency
  const formatCurrency = (amount) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(1)}K`;
    } else {
      return `$${amount}`;
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(contest)}>
      <View style={styles.header}>
        <Text style={styles.title}>{contest.name}</Text>
        <Text style={styles.entryFee}>${contest.entryFee}</Text>
      </View>
      
      <View style={styles.details}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Prize Pool</Text>
          <Text style={styles.detailValue}>{formatCurrency(contest.prizePool)}</Text>
        </View>
        
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Entries</Text>
          <Text style={styles.detailValue}>{contest.entrants}/{contest.maxEntrants}</Text>
        </View>
        
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Start Time</Text>
          <Text style={styles.detailValue}>{formatDate(contest.startTime)}</Text>
        </View>
      </View>
      
      <View style={styles.games}>
        <Text style={styles.gamesTitle}>Games:</Text>
        {contest.games.map((game, index) => (
          <Text key={index} style={styles.gameItem}>
            {game.awayTeam} @ {game.homeTeam} • {game.time}
          </Text>
        ))}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  entryFee: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  games: {
    marginBottom: 12,
  },
  gamesTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    color: '#333',
  },
  gameItem: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
});

export default ContestCard;
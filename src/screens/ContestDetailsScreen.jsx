import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { getContestDetails } from '../api/contestApi';
import LoadingSpinner from '../components/LoadingSpinner';

const ContestDetailsScreen = ({ route, navigation }) => {
  const { contestId } = route.params;
  const [contest, setContest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContestDetails = async () => {
      try {
        const details = await getContestDetails(contestId);
        setContest(details);
      } catch (error) {
        console.error('Failed to load contest details:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContestDetails();
  }, [contestId]);

  const formatCurrency = (amount) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(1)}K`;
    } else {
      return `$${amount}`;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleCreateTeam = () => {
    navigation.navigate('CreateTeam', { 
      contestId: contest.id,
      sport: contest.sport
    });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!contest) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Contest not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>{contest.name}</Text>
          <Text style={styles.sport}>{contest.sport}</Text>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Entry Fee</Text>
              <Text style={styles.infoValue}>${contest.entryFee}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Prize Pool</Text>
              <Text style={styles.infoValue}>{formatCurrency(contest.prizePool)}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Entries</Text>
              <Text style={styles.infoValue}>{contest.entryCount}/{contest.maxEntries}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Start Time</Text>
              <Text style={styles.infoValue}>{formatDate(contest.startTime)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Games</Text>
          {contest.games.map((game, index) => (
            <View key={index} style={styles.gameCard}>
              <Text style={styles.gameTeams}>{game.awayTeam} @ {game.homeTeam}</Text>
              <Text style={styles.gameTime}>{game.time}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payout Structure</Text>
          {contest.payoutStructure.map((payout, index) => (
            <View key={index} style={styles.payoutRow}>
              <Text style={styles.payoutPosition}>{payout.position}</Text>
              <Text style={styles.payoutAmount}>{formatCurrency(payout.amount)}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.createTeamButton} onPress={handleCreateTeam}>
          <Text style={styles.createTeamButtonText}>Create Team</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  sport: {
    fontSize: 16,
    color: '#666',
  },
  infoCard: {
    margin: 16,
    marginTop: 8,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  section: {
    margin: 16,
    marginTop: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  gameCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  gameTeams: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  gameTime: {
    fontSize: 14,
    color: '#666',
  },
  payoutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  payoutPosition: {
    fontSize: 14,
    color: '#333',
  },
  payoutAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#28a745',
  },
  footer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  createTeamButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  createTeamButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    textAlign: 'center',
    marginTop: 24,
    fontSize: 16,
    color: '#dc3545',
  },
});

export default ContestDetailsScreen;
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { getUserTeams } from '../api/teamApi';
import LoadingSpinner from '../components/LoadingSpinner';

const MyContestsScreen = ({ navigation }) => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserTeams();
  }, []);

  const loadUserTeams = async () => {
    setLoading(true);
    try {
      const userTeams = await getUserTeams();
      setTeams(userTeams);
    } catch (error) {
      console.error('Failed to load user teams:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderTeamItem = ({ item }) => {
    const isLive = item.status === 'LIVE';
    const isUpcoming = item.status === 'UPCOMING';
    
    return (
      <TouchableOpacity 
        style={styles.teamCard}
        onPress={() => navigation.navigate('ContestDetails', { contestId: item.contestId })}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.contestName}>{item.contestName}</Text>
          <Text style={[
            styles.statusBadge,
            isLive ? styles.liveStatus : isUpcoming ? styles.upcomingStatus : styles.completedStatus
          ]}>
            {item.status}
          </Text>
        </View>
        
        <View style={styles.cardDetails}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Sport</Text>
            <Text style={styles.detailValue}>{item.sport}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Entry Fee</Text>
            <Text style={styles.detailValue}>${item.entryFee}</Text>
          </View>
          
          {!isUpcoming && (
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Score</Text>
              <Text style={styles.detailValue}>{item.score.toFixed(1)}</Text>
            </View>
          )}
          
          {!isUpcoming && (
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Rank</Text>
              <Text style={styles.detailValue}>{item.rank}/{item.totalEntrants}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>My Contests</Text>
      
      {loading ? (
        <LoadingSpinner />
      ) : (
        <FlatList
          data={teams}
          keyExtractor={(item) => item.id}
          renderItem={renderTeamItem}
          ListEmptyComponent={
            <Text style={styles.emptyText}>You haven't entered any contests yet</Text>
          }
          refreshing={loading}
          onRefresh={loadUserTeams}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 8,
  },
  teamCard: {
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  contestName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 12,
    fontWeight: 'bold',
  },
  liveStatus: {
    backgroundColor: '#dc3545',
    color: '#fff',
  },
  upcomingStatus: {
    backgroundColor: '#ffc107',
    color: '#212529',
  },
  completedStatus: {
    backgroundColor: '#6c757d',
    color: '#fff',
  },
  cardDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  detailItem: {
    width: '50%',
    marginBottom: 12,
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
  emptyText: {
    textAlign: 'center',
    marginTop: 24,
    color: '#666',
  },
});

export default MyContestsScreen;
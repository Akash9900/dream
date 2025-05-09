import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { getSports, getUpcomingContests } from '../api/contestApi';
import ContestCard from '../components/ContestCard';
import SportSelector from '../components/SportSelector';
import LoadingSpinner from '../components/LoadingSpinner';

const HomeScreen = ({ navigation }) => {
  const [sports, setSports] = useState([]);
  const [selectedSport, setSelectedSport] = useState(null);
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const availableSports = await getSports();
        setSports(availableSports);
        
        if (availableSports.length > 0) {
          setSelectedSport(availableSports[0].id);
        }
      } catch (error) {
        console.error('Failed to load sports:', error);
      }
    };
    
    loadInitialData();
  }, []);

  useEffect(() => {
    if (selectedSport) {
      loadContests();
    }
  }, [selectedSport]);

  const loadContests = async () => {
    setLoading(true);
    try {
      const upcomingContests = await getUpcomingContests(selectedSport);
      setContests(upcomingContests);
    } catch (error) {
      console.error('Failed to load contests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleContestPress = (contest) => {
    navigation.navigate('ContestDetails', { contestId: contest.id });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Fantasy Sports</Text>
      
      <SportSelector 
        sports={sports} 
        selectedSport={selectedSport}
        onSelectSport={setSelectedSport}
      />
      
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Text style={styles.sectionTitle}>Upcoming Contests</Text>
          <FlatList
            data={contests}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ContestCard 
                contest={item} 
                onPress={handleContestPress}
              />
            )}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No upcoming contests found</Text>
            }
          />
        </>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 12,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 24,
    color: '#666',
  },
});

export default HomeScreen;
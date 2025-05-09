import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, ScrollView, Modal } from 'react-native';
import { getAvailablePlayers, createTeamEntry } from '../api/teamApi';
import PlayerCard from '../components/PlayerCard';
import PositionFilter from '../components/PositionFilter';
import SalaryCapBar from '../components/SalaryCapBar';
import LoadingSpinner from '../components/LoadingSpinner';
import TeamPreviewCard from '../components/TeamPreviewCard';
import { useTheme } from '../context/ThemeContext';
import { TEAM_REQUIREMENTS } from '../config/teamRequirements';

const CreateTeamScreen = ({ route, navigation }) => {
  const { contestId, sport } = route.params;
  const { theme, isDarkMode } = useTheme();
  const [availablePlayers, setAvailablePlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState('ALL');
  const [loading, setLoading] = useState(true);
  const [salaryCap, setSalaryCap] = useState(50000); // Default, will be updated from API
  const [remainingSalary, setRemainingSalary] = useState(50000);
  const [positions, setPositions] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  
  // Get team requirements for the current sport
  const teamRequirements = TEAM_REQUIREMENTS[sport] || {
    requiredPlayers: 0,
    backupPlayers: 0,
    total: 0,
    positionLimits: {}
  };
  
  useEffect(() => {
    loadPlayers();
  }, []);
  
  useEffect(() => {
    // Calculate remaining salary whenever selected players change
    const usedSalary = selectedPlayers.reduce((total, player) => total + player.salary, 0);
    setRemainingSalary(salaryCap - usedSalary);
  }, [selectedPlayers]);
  
  const loadPlayers = async () => {
    setLoading(true);
    try {
      const data = await getAvailablePlayers(contestId);
      setAvailablePlayers(data.players);
      setSalaryCap(data.salaryCap);
      setRemainingSalary(data.salaryCap);
      
      // Extract unique positions for the filter
      const uniquePositions = [...new Set(data.players.map(player => player.position))];
      setPositions(['ALL', ...uniquePositions]);
    } catch (error) {
      console.error('Failed to load players:', error);
      Alert.alert('Error', 'Failed to load available players');
    } finally {
      setLoading(false);
    }
  };
  
  const handlePlayerSelect = (player) => {
    // Check if player is already selected
    if (selectedPlayers.some(p => p.id === player.id)) {
      // Remove player
      setSelectedPlayers(selectedPlayers.filter(p => p.id !== player.id));
      return;
    }
    
    // Check if we've reached the maximum team size
    if (selectedPlayers.length >= teamRequirements.total) {
      Alert.alert('Team Full', `You can only select ${teamRequirements.total} players for ${sport}`);
      return;
    }
    
    // Check if we can add this player (salary cap)
    if (player.salary > remainingSalary) {
      Alert.alert('Cannot Add Player', 'Not enough salary cap remaining');
      return;
    }
    
    // Check position limits
    const positionCounts = {};
    selectedPlayers.forEach(p => {
      positionCounts[p.position] = (positionCounts[p.position] || 0) + 1;
    });
    
    const positionLimit = teamRequirements.positionLimits[player.position];
    if (positionLimit && positionCounts[player.position] >= positionLimit.max) {
      Alert.alert('Position Limit Reached', `You can only have ${positionLimit.max} ${player.position} players`);
      return;
    }
    
    // Add player
    setSelectedPlayers([...selectedPlayers, player]);
  };
  
  const validateTeam = () => {
    // Check if we have enough players
    if (selectedPlayers.length < teamRequirements.total) {
      return {
        valid: false,
        message: `You need to select ${teamRequirements.total} players (${teamRequirements.requiredPlayers} starters and ${teamRequirements.backupPlayers} backups)`
      };
    }
    
    // Check position minimums
    const positionCounts = {};
    selectedPlayers.forEach(p => {
      positionCounts[p.position] = (positionCounts[p.position] || 0) + 1;
    });
    
    const missingPositions = [];
    
    for (const [position, limits] of Object.entries(teamRequirements.positionLimits)) {
      const count = positionCounts[position] || 0;
      if (count < limits.min) {
        missingPositions.push(`${position} (need ${limits.min - count} more)`);
      }
    }
    
    if (missingPositions.length > 0) {
      return {
        valid: false,
        message: `You need more players in these positions: ${missingPositions.join(', ')}`
      };
    }
    
    return { valid: true };
  };
  
  const handlePreviewTeam = () => {
    // Show preview without validation
    setShowPreview(true);
  };
  
  const handleSubmitTeam = async () => {
    const validation = validateTeam();
    if (!validation.valid) {
      Alert.alert('Cannot Submit Team', validation.message);
      return;
    }
    
    setLoading(true);
    try {
      const playerIds = selectedPlayers.map(player => player.id);
      const result = await createTeamEntry(contestId, playerIds);
      
      if (result.success) {
        Alert.alert(
          'Team Submitted!',
          'Your team has been successfully submitted.',
          [{ text: 'OK', onPress: () => navigation.navigate('ContestDetails', { contestId }) }]
        );
      } else {
        Alert.alert('Error', 'Failed to submit team. Please try again.');
      }
    } catch (error) {
      console.error('Failed to submit team:', error);
      Alert.alert('Error', 'Failed to submit team. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const filteredPlayers = selectedPosition === 'ALL' 
    ? availablePlayers 
    : availablePlayers.filter(player => player.position === selectedPosition);
  
  // Get position counts for the team summary
  const getPositionCounts = () => {
    const counts = {};
    selectedPlayers.forEach(player => {
      counts[player.position] = (counts[player.position] || 0) + 1;
    });
    return counts;
  };
  
  const positionCounts = getPositionCounts();
  
  // Create dynamic styles based on theme
  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: theme.background,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
      color: theme.text,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      marginTop: 16,
      marginBottom: 8,
      color: theme.text,
    },
    selectedContainer: {
      backgroundColor: theme.card,
      padding: 12,
      borderRadius: 8,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: isDarkMode ? 0.3 : 0.1,
      shadowRadius: 2,
      elevation: 1,
    },
    teamSummary: {
      backgroundColor: theme.card,
      padding: 12,
      borderRadius: 8,
      marginBottom: 16,
    },
    summaryTitle: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 8,
      color: theme.text,
    },
    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 4,
    },
    positionName: {
      color: theme.text,
    },
    positionCount: {
      color: theme.secondaryText,
    },
    requiredCount: {
      color: theme.primary,
    },
    emptyText: {
      textAlign: 'center',
      padding: 16,
      color: theme.secondaryText,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 16,
    },
    previewButton: {
      flex: 1,
      backgroundColor: theme.warning,
      padding: 16,
      borderRadius: 8,
      alignItems: 'center',
      marginRight: 8,
    },
    submitButton: {
      flex: 1,
      backgroundColor: theme.primary,
      padding: 16,
      borderRadius: 8,
      alignItems: 'center',
      marginLeft: 8,
    },
    disabledButton: {
      backgroundColor: theme.disabled,
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
    },
    playerListContainer: {
      marginBottom: 16,
    },
    modalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      width: '90%',
      maxHeight: '90%',
      backgroundColor: theme.background,
      borderRadius: 12,
      overflow: 'hidden',
    },
  });
  
  return (
    <ScrollView style={dynamicStyles.container}>
      <Text style={dynamicStyles.title}>Create Your Team</Text>
      
      <SalaryCapBar 
        salaryCap={salaryCap} 
        remainingSalary={remainingSalary} 
      />
      
      <View style={dynamicStyles.teamSummary}>
        <Text style={dynamicStyles.summaryTitle}>Team Summary ({selectedPlayers.length}/{teamRequirements.total})</Text>
        <View>
          {Object.entries(teamRequirements.positionLimits).map(([position, limits]) => (
            <View key={position} style={dynamicStyles.summaryRow}>
              <Text style={dynamicStyles.positionName}>{position}</Text>
              <Text style={dynamicStyles.positionCount}>
                {positionCounts[position] || 0}/{limits.max} 
                <Text style={dynamicStyles.requiredCount}> (min: {limits.min})</Text>
              </Text>
            </View>
          ))}
        </View>
      </View>
      
      <View style={dynamicStyles.selectedContainer}>
        <Text style={dynamicStyles.sectionTitle}>Selected Players ({selectedPlayers.length})</Text>
        <FlatList
          horizontal
          data={selectedPlayers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <PlayerCard 
              player={item} 
              isSelected={true}
              onSelect={() => handlePlayerSelect(item)}
              compact={true}
            />
          )}
          ListEmptyComponent={
            <Text style={dynamicStyles.emptyText}>No players selected yet</Text>
          }
        />
      </View>
      
      <PositionFilter 
        positions={positions}
        selectedPosition={selectedPosition}
        onSelectPosition={setSelectedPosition}
      />
      
      {loading ? (
        <LoadingSpinner />
      ) : (
        <View style={dynamicStyles.playerListContainer}>
          {filteredPlayers.map(item => (
            <PlayerCard 
              key={item.id}
              player={item} 
              isSelected={selectedPlayers.some(p => p.id === item.id)}
              onSelect={() => handlePlayerSelect(item)}
              disabled={
                (item.salary > remainingSalary && 
                !selectedPlayers.some(p => p.id === item.id)) ||
                (selectedPlayers.length >= teamRequirements.total && 
                !selectedPlayers.some(p => p.id === item.id))
              }
            />
          ))}
        </View>
      )}
      
      <View style={dynamicStyles.buttonContainer}>
        <TouchableOpacity 
          style={[
            dynamicStyles.previewButton
          ]}
          onPress={handlePreviewTeam}
        >
          <Text style={dynamicStyles.buttonText}>Preview Team</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            dynamicStyles.submitButton, 
            selectedPlayers.length < teamRequirements.total && dynamicStyles.disabledButton
          ]}
          onPress={handleSubmitTeam}
          disabled={selectedPlayers.length < teamRequirements.total}
        >
          <Text style={dynamicStyles.buttonText}>Submit Team</Text>
        </TouchableOpacity>
      </View>
      
      {/* Team Preview Modal */}
      <Modal
        visible={showPreview}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowPreview(false)}
      >
        <View style={dynamicStyles.modalContainer}>
          <View style={dynamicStyles.modalContent}>
            <TeamPreviewCard 
              sport={sport}
              players={selectedPlayers}
              onEdit={() => setShowPreview(false)}
              onSubmit={() => {
                setShowPreview(false);
                handleSubmitTeam();
              }}
            />
          </View>
        </View>
      </Modal>
      
      {/* Add some padding at the bottom for better scrolling */}
      <View style={{ height: 20 }} />
    </ScrollView>
  );
};

export default CreateTeamScreen; 
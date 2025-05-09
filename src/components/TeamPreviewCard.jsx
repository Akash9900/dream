import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { TEAM_REQUIREMENTS } from '../config/teamRequirements';

// Helper function to get initials from a name
const getInitials = (name) => {
  return name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase();
};

const TeamPreviewCard = ({ sport, players, onEdit, onSubmit }) => {
  const { theme, isDarkMode } = useTheme();
  const teamRequirements = TEAM_REQUIREMENTS[sport] || {};
  
  // Group players by position
  const playersByPosition = {};
  players.forEach(player => {
    if (!playersByPosition[player.position]) {
      playersByPosition[player.position] = [];
    }
    playersByPosition[player.position].push(player);
  });
  
  // Render a simple field view without images
  const renderSimpleFieldView = () => {
    if (players.length === 0) {
      return (
        <View style={[styles.simpleFieldContainer, { backgroundColor: '#888888' }]}>
          <Text style={styles.fieldLabel}>No Players Selected</Text>
          <Text style={styles.emptyFieldText}>
            Select players to see your team formation
          </Text>
        </View>
      );
    }
    
    return (
      <View style={[styles.simpleFieldContainer, { backgroundColor: sport === 'MLB' ? '#4C8C2B' : 
                                                 sport === 'NFL' ? '#5D9C59' : 
                                                 sport === 'NBA' ? '#B85C38' : 
                                                 sport === 'NHL' ? '#7CB9E8' : 
                                                 sport === 'MLS' ? '#4C8C2B' : '#888888' }]}>
        <Text style={styles.fieldLabel}>{sport} Team Formation</Text>
        
        <View style={styles.formationContainer}>
          {Object.entries(playersByPosition).map(([position, posPlayers]) => (
            <View key={position} style={styles.positionGroup}>
              <Text style={styles.positionLabel}>{position}</Text>
              <View style={styles.positionPlayers}>
                {posPlayers.map(player => (
                  <View key={player.id} style={styles.simplePlayerMarker}>
                    <Text style={styles.playerInitials}>{getInitials(player.name)}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  };
  
  // Render roster or empty message
  const renderRoster = () => {
    if (players.length === 0) {
      return (
        <View style={styles.emptyRosterContainer}>
          <Text style={[styles.emptyRosterText, { color: theme.secondaryText }]}>
            Your team roster will appear here once you select players
          </Text>
        </View>
      );
    }
    
    return (
      <ScrollView style={styles.rosterContainer}>
        <Text style={[styles.rosterTitle, { color: theme.text }]}>Team Roster</Text>
        
        {Object.entries(playersByPosition).map(([position, positionPlayers]) => (
          <View key={position} style={styles.positionGroup}>
            <Text style={[styles.positionTitle, { color: theme.primary }]}>
              {position} ({positionPlayers.length})
            </Text>
            
            {positionPlayers.map(player => (
              <View key={player.id} style={[styles.playerItem, { borderColor: theme.border }]}>
                <Text style={[styles.playerName, { color: theme.text }]}>{player.name}</Text>
                <Text style={[styles.playerTeam, { color: theme.secondaryText }]}>
                  {player.team} | ${player.salary.toLocaleString()} | {player.avgPoints} pts
                </Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    );
  };
  
  return (
    <View style={[styles.container, { backgroundColor: theme.card }]}>
      <Text style={[styles.title, { color: theme.text }]}>
        {sport} Team Preview
      </Text>
      
      {renderSimpleFieldView()}
      
      {renderRoster()}
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.editButton, { backgroundColor: theme.warning }]} 
          onPress={onEdit}
        >
          <Text style={styles.buttonText}>Edit Team</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.submitButton, { backgroundColor: theme.primary }]} 
          onPress={onSubmit}
          disabled={players.length < teamRequirements.total}
        >
          <Text style={styles.buttonText}>Submit Team</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  simpleFieldContainer: {
    height: 240,
    width: '100%',
    marginBottom: 16,
    borderRadius: 8,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fieldLabel: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  formationContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  positionGroup: {
    margin: 8,
    alignItems: 'center',
  },
  positionLabel: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  positionPlayers: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  simplePlayerMarker: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#007bff',
    margin: 4,
  },
  playerInitials: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
  rosterContainer: {
    maxHeight: 300,
  },
  rosterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  positionGroup: {
    marginBottom: 16,
  },
  positionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  playerItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    marginBottom: 4,
  },
  playerName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  playerTeam: {
    fontSize: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    marginRight: 8,
  },
  submitButton: {
    marginLeft: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  emptyFieldText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
  emptyRosterContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyRosterText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default TeamPreviewCard; 
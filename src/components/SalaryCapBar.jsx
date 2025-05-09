import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SalaryCapBar = ({ salaryCap, remainingSalary }) => {
  // Calculate percentage used
  const percentageUsed = ((salaryCap - remainingSalary) / salaryCap) * 100;
  
  // Determine color based on remaining salary
  const getBarColor = () => {
    if (remainingSalary < salaryCap * 0.1) {
      return '#dc3545'; // Red when less than 10% remaining
    } else if (remainingSalary < salaryCap * 0.2) {
      return '#ffc107'; // Yellow when less than 20% remaining
    } else {
      return '#28a745'; // Green otherwise
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Salary Cap</Text>
        <Text style={styles.salaryText}>
          ${(salaryCap - remainingSalary).toLocaleString()} / ${salaryCap.toLocaleString()}
        </Text>
      </View>
      
      <View style={styles.barContainer}>
        <View 
          style={[
            styles.barFill, 
            { width: `${percentageUsed}%`, backgroundColor: getBarColor() }
          ]} 
        />
      </View>
      
      <Text style={styles.remainingText}>
        ${remainingSalary.toLocaleString()} remaining
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  salaryText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  barContainer: {
    height: 8,
    backgroundColor: '#e9ecef',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
  },
  remainingText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
  },
});

export default SalaryCapBar;
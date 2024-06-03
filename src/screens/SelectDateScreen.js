import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SelectDateScreen = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const navigation = useNavigation();

  const handleDateSelect = (day) => {
    setSelectedDate(day.dateString);
  };

  const handleContinue = () => {
    if (selectedDate) {
      navigation.navigate('FinalizeRental', { 
        selectedDate, 
        product: {
          title: 'Tennis Racket and Tennis Ball', 
          price: 16, 
          imageUrl: 'https://example.com/tennis-racket.jpg'
        }, 
        renter: {
          name: 'Bernadette Rayner',
          address: 'San Francisco, California',
          whatsapp: '+1 123-456-7890'
        }
      });
    } else {
      alert('Please select a date');
    }
  };  

  return (
    <View style={styles.container}>
      {/* Barra de progresso */}
      <View style={styles.progressBar}>
        <View style={styles.progressStep}>
          <Text style={styles.progressText}>Step 1 of 2</Text>
        </View>
      </View>
      <Text style={styles.title}>Choose the date for the rental</Text>
      <Calendar
        onDayPress={handleDateSelect}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: '#16E024' },
        }}
        theme={{
          todayTextColor: '#233ED9',
          arrowColor: '#233ED9',
          selectedDayBackgroundColor: '#16E024',
        }}
      />
      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  progressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  progressStep: {
    flex: 1,
    height: 10,
    backgroundColor: '#16E024',
    borderRadius: 5,
  },
  progressText: {
    marginLeft: 10,
    color: '#16E024',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  continueButton: {
    backgroundColor: '#16E024',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  continueButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SelectDateScreen;

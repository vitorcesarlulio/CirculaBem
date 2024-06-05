import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SelectDateScreen = () => {
  const [selectedDates, setSelectedDates] = useState([]);
  const [markedDates, setMarkedDates] = useState({});
  const navigation = useNavigation();
  const route = useRoute();
  const { product, user } = route.params;

  const getAvailableDays = (month, year) => {
    let availableDays = {};
    let today = new Date(year, month - 1, 1);
    let end = new Date(year, month, 0);

    while (today <= end) {
      const dayOfWeek = today.getDay();
      if (product.availabilities.includes(dayOfWeek + 1)) {
        const dateString = today.toISOString().split('T')[0];
        availableDays[dateString] = { disabled: false };
      } else {
        const dateString = today.toISOString().split('T')[0];
        availableDays[dateString] = { disabled: true };
      }
      today.setDate(today.getDate() + 1);
    }
    return availableDays;
  };

  useEffect(() => {
    const today = new Date();
    const initialAvailableDays = getAvailableDays(today.getMonth() + 1, today.getFullYear());
    setMarkedDates(initialAvailableDays);
  }, [product.availabilities]);

  const handleDateSelect = (day) => {
    const dateString = day.dateString;

    if (!markedDates[dateString].disabled) {
      let updatedMarkedDates = { ...markedDates };
      let newSelectedDates = [...selectedDates];

      if (newSelectedDates.includes(dateString)) {
        newSelectedDates = newSelectedDates.filter(date => date !== dateString);
        updatedMarkedDates[dateString] = { disabled: false };
      } else {
        newSelectedDates.push(dateString);
        updatedMarkedDates[dateString] = { selected: true, selectedColor: '#16E024' };
      }

      setSelectedDates(newSelectedDates);
      setMarkedDates(updatedMarkedDates);
    }
  };

  const handleMonthChange = (month) => {
    const newMarkedDates = getAvailableDays(month.month, month.year);
    setMarkedDates(newMarkedDates);
  };

  const handleContinue = () => {
    if (selectedDates.length > 0) {
      const sortedDates = selectedDates.sort();
      const startDate = sortedDates[0];
      const endDate = sortedDates[sortedDates.length - 1];

      navigation.navigate('FinalizeRental', { 
        startDate, 
        endDate, 
        selectedDates,
        product, 
        user,
        renter: {
          name: user.name,
          address: `${user.address.neighborhood}, ${user.address.city}`,
          whatsapp: user.phone // Assuming you have this information, adjust accordingly
        }
      });
    } else {
      alert('Selecione pelo menos uma data');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.stepText}>Etapa 1 de 2</Text>
      {/* Barra de progresso */}
      <View style={styles.progressBar}>
        <View style={styles.progressStepCompleted} />
        <View style={styles.progressStep1of2} />
      </View>
      <Text style={styles.title}>Escolha a data do aluguel</Text>
      <Calendar
        onDayPress={handleDateSelect}
        markedDates={markedDates}
        onMonthChange={handleMonthChange}
        theme={{
          todayTextColor: '#233ED9',
          arrowColor: '#233ED9',
          selectedDayBackgroundColor: '#16E024',
          disabledArrowColor: '#d9e1e8',
        }}
        disableAllTouchEventsForDisabledDays={true}
      />
      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueButtonText}>Continuar</Text>
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
    height: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    marginBottom: 20,
  },
  progressStepCompleted: {
    flex: 1,
    backgroundColor: '#16E024',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  progressStep1of2: {
    flex: 1,
    backgroundColor: '#E0E0E0',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  stepText: {
    fontSize: 16,
    color: '#233ED9',
    fontWeight: 'bold',
    marginBottom: 20,
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

import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FinalizeRentalScreen = ({ route }) => {
  const { selectedDate, product, renter } = route.params;
  const navigation = useNavigation();
  const windowWidth = Dimensions.get('window').width;

  const handleRent = () => {
    // Função para processar o aluguel
    // Aqui você pode adicionar a lógica para finalizar o aluguel
    alert('Aluguel confirmado!');
  };

  return (
    <View style={styles.container}>
      {/* Barra de progresso */}
      <View style={styles.progressBar}>
        <View style={styles.progressStepCompleted} />
        <View style={styles.progressStepCompleted} />
        <View style={styles.progressStepActive} />
      </View>
      <Text style={styles.stepText}>Step 3 of 3</Text>

      {/* Card do item */}
      <View style={styles.itemCard}>
        <Image source={{ uri: product.imageUrl }} style={styles.itemImage} />
        <View>
          <Text style={styles.itemTitle}>{product.title}</Text>
          <Text style={styles.itemPrice}>${product.price} / day</Text>
        </View>
      </View>

      {/* Detalhes do aluguel */}
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsTitle}>Rental Details</Text>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Rental Period:</Text>
          <Text style={styles.detailValue}>{selectedDate}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Price:</Text>
          <Text style={styles.detailValue}>${product.price}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Days:</Text>
          <Text style={styles.detailValue}>1</Text>
        </View>
        {/* Adicione mais detalhes conforme necessário */}
      </View>

      {/* Informações do locador */}
      <View style={styles.renterInfoContainer}>
        <Text style={styles.renterInfoTitle}>Renter Information</Text>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Name:</Text>
          <Text style={styles.detailValue}>{renter.name}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Address:</Text>
          <Text style={styles.detailValue}>{renter.address}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>WhatsApp:</Text>
          <Text style={styles.detailValue}>{renter.whatsapp}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.rentButton} onPress={handleRent}>
        <Text style={styles.rentButtonText}>Rent Now</Text>
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
  },
  progressStepActive: {
    flex: 1,
    backgroundColor: '#233ED9',
  },
  stepText: {
    fontSize: 16,
    color: '#233ED9',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 14,
    color: 'gray',
  },
  detailsContainer: {
    marginBottom: 20,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 16,
    color: 'gray',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  renterInfoContainer: {
    marginBottom: 20,
  },
  renterInfoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  rentButton: {
    backgroundColor: '#16E024',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  rentButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FinalizeRentalScreen;
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swiper from 'react-native-swiper';
import { fetchProductById } from '../services/api'; // Certifique-se de ajustar o caminho de importação conforme necessário

const ProductDetailScreen = ({ route, navigation }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const windowWidth = Dimensions.get('window').width;

  useEffect(() => {
    const loadProductDetails = async () => {
      try {
        const productDetails = await fetchProductById(productId);
        setProduct(productDetails);
      } catch (error) {
        console.error('Erro ao carregar detalhes do produto:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProductDetails();
  }, [productId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!product) {
    return <Text>Produto não encontrado.</Text>;
  }

  const renderImageItem = ({ item }) => {
    return (
      <View style={styles.carouselItem}>
        <Image source={{ uri: item }} style={styles.carouselImage} resizeMode="cover" />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Swiper
        style={styles.wrapper}
        showsButtons={true}
        loop={false}
        autoplay={true}
      >
        {product.imageUrls.map((url, index) => (
          <View key={index} style={styles.slide}>
            <Image source={{ uri: url }} style={[styles.carouselImage, { width: windowWidth }]} resizeMode="cover" />
          </View>
        ))}
      </Swiper>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{product.description}</Text>
        <Text style={styles.location}>San Francisco, California - 2.8 km</Text>
        <View style={styles.ratingContainer}>
          <Icon name="star" size={14} color="#FFD700" />
          <Text style={styles.ratingText}>4.7</Text>
          <Text style={styles.reviewCount}>(64 reviews & ratings)</Text>
        </View>
        <View style={styles.sellerContainer}>
          <Image source={{ uri: 'https://images.pexels.com/photos/15128415/pexels-photo-15128415/free-photo-of-moda-tendencia-homem-modelo.jpeg?auto=compress&cs=tinysrgb&w=600' }} style={styles.sellerImage} />
          <View>
            <Text style={styles.sellerName}>Bernadette Rayner</Text>
            <Text style={styles.verifiedText}>Verified account</Text>
          </View>
          <View style={styles.contactIcons}>
            <TouchableOpacity>
              <Icon name="phone" size={24} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="comment" size={24} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.title}>Description</Text>
        <Text style={styles.productDescription}>{product.description}</Text>
        <TouchableOpacity style={styles.bookButton} onPress={() => navigation.navigate('SelectDate', { product })}>
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  wrapper: {
    height: 250,
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselImage: {
    height: 250,
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 16,
    color: 'gray',
    marginVertical: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewCount: {
    fontSize: 14,
    color: 'gray',
    marginLeft: 5,
  },
  sellerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  sellerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  sellerName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  verifiedText: {
    fontSize: 14,
    color: 'gray',
  },
  contactIcons: {
    flexDirection: 'row',
    marginLeft: 'auto',
  },
  icon: {
    marginHorizontal: 10,
    color: 'gray',
  },
  productDescription: {
    fontSize: 16,
    marginVertical: 10,
  },
  bookButton: {
    backgroundColor: '#16E024',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginVertical: 10,
  },
  bookButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProductDetailScreen;

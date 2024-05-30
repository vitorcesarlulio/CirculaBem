import React, { useRef, useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { fetchProducts, fetchCategories } from '../services/api'; // Certifique-se de ajustar o caminho de importação conforme necessário

const HomeScreen = () => {
  const navigation = useNavigation();
  const windowWidth = Dimensions.get('window').width;
  const cardSize = windowWidth * 0.8; // Ajuste para o tamanho do card
  const sideSpacing = (windowWidth - cardSize) / 2;
  const scrollViewRef = useRef();
  const [items, setItems] = useState([]); // Estado para armazenar os produtos
  const [categories, setCategories] = useState([]); // Estado para armazenar as categorias

  useEffect(() => {
    // Centralizar a visualização inicial
    scrollViewRef.current.scrollTo({ x: sideSpacing, animated: false });
  }, []);

  useEffect(() => {
    // Função para buscar os produtos da API
    const loadProducts = async () => {
      try {
        const products = await fetchProducts();
        setItems(products);
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
      }
    };
    loadProducts();
  }, []);

  useEffect(() => {
    // Função para buscar as categorias da API
    const loadCategories = async () => {
      try {
        const categories = await fetchCategories();
        setCategories(categories);
      } catch (error) {
        console.error('Erro ao carregar categorias:', error);
      }
    };
    loadCategories();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header: Localização e Notificações */}
      <View style={styles.header}>
        <View>
          <Text style={styles.locationLabel}>Sua localização</Text>
          <TouchableOpacity onPress={() => navigation.navigate('LocationScreen')}>
            <Text style={styles.locationText}>San Francisco, California ▼</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
          <Icon name="bell" size={24} style={styles.notificationIcon} />
        </TouchableOpacity>
      </View>

      {/* Barra de Pesquisa */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="gray" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder="O que você está procurando?"
          placeholderTextColor="gray"
        />
      </View>

      {/* Categorias */}
      <View style={styles.categoriesContainer}>
        <View style={styles.categoriesHeader}>
          <Text style={styles.sectionTitle}>Categorias</Text>
          <TouchableOpacity onPress={() => navigation.navigate('AllCategories')}>
            <Text style={styles.seeAllText}>Ver tudo</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
          {categories.map((category, index) => (
            <TouchableOpacity key={index} style={styles.categoryItem}>
              <View style={styles.categoryImageContainer}>
                <Image source={{ uri: category.imageUrl }} style={styles.categoryImage} />
              </View>
              <Text style={styles.categoryText}>{category.description}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Listagem Próxima */}
      <View style={styles.listingsContainer}>
        <View style={styles.listingsHeader}>
          <View>
            <Text style={styles.sectionTitle}>Itens próximos</Text>
            <Text style={styles.subtitleText}>Listagem selecionada com base na distância</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('AllListings')}>
            <Text style={styles.seeAllText}>Ver tudo</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listingsScroll}
        >
          {/* Exibição dos itens */}
          {items.map((item, index) => (
            <TouchableOpacity key={index} style={[styles.listingItem, { width: cardSize, height: cardSize }]}>
              <Image source={{ uri: item.imageUrls[0] }} style={styles.listingImage} />
              <View style={styles.listingInfo}>
                <Text style={styles.listingTitle}>{item.description}</Text>
                <Text style={styles.listingPrice}>{item.price}</Text>
              </View>
              <View style={styles.listingBadge}>
                <Text style={styles.badgeText}>Available</Text>
              </View>
              <View style={styles.listingRating}>
                <Icon name="star" size={14} color="#FFD700" />
                <Text style={styles.ratingText}>4.8</Text>
              </View>
            </TouchableOpacity>
          ))}
          {/* Espaço final fictício */}
          <View style={{ width: sideSpacing }} />
        </ScrollView>
      </View>

      {/* Menu Fixo */}
      <View style={styles.fixedMenu}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Icon name="home" size={24} style={styles.menuIcon} />
          <Text style={styles.menuText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
          <Icon name="comment" size={24} style={styles.menuIcon} />
          <Text style={styles.menuText}>Chats</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('AddNewItem')}>
          <View style={styles.addButton}>
            <Icon name="plus" size={24} color="white" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Wishlist')}>
          <Icon name="heart" size={24} style={styles.menuIcon} />
          <Text style={styles.menuText}>Favorites</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Icon name="user" size={24} style={styles.menuIcon} />
          <Text style={styles.menuText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  locationLabel: {
    fontSize: 12,
    color: 'gray',
  },
  locationText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  notificationIcon: {
    color: 'gray',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    height: 40,
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  categoriesContainer: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
  categoriesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeAllText: {
    color: 'grey',
  },
  categoriesScroll: {
    marginTop: 10,
  },
  categoryItem: {
    marginRight: 10,
    alignItems: 'center',
    width: 100, // Largura fixa para ajustar o texto
  },
  categoryImageContainer: {
    backgroundColor: '#f2f2f2', // Fundo cinza
    borderRadius: 25,
    padding: 10,
  },
  categoryImage: {
    width: 50,
    height: 50,
  },
  categoryText: {
    marginTop: 5,
    textAlign: 'center', // Centralizar texto
    flexWrap: 'wrap', // Permitir quebra de linha
  },
  listingsContainer: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
  listingsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subtitleText: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
  },
  listingsScroll: {
    marginTop: 10,
    alignItems: 'center',
  },
  listingItem: {
    marginRight: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 10,
    position: 'relative',
    justifyContent: 'center',
  },
  listingImage: {
    width: '100%',
    height: '70%',
    borderRadius: 10,
  },
  listingInfo: {
    marginTop: 5,
  },
  listingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  listingPrice: {
    fontSize: 14,
    color: 'gray',
  },
  listingBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'green',
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
  },
  listingRating: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
  fixedMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 20, // Ajuste este valor para levantar o menu
    left: 0,
    right: 0,
    backgroundColor: '#333', // Cor de fundo para combinar com a imagem
    paddingVertical: 10,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc', // Cor da borda superior
  },
  menuIcon: {
    color: 'white', // Cor dos ícones para combinar com a imagem
  },
  menuText: {
    color: 'white', // Cor do texto para combinar com a imagem
    fontSize: 12,
  },
  addButton: {
    backgroundColor: '#0056b3', // Azul escuro para combinar com a imagem
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -30, // Para posicionar o botão acima da barra de menu
  },
  container: {
    flex: 1,
    backgroundColor: 'white', // Certifique-se de que o fundo principal seja branco
  },
});

export default HomeScreen;

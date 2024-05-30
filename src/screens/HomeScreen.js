import React, { useEffect, useState } from 'react';
import { Box, VStack, HStack, ScrollView, Text, Input, Icon, Image, Button, FlatList, AspectRatio } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import { fetchCategories } from '../services/api';
import { BlurView } from 'expo-blur';

const windowWidth = Dimensions.get('window').width;

const HomeScreen = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false); // Estado para controle de foco

  const products = [
    { id: '1', name: 'Cool Red Shirt', rating: '4.5', image: 'https://via.placeholder.com/150' },
    { id: '2', name: 'Stylish Blue Hoodie', rating: '4.5', image: 'https://via.placeholder.com/150' },
    { id: '3', name: 'Stylish Blue Hoodie', rating: '4.5', image: 'https://via.placeholder.com/150' }
  ];

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error('Falha ao carregar categorias:', error);
      }
    };

    loadCategories();
  }, []);

  return (
    <VStack space={4} mt="4" px="4">
      <Input
        placeholder="Search for products"
        width="100%"
        borderRadius="10"
        py="3"
        px="2"
        fontSize="14"
        onFocus={() => setIsSearchFocused(true)}
        onBlur={() => setIsSearchFocused(false)}
        InputLeftElement={<Icon as={<MaterialIcons name="search" />} size="6" ml="2" color="muted.400" />}
      />
      {isSearchFocused ? (
        <BlurView
          style={{ flex: 1, width: '100%' }}
          blurType="light"
          blurAmount={10}
          reducedTransparencyFallbackColor="white"
        >
          <ContentComponent categories={categories} products={products} />
        </BlurView>
      ) : (
        <ContentComponent categories={categories} products={products} />
      )}
    </VStack>
  );
};

const ContentComponent = ({ categories, products }) => (
  <>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} px="2">
      {Array.from({ length: 5 }, (_, i) => i + 1).map(index => (
        <AspectRatio key={index} ratio={16 / 9} width={windowWidth - 40}>
          <Image
            source={{ uri: 'https://via.placeholder.com/350x150' }}
            alt="banner"
            borderRadius="10"
            width="100%"
            height="100%"
          />
        </AspectRatio>
      ))}
    </ScrollView>
    <Text fontSize="xl" bold>Categorias</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <HStack space={3} alignItems="center">
        {categories.map((category) => (
          <Button key={category.id} py="3" px="5">
            <Image source={{ uri: category.imageUrl }} alt={category.description} size="sm" style={{ width: 50, height: 50 }} />
            {category.description}
          </Button>
        ))}
      </HStack>
    </ScrollView>
    <Text fontSize="xl" bold>Popular Products</Text>
    <FlatList
      data={products} // Você precisa definir 'products' ou obtê-los de algum lugar
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Box alignItems="center" m="2">
          <Image source={{ uri: item.image }} alt={item.name} size="xl" borderRadius="10" />
          <Text bold>{item.name}</Text>
          <Text>{item.rating}</Text>
        </Box>
      )}
    />
  </>
);

export default HomeScreen;

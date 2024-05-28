import React from 'react';
import { Box, VStack, HStack, ScrollView, Text, Input, Icon, Image, Button, FlatList, AspectRatio } from 'native-base';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const HomeScreen = () => {
  const collections = [
    { id: '1', label: 'Hoodies', icon: 'hoodie' },
    { id: '2', label: 'Shirts', icon: 'tshirt-crew' },
    { id: '3', label: 'T-Shirts', icon: 'tshirt-crew-outline' },
    { id: '4', label: 'Suits', icon: 'tie' },
    { id: '5', label: 'Bottoms', icon: 'trousers' }
  ];
  const products = [
    { id: '1', name: 'Cool Red Shirt', rating: '4.5', image: 'https://via.placeholder.com/150' },
    { id: '2', name: 'Stylish Blue Hoodie', rating: '4.5', image: 'https://via.placeholder.com/150' },
    { id: '3', name: 'Stylish Blue Hoodie', rating: '4.5', image: 'https://via.placeholder.com/150' }
  ];

  return (
    <VStack space={4} mt="4" px="4">
      <Input
        placeholder="Search for products"
        width="100%"
        borderRadius="10"
        py="3"
        px="2"
        fontSize="14"
        InputLeftElement={<Icon as={<MaterialIcons name="search" />} size="6" ml="2" color="muted.400" />}
      />
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
      <Text fontSize="xl" bold>Collections</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <HStack space={3} alignItems="center">
          {collections.map((collection) => (
            <Button key={collection.id} startIcon={<Icon as={MaterialCommunityIcons} name={collection.icon} size="sm" />} py="3" px="5">
              {collection.label}
            </Button>
          ))}
        </HStack>
      </ScrollView>
      <Text fontSize="xl" bold>Popular Products</Text>
      <FlatList
        data={products}
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
    </VStack>
  );
};

export default HomeScreen;

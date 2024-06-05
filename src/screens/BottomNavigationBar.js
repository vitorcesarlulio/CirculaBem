import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const BottomNavigationBar = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Home'); // Controla a tab ativa

  const handlePress = (screen) => {
    setActiveTab(screen);
    navigation.navigate(screen);
  };

  return (
    <View style={styles.fixedMenu}>
      <TouchableOpacity onPress={() => handlePress('Home')} style={styles.menuItem}>
        <View style={[styles.iconContainer, activeTab === 'Home' ? styles.activeIcon : null]}>
          <Icon name="home" size={24} style={styles.menuIcon} />
        </View>
        <Text style={styles.menuText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePress('Chat')} style={styles.menuItem}>
        <View style={[styles.iconContainer, activeTab === 'Chat' ? styles.activeIcon : null]}>
          <Icon name="file-text" size={24} style={styles.menuIcon} />
        </View>
        <Text style={styles.menuText}>Alugueis</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePress('AddNewItem')} style={styles.addButton}>
        <Icon name="plus" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePress('Wishlist')} style={styles.menuItem}>
        <View style={[styles.iconContainer, activeTab === 'Wishlist' ? styles.activeIcon : null]}>
          <Icon name="heart" size={24} style={styles.menuIcon} />
        </View>
        <Text style={styles.menuText}>Favoritos</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePress('Profile')} style={styles.menuItem}>
        <View style={[styles.iconContainer, activeTab === 'Profile' ? styles.activeIcon : null]}>
          <Icon name="user" size={24} style={styles.menuIcon} />
        </View>
        <Text style={styles.menuText}>Perfil</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  fixedMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#1a1918',
    paddingVertical: 5, // Ajustado conforme solicitado
  },
  menuItem: {
    alignItems: 'center',
    paddingVertical: 5, // Ajuste para melhor centralização
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeIcon: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#233ED9', // Azul claro com opacidade
    borderRadius: 5, // Ligeiramente arredondado, mas não completamente redondo
    shadowColor: '#1a1918',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  menuIcon: {
    color: 'white',
  },
  menuText: {
    color: 'white',
    fontSize: 12,
    marginTop: 3,
  },
  addButton: {
    backgroundColor: '#233ED9',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20, // Elevado para destaque
  }
});

export default BottomNavigationBar;

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProdutosScreen = () => {
  const [newProduct, setNewProduct] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [products, setProducts] = useState([
    // Adicione seus produtos aqui
    { id: '1', name: 'Produto 1', stock: 10, price: 10.0 },
    { id: '2', name: 'Produto 2', stock: 15, price: 15.0 },
  ]);
  
  useEffect(() => {
    const loadProductsFromStorage = async () => {
      try {
        const savedProducts = await AsyncStorage.getItem('products');
        if (savedProducts) {
          setProducts(JSON.parse(savedProducts));
        }
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
      }
    };

    loadProductsFromStorage();
  }, []);

  useEffect(() => {
    const saveProducts = async () => {
      try {
        await AsyncStorage.setItem('products', JSON.stringify(products));
      } catch (error) {
        console.error('Erro ao salvar produtos:', error);
      }
    };

    saveProducts();
  }, [products]);

  const addNewProduct = () => {
    if (newProduct.trim() !== '' && newPrice !== '') {
      const newProductData = {
        id: Math.random().toString(),
        name: newProduct,
        price: parseFloat(newPrice),
      };
      addProduct(newProductData);
      setNewProduct('');
      setNewPrice('');
    }
  };

  const addProduct = (productData) => {
    setProducts([...products, productData]);
  };

  const removeProduct = (productId) => {
    setProducts(products.filter((product) => product.id !== productId));
  };


  return (
    <View style={styles.container}>
    <View style={styles.inputContainer}>
      <TextInput
        style={[styles.input, styles.inputText]} 
        placeholder="Nome do produto"
        placeholderTextColor="white"
        value={newProduct}
        onChangeText={(text) => setNewProduct(text)}
      />
      <TextInput
        style={[styles.input, styles.inputText]} 
        placeholder="Preço"
        placeholderTextColor="white"
        value={newPrice}
        onChangeText={(text) => setNewPrice(text)}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.addButton} onPress={addNewProduct}>
        <Text style={styles.addButtonText}>✅</Text>
      </TouchableOpacity>
      </View>
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.productItem}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productPrice}> R$ {item.price.toFixed(2)}</Text>
          <TouchableOpacity style={styles.removeButton} onPress={() => removeProduct(item.id)}>
            <Text style={styles.removeButtonText}>🗑️</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  </View>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#304F8C'
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    marginRight: 10,
  },

  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 5,
  },


  addButton: {
    width: 40,
    height: 40,
    backgroundColor: '#112359',
    borderRadius: 10,
    padding: 10
  },


  removeButton: {
    width: 40,
    height: 40,
    backgroundColor: '#112359',
    borderRadius: 10,
    padding: 10

  },

  productName: {
    color: 'white', 
  },

  productPrice: {
    color: 'white', 
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    marginRight: 10,
  },

  inputText: {
    color: 'white',
  },


});

export default ProdutosScreen;
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useProductContext } from './ProductContext';

const FinalizarVendaScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { product } = route.params;

  const { soldProducts, setSoldProducts } = useProductContext();
  const [quantitySold, setQuantitySold] = useState('');
  const [priceSold, setPriceSold] = useState('');

  const handleFinalizeSale = () => {
    if (quantitySold !== '' && priceSold !== '') {
      const totalValue = parseFloat(priceSold) * parseInt(quantitySold);
      const currentDate = getCurrentDate();

      setSoldProducts([
        ...soldProducts,
        {
          ...product,
          quantitySold: parseInt(quantitySold),
          totalValue,
          saleDate: currentDate,
          paymentMethod: product.paymentMethod,
        },
      ]);

      setQuantitySold('');
      setPriceSold('');

      navigation.navigate('Home');
    }
  };

  const getCurrentDate = () => {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{product.name}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Quantidade"
          placeholderTextColor="white"
          value={quantitySold}
          onChangeText={setQuantitySold}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Preço unitário"
          placeholderTextColor="white"
          value={priceSold}
          onChangeText={setPriceSold}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.finalizeButton} onPress={handleFinalizeSale}>
          <Text style={styles.finalizeButtonText}>✅</Text>
        </TouchableOpacity>
      </View>
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
    color: '#fff'
  },

  name: {
    color: '#fff'
  },

  finalizeButton: {
    width: 40,
    height: 40,
    backgroundColor: '#112359',
    borderRadius: 10,
    padding: 10
  }

});

export default FinalizarVendaScreen;
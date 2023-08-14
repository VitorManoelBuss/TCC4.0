import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useProductContext } from './ProductContext';

function RelatoriosScreen() {
  const { soldProducts } = useProductContext(); 

  return (
    <View style={styles.container}>
      <FlatList
        data={soldProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Text style={styles.produto}>Produto: {item.name}</Text>
            <Text style={styles.quantidade}>Quantidade: {item.quantitySold}</Text>
            <Text style={styles.preço}>Preço Total: R$ {item.totalValue.toFixed(2)}</Text>
            <Text style={styles.data}>Data da Venda: {item.saleDate}</Text>
            <Text style={styles.metodo}>Método: {item.paymentMethod}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#304F8C'
  },
  productItem: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 5,
  },

  produto: {
    color: '#fff'
  },

  quantidade: {
    color: '#fff'
  },

  preço: {
    color: '#fff'
  },

  data: {
    color: '#fff'
  },

  metodo: {
    color: '#fff'
  }
});

export default RelatoriosScreen;
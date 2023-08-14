import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProductProvider } from './ProductContext';

import HomeScreen from './HomeScreen';
import VendasScreen from './VendasScreen';
import ProdutosScreen from './ProdutosScreen';
import RelatoriosScreen from './RelatoriosScreen';
import FinalizarVendaScreen from './FinalizarVendasScreen';
import ProdutoVendasScreen from './ProdutoVendasScreen'

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <ProductProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#112359',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Página Inicial' }} />
          <Stack.Screen name="Vendas" component={VendasScreen} options={{ title: 'Vendas' }} />
          <Stack.Screen name="Produtos" component={ProdutosScreen} options={{ title: 'Produtos' }} />
          <Stack.Screen name="FinalizarVenda" component={FinalizarVendaScreen} options={{ title: 'Concluir Venda' }} />
          <Stack.Screen name="Relatorios" component={RelatoriosScreen} options={{ title: 'Relatórios' }} />
          <Stack.Screen name="ProdutoVendas" component={ProdutoVendasScreen} options={{ title: 'Vendas' }} initialParams={{ products: [] }} />
        </Stack.Navigator>
      </NavigationContainer>
    </ProductProvider>
  );
};

export default App;
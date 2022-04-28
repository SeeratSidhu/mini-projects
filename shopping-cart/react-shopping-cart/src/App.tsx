import { useState } from 'react';
import { useQuery } from 'react-query';

//Components
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Badge from '@material-ui/core/Badge';

//styles
import { Wrapper } from './App.styles';

//types

export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  quantity: number;
}

//get products from fake store API
const getProducts = async (): Promise<CartItemType[]> => await (await fetch('https://fakestoreapi.com/products')).json();

const App = () => {
  const { data, isLoading, error } = useQuery<CartItemType[]>('products', getProducts)

  if (isLoading) return <LinearProgress/>;
  if (error) return <div>Something went wrong!</div>;


  return (
    <div className="App">
    </div>
  );
}

export default App;

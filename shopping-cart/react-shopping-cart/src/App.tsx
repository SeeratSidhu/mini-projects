import { useState } from 'react';
import { useQuery } from 'react-query';

//Components
import Item from './Item/Item';
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
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const { data, isLoading, error } = useQuery<CartItemType[]>('products', getProducts)

  const handleAddToCart = (item : CartItemType) => null;
  if (isLoading) return <LinearProgress/>;
  if (error) return <div>Something went wrong!</div>;


  return (
    <Wrapper>
      <Drawer anchor='right' open={isCartOpen} onClose={() => setIsCartOpen(false)}>
      
      </Drawer>
      <Grid container spacing ={3}>
      {data?.map((item => (
        <Grid key={item.id} sm={4} xs={12}>
          <Item item={item} handleAddToCart={handleAddToCart}/>
       </Grid>
      )))}  
      </Grid>
    </Wrapper>
  );
}

export default App;

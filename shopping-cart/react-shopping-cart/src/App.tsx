import { useState } from 'react';
import { useQuery } from 'react-query';

//Components
import Item from './Item/Item';
import Cart from './Cart/Cart';
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Badge from '@material-ui/core/Badge';

//styles
import { Wrapper, StyledButton } from './App.styles';

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

  const handleAddToCart = (clickedItem : CartItemType) => {
    setCartItems(prev => {

      const isItemInCart = prev.find(item => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map(item => item.id === clickedItem.id ? ({...item, quantity: item.quantity + 1}) : item)
      }

      return [...prev, {...clickedItem, quantity: 1}];
    })
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev => (
      prev.reduce((acc, item) => {
        if (item.id === id) {
          if (item.quantity === 1) return acc;
          return [...acc, {...item, quantity: item.quantity - 1}];
        } else {
          return [...acc, item];
        }
      }, [] as CartItemType[])
    ))
  };

  const getTotalItems = (items: CartItemType[]) => {
    return items.reduce((acc: number, item) => acc + item.quantity, 0);
  };

  if (isLoading) return <LinearProgress/>;
  if (error) return <div>Something went wrong!</div>;


  return (
    <Wrapper>
      <Drawer anchor='right' open={isCartOpen} onClose={() => setIsCartOpen(false)}>
        <Cart cartItems={cartItems} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart}/>
      </Drawer>
      <StyledButton onClick={() => setIsCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color='error'>
          <AddShoppingCartIcon />
        </Badge>  
      </StyledButton>
      <Grid container spacing ={3}>
      {data?.map((item => (
        <Grid item key={item.id} xs={12} sm={4} >
          <Item item={item} handleAddToCart={handleAddToCart}/>
       </Grid>
      )))}  
      </Grid>
    </Wrapper>
  );
}

export default App;

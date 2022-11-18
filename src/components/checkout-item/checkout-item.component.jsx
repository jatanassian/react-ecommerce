import { useSelector, useDispatch } from "react-redux";
import {
  addItemToCart,
  clearItemFromCart,
  removeItemFromCart,
} from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";
import {
  CheckoutItemContainer,
  ImageContainer,
  NameAndPrice,
  Quantity,
  Arrow,
  Value,
  RemoveButton,
} from "./checkout-item.styles";

const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  const cartItems = useSelector(selectCartItems);

  const dispatch = useDispatch();

  const addItem = () => dispatch(addItemToCart(cartItems, cartItem));
  const removeItem = () => dispatch(removeItemFromCart(cartItems, cartItem));
  const clearItem = () => dispatch(clearItemFromCart(cartItems, cartItem));

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={name} />
      </ImageContainer>
      <NameAndPrice>{name}</NameAndPrice>
      <Quantity>
        <Arrow onClick={removeItem}>&#10094;</Arrow>
        <Value>{quantity}</Value>

        <Arrow onClick={addItem}>&#10095;</Arrow>
      </Quantity>
      <NameAndPrice>{price}</NameAndPrice>
      <RemoveButton onClick={clearItem}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;

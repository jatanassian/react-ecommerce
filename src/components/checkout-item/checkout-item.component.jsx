import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
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
  const { removeItemFromCart, addItemToCart, clearItemFromCart } =
    useContext(CartContext);

  const addItem = () => addItemToCart(cartItem);
  const removeItem = () => removeItemFromCart(cartItem);
  const clearItem = () => clearItemFromCart(cartItem);

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

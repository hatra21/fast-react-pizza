import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { addItem, getCart, increaseItemQuantity } from "../cart/cartSlice";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const cart = useSelector(getCart);
  const dispatch = useDispatch();

  function handleAddToCart() {
    const isInCart = cart.map((item) => item.pizzaId).includes(id);
    // console.log(isInCart);

    if (!isInCart) {
      const newItem = {
        pizzaId: id,
        name,
        quantity: 1,
        unitPrice,
        totalPrice: unitPrice * 1,
      };
      dispatch(addItem(newItem));
    } else {
      dispatch(increaseItemQuantity(id));
    }
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
        src={imageUrl}
        alt={name}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm uppercase text-red-400">Sold out</p>
          )}

          {!soldOut && (
            <Button onClick={handleAddToCart} type="small">
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;

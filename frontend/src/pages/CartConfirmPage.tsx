import { useNavigate, useParams } from 'react-router-dom';
import WelcomeBanner from '../components/WelcomeBanner';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';

function CartPage() {
  const navigate = useNavigate();
  const { title, bookID, price } = useParams();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookID: Number(bookID),
      title: title || 'No Book Found',
      price: Number(price),
      quantity: 1,
    };
    addToCart(newItem);
    navigate('/cart');
  };

  return (
    <>
      <WelcomeBanner />
      <br />
      <h4>
        Add <b>{title}</b> to your cart?
      </h4>
      <h5>Price: ${price}</h5>
      <button onClick={handleAddToCart} className="btn btn-success">
        Add to cart
      </button>
      <button
        onClick={() => navigate('/bookList')}
        className="btn btn-secondary"
      >
        Go Back
      </button>
    </>
  );
}

export default CartPage;

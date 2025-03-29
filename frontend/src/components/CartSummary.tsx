import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

//Cart summary icon to display the total price of the items in the cart.
const CartSummary = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalQuantity = cart.reduce(
    (quantity, item) => quantity + item.quantity,
    0
  );
  return (
    <div
      style={{
        position: 'fixed',
        top: '10px',
        right: '20px',
        background: '#f8f9fa',
        padding: '10px 15px',
        borderRadius: '8px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
        fontSize: '16px',
      }}
      onClick={() => navigate('/cart')}
    >
      🛒 <strong>${totalAmount.toFixed(2)}</strong> &nbsp; ({totalQuantity}{' '}
      items)
    </div>
  );
};

export default CartSummary;

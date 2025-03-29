import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart, clearCart } = useCart();
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  ); //calculate cart price total

  return (
    // <div>
    //   <h2>Your Cart</h2>
    //   <div>
    //     {cart.length === 0 ? (
    //       <p>Your cart is empty.</p>
    //     ) : (
    //       <ul>
    //         {cart.map((item: CartItem) => (
    //           <li key={item.bookID}>
    //             {item.title}: ${item.price.toFixed(2)}/each Quantity:
    //             {item.quantity}
    //             Subtotal: ${(item.quantity * item.price).toFixed(2)}
    //             <button
    //               className="btn btn-danger"
    //               onClick={() => removeFromCart(item.bookID)}
    //             >
    //               Remove
    //             </button>
    //           </li>
    //         ))}
    //       </ul>
    //     )}
    //   </div>

    //   <h3>Total: ${totalAmount.toFixed(2)}</h3>

    //   <button className="btn btn-success">Checkout</button>
    //   <button onClick={() => navigate('/bookList')} className="btn btn-primary">
    //     Continue Browsing
    //   </button>
    //   <button onClick={() => clearCart()} className="btn btn-danger">
    //     Clear Cart
    //   </button>
    // </div>
    <div className="container mt-4">
      <h2 className="mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <div className="alert alert-info">Your cart is empty.</div>
      ) : (
        <ul className="list-group mb-3">
          {cart.map((item: CartItem) => (
            <li
              key={item.bookID}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{item.title}</strong> - ${item.price.toFixed(2)} each{' '}
                <br />
                Quantity: <strong>{item.quantity}</strong> | Subtotal: $
                <strong>{(item.quantity * item.price).toFixed(2)}</strong>
              </div>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => removeFromCart(item.bookID)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="card p-3 mb-3">
        <h3 className="mb-3">Total: ${totalAmount.toFixed(2)}</h3>
        <div className="d-flex gap-2">
          <button className="btn btn-success flex-fill">Checkout</button>
          <button
            onClick={() => navigate('/bookList')}
            className="btn btn-primary flex-fill"
          >
            Continue Browsing
          </button>
          <button
            onClick={() => clearCart()}
            className="btn btn-danger flex-fill"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from '../../store/cartSlice';
import styles from './CartPage.module.css';

const API_BASE_URL = 'http://localhost:3333';

function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const totalPrice = cartItems.reduce((sum, item) => {
    const price = item.discont_price ?? item.price;
    return sum + price * item.quantity;
  }, 0);

  async function onSubmit(formData) {
    try {
      await axios.post(`${API_BASE_URL}/order/send`, {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        items: cartItems,
        total: totalPrice,
      });

      setIsModalOpen(true);
      dispatch(clearCart());
      reset();
    } catch (error) {
      console.error('Не удалось отправить заказ:', error);
    }
  }

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Shopping cart</h1>
        <div className={styles.headerLine} />
        <Link to="/" className={styles.backButton}>Back to the store</Link>
      </div>

      {cartItems.length === 0 ? (
        <div className={styles.emptyState}>
          <p className={styles.emptyText}>Looks like you have no items in your basket currently.</p>
          <Link to="/" className={styles.continueButton}>Continue Shopping</Link>
        </div>
      ) : (
        <div className={styles.content}>
          <div className={styles.items}>
            {cartItems.map((item) => {
              const hasDiscount = item.discont_price && item.discont_price < item.price;
              const unitPrice = item.discont_price ?? item.price;
              const lineTotal = unitPrice * item.quantity;

              return (
                <div className={styles.item} key={item.id}>
                  <img className={styles.itemImage} src={`${API_BASE_URL}/${item.image}`} alt={item.title} />

                  <div className={styles.itemInfo}>
                    <div className={styles.itemTopRow}>
                      <p className={styles.itemTitle}>{item.title}</p>
                      <button
                        type="button"
                        className={styles.removeButton}
                        onClick={() => dispatch(removeFromCart(item.id))}
                      >
                        ✕
                      </button>
                    </div>

                    <div className={styles.itemBottomRow}>
                      <div className={styles.quantitySelector}>
                        <button
                          type="button"
                          className={styles.quantityButton}
                          onClick={() => dispatch(decreaseQuantity(item.id))}
                        >
                          −
                        </button>
                        <span className={styles.quantityValue}>{item.quantity}</span>
                        <button
                          type="button"
                          className={styles.quantityButton}
                          onClick={() => dispatch(increaseQuantity(item.id))}
                        >
                          +
                        </button>
                      </div>

                      <div className={styles.priceRow}>
                        <span className={styles.newPrice}>{lineTotal} €</span>
                        {hasDiscount && <span className={styles.oldPrice}>{item.price} €</span>}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.orderPanel}>
            <h2 className={styles.orderTitle}>Order details</h2>
            <p className={styles.itemsCount}>{cartItems.length} items</p>

            <div className={styles.totalRow}>
              <span className={styles.totalLabel}>Total</span>
              <span className={styles.totalValue}>{totalPrice.toFixed(2).replace('.', ',')} €</span>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                placeholder="Name"
                className={styles.formField}
                {...register('name', { required: 'Введите имя' })}
              />
              {errors.name && <p className={styles.fieldError}>{errors.name.message}</p>}

              <input
                type="tel"
                placeholder="Phone number"
                className={styles.formField}
                {...register('phone', {
                  required: 'Введите номер телефона',
                  pattern: {
                    value: /^[+\d][\d\s-]{6,}$/,
                    message: 'Некорректный номер телефона',
                  },
                })}
              />
              {errors.phone && <p className={styles.fieldError}>{errors.phone.message}</p>}

              <input
                type="email"
                placeholder="Email"
                className={styles.formField}
                {...register('email', {
                  required: 'Введите email',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Некорректный email',
                  },
                })}
              />
              {errors.email && <p className={styles.fieldError}>{errors.email.message}</p>}

              <button type="submit" className={styles.submitButton}>Order</button>
            </form>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <button
              type="button"
              className={styles.modalCloseButton}
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>
            <h2 className={styles.modalTitle}>Congratulations!</h2>
            <p className={styles.modalText}>Your order has been successfully placed on the website.</p>
            <p className={styles.modalText}>A manager will contact you shortly to confirm your order.</p>
          </div>
        </div>
      )}
    </section>
  );
}

export default CartPage;
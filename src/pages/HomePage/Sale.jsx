import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../../store/productsSlice';
import styles from './Sale.module.css';

const API_BASE_URL = 'http://localhost:3333';

function Sale() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const discountedProducts = items.filter(
    (product) => product.discont_price && product.discont_price < product.price
  );

  const firstFour = discountedProducts.slice(0, 4);

  return (
    <section className={styles.sale}>
      <div className={styles.header}>
        <h2 className={styles.title}>Sale</h2>
        <Link to="/sales" className={styles.allLink}>All sales</Link>
      </div>

      {status === 'loading' && <p>Загрузка...</p>}
      {status === 'failed' && <p>Не удалось загрузить скидки.</p>}

      <div className={styles.grid}>
        {firstFour.map((product) => {
          const discountPercent = Math.round((1 - product.discont_price / product.price) * 100);
          return (
            <Link to={`/product/${product.id}`} key={product.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <img className={styles.image} src={`${API_BASE_URL}/${product.image}`} alt={product.title} />
                <span className={styles.badge}>-{discountPercent}%</span>
              </div>
              <p className={styles.name}>{product.title}</p>
              <p className={styles.priceRow}>
                <span className={styles.newPrice}>{product.discont_price} €</span>
                <span className={styles.oldPrice}>{product.price} €</span>
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default Sale;
import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../../store/productsSlice';
import AppBreadcrumbs from '../../components/AppBreadcrumbs/AppBreadcrumbs.jsx';
import styles from './SalesPage.module.css';

const API_BASE_URL = 'http://localhost:3333';

function SalesPage() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.products);

  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [sortOrder, setSortOrder] = useState('default');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const discountedProducts = useMemo(
    () => items.filter((product) => product.discont_price && product.discont_price < product.price),
    [items]
  );

  const filteredProducts = useMemo(() => {
    return discountedProducts.filter((product) => {
      const price = product.discont_price;
      if (priceFrom && price < Number(priceFrom)) return false;
      if (priceTo && price > Number(priceTo)) return false;
      return true;
    });
  }, [discountedProducts, priceFrom, priceTo]);

  const sortedProducts = useMemo(() => {
    const copy = [...filteredProducts];
    if (sortOrder === 'priceAsc') {
      copy.sort((a, b) => a.discont_price - b.discont_price);
    } else if (sortOrder === 'priceDesc') {
      copy.sort((a, b) => b.discont_price - a.discont_price);
    }
    return copy;
  }, [filteredProducts, sortOrder]);

  return (
    <section className={styles.page}>
      <AppBreadcrumbs
        items={[
          { label: 'Main page', to: '/' },
          { label: 'All sales' },
        ]}
      />

      <h1 className={styles.title}>Discounted items</h1>

      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>Price</span>
          <input
            type="number"
            placeholder="from"
            className={styles.filterInput}
            value={priceFrom}
            onChange={(e) => setPriceFrom(e.target.value)}
          />
          <input
            type="number"
            placeholder="to"
            className={styles.filterInput}
            value={priceTo}
            onChange={(e) => setPriceTo(e.target.value)}
          />
        </div>

        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>Sorted</span>
          <select
            className={styles.sortSelect}
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="default">by default</option>
            <option value="priceAsc">Price: low to high</option>
            <option value="priceDesc">Price: high to low</option>
          </select>
        </div>
      </div>

      {status === 'loading' && <p className={styles.message}>Загрузка...</p>}
      {status === 'failed' && <p className={styles.message}>Не удалось загрузить скидки.</p>}
      {status === 'succeeded' && sortedProducts.length === 0 && (
        <p className={styles.message}>Товары не найдены.</p>
      )}

      <div className={styles.grid}>
        {sortedProducts.map((product) => {
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

export default SalesPage;
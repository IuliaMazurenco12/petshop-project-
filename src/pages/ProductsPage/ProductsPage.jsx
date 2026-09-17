import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../../store/productsSlice';
import AppBreadcrumbs from '../../components/AppBreadcrumbs/AppBreadcrumbs.jsx';
import styles from './ProductsPage.module.css';

const API_BASE_URL = 'http://localhost:3333';

// какую цену считать "ценой товара" для фильтра и сортировки —
// если есть скидка, берём её, если нет — обычную цену
function getDisplayPrice(product) {
  return product.discont_price ?? product.price;
}

function ProductsPage() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.products);

  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [onlyDiscounted, setOnlyDiscounted] = useState(false);
  const [sortOrder, setSortOrder] = useState('default');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const filteredProducts = useMemo(() => {
    return items.filter((product) => {
      const hasDiscount = product.discont_price && product.discont_price < product.price;

      if (onlyDiscounted && !hasDiscount) return false;

      const price = getDisplayPrice(product);
      if (priceFrom && price < Number(priceFrom)) return false;
      if (priceTo && price > Number(priceTo)) return false;

      return true;
    });
  }, [items, onlyDiscounted, priceFrom, priceTo]);

  const sortedProducts = useMemo(() => {
    const copy = [...filteredProducts];
    if (sortOrder === 'priceAsc') {
      copy.sort((a, b) => getDisplayPrice(a) - getDisplayPrice(b));
    } else if (sortOrder === 'priceDesc') {
      copy.sort((a, b) => getDisplayPrice(b) - getDisplayPrice(a));
    }
    return copy;
  }, [filteredProducts, sortOrder]);

  return (
    <section className={styles.page}>
      <AppBreadcrumbs
        items={[
          { label: 'Main page', to: '/' },
          { label: 'All products' },
        ]}
      />

      <h1 className={styles.title}>All products</h1>

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

        <label className={styles.filterGroup}>
          <span className={styles.filterLabel}>Discounted items</span>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={onlyDiscounted}
            onChange={(e) => setOnlyDiscounted(e.target.checked)}
          />
        </label>

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
      {status === 'failed' && <p className={styles.message}>Не удалось загрузить товары.</p>}
      {status === 'succeeded' && sortedProducts.length === 0 && (
        <p className={styles.message}>Товары не найдены.</p>
      )}

      <div className={styles.grid}>
        {sortedProducts.map((product) => {
          const hasDiscount = product.discont_price && product.discont_price < product.price;
          const discountPercent = hasDiscount
            ? Math.round((1 - product.discont_price / product.price) * 100)
            : 0;

          return (
            <Link to={`/product/${product.id}`} key={product.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <img className={styles.image} src={`${API_BASE_URL}/${product.image}`} alt={product.title} />
                {hasDiscount && <span className={styles.badge}>-{discountPercent}%</span>}
              </div>
              <p className={styles.name}>{product.title}</p>
              <p className={styles.priceRow}>
                {hasDiscount ? (
                  <>
                    <span className={styles.newPrice}>{product.discont_price} €</span>
                    <span className={styles.oldPrice}>{product.price} €</span>
                  </>
                ) : (
                  <span className={styles.newPrice}>{product.price} €</span>
                )}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default ProductsPage;
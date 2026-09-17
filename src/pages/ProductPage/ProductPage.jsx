import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AppBreadcrumbs from '../../components/AppBreadcrumbs/AppBreadcrumbs.jsx';
import styles from './ProductPage.module.css';

import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cartSlice';

const API_BASE_URL = 'http://localhost:3333';

function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);
  const [status, setStatus] = useState('loading');

  const [quantity, setQuantity] = useState(1);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

  useEffect(() => {
    async function loadProduct() {
      setStatus('loading');
      setQuantity(1);
      setIsDescriptionOpen(false);

      try {
        const response = await axios.get(`${API_BASE_URL}/products/${id}`);
        const result = response.data;

        if (result.status === 'ERR' || !Array.isArray(result) || result.length === 0) {
          setStatus('empty');
          return;
        }

        const foundProduct = result[0];
        setProduct(foundProduct);
        setStatus('succeeded');

        const categoryResponse = await axios.get(`${API_BASE_URL}/categories/${foundProduct.categoryId}`);
        if (categoryResponse.data.status !== 'ERR') {
          setCategory(categoryResponse.data.category);
        }
      } catch {
        setStatus('failed');
      }
    }

    loadProduct();
  }, [id]);

  if (status === 'loading') return <p className={styles.message}>Загрузка...</p>;
  if (status === 'failed') return <p className={styles.message}>Не удалось загрузить товар.</p>;
  if (status === 'empty') return <p className={styles.message}>Товар не найден.</p>;

  const hasDiscount = product.discont_price && product.discont_price < product.price;
  const discountPercent = hasDiscount
    ? Math.round((1 - product.discont_price / product.price) * 100)
    : 0;

  function handleDecrease() {
    setQuantity((prev) => Math.max(1, prev - 1));
  }

  function handleIncrease() {
    setQuantity((prev) => prev + 1);
  }

  function handleAddToCart() {
    for (let i = 0; i < quantity; i += 1) {
      dispatch(addToCart({
        id: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
        discont_price: product.discont_price,
      }));
    }
  }

  return (
    <section className={styles.page}>
      <AppBreadcrumbs
        items={[
          { label: 'Main page', to: '/' },
          { label: 'Categories', to: '/categories' },
          ...(category ? [{ label: category.title, to: `/categories/${category.id}` }] : []),
          { label: product.title },
        ]}
      />

      <div className={styles.content}>
        <div className={styles.gallery}>
          <img className={styles.mainImage} src={`${API_BASE_URL}/${product.image}`} alt={product.title} />
        </div>

        <div className={styles.info}>
          <h1 className={styles.title}>{product.title}</h1>

          <div className={styles.priceRow}>
            {hasDiscount ? (
              <>
                <span className={styles.newPrice}>{product.discont_price} €</span>
                <span className={styles.oldPrice}>{product.price} €</span>
                <span className={styles.badge}>-{discountPercent}%</span>
              </>
            ) : (
              <span className={styles.newPrice}>{product.price} €</span>
            )}
          </div>

          <div className={styles.quantityRow}>
            <div className={styles.quantitySelector}>
              <button type="button" className={styles.quantityButton} onClick={handleDecrease}>
                −
              </button>
              <span className={styles.quantityValue}>{quantity}</span>
              <button type="button" className={styles.quantityButton} onClick={handleIncrease}>
                +
              </button>
            </div>

            <button type="button" className={styles.addButton} onClick={handleAddToCart}>
              Add to cart
            </button>
          </div>

          <div className={styles.description}>
            <h2 className={styles.descriptionTitle}>Description</h2>
            <p className={`${styles.descriptionText} ${isDescriptionOpen ? styles.descriptionTextOpen : ''}`}>
              {product.description}
            </p>
            <button
              type="button"
              className={styles.readMore}
              onClick={() => setIsDescriptionOpen((prev) => !prev)}
            >
              {isDescriptionOpen ? 'Show less' : 'Read more'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductPage;
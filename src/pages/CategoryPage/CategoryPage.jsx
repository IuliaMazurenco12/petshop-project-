import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './CategoryPage.module.css';

const API_BASE_URL = 'http://localhost:3333';

function CategoryPage() {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('loading'); // 'loading' | 'succeeded' | 'failed' | 'empty'

  useEffect(() => {
    async function loadCategory() {
      setStatus('loading');
      try {
        const response = await fetch(`${API_BASE_URL}/categories/${id}`);
        const result = await response.json();

        if (result.status === 'ERR') {
          setStatus('empty');
          return;
        }

        setCategory(result.category);
        setProducts(result.data);
        setStatus('succeeded');
      } catch (error) {
        setStatus('failed');
      }
    }

    loadCategory();
  }, [id]);

  if (status === 'loading') return <p className={styles.message}>Загрузка...</p>;
  if (status === 'failed') return <p className={styles.message}>Не удалось загрузить категорию.</p>;
  if (status === 'empty') return <p className={styles.message}>В этой категории пока нет товаров.</p>;

  return (
    <section className={styles.page}>
      <h1 className={styles.title}>{category.title}</h1>
      <div className={styles.grid}>
        {products.map((product) => (
          <Link to={`/product/${product.id}`} key={product.id} className={styles.card}>
            <img className={styles.image} src={`${API_BASE_URL}/${product.image}`} alt={product.title} />
            <p className={styles.name}>{product.title}</p>
            <p className={styles.price}>{product.discont_price ?? product.price} €</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default CategoryPage;
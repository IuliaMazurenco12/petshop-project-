import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../../store/categoriesSlice';
import styles from './Categories.module.css';

const API_BASE_URL = 'http://localhost:3333';

function Categories() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const firstFour = items.slice(0, 4);

  return (
    <section className={styles.categories}>
      <div className={styles.header}>
        <h2 className={styles.title}>Categories</h2>
        <Link to="/categories" className={styles.allLink}>All categories</Link>
      </div>

      {status === 'loading' && <p>Загрузка...</p>}
      {status === 'failed' && <p>Не удалось загрузить категории.</p>}

      <div className={styles.grid}>
        {firstFour.map((category) => (
          <Link to={`/categories/${category.id}`} key={category.id} className={styles.card}>
            <img
              className={styles.image}
              src={`${API_BASE_URL}/${category.image}`}
              alt={category.title}
            />
            <p className={styles.name}>{category.title}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Categories;
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../../store/categoriesSlice.js';
import AppBreadcrumbs from '../../components/AppBreadcrumbs/AppBreadcrumbs.jsx';
import styles from './CategoriesPage.module.css';

const API_BASE_URL = 'http://localhost:3333';

function CategoriesPage() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.categories);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  if (status === 'loading' || status === 'idle') {
    return <p className={styles.message}>Загрузка...</p>;
  }

  if (status === 'failed') {
    return <p className={styles.message}>{error ?? 'Не удалось загрузить категории.'}</p>;
  }

  if (items.length === 0) {
    return <p className={styles.message}>Категории не найдены.</p>;
  }

  return (
    <section className={styles.page}>
      <AppBreadcrumbs
        items={[
          { label: 'Main page', to: '/' },
          { label: 'Categories' },
        ]}
      />
      <h1 className={styles.title}>Categories</h1>
      <div className={styles.grid}>
        {items.map((category) => (
          <Link to={`/categories/${category.id}`} key={category.id} className={styles.card}>
            <img className={styles.image} src={`${API_BASE_URL}/${category.image}`} alt={category.title} />
            <p className={styles.name}>{category.title}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default CategoriesPage;
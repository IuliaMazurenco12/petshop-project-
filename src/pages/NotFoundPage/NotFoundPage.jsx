import { Link } from 'react-router-dom';
import notFoundImage from '../../assets/images/404.svg';
import styles from './NotFoundPage.module.css';

function NotFoundPage() {
  return (
    <section className={styles.page}>
      <img src={notFoundImage} alt="Page not found" className={styles.image} />

      <h1 className={styles.title}>Page Not Found</h1>

      <p className={styles.text}>
        We are sorry, the page you requested could not be found. Please go back to the homepage.
      </p>

      <Link to="/" className={styles.button}>
        Go Home
      </Link>
    </section>
  );
}

export default NotFoundPage;
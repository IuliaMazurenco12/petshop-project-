import { Link } from 'react-router-dom';
import mainPagePic from '../../assets/images/pets-header2.png';
import styles from './Hero.module.css';

function Hero() {
  return (
    <section
      className={styles.hero}
      style={{ backgroundImage: `url(${mainPagePic})` }}
    >
      <div className={`container ${styles.inner}`}>
        <h1 className={styles.title}>
          Amazing Discounts
          <br />
          on Pets Products!
        </h1>

        <Link to="/sales" className={styles.button}>
          Check out
        </Link>
      </div>
    </section>
  );
}

export default Hero;
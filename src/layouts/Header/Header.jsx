import { Link, NavLink } from 'react-router-dom';
import dogLogo from '../../assets/images/dog-logo.svg';
import cartIcon from '../../assets/icons/rubbish-pic.svg';
import styles from './Header.module.css';

const NAV_LINKS = [
  { to: '/', label: 'Main Page' },
  { to: '/categories', label: 'Categories' },
  { to: '/products', label: 'All products' },
  { to: '/sales', label: 'All sales' },
];

function Header({ cartCount = 2 }) {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.logo} aria-label="На главную">
          <img src={dogLogo} alt="Логотип" width={70} height={70} />
        </Link>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <Link to="/cart" className={styles.cart} aria-label="Корзина">
          <img src={cartIcon} alt="" width={24} height={24} />
          {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
        </Link>
      </div>
    </header>
  );
}

export default Header;


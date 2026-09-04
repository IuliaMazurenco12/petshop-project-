import instagramIcon from '../../assets/icons/ic-instagram.svg';
import whatsappIcon from '../../assets/icons/ic-whatsapp.svg';
import mapPic from '../../assets/images/map-pic.svg';
import styles from './Footer.module.css';

const CONTACT = {
  phone: '+49 30 915-88492',
  address: 'Wallstraße 9-13, 10179 Berlin, Deutschland',
  workingHours: '24 hours a day',
  instagramUrl: 'https://instagram.com',
  whatsappUrl: 'https://wa.me/493091588492',
};

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <h2 className={styles.title}>Contact</h2>

        <div className={styles.grid}>
          <div className={styles.card}>
            <span className={styles.cardLabel}>Phone</span>
            <a href={`tel:${CONTACT.phone}`} className={styles.cardValue}>
              {CONTACT.phone}
            </a>
          </div>

          <div className={styles.card}>
            <span className={styles.cardLabel}>Socials</span>
            <div className={styles.socials}>
              <a href={CONTACT.instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram">
                <img src={instagramIcon} alt="Instagram" width={20} height={20} />
              </a>
              <a href={CONTACT.whatsappUrl} target="_blank" rel="noreferrer" aria-label="WhatsApp">
                <img src={whatsappIcon} alt="WhatsApp" width={20} height={20} />
              </a>
            </div>
          </div>

          <div className={styles.card}>
            <span className={styles.cardLabel}>Address</span>
            <p className={styles.cardValue}>{CONTACT.address}</p>
          </div>

          <div className={styles.card}>
            <span className={styles.cardLabel}>Working Hours</span>
            <p className={styles.cardValue}>{CONTACT.workingHours}</p>
          </div>
        </div>

        <div className={styles.mapWrapper}>
          <img src={mapPic} alt="Расположение магазина на карте" className={styles.map} />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
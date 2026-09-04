import { useState } from 'react';
import petsPic from '../../assets/images/discount-form2.png';
import styles from './DiscountBanner.module.css';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3333';
const INITIAL_FORM = { name: '', phone: '', email: '' };

function DiscountBanner() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState('idle');

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus('loading');

    try {
      await axios.post(`${API_BASE_URL}/sale/send`, form);
      setStatus('success');
      setForm(INITIAL_FORM);
    } catch {
      setStatus('error');
    }
  }

  return (
  <section
  className={styles.banner}
  style={{
    backgroundImage: `url(${petsPic}), linear-gradient(261deg, #4a63f0, #2440c9)`,
  }}
>
      <h2 className={styles.title}>5% off on the first order</h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          className={styles.input}
          type="tel"
          name="phone"
          placeholder="Phone number"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <input
          className={styles.input}
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <button className={styles.button} type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Sending...' : 'Get a discount'}
        </button>

        {status === 'success' && (
          <p className={styles.successMessage}>Спасибо! Купон отправлен на почту.</p>
        )}
        {status === 'error' && (
          <p className={styles.errorMessage}>Не получилось отправить, попробуй ещё раз.</p>
        )}
      </form>
    </section>
  );
}

export default DiscountBanner;
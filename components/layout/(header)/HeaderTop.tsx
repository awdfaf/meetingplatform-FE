'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './HeaderTop.module.css';

export default function HeaderTop() {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    setScrolled(window.pageYOffset > 0);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <header
        className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}
      >
        <nav className={styles.nav}>
          <div>
            <h1 className=''>My Header</h1>
          </div>
          <ul className={styles.menu}>
            <li>
              <Link href="/home" className={styles.link}>Home</Link>
            </li>
            <li>
              <Link href="/about" className={styles.link}>About</Link>
            </li>
            <li>
              <Link href="/contact" className={styles.link}>Contact</Link>
            </li>
          </ul>

        </nav>
      </header>
      {/* <div className={styles.content}>
        
      </div> */}
    </div>
  );
}

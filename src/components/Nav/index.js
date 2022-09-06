import React from 'react';
import styles from './Styles.module.scss';

function Nav() {
    return (
        <nav className={styles.nav}>
        <ul>
          <li>Home</li>
          <li>Work</li>
          <li>Blog</li>
          <li>Connect</li>
        </ul>
        </nav>
  )
}

export default Nav
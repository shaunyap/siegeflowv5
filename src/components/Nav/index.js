import React from 'react';
import styles from './Styles.module.scss';
import Link from 'next/link'

function Nav() {
    return (
        <nav className={styles.nav}>
        <ul>
          <li><Link href="/"><a>Home</a></Link></li>
          <li><Link href="/work"><a>Work</a></Link></li>
          <li><Link href="/blog"><a>Blog</a></Link></li>
          <li><Link href="mailto:shaun@siegeflow.com"><a>Contact</a></Link></li>
        </ul>
        </nav>
  )
}

export default Nav
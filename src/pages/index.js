import Image from 'next/image'
import Link from 'next/link'

import styles from './Home.module.scss'
import Layout from '../components/Layout'
import { getPostsForIndex } from '../lib/posts'

export async function getStaticProps() {
  const work = await getPostsForIndex('work');
  const blogPosts = await getPostsForIndex('blog');

  return {
    props: {
      work,
      blogPosts
    }
  }
}


export default function Home(props) {
  return (
    <Layout>
          <section>
            <article className={styles.article}>
              <h1 className={styles.title}>
                Seattle-based web developer and marketer
              </h1>
              <div className={styles.social_media}>
                <div>
                  <Link href="https://github.com/shaunyap"><a><Image src='/github.svg' alt="Github logo" width={20} height={20}/></a></Link>
                  <Link href="https://linkedin.com/in/shauny"><a><Image src='/linkedin.svg' alt="LinkedIn logo" width={20} height={20}/></a></Link>
                </div>
              </div>
              <div>
              <p>Hello there, thanks for dropping by! I&apos;m Shaun. My day job is building and managing <a href="https://amperity.com">Amperity&apos;s web properties</a> to drive business results for the organization.</p>

              <p>Previously, I led the web strategy for <a href="https://chef.io">Chef Software</a> which was acquired by Progress Software for US$220m. I&apos;ve also done some award-winning work at <a href="https://www.campaignlive.com/article/wpp-unveils-wavemaker-name-merged-mec-maxus-agency/1443769">the agency formerly known as MEC</a> in Singapore as well as in Dubai. I&apos;m now based out of Seattle with my four cats.</p>

              <p><a href="mailto:shaun@siegeflow.com">Feel free to say hi</a>.</p>
        
                <p className={styles.signoff}>shaunyap</p>
              </div>
              <hr />
            </article>
          </section>
          <section className={styles.half}>
            <div>
            <h2>Selected past work</h2>
            <ul className={styles.post_index}>
              {props.work.map(post => (
                <Link href={post.path} key={post.path}><a><li>{post.title}</li></a></Link>
              )) }
            </ul>
            </div>
            <div>
            <h2>Blog posts</h2>
            <ul className={styles.post_index}>
              {props.blogPosts.map(post => (
                <Link href={post.path} key={post.path}><a><li>{post.title}</li></a></Link>
              )) }
            </ul>
            </div>
          </section>
    </Layout>
  )
}

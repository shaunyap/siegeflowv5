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
                Seattle-based web marketing leader and developer
              </h1>
              <div className={styles.social_media}>
                <div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <Link href="https://github.com/shaunyap"><a><img src='/github.svg' alt="Github logo" width={20} height={20}/></a></Link>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <Link href="https://linkedin.com/in/shauny"><a><img src='/linkedin.svg' alt="LinkedIn logo" width={20} height={20}/></a></Link>
                </div>
              </div>
              <div>
              <p>Hello there, thanks for dropping by! I&apos;m Shaun. For over 15 years, I&apos;ve led digital teams at the intersection of business strategy and technology, specializing in aligning modern web tools and data systems to make growth smooth and scalable.</p>

              <p>Currently, I&apos;m the Head of Web Marketing at <a href="https://amperity.com">Amperity</a>. Lately, I&apos;ve been building custom AI agent workflows (using Gemini, Claude, and MCP) to automate reporting and launch campaigns in hours, optimizing performance with a headless Next.js/Vercel/Contentful stack, and developing pipeline attribution models unified across Salesforce, Marketo, and Google Analytics.</p>

              <p>Previously, I led the web strategy for <a href="https://chef.io">Chef Software</a> (acquired by Progress Software for US$220m), founded my own advisory, Siegeflow, in Singapore, and ran award-winning campaigns at <a href="https://www.campaignlive.com/article/wpp-unveils-wavemaker-name-merged-mec-maxus-agency/1443769">Wavemaker (formerly MEC)</a> in Singapore and Dubai. Today, I live in the Seattle area with my wife and four cats.</p>

              <p><a href="mailto:shaunyap@gmail.com">Feel free to say hi</a>.</p>
        
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

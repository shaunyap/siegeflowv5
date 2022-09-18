import Link from "next/link"
import Layout from "../../components/Layout"
import { getPostsForIndex } from '../../lib/posts'

import styles from "./Blog.module.scss"

export async function getStaticProps() {
    const blogPosts = await getPostsForIndex('blog');

    return {
        props: {
            blogPosts
        }
    }
}

export default function Blog(props) {
    return (
        <Layout title="Blog">
            <section>
                <h1 className="center-text">Blog</h1>
            </section>
            <section>
            <ul className={styles.post_list}>
                {props.blogPosts.map(post => {
                return (
                    <li key={post.path}>
                        <Link href={post.path}>
                            <a>
                                <h4>{post.title}</h4>
                                <div>
                                    {
                                        post.tags ? (
                                            <p>
                                                Tagged: {post.tags[0]}{post.tags.length>0 ? post.tags.slice(1).map(tag => `, ${tag}`): null} /&nbsp;
                                            </p>
                                        ) : null
                                    }
                                    {post.date? <p>{post.date}</p> : null}
                                </div>
                            </a>
                       </Link>
                    </li>
                )
            })}
            </ul>
            </section>
        </Layout>
    )
}
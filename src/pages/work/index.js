import Link from "next/link"
import Layout from "../../components/Layout"
import { getPostsForIndex } from '../../lib/posts'

import styles from "./Work.module.scss"

export async function getStaticProps() {
    const work = await getPostsForIndex('work');

    return {
        props: {
            work
        }
    }
}

export default function Work(props) {
    return (
        <Layout title="Selected Work">
            <section>
            <h1 className="center-text">Selected Work</h1>
            </section>
            <section>
            <ul className={styles.post_list}>
                {props.work.map(post => {
                return (
                    <li key={post.path}>
                        <Link href={post.path}>
                            <a>
                                <h4>{post.title}</h4>
                                {post.subheader? <p>{post.subheader}</p> : null}
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
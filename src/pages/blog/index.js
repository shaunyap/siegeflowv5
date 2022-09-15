import Link from "next/link"
import Layout from "../../components/Layout"
import { getPostsForIndex } from '../../lib/posts'

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
                <h1>Blog</h1>
            </section>
            <section>
            <ul>
                {props.blogPosts.map(post => {
                return (
                    <li key={post.path}>
                        <Link href={post.path}>
                            <a>{post.title}</a>
                       </Link>
                    </li>
                )
            })}
            </ul>
            </section>
        </Layout>
    )
}
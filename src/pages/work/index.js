import Link from "next/link"
import Layout from "../../components/Layout"
import { getPostsForIndex } from '../../lib/posts'

export async function getStaticProps() {
    const projects = await getPostsForIndex('projects');

    return {
        props: {
            projects
        }
    }
}

export default function Work(props) {
    return (
        <Layout title="Selected Work">
            <section>
                <h1>Selected Work</h1>
            </section>
            <section>
            <ul>
                {props.projects.map(post => {
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
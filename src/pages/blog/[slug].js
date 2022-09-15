import Layout from "../../components/Layout"
import { getPost } from '../../lib/posts'
import MarkdownIt from 'markdown-it'
import styles from './Blog.module.scss'

export async function getStaticPaths() {
  return {
    paths: [{ params: { slug: 'h1b1' } }, { params: { slug: '2' } }],
    fallback: false, // can also be true or 'blocking'
  }
}


export async function getStaticProps() {
    const md = new MarkdownIt();
    const {data, content} = await getPost('blog', 'h1b1');
    const renderedContent = md.render(content);

    return {
        props: {
          data,
          renderedContent
        }
    }
}

export default function Blog(props) {
    return (
        <Layout title="Blog">
            <section>
                <h1 className={styles.title}>{props.data.title}</h1>
                <p className={styles.date}>Written {props.data.date}</p>
            </section>
            <section>
            <div dangerouslySetInnerHTML={{ __html: props.renderedContent }} />
            </section>
        </Layout>
    )
}
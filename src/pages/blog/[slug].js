import fs from 'fs'
import MarkdownIt from 'markdown-it'
const path = require('path')
import matter from 'gray-matter'

import { getAllPostSlugs } from '../../lib/posts'
import Layout from "../../components/Layout"
import styles from './Blog.module.scss'

const dirPath = path.resolve('./src/blog/')

export async function getStaticPaths() {
  const paths = getAllPostSlugs(dirPath);
  return {
    paths,
    fallback: false,
  };
}


export async function getStaticProps(context) {
    const md = new MarkdownIt();
    const fileContents = fs.readFileSync(path.resolve(`./src/blog/${context.params.slug}`,'./index.md'), 'utf8')
    const { data, content } = matter(fileContents)

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
        <Layout title={`${props.data.title} | Blog`}>
            <section>
                <h1 className={styles.title}>{props.data.title}</h1>
                <p className={styles.date}>{props.data.date}</p>
            </section>
            <section>
            <div dangerouslySetInnerHTML={{ __html: props.renderedContent }} />
            </section>
        </Layout>
    )
}
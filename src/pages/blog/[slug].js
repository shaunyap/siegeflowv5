const path = require('path')
import fs from 'fs'
import MarkdownIt from 'markdown-it'
import matter from 'gray-matter'

import styles from './Blog.module.scss'
import { getAllPostSlugs } from '../../lib/blog';

const dirPath = path.resolve('./src/posts/')

export async function getStaticPaths() {
    const paths = getAllPostSlugs(dirPath);
    return {
      paths,
      fallback: false,
    };
  }

export async function getStaticProps(context) {
    const md = new MarkdownIt();

    const fileContents = fs.readFileSync(path.resolve(`./src/posts/${context.params.slug}`,'./index.md'), 'utf8')
    const { data, content } = matter(fileContents)

    const frontMatter = data;
    const renderedContent = md.render(content);
    
    // TODO: Figure out how/where to host images
    return {
      props: {frontMatter, renderedContent}
    }
  }

const BlogPost = ({frontMatter, renderedContent}) => {
return (
    <main className={styles.main}>
      <article className={styles.blog_post}>
        <h1>{frontMatter.title}</h1>
        <div
          dangerouslySetInnerHTML={{__html: renderedContent}}
        />
      </article>
    </main>
)
}

export default BlogPost

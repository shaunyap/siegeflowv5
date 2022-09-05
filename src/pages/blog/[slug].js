import fs from 'fs'
const path = require('path')
import MarkdownIt from 'markdown-it'
import matter from 'gray-matter'
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
    
    // TODO: Figure out how/where to host images
    return {
      props: {frontMatter, content}
    }
  }

const BlogPost = ({frontMatter, content}) => {
return (
    <div>
        <h1>{frontMatter.title}</h1>
        <div
          dangerouslySetInnerHTML={{__html: content}}
        />
    </div>
)
}

export default BlogPost

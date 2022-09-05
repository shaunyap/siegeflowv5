import fs from 'fs'
const path = require('path')
// import parseMD from 'parse-md'
import MarkdownIt from 'markdown-it'
import matter from 'gray-matter'

const dirPath = path.resolve('./src/posts/')
const tempslug="test"

export async function getStaticPaths() {
  // TODO: Figure out how to generate a list of paths from the folders in /posts
      fs.readdir(dirPath, function (err, filesPath) {
      if (err) throw err;
        // return { params: { slug: file } };
        console.log(filesPath);
      })
    return {
        paths: [
            { params: { slug: tempslug } }
        ],
        fallback: true // false or 'blocking'
    };
}

export async function getStaticProps(context) {
    const md = new MarkdownIt();

    const fileContents = fs.readFileSync(path.resolve(`./src/posts/${tempslug}`,'./index.md'), 'utf8')
    const { data, content } = matter(fileContents)

    const frontMatter = data;
    
    // TODO: Figure out how/where to host images
    console.log(frontMatter.title)

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

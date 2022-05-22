import fs from 'fs'
const path = require('path')
import parseMD from 'parse-md'
import MarkdownIt from 'markdown-it'

export async function getStaticPaths() {
    return {
        paths: [
            { params: { slug: "hi" } }
        ],
        fallback: true // false or 'blocking'
    };
}

export async function getStaticProps(context) {
    const md = new MarkdownIt();

    const fileContents = fs.readFileSync(path.resolve('./src/posts/amperity-corp','./amperity-corpsite.md'), 'utf8')
    const { metadata, content } = parseMD(fileContents)

    const parsedContent = md.render(content) 

    return {
      props: {metadata, parsedContent}
    }
  }

const BlogPost = ({metadata, parsedContent} = data) => {
return (
    <div>
        <h1>{metadata.title}</h1>
        <div
          dangerouslySetInnerHTML={{__html: parsedContent}}
        />
    </div>
)
}

export default BlogPost

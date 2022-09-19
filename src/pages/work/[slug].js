const path = require('path')
import fs from 'fs'
import MarkdownIt from 'markdown-it'
import matter from 'gray-matter'

import Layout from '../../components/Layout'
import styles from './Work.module.scss'
import { getAllPostSlugs } from '../../lib/posts';

const dirPath = path.resolve('./src/work/')

export async function getStaticPaths() {
    const paths = getAllPostSlugs(dirPath);
    return {
      paths,
      fallback: false,
    };
  }

export async function getStaticProps(context) {
    const md = new MarkdownIt();

    const fileContents = fs.readFileSync(path.resolve(`./src/work/${context.params.slug}`,'./index.md'), 'utf8')
    const { data, content } = matter(fileContents)

    const frontMatter = data;
    const renderedContent = md.render(content);
    const teams = frontMatter.team? Object.getOwnPropertyNames(frontMatter.team) : null
    const rawHtml = teams ? teams.map(discipline => (
      `<h6>${discipline}:</h6> ${typeof frontMatter.team[discipline] === "string" ? md.render(frontMatter.team[discipline])
      : frontMatter.team[discipline].map(person => md.render(person))}`
    )) : null

    // do text handling - make everything one <p> and remove all newlines.
    const renderedTeams = rawHtml.map(single => single.replace(/\n/g,'').replace(/,<p>/g, ', ').replace(/<\/p>(?=.{3,})/g, ''));

    // TODO: Figure out how/where to host images
    return {
      props: {frontMatter, renderedContent, renderedTeams}
    }
  }

const BlogPost = ({frontMatter, renderedContent, renderedTeams}) => {
  return (
    <Layout title={frontMatter.title}>
      <article className={styles.work_post}>
        <div className={styles.meta}>
          <div>
            <h1>{frontMatter.title}</h1>
            <p>{frontMatter.subheader}</p>
          </div>
          {renderedTeams ? (
            <div className={styles.team}>
              <h3>Team</h3>
              {renderedTeams.map((team, i) => <div key={i} dangerouslySetInnerHTML={{__html: team}} />)}
            </div>
          ): null}
        </div>
        <div
          dangerouslySetInnerHTML={{__html: renderedContent}}
        />
      </article>
    </Layout>
  )
}

export default BlogPost

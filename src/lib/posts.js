import fs from 'fs'
import matter from 'gray-matter'
const path = require('path')

function getAllPostSlugs(postsDirectory) {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export function getPostsForIndex(directory, numberOfPosts) {
    const fileMeta = (fileName) => {
      const fileContents = fs.readFileSync(path.resolve(`./src/${directory}/${fileName}`,'./index.md'), 'utf8')
      const { data } = matter(fileContents)
      const {title, date} = data

      return {
        path: `/${directory}/${fileName}`,
        title,
        date
      }
    }

    const posts = []
    const fileNames = fs.readdirSync(`./src/${directory}`);
    fileNames.map(fileName => {
      posts.push(fileMeta(fileName))
    })

    posts.sort((a,b) => a.date - b.date);
    return posts.slice(0, numberOfPosts)
}

export function getPost(directory, fileName) {
  const {data, content} = matter(fs.readFileSync(path.resolve(`./src/${directory}/${fileName}`,'./index.md'), 'utf8'))
  
  return {data, content}
}

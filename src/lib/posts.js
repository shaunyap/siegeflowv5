import fs from 'fs'
import matter from 'gray-matter'
const path = require('path')

export function getAllPostSlugs(postsDirectory) {
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
      const {title, date } = data
      const subheader = data.subheader ? data.subheader : null 
      const tags = data.tags ? data.tags : null 

      return {
        path: `/${directory}/${fileName}`,
        title,
        date,
        subheader, 
        tags
      }
    }

    const posts = []
    const fileNames = fs.readdirSync(`./src/${directory}`);
    fileNames.map(fileName => {
      posts.push(fileMeta(fileName))
    })

    
    const sortPosts= posts.sort((a,b) => new Date(b.date) - new Date(a.date));
    return sortPosts.slice(0, numberOfPosts)
}

export function getPost(directory, fileName) {
  const {data, content} = matter(fs.readFileSync(path.resolve(`./src/${directory}/${fileName}`,'./index.md'), 'utf8'))
  
  return {data, content}
}

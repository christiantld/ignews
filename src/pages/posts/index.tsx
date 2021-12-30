import { GetStaticProps } from 'next'
import Prismic from '@prismicio/client'
import Head from 'next/head'
import Link from 'next/link'
import { getPrismiClient } from '../../service/prismic'
import styles from './styles.module.scss'
import { RichText } from 'prismic-dom'

interface Post {
  slug: string
  title: string
  excerpt: string
  updatedAt: string

}

interface PostsProps {
  posts: Post[]
}

export default function Posts({ posts }: PostsProps) {

  return(
    <>
      <Head>
        <title>Posts | ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map(post => (
            <Link key={post.slug}  href={`/posts/${post.slug}`}>
              <a >
                <time>{post.updatedAt}</time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </a>
            </Link>
            
          ))}         
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismiClient()

  const response = await prismic.query([
    Prismic.predicates.at('document.type', 'post'),
  ],{
    fetch: ['publication.title', 'publication.content'],
    pageSize:100
  })

  const posts = response.results.map(post => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      excerpt:post.data.content.find(content => content.type ==='paragraph')?.text ?? '',
      updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
    }
  })

  return {
    props: {
      posts
    },
    revalidate: 60 * 30 // 30 minutes
  }
}
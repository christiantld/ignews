import Prismic from '@prismicio/client';

export function getPrismiClient(req?: unknown) {
  const prismic = Prismic.client(
    process.env.PRISMIC_ENTRYPOINT,{
      req,
      accessToken: process.env.PRISMIC_SECRET_KEY
    }
  )

  return prismic
}
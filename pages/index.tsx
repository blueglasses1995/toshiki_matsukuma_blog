import { getFormattedDate } from '@lib/utils';
import { getPosts } from '@lib/firebase';
import { Layout } from '@components';

// This component represents the index page for the site. You
// can read more about Pages in the Next.js docs at:
// https://nextjs.org/docs/basic-features/pages

const HomePage = ({ posts }) => (
  <Layout>
    <div>
      <h1>Blog Posts</h1>
      {posts?.map(post => (
        <article key={post.slug}>
          <div>
            <h2>{post.title}</h2>
            <span>{getFormattedDate(post.dateCreated)}</span>
            <p
              dangerouslySetInnerHTML={{
                __html: `${post.content.substring(0, 70)}...`,
              }}
            />
            <a href={`/post/${post.slug}`}>Continue Reading</a>
          </div>
        </article>
      ))}
    </div>
  </Layout>
);

// This is for fetching data every time the page is visited. We do this
// so that we don't have to redploy the site every time we add a blog post.
// You can read more about this in the Next.js docs at:
// https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering

export async function getServerSideProps() {
  const posts = await getPosts();

  return {
    props: {
      posts,
    },
  };
}

export default HomePage;

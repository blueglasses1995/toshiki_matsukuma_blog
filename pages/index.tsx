import { getFormattedDate } from '@lib/utils';
import { getPosts } from '@lib/firebase';
import { Layout } from '@components';

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

export async function getServerSideProps() {
  const posts = await getPosts();

  return {
    props: {
      posts,
    },
  };
}

export default HomePage;

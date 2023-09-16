import { initializeApp, getApps } from 'firebase/app';
import { getDatabase, ref, get, child, set } from 'firebase/database';

const initFirebase = () => {
  if (!getApps().length) {
    initializeApp({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    });
  }
};

const reshape = snapshot => {
  if (!snapshot.exists()) {
    console.log('No data available');
    return;
  }
  const snapshotVal = snapshot.val();
  if (!snapshotVal) return;
  const result = [];
  for (var slug in snapshotVal) {
    const post = snapshotVal[slug];
    result.push(post);
  }
  return result.reverse();
};

export const getPosts = async () => {
  initFirebase();

  const dbRef = ref(getDatabase());
  const posts = await get(child(dbRef, '/posts'))
    .then(snapshot => {
      return reshape(snapshot);
    })
    .catch(error => {
      console.error(error);
    });

  return posts;
};

export const createPost = async post => {
  initFirebase();

  const dateCreated = new Date().getTime();
  post.dateCreated = dateCreated;

  return set(ref(getDatabase(), `/posts/${post.slug}`), post);
};

export const getPostBySlug = async slug => {
  initFirebase();

  const dbRef = ref(getDatabase());
  const post = await get(child(dbRef, `/posts/${slug}`))
    .then(snapshot => {
      if (!snapshot.exists()) {
        console.log('No data available');
        return null;
      }
      return snapshot.val();
    })
    .catch(error => {
      console.error(error);
    });

  return post;
};

// This is where we'll add all of the functions for interacting with
// Firebase services in our app.

import {initializeApp, getApps} from 'firebase/app';
import { getDatabase, ref, get, child, set } from "firebase/database";

let app;

const initFirebase = () => {
  // This check prevents us from initializing more than one app.
  if (!getApps().length) {
    app = initializeApp({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    });
  }
};

const reshape = (snapshot) => {
  if (!snapshot.exists()) {
    console.log("No data available");
    return;
  }
  const snapshotVal = snapshot.val();
  if (!snapshotVal) return;
  if (typeof snapshotVal === 'object') {
  // if(!Array.isArray(snapshotVal)) return;
  const result = [];
  for (var slug in snapshotVal) {
    const post = snapshotVal[slug];
    result.push(post);
  }
  return result.reverse();
} else{
  return snapshotVal;
} 
}

// Gets all posts from the database in reverse chronological order.
export const getPosts = async () => {
  // Because our exported functions can be called at any time from
  // any place in our app, we need to make sure we've initialized
  // a Firebase app every time these functions are invoked.
  initFirebase();

  const dbRef = ref(getDatabase());
  const posts = await get(child(dbRef, '/posts')).then((snapshot) => {
    return reshape(snapshot)}).catch((error) => {
  console.error(error);
  });
      
  return posts;
};

export const createPost = async (post) => {
    initFirebase();
  
    const dateCreated = new Date().getTime();
    post.dateCreated = dateCreated;
  
    return set(ref(getDatabase(), `/posts/${post.slug}`), post);
  };
  
  /*
Retrieves the data for a single post from a given slug.
*/
export const getPostBySlug = async (slug) => {
  initFirebase();

  const dbRef = ref(getDatabase());
  const post = await get(child(dbRef, `/posts/${slug}`)).then((snapshot) => {
    return reshape(snapshot)}
  ).catch((error) => {
    console.error(error);
  });

  return post;
};

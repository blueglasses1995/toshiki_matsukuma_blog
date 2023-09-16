import { useState } from 'react';
import { useRouter } from 'next/router';
import { createPost } from '@lib/firebase';
import { Layout } from '@components';

const CreatePage = () => {
  const router = useRouter();
  const [formValues, setFormValues] = useState({
    title: '',
    slug: '',
    coverImage: '',
    coverImageAlt: '',
    content: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = e => {
    const id = e.target.id;
    const newValue = e.target.value;

    setFormValues({ ...formValues, [id]: newValue });
  };

  const handleSubmit = e => {
    e.preventDefault();

    let missingValues = [];
    Object.entries(formValues).forEach(([key, value]) => {
      if (!value) {
        missingValues.push(key);
      }
    });

    if (missingValues.length > 1) {
      alert(`You're missing these fields: ${missingValues.join(', ')}`);
      return;
    }

    setIsLoading(true);

    createPost(formValues)
      .then(() => {
        setIsLoading(false);
        router.push('/');
      })
      .catch(err => {
        alert(err);
        setIsLoading(false);
      });
  };

  return (
    <Layout>
      <div>
        <form onSubmit={handleSubmit}>
          <h1>Create a new post</h1>
          <div>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={formValues.title}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="slug">Slug</label>
            <input
              id="slug"
              type="text"
              value={formValues.slug}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="coverImage">Cover Image URL</label>
            <input
              id="coverImage"
              type="text"
              value={formValues.coverImage}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="coverImageAlt">Cover Image Alt</label>
            <input
              id="coverImageAlt"
              type="text"
              value={formValues.coverImageAlt}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              value={formValues.content}
              onChange={handleChange}
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create'}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default CreatePage;

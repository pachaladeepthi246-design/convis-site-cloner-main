import { useParams, Link } from 'react-router-dom';
import { blogPosts, Post } from '../data/blog-posts';
import { AnimatedSectionWrapper } from '../components/AnimatedSectionWrapper';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p: Post) => p.slug === slug);

  if (!post) {
    return (
      <AnimatedSectionWrapper id="not-found">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white">Post not found</h1>
          <Link to="/blog" className="mt-4 inline-block text-white/80 hover:text-white">
            &larr; Back to Blog
          </Link>
        </div>
      </AnimatedSectionWrapper>
    );
  }

  return (
    <main>
      <div className="pt-24 pb-12">
        <div className="container mx-auto max-w-4xl">
          <img src={post.imageUrl} alt={post.title} className="aspect-video w-full rounded-lg object-cover" />
          <h1 className="mt-8 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {post.title}
          </h1>
          <div className="mt-4 text-sm text-white/60">
            <span>By {post.author}</span> &bull; <span>{post.date}</span>
          </div>
          <div
            className="prose prose-invert mt-8 max-w-none text-white/80"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <Link to="/blog" className="mt-12 inline-block text-white/80 hover:text-white">
            &larr; Back to Blog
          </Link>
        </div>
      </div>
    </main>
  );
};

export default BlogPost;
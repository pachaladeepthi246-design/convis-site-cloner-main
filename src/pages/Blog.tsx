import { Link } from 'react-router-dom';
import { blogPosts, Post } from '../data/blog-posts';
import { AnimatedSectionWrapper } from '../components/AnimatedSectionWrapper';

const Blog = () => {
  return (
    <main>
      <AnimatedSectionWrapper id="blog-hero">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Our Blog
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg leading-8 text-white/70">
            Stay up to date with the latest news, announcements, and tips from the Clyrox team.
          </p>
        </div>
      </AnimatedSectionWrapper>
      <AnimatedSectionWrapper id="blog-posts">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            {blogPosts.map((post: Post) => (
              <Link to={`/blog/${post.slug}`} key={post.slug} className="group flex flex-col gap-4 rounded-lg border border-white/20 bg-white/10 p-6 transition-all hover:border-white/40 hover:bg-white/20">
                <img src={post.imageUrl} alt={post.title} className="aspect-video w-full rounded-md object-cover" />
                <h2 className="text-2xl font-bold text-white group-hover:text-slate-100">{post.title}</h2>
                <p className="text-white/70">{post.excerpt}</p>
                <div className="mt-auto text-sm text-white/60">
                  <span>By {post.author}</span> &bull; <span>{post.date}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </AnimatedSectionWrapper>
    </main>
  );
};

export default Blog;
import { getSortedPostsData } from '../../lib/blog';
import Footer from '../components/Footer';
import BlogClient from './BlogClient';

export const metadata = {
  title: 'Blog | Bhyte - Insights into AI and Product Design',
  description: 'Learn how we approach building the next wave of high-converting AI and SaaS products.',
};

export default async function BlogPage() {
  const posts = getSortedPostsData();

  return (
    <main className="min-h-screen bg-black text-white relative flex flex-col">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/10 blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 flex-grow max-w-6xl pt-28 sm:pt-32 pb-8">
        <BlogClient posts={posts} />
      </div>

      <Footer />
    </main>
  );
}

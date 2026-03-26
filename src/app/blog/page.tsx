import Link from 'next/link';
import { getSortedPostsData } from '../../lib/blog';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Blog | Bhyte - Insights into AI and Product Design',
  description: 'Learn how we approach building the next wave of high-converting AI and SaaS products.',
};

export default async function BlogPage() {
  const posts = getSortedPostsData();

  return (
    <main className="min-h-screen bg-black text-white relative flex flex-col pt-32">
      <Navbar />
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/10 blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10 flex-grow pt-24 pb-32">
        <div className="max-w-4xl mx-auto">
          <header className="mb-20 text-center">
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-6">
              Studio Insights
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Our thoughts on design, artificial intelligence, and building scalable software.
            </p>
          </header>

          <div className="grid gap-12">
            {posts.map((post) => (
              <article key={post.slug} className="group border-b border-gray-800 pb-12 transition-all duration-300 last:border-0">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="md:w-1/4">
                    <time className="text-sm font-semibold tracking-wide text-blue-400/80 uppercase">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                    <div className="mt-2 text-xs text-gray-500 font-medium">
                      By {post.author}
                    </div>
                  </div>
                  
                  <div className="md:w-3/4">
                    <Link href={`/blog/${post.slug}`}>
                      <h2 className="text-3xl font-bold mb-4 group-hover:text-blue-400 transition-colors duration-300">
                        {post.title}
                      </h2>
                    </Link>
                    <p className="text-gray-400 mb-6 leading-relaxed">
                      {post.description}
                    </p>
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-white group-hover:text-blue-500 transition-all duration-300"
                    >
                      Read Article
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

import { getPostData, getAllPostSlugs } from '../../../lib/blog';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';

export async function generateStaticParams() {
  const posts = getAllPostSlugs();
  return posts;
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostData(params.slug);
  return {
    title: `${post.title} | Bhyte Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      authors: [post.author],
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostData(params.slug);

  return (
    <main className="min-h-screen bg-black text-white relative">
      <Navbar />
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto px-4 pt-48 pb-32 relative z-10">
        <div className="max-w-3xl mx-auto">
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-blue-500 transition-all duration-300 mb-12"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Back to Insights
          </Link>

          <header className="mb-16">
            <time className="text-sm font-semibold tracking-wide text-blue-400/80 uppercase mb-4 block">
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-8 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-gray-500 font-medium">
              <span className="text-sm">Written by {post.author}</span>
              <span className="w-1 h-1 bg-gray-800 rounded-full"></span>
              <span className="text-sm italic">{post.description}</span>
            </div>
          </header>

          <div className="prose prose-invert prose-blue max-w-none prose-h2:text-white prose-h2:text-3xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-6 prose-p:text-gray-300 prose-p:leading-relaxed prose-p:text-lg prose-p:mb-6 prose-li:text-gray-300 prose-li:mb-2 prose-h3:text-white prose-h3:text-2xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-4">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

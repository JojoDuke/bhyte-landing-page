import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'src/content/blog');

export type BlogPostFrontmatter = {
  title: string;
  date: string;
  description: string;
  author: string;
  subscriber?: string;
  /** Display category for filters and cards (e.g. Product, Changelog) */
  category?: string;
  /** Public path under /public, e.g. /blog/covers/post.jpg */
  coverImage?: string;
  /** e.g. "5 min read"; optional — defaults in list helpers */
  readTime?: string;
};

export type BlogPost = BlogPostFrontmatter & {
  slug: string;
  content: string;
};

export type BlogPostListItem = Omit<BlogPost, 'content'>;

function estimateReadTimeFromContent(markdownBody: string): string {
  const words = markdownBody.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

export function getSortedPostsData(): BlogPostListItem[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');

    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const matterResult = matter(fileContents);
    const data = matterResult.data as BlogPostFrontmatter;
    const readTime =
      data.readTime ?? estimateReadTimeFromContent(matterResult.content);

    return {
      slug,
      title: data.title,
      date: data.date,
      description: data.description,
      author: data.author,
      subscriber: data.subscriber,
      category: data.category ?? 'Insights',
      coverImage: data.coverImage,
      readTime,
    };
  });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export function getPostData(slug: string): BlogPost {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Combine the data with the slug and content
  const data = matterResult.data as BlogPostFrontmatter;
  const readTime =
    data.readTime ?? estimateReadTimeFromContent(matterResult.content);

  return {
    slug,
    content: matterResult.content,
    title: data.title,
    date: data.date,
    description: data.description,
    author: data.author,
    subscriber: data.subscriber,
    category: data.category ?? 'Insights',
    coverImage: data.coverImage,
    readTime,
  };
}

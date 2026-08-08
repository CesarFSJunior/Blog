import Link from "next/link"
import path from "path";
import fs from 'fs';
import { compileMDX } from "next-mdx-remote/rsc";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  
  const filenames = await fs.readdirSync(path.join(process.cwd(), 'src/content'));

  const posts = await Promise.all(filenames.map(async (filename) => {
    const content = await fs.readFileSync(path.join(process.cwd(), 'src/content', filename), 'utf-8');
    const { frontmatter } = await compileMDX<{ title: string }>({ 
      source: content,
      options: { parseFrontmatter: true }
    });
    return {
      filename: filename,
      slug: filename.replace('.mdx', ''),
      ...frontmatter,
    };
  }));

  // console.log(posts)
  return (
    <main className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-6 mt-16">
      <ul className="flex flex-wrap justify-center max-w-3xl ">
        {posts.map((post) => (
                <li className="h-96 mr-auto mb-6 max-w-56 w-full bg-background rounded-lg shadow-lg p-8 shadow-foreground/10 hover:shadow-foreground/5 transition-shadow duration-300">
                    <Link href={`/blog/${post.slug}`} className="w-full h-full">
                      <h2 className="text-highlight">{post.title}</h2>
                      <p>{post.description}</p>
                    </Link>
                </li>
            ))}
      </ul>
    </main>
  )
}
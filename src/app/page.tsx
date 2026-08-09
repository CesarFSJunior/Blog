import Link from "next/link"
import path from "path";
import fs from 'fs';
import { glob } from "glob";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), 'src/content');
const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

type Post = {
  slug: string;
  year: string;
  month: string;
  title: string;
  date: string;
  description: string;
};

async function getPosts(): Promise<Post[]> {
  const rawFiles = await glob("**/*.mdx", { cwd: contentDir });
  const files = rawFiles.map((file) => file.replace(/\\/g, '/'));

  const posts = await Promise.all(files.map(async (file) => {
    const source = await fs.promises.readFile(path.join(contentDir, file), 'utf-8');
    const { data: frontmatter } = matter(source);
    const [year, month] = file.split('/');

    return {
      slug: file.replace(/\.mdx$/, ''),
      year,
      month,
      title: frontmatter.title,
      date: frontmatter.date,
      description: frontmatter.description,
    };
  }));

  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

function groupByYearMonth(posts: Post[]) {
  const groups = new Map<string, { year: string; month: string; posts: Post[] }>();

  for (const post of posts) {
    const key = `${post.year}-${post.month}`;
    if (!groups.has(key)) {
      groups.set(key, { year: post.year, month: post.month, posts: [] });
    }
    groups.get(key)!.posts.push(post);
  }

  return Array.from(groups.values()).sort((a, b) => `${b.year}-${b.month}`.localeCompare(`${a.year}-${a.month}`));
}

export default async function Page() {
  const posts = await getPosts();
  const groups = groupByYearMonth(posts);

  return (
    <main className="flex items-center justify-center px-6">
      <div className="flex flex-col">
        {groups.map(group => {
          const anchor = `${group.year}-${meses[Number(group.month) - 1]}`;

          return (
            <section className="pt-16" key={anchor}>

              <a href={`#${anchor}`}>
                <h2 className="font-bold text-4xl">
                  {group.year} - {meses[Number(group.month) - 1]}
                  <span id={anchor} className="scroll-mt-32" ></span>
                </h2>
              </a>

              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-2xl pt-8 gap-8">
                {group.posts.map(post => (
                  <li key={post.slug} className="h-auto w-full bg-background rounded-lg shadow-lg shadow-foreground/15 hover:shadow-foreground/5 transition-shadow duration-300">
                    <Link href={`/blog/${post.slug}`} className="block w-full h-full p-8">
                      <p className="font-light text-sm text-foreground/50">{post.date}</p>
                      <h2 className="text-highlight">{post.title}</h2>
                      <p>{post.description}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </main>
  )
}
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { glob } from 'glob';

// 1. CORREÇÃO AQUI: Garanta que o retorno mapeie a estrutura exata que o Next.js espera
export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), 'src/content');
  const files = await glob("**/*.mdx", { cwd: contentDir});

  return files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const slugName = file.replace('.mdx', '');
      return {
        // Para [...slug] (catch-all), o valor DEVE ser um array de strings
        slug: [slugName], 
      };
    });
}

// O Next.js exige a tipagem de params como uma Promise contendo o array de strings
type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function BlogPostPage({ params }: Props) {
  // 2. CORREÇÃO AQUI: Aguarda a Promise do params ser resolvida antes de usar
  const resolvedParams = await params;
  const slugArray = resolvedParams.slug;

  if (!slugArray || slugArray.length === 0) {
    notFound();
  }

  // Transforma o array ['meu-post'] em uma string 'meu-post'
  const fileSlug = slugArray.join('/');
  const mdxPath = path.join(process.cwd(), 'src/content', `${fileSlug}.mdx`);

  if (!fs.existsSync(mdxPath)) {
    notFound();
  }

  const fileSource = fs.readFileSync(mdxPath, 'utf8');
  const { content, data: frontmatter } = matter(fileSource);

  return (
    <main className="flex items-center justify-center px-6">
      <article className="max-w-2xl mx-auto py-8">
        <header className="mb-6">
          <h1 className="text-4xl font-extrabold">{frontmatter.title}</h1>
          <p className="text-sm text-gray-500">{frontmatter.date}</p>
          {frontmatter.tags.map((tag: string) => (
            <span key={tag} className="inline-block bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded mr-2">
              {tag}
            </span>
          ))}
        </header>

        <div className="prose dark:prose-invert">
          <MDXRemote source={content} />
        </div>
      </article>
    </main>
  );
}

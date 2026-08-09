import Link from "next/link"
import path from "path";
import fs from 'fs';
import { compileMDX } from "next-mdx-remote/rsc";
import { glob } from "glob";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const contentDir = path.join(process.cwd(), 'src/content');

  const years = (await fs.promises.readdir(contentDir, { withFileTypes: true })).reverse();
  

  const posts = await Promise.all(years.map(async (year) => {
      const months = (await fs.promises.readdir(contentDir + '\\' +year.name, { withFileTypes: true })).reverse();

      const findMonths = await Promise.all(months.map(async (month) => {
          const monthPath = year.name + '\\' + month.name
          const days = (await fs.promises.readdir(contentDir + '\\' +monthPath, { withFileTypes: true })).reverse();

          const findDays = await Promise.all(days.map(async day => {
              const dayPath = monthPath + '\\' + day.name
              const posts = (await fs.promises.readdir(contentDir + '\\' +dayPath, { withFileTypes: true })).reverse();
          

              const findPosts = await Promise.all(posts.map(async (post) => {
                const postPath = dayPath + '\\' + post.name
                const content = await fs.readFileSync(path.join(contentDir, postPath), 'utf-8');
                const { frontmatter } = await compileMDX<{ title: string, date: string, description: string}>({ 
                  source: content,
                  options: { parseFrontmatter: true }
                });

                return {
                  slug: postPath.replace('.mdx', ''),
                  ...frontmatter
                }
              }))

          
              return {
                day: day.name,
                posts: findPosts
              }

          }))

          return {
            month: month.name,
            days: findDays
          }
      }))

      return {
        year: year.name,
        months: findMonths
      }
  }))

  const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  

  return (
    <main className="flex items-center justify-center px-6">
      <div className="flex flex-col">
        {posts.map(year => year.months.map(month => (
              <section className="pt-16" key={`#${year.year}-${meses[(Number(month.month) - 1)]}`}>
              
                <a href={`#${year.year}-${meses[(Number(month.month) - 1)]}`}>
                  <h2 className="font-bold text-4xl">
                    {year.year} - {meses[(Number(month.month) - 1)]}
                    <span id={`${year.year}-${meses[(Number(month.month) - 1)]}`} className="scroll-mt-32" ></span>
                  </h2>
                </a>

                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-2xl pt-8 gap-8">
                  {month.days.map(day => day.posts.map(post => (
                          <li key={post.slug} className="h-auto w-full bg-background rounded-lg shadow-lg shadow-foreground/15 hover:shadow-foreground/5 transition-shadow duration-300">
                            <Link href={`/blog/${post.slug}`} className="block w-full h-full p-8">
                              <p className="font-light text-sm text-foreground/50">{post.date}</p>
                              <h2 className="text-highlight">{post.title}</h2>
                              <p>{post.description}</p>
                            </Link>
                          </li>
                      )))}
                </ul>
              </section>
            )))}
      </div>
    </main>
  )
}
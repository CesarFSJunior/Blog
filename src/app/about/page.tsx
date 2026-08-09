import Link from "next/link";

export default function FAQ() {

    return (
        <main className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-6 text-2xl">
            <h2 className="text-4xl font-bold mb-20">Sobre Mim</h2>
            <section className="max-w-3xl">
                <p className="mb-6">
                    Sou Cesar Junior e sou um analista de dados e desenvolvedor focado em tecnologias web. Tenho experiência em análise de dados, desenvolvimento de aplicações web e automação de processos. Sou apaixonado por aprender novas tecnologias e estou sempre buscando aprimorar minhas habilidades.
                </p>
                <p className="mb-6">
                    Não tenho experiência com blogs ou sites, mas estou aprendendo e desenvolvendo este blog como um projeto pessoal para compartilhar meus conhecimentos e experiências com a comunidade. Estou aberto a feedbacks e sugestões para melhorar o conteúdo e a experiência do usuário.
                </p>
                <p className="mb-6">
                    Trabalho a 3 anos como analista de dados em uma multinacional, caso queira entrar em contato comigo, você pode me encontrar no LinkedIn ou no GitHub. Estou sempre aberto a novas oportunidades e colaborações.
                </p>
            </section>
        </main>
    )
}
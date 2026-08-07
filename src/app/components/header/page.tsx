import { DiGithubBadge } from "react-icons/di"; 


export default function Header() {
    return (
        <header className="bg-gray-800 text-white p-4">
            <div className="flex justify-between max-w-3xl mx-auto">
                <h1 className="text-2xl font-bold">My Blog</h1>
                <a href='https://github.com/CesarFSJunior' target='_blank' rel='noopener noreferrer' className="text-blue-500 hover:text-blue-700">
                    <DiGithubBadge className="inline-block w-8 h-8 text-white" />
                </a>
            </div>
        </header>
    )
}
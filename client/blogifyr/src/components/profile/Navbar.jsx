import 'tailwindcss/tailwind.css';
import { useParams, Link } from "react-router-dom";


const Navbar = () => {

    const { username } = useParams();

    return (
        <nav className="bg-gray-500 border-b-2 border-primary-500 p-5">
            <div className="container mx-auto">
                <div className="flex justify-between items-center">
                    <div className="text-primary-500 font-bold text-3xl">{username}</div>
                    <ul className="flex space-x-4">
                        <li className="text-dark-500 text-xl hover:underline">
                            <Link to={`/${username}`}>
                                Home
                            </Link>
                        </li>
                        <li className="text-dark-500 text-xl hover:underline">
                            <Link to={`/${username}/blogs`} >
                                Blogs
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
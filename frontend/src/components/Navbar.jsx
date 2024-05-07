import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className='p-5 flex justify-between items-center bg-white'>
      <div>
        <h1 className='font-bold text-2xl text-orange-400'>Recipicity</h1>
      </div>
     <ul className='p-5 flex space-x-10 list-none'>
      <li><Link to="/" className="hover:text-orange-400">Home</Link></li>
      <li><Link to="/about" className="hover:text-orange-400">About</Link></li>
      <li><Link to="/contact" className="hover:text-orange-400">Contact</Link></li>
      <li><Link to="/recipes/create" className="hover:text-orange-400">Create Recipe</Link></li>
     </ul>
    </nav>
  )
}

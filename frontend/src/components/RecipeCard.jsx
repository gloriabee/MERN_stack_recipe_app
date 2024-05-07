
import Ingredients from "./Ingredients"
import axios from "axios";
import { Link } from "react-router-dom";

export default function RecipeCard({recipe,onDeleted}) {
  let deleteRecipe=async()=>{
    //api request
    let res=await axios.delete('http://localhost:3000/api/recipes/'+recipe._id);
    if(res.status===200){
      onDeleted(recipe._id);
    }
  }
  return (
    <div className='bg-white p-5 rounded-2xl space-y-4'>
   <div className="flex justify-between items-center">
    <h3 className='text-xl font-bold text-orange-400'>{recipe.title}</h3>
    <div className="space-x-2">
    <Link to={`/recipes/edit/${recipe._id}`} className="bg-yellow-500 px-2 py-1 rounded-lg text-sm">Edit</Link>
    <button className="bg-red-500 px-2 py-1 rounded-lg text-white text-sm" onClick={deleteRecipe}>Delete</button>
    </div>
   </div>
   <p>Description</p>
    <p>
        {recipe.description}
    </p>
    <Ingredients ingredients={recipe.ingredients}/>
    <p className='text-gray-500'>Published at - {recipe.createdAt}</p>

</div>
  )
}

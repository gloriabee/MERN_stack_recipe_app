import React, { useEffect, useState } from 'react'
import Ingredients from '../components/Ingredients'
import axios from 'axios';
import {useNavigate,useParams} from 'react-router-dom';

export default function RecipeForm() {
  let {id}=useParams();
  let navigate=useNavigate();
  let [title,setTitle]=useState('');
  let [description,setDescription]=useState('');
  let [ingredients,setIngredients]= useState([]);
  let [newIngredient,setNewIngredient]=useState('');
  let [errors,setErrors]=useState([]);

  useEffect(()=>{
    let fetchRecipe=async()=>{
      if(id){
        let res=await axios.get('http://localhost:3000/api/recipes/'+id);
        if(res.status===200){
          setTitle(res.data.title);
          setDescription(res.data.description);
          setIngredients(res.data.ingredients);
        }
      }
      
    }
    fetchRecipe();
  },[id])

  let addIngredient=()=>{
    setIngredients(prev=>[newIngredient,...prev]);
    setNewIngredient('');
  }

  let submit=async (e)=>{
    try {
      e.preventDefault();
    let recipe={
      title, description,ingredients
    }
   
    //server request
   let res;
    if(id){
       res=await axios.patch('http://localhost:3000/api/recipes/'+id,recipe);
    }else{
       res=await axios.post('http://localhost:3000/api/recipes',recipe);
    }
    if(res.status==200){
      navigate('/');
    }
    } catch (error) {
      setErrors(Object.keys(error.response.data.errors));
    }

    
  }

  return (
    <div className='mx-auto max-w-md border-2 border-white p-4'>
      <h1 className='text-2xl font-bold text-orange-400 text-center mb-6'>Recipe {id?'Edit':'Create'} Form</h1>
      <form action="" className='space-y-5' onSubmit={submit}>
        <ul className='list-disc pl-3'>
          {!!errors.length && errors.map((error,i) => (
            <li className="text-red-500 text-sm" key={i}>{error} is invalid value</li>
          ))}
        </ul>
        <input type="text" placeholder='Recipe title' className='w-full p-1 focus:outline-none' value={title} onChange={e=>setTitle(e.target.value)}/>
        <textarea placeholder='Recipe description' className='w-full p-1 focus:outline-none' rows="5" value={description} onChange={e=>setDescription(e.target.value)}/>
       <div className='flex space-x-2 items-center'>
          <input type="text" placeholder='Recipe Ingredient' className='w-full p-1 focus:outline-none' value={newIngredient} onChange={e=> setNewIngredient(e.target.value)}/>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 cursor-pointer" onClick={addIngredient}>
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
       </div>
       <div>
          <Ingredients ingredients={ingredients}/>
       </div>
       <button className='w-full px-3 py-1 rounded-full bg-orange-400 text-white' type='submit'>{id?'Update':'Create'} Recipe</button>
      </form>
    </div>
  )
}

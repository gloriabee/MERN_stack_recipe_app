import React, { useEffect, useState } from 'react'
import RecipeCard from '../components/RecipeCard';
import Pagination from '../components/Pagination';
import {useLocation,useNavigate} from 'react-router-dom';

const Home = () => {
    let [recipes,setRecipes]=useState([]);
    let [links,setLinks]=useState(null);
    let navigate=useNavigate();
    let location=useLocation();
    let searchQuery=new URLSearchParams(location.search);
    let page=searchQuery.get('page');
    page=parseInt(page);
    console.log(page);
    useEffect(()=>{
        let fetchRecipes=async()=>{
            let response=await fetch('http://localhost:3000/api/recipes?page='+page);
            if(response.ok){
                let data=await response.json();
                setLinks(data.links);
                setRecipes(data.data);


                //scroll to top
                window.scroll({top:0,left:0,behavior:"smooth"})
            }
        }
        fetchRecipes();
    },[page])

   let onDeleted=(_id)=>{
    //delete on client side
    if(recipes.length==1 && page>1){
        navigate('/?page='+(page-1))
    }
    else{

    }
    setRecipes(prev=>prev.filter(r=>r._id!== _id))
   }

  return (
    <div className='space-y-5'>
        {!!recipes.length && ( recipes.map(recipe => (
            <RecipeCard recipe={recipe}  key={recipe._id} onDeleted={onDeleted}/>
        ))  
        )}

       {!!links && <Pagination links={links} page={page || 1}/>}
    </div>
  )
}

export default Home

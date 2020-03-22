import React, { useEffect, useState } from 'react';
import Recipes from './Recipe';



import './App.css';
import Recipe from './Recipe';

const App = () => {

  const APP_ID = "abed3019";
  const APP_KEY = "247cdfd389adadf780fadb8adaeabc18";

  //const exampleReq =
  // `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`;

  //const [counter, setCounter] = useState(0);

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState('Pizza'); // only update once we hit submit button

  useEffect(() => {

    getRecipes();

  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    const data = await response.json(); // because some times it take a time to get data (through API) from website.
    setRecipes(data.hits);
    console.log(data.hits);


    //  OR we can use this as well fetch(https://www.edamam.com/)
    // .then(response => {
    //   response.json
    //  } )
  };

  const updateSearch = e => {
    setSearch(e.target.value);

  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }


  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch} />
        <button className="search-button" type="submit">Search </button>
      </form>
      <div className="recipes">
        {recipes.map(recipe =>
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}

          />


        )}
      </div>
    </div>
  );
};

export default App;


const showLoader = () => {
    const loader = document.getElementById('loader');
    loader.style.display = 'block';
  };
  
  
  const hideLoader = () => {
    const loader = document.getElementById('loader');
    loader.style.display = 'none';
  };
  
  const fetchPokemons = async (offset, limit) => {
    try {
      showLoader(); 
  
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
      const data = await response.json();
      const pokemons = data.results;
      renderPokemons(pokemons);
  
      hideLoader(); 
    } catch (error) {
      console.error('Error fetching Pokémon:', error);
      hideLoader(); 
    }
  };
  
  const fetchPokemonDetails = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Pokémon details:', error);
    }
  };
  
  const renderPokemons = async (pokemons) => {
    const container = document.getElementById('pokemon-cards');
    container.innerHTML = '';
  
    for (const pokemon of pokemons) {
      const pokemonDetails = await fetchPokemonDetails(pokemon.url);
  
      const card = document.createElement('div');
      card.classList.add('card');
  
      const type = pokemonDetails.types[0].type.name;
      card.style.backgroundColor = getTypeColor(type);
  
      const image = document.createElement('img');
      image.src = pokemonDetails.sprites.other.showdown.front_default;
      image.alt = pokemon.name;
  
      const name = document.createElement('p');
      name.textContent = pokemonDetails.name;
  
      const types = document.createElement('p');
      types.textContent = pokemonDetails.types.map((type) => type.type.name).join(', ');
  
      card.appendChild(image);
      card.appendChild(name);
      card.appendChild(types);
  
      container.appendChild(card);
    }
  };
  
  const getTypeColor = (type) => {
    switch (type) {
      case 'normal':
        return '#A8A878';
      case 'fire':
        return '#F08030';
      case 'water':
        return '#6890F0';
      case 'electric':
        return '#F8D030';
      case 'grass':
        return '#78C850';
      case 'ice':
        return '#98D8D8';
      case 'fighting':
        return '#C03028';
      case 'poison':
        return '#A040A0';
      case 'ground':
        return '#E0C068';
      case 'flying':
        return '#A890F0';
      case 'psychic':
        return '#F85888';
      case 'bug':
        return '#A8B820';
      case 'rock':
        return '#B8A038';
      case 'ghost':
        return '#705898';
      case 'dragon':
        return '#7038F8';
      case 'dark':
        return '#705848';
      case 'steel':
        return '#B8B8D0';
      case 'fairy':
        return '#EE99AC';
      default:
        return '#FFFFFF'; 
    }
  };
  
  let currentPage = 1;
  const limitPerPage = 10;
  
  const previousPage = () => {
    if (currentPage > 1) {
      currentPage--;
      fetchPokemons((currentPage - 1) * limitPerPage, limitPerPage);
    }
  };
  
  const nextPage = () => {
    currentPage++;
    fetchPokemons((currentPage - 1) * limitPerPage, limitPerPage);
  };
  
  document.addEventListener('DOMContentLoaded', () => {
    fetchPokemons(0, limitPerPage);
  
    document.getElementById('previous').addEventListener('click', previousPage);
    document.getElementById('next').addEventListener('click', nextPage);
  });
  
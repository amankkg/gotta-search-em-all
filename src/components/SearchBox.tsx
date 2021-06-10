import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

export const SearchBox = () => {
    const [selectedType, selectType] = useState<PokemonType>();
    const pokemons = useTypeSearch(selectedType);
    const history = useHistory();

    return (
        <div>
            <label>
                Select a type
                <select onChange={(event) => selectType(event.target.value as PokemonType)}>
                    <option>:type</option>
                    {types.map((t) => (
                        <option key={t} value={t} selected={t === selectedType}>
                            {t}
                        </option>
                    ))}
                </select>
            </label>
            <label>
                Select a Pokemon
                <select onChange={(event) => history.push(`/${event.target.value}`)}>
                    {pokemons.map((p) => (
                        <option key={p} value={p} selected={p === selectedType}>
                            {p}
                        </option>
                    ))}
                </select>
            </label>
        </div>
    );
};

type PokemonType = typeof types[number];

const types = ['ground', 'fire'] as const;

const pokemonAPI = 'https://pokeapi.co/api/v2';

const useTypeSearch = (type: PokemonType | undefined) => {
    const [pokemons, setPokemons] = useState<string[]>([]);

    useEffect(() => {
        if (type === undefined) return;

        async function fetchData() {
            const response = await fetch(`${pokemonAPI}/type/${type}`);
            const data = await response.json();

            const pokemons = data.pokemon.map((p: Pokemon) => p.pokemon.name);

            setPokemons(pokemons);
        }

        fetchData();
    }, [type]);

    return pokemons;
};

type Pokemon = { pokemon: { name: string } };

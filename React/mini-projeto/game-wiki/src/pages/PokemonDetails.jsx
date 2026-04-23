import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PokemonDetails = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);    const [locations, setLocations] = useState([]);  const typeColors = {
    normal: {
      bg: "bg-[#A8A878]",
      border: "border-[#6D6D4E]",
      text: "text-[#A8A878]",
    },
    fire: {
      bg: "bg-[#F08030]",
      border: "border-[#9C531F]",
      text: "text-[#F08030]",
    },
    water: {
      bg: "bg-[#6890F0]",
      border: "border-[#445E9C]",
      text: "text-[#6890F0]",
    },
    electric: {
      bg: "bg-[#F8D030]",
      border: "border-[#A1871F]",
      text: "text-[#F8D030]",
    },
    grass: {
      bg: "bg-[#78C850]",
      border: "border-[#4E8234]",
      text: "text-[#78C850]",
    },
    ice: {
      bg: "bg-[#98D8D8]",
      border: "border-[#638D8D]",
      text: "text-[#98D8D8]",
    },
    fighting: {
      bg: "bg-[#C03028]",
      border: "border-[#7D201B]",
      text: "text-[#C03028]",
    },
    poison: {
      bg: "bg-[#A040A0]",
      border: "border-[#682A68]",
      text: "text-[#A040A0]",
    },
    ground: {
      bg: "bg-[#E0C068]",
      border: "border-[#927D44]",
      text: "text-[#E0C068]",
    },
    flying: {
      bg: "bg-[#A890F0]",
      border: "border-[#6D5E9C]",
      text: "text-[#A890F0]",
    },
    psychic: {
      bg: "bg-[#F85888]",
      border: "border-[#A13959]",
      text: "text-[#F85888]",
    },
    bug: {
      bg: "bg-[#A8B820]",
      border: "border-[#6D7815]",
      text: "text-[#A8B820]",
    },
    rock: {
      bg: "bg-[#B8A038]",
      border: "border-[#786824]",
      text: "text-[#B8A038]",
    },
    ghost: {
      bg: "bg-[#705898]",
      border: "border-[#493963]",
      text: "text-[#705898]",
    },
    dragon: {
      bg: "bg-[#7038F8]",
      border: "border-[#4924A1]",
      text: "text-[#7038F8]",
    },
    dark: {
      bg: "bg-[#705848]",
      border: "border-[#49392F]",
      text: "text-[#705848]",
    },
    steel: {
      bg: "bg-[#B8B8D0]",
      border: "border-[#787887]",
      text: "text-[#B8B8D0]",
    },
    fairy: {
      bg: "bg-[#EE99AC]",
      border: "border-[#9B6470]",
      text: "text-[#EE99AC]",
    },
  };

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();
    setLocations([]);

    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        setPokemon({
          name: data.name,
          abilities: data.abilities.map((a) => a.ability.name),
          image: data.sprites.other["official-artwork"].front_default,
          subtitle: String(data.id).padStart(3, "0"),
          types: data.types.map((t) => t.type.name),
          stats: data.stats.map((s) => ({
            name: s.stat.name,
            value: s.base_stat,
          })),
          moves: data.moves.slice(0, 6).map((m) => m.move.name),
          locationAreaEncounters: data.location_area_encounters,
        });

        // Fetch locations
        if (data.location_area_encounters) {
          fetch(data.location_area_encounters, { signal: controller.signal })
            .then((res) => res.json())
            .then((locData) => {
              if (cancelled) return;
              const locationNames = locData.map((loc) => loc.location_area.name);
              setLocations(locationNames);
            })
            .catch(() => {
              if (!cancelled) setLocations([]);
            });
        } else {
          setLocations([]);
        }

        if (!cancelled) setLoading(false);
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [id]);

  if (loading)
    return (
      <div className="text-white text-center mt-20">Carregando Pokémon...</div>
    );
  if (!pokemon)
    return (
      <div className="text-white text-center mt-20">
        Pokémon não encontrado.
      </div>
    );

  return (
    <div className="bg-zinc-950 min-h-screen text-white font-pixel p-10 flex items-center justify-center">
      <div className="max-w-6xl w-full flex gap-10">
        {/* Imagem - Esquerda */}
        <div className="text-center relative">
          <img
            src={pokemon.image}
            alt={pokemon.name}
            className="w-full h-full object-contain"
          />
          <p
            className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 text-[80px] ${
              pokemon.types && pokemon.types.length > 0
                ? typeColors[pokemon.types[0].toLowerCase()].text
                : "text-zinc-400"
            } opacity-37 select-none leading-none pointer-events-none`}
          >
            #{pokemon.subtitle}
          </p>
        </div>

        {/* Conteúdo - Direita */}
        <div className="flex-1">
          <h1 className="text-5xl font-bold uppercase italic mb-4">
            {pokemon.name}
          </h1>

          <div className="flex gap-2 mb-10">
            {pokemon.types.map((type) => (
              <span
                key={type}
                className={`px-2 py-0.5 rounded-sm border-4 text-[15px] font-pixel text-white uppercase tracking-wider shadow-sm ${typeColors[type.toLowerCase()].bg} ${typeColors[type.toLowerCase()].border}`}
              >
                {type}
              </span>
            ))}
          </div>

          {/* Grid 2x2 */}
          <div className="grid grid-cols-2 gap-8">
            {/* Abilities - Topo Esquerda */}
            <div>
              <h2 className="text-2xl font-bold mb-4 border-b border-zinc-800 pb-2">
                Abilities
              </h2>
              <div className="flex flex-col gap-2">
                {pokemon.abilities && pokemon.abilities.map((ability) => (
                  <span
                    key={ability}
                    className="px-3 py-1 bg-zinc-800 rounded-lg text-sm text-zinc-300 uppercase"
                  >
                    {ability}
                  </span>
                ))}
              </div>
            </div>

            {/* Locations - Topo Direita */}
            <div>
              <h2 className="text-2xl font-bold mb-4 border-b border-zinc-800 pb-2">
                Localizações
              </h2>
              <div className="flex flex-col gap-2 max-h-40 overflow-y-auto">
                {locations && locations.length > 0 ? (
                  locations.map((location, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-zinc-800 rounded-lg text-sm text-zinc-300 uppercase"
                    >
                      {location}
                    </span>
                  ))
                ) : (
                  <span className="text-zinc-500 text-sm italic">Nenhuma localização encontrada</span>
                )}
              </div>
            </div>

            {/* Stats - Baixo Esquerda */}
            <div>
              <h2 className="text-2xl font-bold mb-4 border-b border-zinc-800 pb-2">
                Stats
              </h2>
              <div className="flex flex-col gap-3">
                {pokemon.stats.map((stat) => (
                  <div key={stat.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-zinc-400 uppercase">{stat.name}</span>
                      <span>{stat.value}</span>
                    </div>
                    <div className="w-full bg-zinc-800 rounded-full h-2">
                      <div
                        className="bg-yellow-400 h-2 rounded-full"
                        style={{
                          width: `${Math.min((stat.value / 255) * 100, 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Moves - Baixo Direita */}
            <div>
              <h2 className="text-2xl font-bold mb-4 border-b border-zinc-800 pb-2">
                Moves
              </h2>
              <div className="flex flex-wrap gap-2">
                {pokemon.moves.map((move) => (
                  <span
                    key={move}
                    className="px-3 py-1 bg-zinc-800 rounded-lg text-sm text-zinc-300 uppercase"
                  >
                    {move}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;

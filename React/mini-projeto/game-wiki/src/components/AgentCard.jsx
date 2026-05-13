import { Link } from "react-router-dom";

const typeColors = {
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

const ValorantCard = ({ id, name, image }) => (
  <Link
    to={`/valorant/${id}`}
    className="group relative block overflow-hidden rounded-xl bg-zinc-900 transition-transform hover:scale-105"
  >
    <img
      src={image}
      alt={name}
      className="object-cover object-[center_20%] opacity-80 transition-opacity group-hover:opacity-100"
    />
    <div className="absolute bottom-0 left-0 w-full p-6 z-10 bg-linear-to-t from-black via-black/60 to-transparent">
      <h3 className="text-xl font-bold text-white uppercase tracking-wider">
        {name}
      </h3>
    </div>
  </Link>
);

const PokemonCard = ({ id, name, subtitle, type, image }) => (
  <Link
    to={`/pokemon/${id}`}
    className="group relative flex flex-col-reverse items-center w-3xs rounded-xl bg-zinc-900 transition-transform md:hover:scale-105"
  >
    <div className="relative overflow-hidden">
      <img
        src={image}
        alt={name}
        className="w-3xs md:w-lg opacity-80 transition-opacity group-hover:opacity-100"
      />
    </div>

    <div className="relative flex flex-col flex-1 overflow-hidden py-2">
      <div className="relative z-10 flex flex-col">
        <h3 className="text-lg font-pixel text-center text-white uppercase tracking-wider group-hover:text-blue-400 transition-colors">
          {name}
        </h3>
        <span
          className={`text-lg font-pixel text-center uppercase tracking-wider ${
            type && type.length > 0
              ? typeColors[type[0].toLowerCase()].text
              : "text-zinc-400"
          } opacity-37`}
        >
          #{subtitle}
        </span>
        {type && type.length > 0 && (
          <div className="flex gap-1 justify-center flex-wrap">
            {type.map((t) => (
              <span
                key={t}
                className={`px-2 py-0.5 rounded-sm border-3 text-xs font-pixel text-white uppercase tracking-wider shadow-sm ${typeColors[t.toLowerCase()].bg} ${typeColors[t.toLowerCase()].border}`}
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  </Link>
);

const AgentCard = ({ id, name, subtitle, type, image, source }) => {
  if (source === "pokemon") {
    return (
      <PokemonCard
        id={id}
        name={name}
        subtitle={subtitle}
        type={type}
        image={image}
      />
    );
  }
  return <ValorantCard id={id} name={name} image={image} />;
};

export default AgentCard;

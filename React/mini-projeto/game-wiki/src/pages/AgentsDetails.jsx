import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AgentsDetails = () => {
  const { id } = useParams();
  const [champion, setChampion] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://valorant-api.com/v1/agents?language=pt-BR&isPlayableCharacter=true`,
    )
      .then((res) => res.json())
      .then((resData) => {
        const agent = resData.data.find((a) => a.displayName === id);

        setChampion({
          name: agent.displayName,
          title: agent.developerName,
          description: agent.description,
          image: agent.fullPortrait,
          spells: agent.abilities.map((ability) => ({
            id: ability.slot,
            name: ability.displayName,
            description: ability.description,
            image: ability.displayIcon,
          })),
        });
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <div className="text-white text-center mt-20">Carregando agente...</div>
    );
  if (!champion)
    return (
      <div className="text-white text-center mt-20">Agente não encontrado.</div>
    );

  return (
    <div className="bg-zinc-950 min-h-screen text-white p-10 flex flex-col items-center">
      <div className="max-w-4xl w-full">
        <img
          src={champion.image}
          alt={champion.name}
          className="w-full h-80 object-contain rounded-2xl mb-6"
        />
        <h1 className="text-5xl font-bold uppercase italic">{champion.name}</h1>
        <p className="text-zinc-400 text-xl mb-4">{champion.title}</p>
        <p className="text-zinc-400 text-sm mb-10">{champion.description}</p>

        <h2 className="text-2xl font-bold mb-6 border-b border-zinc-800 pb-2">
          Habilidades
        </h2>

        <div className="flex flex-col gap-8">
          {champion.spells.map((spell) => (
            <div
              key={spell.id}
              className="flex gap-6 bg-zinc-900/50 p-6 rounded-xl border border-zinc-800"
            >
              {spell.image && (
                <img
                  src={spell.image}
                  alt={spell.name}
                  className="w-16 h-16 rounded-lg"
                />
              )}
              <div>
                <h3 className="text-xl font-bold">{spell.name}</h3>
                <p className="text-zinc-400">{spell.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgentsDetails;

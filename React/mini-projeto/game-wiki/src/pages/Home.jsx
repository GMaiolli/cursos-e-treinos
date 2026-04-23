import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import AgentCard from '../components/AgentCard';

const fetchValorant = async () => {
    const res = await fetch('https://valorant-api.com/v1/agents?language=pt-BR&isPlayableCharacter=true');
    const { data } = await res.json();
    return data.map(agent => ({
        id: agent.displayName,
        name: agent.displayName,
        image: agent.displayIcon,
        source: 'valorant'
    }));
};

const fetchPokemon = async (offset = 0, limit = 24) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    const { results } = await res.json();

    const detailed = await Promise.all(
        results.map(p => fetch(p.url).then(r => r.json()))
    );

    return detailed.map((p) => ({
        id: p.name,
        name: p.name,
        subtitle: `${String(p.id).padStart(3, '0')}`,
        type: p.types.map(t => t.type.name),
        image: p.sprites.front_default,
        imageNormal: p.sprites.other['official-artwork'].front_default,
        source: 'pokemon'
    }));
};

const Home = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [offset, setOffset] = useState(0);
    const [loadingMore, setLoadingMore] = useState(false);  
    const [searchParams, setSearchParams] = useSearchParams();
    const [search, setSearch] = useState('');
    const searchTouched = useRef(false);
    const [notFoundMessage, setNotFoundMessage] = useState('');
    const [query, setQuery] = useState('');

    const mode = searchParams.get('mode') || 'valorant';

    const setMode = (newMode) => {
        setSearchParams({ mode: newMode });
    };

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        setOffset(0);
        setNotFoundMessage('');
        const fetcher = mode === 'valorant' ? fetchValorant : () => fetchPokemon(0);
        fetcher().then(data => {
            if (!cancelled) {
                setItems(data);
                setLoading(false);
            }
        });
        return () => { cancelled = true; };
    }, [mode]);

    const handleLoadMore = () => {
            setLoadingMore(true);
            const newOffset = offset + 24;
            fetchPokemon(newOffset).then(data => {
                setItems(prev => [...prev, ...data]);
                setOffset(newOffset);
                setLoadingMore(false);
            });
        };

        const handleSearch = (value) => {
        searchTouched.current = true;
        setSearch(value);
    };

    useEffect(() => {
        if (mode !== 'pokemon') return;

        let cancelled = false;
        const controller = new AbortController();

        const timer = setTimeout(async () => {
            const q = search.toLowerCase().trim();

            if (!q) {
                if (!searchTouched.current) return;
                setLoading(true);
                setOffset(0);
                setNotFoundMessage('');
                fetchPokemon(0).then(data => {
                    if (!cancelled) {
                        setItems(data);
                        setLoading(false);
                    }
                });
                return;
            }

            try {
                setLoading(true);
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${q}`, { signal: controller.signal });
                if (!res.ok) throw new Error();
                const p = await res.json();
                if (!cancelled) {
                    setItems([{
                        id: p.name,
                        name: p.name,
                        subtitle: String(p.id).padStart(3, '0'),
                        type: p.types.map(t => t.type.name),
                        image: p.sprites.front_default,
                        imageNormal: p.sprites.other['official-artwork'].front_default,
                        source: 'pokemon'
                    }]);
                    setNotFoundMessage('');
                }
            } catch (err) {
                if (!cancelled) setNotFoundMessage('Nenhum Pokémon foi encontrado.');
            } finally {
                if (!cancelled) setLoading(false);
            }
        }, 1000);

        return () => {
            cancelled = true;
            controller.abort();
            clearTimeout(timer);
        };
    }, [search, mode]);
    

    return (
        <div className='flex flex-col items-center bg-zinc-950 min-h-screen py-10'>
            {/* Toggle */}
            <div className="flex mb-10 rounded-xl overflow-hidden border border-zinc-700">
                <button
                    onClick={() => setMode('valorant')}
                    className={`px-6 py-2 text-sm font-bold uppercase tracking-wider transition-colors ${
                        mode === 'valorant' ? 'bg-red-600 text-white' : 'bg-zinc-900 text-zinc-400 hover:text-white'
                    }`}
                >
                    Valorant
                </button>
                <button
                    onClick={() => setMode('pokemon')}
                    className={`px-6 py-2 text-sm font-bold uppercase tracking-wider transition-colors ${
                        mode === 'pokemon' ? 'bg-yellow-400 text-zinc-950' : 'bg-zinc-900 text-zinc-400 hover:text-white'
                    }`}
                >
                    Pokémon
                </button>
            </div>

            <h1 className='text-3xl font-bold text-white mb-10 uppercase tracking-tighter'>
                {mode === 'valorant' ? 'Escolha o seu Agente' : 'Escolha o seu Pokémon'}
            </h1>
            {mode === 'pokemon' && (
                <>
                    <input
                        type="text"
                        value={search}
                        onChange={e => handleSearch(e.target.value)}
                        placeholder="Nome ou número..."
                        className="mb-2 px-4 py-2 bg-zinc-800 text-white font-pixel text-xs rounded-xl border border-zinc-700 focus:outline-none focus:border-zinc-500 w-72"
                    />
                    {notFoundMessage && (
                        <p className="mb-4 text-xs font-pixel text-red-300">{notFoundMessage}</p>
                    )}
                </>
            )}

            {loading ? (
                <div className="text-white">Carregando...</div>
            ) : (
                <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                    {items.map(item => (
                        <AgentCard
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            subtitle={item.subtitle}
                            type={item.type}
                            image={item.image}
                            source={item.source}
                        />
                    ))}
                </div>
            )}
            {mode === 'pokemon' && !loading && !search && (
                <button
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    className="mt-8 px-6 py-3 bg-zinc-800 text-white font-pixel text-xs uppercase tracking-wider rounded-xl hover:bg-zinc-700 transition-colors disabled:opacity-50"
                >
                    {loadingMore ? 'Carregando...' : 'Carregar mais'}
                </button>
            )}
            
        </div>
        
    );
};

export default Home;
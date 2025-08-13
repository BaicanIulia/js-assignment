const { pokemon } = require('./assets/og-pokemon.json')

const hasType = type => p => p.type.includes(type)
const getName = p => p.name
const hasNoNextEvolution = p => !p.next_evolution
const hasAvgSpawns = p => p.avg_spawns !== 0

// 1. Get the name of all pokemon of a certain type (ex: `Grass`)
const getPokemonNamesByType = (type) => {
	return pokemon
		.filter(hasType(type))
		.map(getName)
}
console.log('Grass type:', getPokemonNamesByType('Grass'))


// 2. Get the name of all fully evolved pokemon
const getFullyEvolvedPokemonNames = () => {
	return pokemon
		.filter(hasNoNextEvolution)
		.map(getName)
}

console.log('Fully evolved:', getFullyEvolvedPokemonNames())


// 3. Get all the evolutions of a given pokemon, including previous ones
const getAllEvolutions = (name) => {
	const poke = pokemon.find(p => getName(p) === name)
	if (!poke) { return [] }

	const prev = poke.prev_evolution ? poke.prev_evolution.map(e => e.name) : []
	const next = poke.next_evolution ? poke.next_evolution.map(e => e.name) : []
	return [...prev, poke.name, ...next]
}
console.log('Evolutions for Bulbasaur:', getAllEvolutions('Bulbasaur'))


// 4. Get all pokemon who's name starts with `Nido`
const getPokemonNamesStartingWith = (prefix) => {
	return pokemon
		.filter(p => getName(p).startsWith(prefix))
		.map(getName)
}
console.log('Names starting with Nido:', getPokemonNamesStartingWith('Nido'))


// 5. Get all pokemon that are weak to a given type (ex: `Water`)
const getPokemonWeakToType = (type) => {
	return pokemon
		.filter(p => p.weaknesses.includes(type))
		.map(getName)
}
console.log('Weak to Water:', getPokemonWeakToType('Water'))


// 6. Get the spawn chance (as a percentage) of for each pokemon in a given list (by id)
const getSpawnChancesByIds = (ids) => {
	return pokemon
		.filter(p => ids.includes(p.id))
		.map(p => ({
			name: p.name,
			id: p.id,
			spawn_chance_percent: (p.spawn_chance ? (p.spawn_chance * 100).toFixed(2) : '0.00') + '%'
		}))
}
console.log('Spawn chances:', getSpawnChancesByIds([1, 4, 146]))


// 7. Get the name, image and weakness of all pokemon that have no evolution and match all type in a given list (ex: `Ice`, `Flying`)
const getNoEvoAndTypes = (types) => {
	return pokemon
		.filter(p => hasNoNextEvolution(p) && types.every(t => p.type.includes(t)))
		.map(p => ({
			name: p.name,
			img: p.img,
			weaknesses: p.weaknesses
		}))
}
console.log('No evolution and types [Poison]:', getNoEvoAndTypes(['Poison']))


// 8. Get the number of pokemon that have a spawn rate (`avg_spawns`) lower or equal than a given number (ex: 10)
const countPokemonWithAvgSpawnsLE = (max) => {
	return pokemon.filter(p => p.avg_spawns <= max).length
}
console.log('Pokemons with spawn rate <= 10:', countPokemonWithAvgSpawnsLE(10))


// 9. Get the total `avg_spawns`
const getTotalAvgSpawns = () => {
	const total = pokemon.reduce((sum, p) => sum + (p.avg_spawns || 0), 0)
	return Number(total.toFixed(2))
}
console.log('Total avg_spawns:', getTotalAvgSpawns())


// 10. Remove all pokemon that have a spawn rate (`avg_spawns`) of 0.
const removePokemonWithZeroAvgSpawns = () => {
	return pokemon.filter(hasAvgSpawns)
}
console.log('Pokemon with avg_spawns > 0:', removePokemonWithZeroAvgSpawns().length)


// 11. Get the name of all pokemon of a certain type excluding the ones that have a spawn rate (`avg_spawns`) of 0.
const getPokemonNamesByTypeWithSpawns = (type) => {
	return pokemon
		.filter(p => hasType(type) && hasAvgSpawns)
		.map(getName)
}
console.log('Type "Grass" with spawns > 0:', getPokemonNamesByTypeWithSpawns('Grass'))


// 12. Get all the pokemon that would be a good counter to a given pokemon (by id) by checking `types` and `weakness`
const getCounterPokemonById = (id) => {
	const target = pokemon.find(p => p.id === id)
	if (!target) { return [] }
	return pokemon.filter(
		p => p.type.some(type => target.weaknesses.includes(type))
	).map(getName)
}
console.log('Counters for Bulbasaur (id 1):', getCounterPokemonById(1))
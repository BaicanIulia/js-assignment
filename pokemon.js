const { pokemon: pokemons } = require('./assets/og-pokemon.json')

const hasType = type => p => p.type.includes(type)
const getName = p => p.name
const hasNoNextEvolution = p => !p.next_evolution
const hasAvgSpawns = p => p.avg_spawns !== 0

// 1. Get the name of all pokemons of a certain type (ex: `Grass`)
const getPokemonNamesByType = (type) => {
	return pokemons
		.filter(hasType(type))
		.map(getName)
}
console.log('Grass type:', getPokemonNamesByType('Grass'))


// 2. Get the name of all fully evolved pokemons
const getFullyEvolvedPokemonNames = () => {
	return pokemons
		.filter(hasNoNextEvolution)
		.map(getName)
}
console.log('Fully evolved:', getFullyEvolvedPokemonNames())


// 3. Get all the evolutions of a given pokemon, including previous ones
const getAllEvolutions = (name) => {
	const poke = pokemons.find(p => getName(p) === name)
	if (!poke) { return [] }

	const prev = poke.prev_evolution ? poke.prev_evolution.map(e => e.name) : []
	const next = poke.next_evolution ? poke.next_evolution.map(e => e.name) : []
	return [...prev, poke.name, ...next]
}
console.log('Evolutions for Bulbasaur:', getAllEvolutions('Bulbasaur'))


// 4. Get all pokemons who's name starts with `Nido`
const getPokemonNamesStartingWith = (prefix) => {
	return pokemons
		.filter(p => getName(p).startsWith(prefix))
		.map(getName)
}
console.log('Names starting with Nido:', getPokemonNamesStartingWith('Nido'))


// 5. Get all pokemons that are weak to a given type (ex: `Water`)
const getPokemonWeakToType = (type) => {
	return pokemons
		.filter(p => p.weaknesses.includes(type))
		.map(getName)
}
console.log('Weak to Water:', getPokemonWeakToType('Water'))


// 6. Get the spawn chance (as a percentage) of for each pokemons in a given list (by id)
const getSpawnChancesByIds = (ids) => {
	return pokemons
		.filter(p => ids.includes(p.id))
		.map(p => ({
			name: p.name,
			id: p.id,
			spawn_chance_percent: (p.spawn_chance ? (p.spawn_chance * 100).toFixed(2) : '0.00') + '%'
		}))
}
console.log('Spawn chances:', getSpawnChancesByIds([1, 4, 146]))


// 7. Get the name, image and weakness of all pokemons that have no evolution and match all type in a given list (ex: `Ice`, `Flying`)
const getNoEvoAndTypes = (types) => {
	return pokemons
		.filter(p => hasNoNextEvolution(p) && types.every(t => p.type.includes(t)))
		.map(p => ({
			name: p.name,
			img: p.img,
			weaknesses: p.weaknesses
		}))
}
console.log('No evolution and types [Poison]:', getNoEvoAndTypes(['Poison']))


// 8. Get the number of pokemons that have a spawn rate (`avg_spawns`) lower or equal than a given number (ex: 10)
const countPokemonWithAvgSpawnsLE = (max) => {
	return pokemons.filter(p => p.avg_spawns <= max).length
}
console.log('Pokemons with spawn rate <= 10:', countPokemonWithAvgSpawnsLE(10))


// 9. Get the total `avg_spawns`
const getTotalAvgSpawns = () => {
	const total = pokemons.reduce((sum, p) => sum + (p.avg_spawns || 0), 0)
	return Number(total.toFixed(2))
}
console.log('Total avg_spawns:', getTotalAvgSpawns())


// 10. Remove all pokemons that have a spawn rate (`avg_spawns`) of 0.
const removePokemonWithZeroAvgSpawns = () => {
	return pokemons.filter(hasAvgSpawns)
}
console.log('Pokemon with avg_spawns > 0:', removePokemonWithZeroAvgSpawns().length)


// 11. Get the name of all pokemons of a certain type excluding the ones that have a spawn rate (`avg_spawns`) of 0.
const getPokemonNamesByTypeWithSpawns = (type) => {
	return pokemons
		.filter(hasType(type) && hasAvgSpawns)
		.map(getName)
}
console.log('Type "Grass" with spawns > 0:', getPokemonNamesByTypeWithSpawns('Grass'))


// 12. Get all the pokemons that would be a good counter to a given pokemons (by id) by checking `types` and `weakness`
const getCounterPokemonById = (id) => {
	const target = pokemons.find(p => p.id === id)
	if (!target) { return [] }
	return pokemons.filter(
		p => p.type.some(type => target.weaknesses.includes(type))
	).map(getName)
}
console.log('Counters for Bulbasaur (id 1):', getCounterPokemonById(1))
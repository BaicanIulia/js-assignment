# JS assignment

Using the `pokemon` dataset in `assets` accomplish the following:

1. Get the name of all pokemon of a certain type (ex: `Grass`)
2. Get the name of all fully evolved pokemon
3. Get all the evolutions of a given pokemon, including previous ones
4. Get all pokemon who's name starts with `Nido`
5. Get all pokemon that are weak to a given type (ex: `Water`)
6. Get the spawn chance (as a percentage) of for each pokemon in a given list (by id)
7. Get the name, image and weakness of all pokemon that have no evolution and match all type in a given list (ex: `Ice`, `Flying`)
8. Get the number of pokemon that have a spawn rate (`avg_spawns`) lower or equal than a given number (ex: 10)
9. Get the total `avg_spawns`
10. Remove all pokemon that have a spawn rate (`avg_spawns`) of 0.
11. Get the name of all pokemon of a certain type excluding the ones that have a spawn rate (`avg_spawns`) of 0.
12. Get all the pokemon that would be a good counter to a given pokemon (by id) by checking `types` and `weakness` 

Dos
- Load the `json` file using `require('./assets/og-pokemon.json')`
- Do read about [FP in javascript](https://www.toptal.com/javascript/functional-programming-javascript) and write code that is compliant with that paradigm
- Do write small and reusable functions
- Do try to reuse code when it makes sense
- Do use `===` syntax instead of `==`

Dont's
- Avoid using `delete`
- Avoid nested statements as much as possible (by making use of early `return`s)
- Avoid using `var` and `let`
- Avoid side-effects when possible

## Directions
- Store all your personal assignments in a directory using the following naming convention: `<firstname>-<lastname>`.
- Create a new directory called `js-assignment` in the previously created directory and place your assignment related files there.
- Create a new branch from `main` called `js-<your-name>`.
- Use `node <path/to/your/script>.js` to run the code
- When the work is done push it and open a PR (pull-request)
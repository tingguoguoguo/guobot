// randomPokemonCommand.js
export default function getRandomPokemonCommand (pokemons, template) {
  /* object.keys回傳一個有905隻寶可夢的陣列，隨機產生0~904的整數 */
  const randomPokemonName = Object.keys(pokemons)[Math.floor(Math.random() * Object.keys(pokemons).length)]
  const randomPokemon = pokemons[randomPokemonName]

  template.body.contents[2].contents[0].contents[0].contents[0].text = randomPokemon.name
  template.body.contents[0].url = randomPokemon.src
  template.body.contents[3].contents[0].text = randomPokemon.attr

  const responseContent = [
    {
      type: 'flex',
      altText: '查詢結果',
      contents: template
    },
    {
      type: 'text',
      text: `寶可夢介紹:\n${randomPokemon.intro}`
    }
  ]

  return responseContent
}

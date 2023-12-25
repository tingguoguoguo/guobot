import axios from 'axios'
import pokemonsTemplate from '../templates/pokemons.js'
import getRandomPokemonCommand from './random.js'

export default async (event) => {
  try {
    const { data } = await axios.get('https://raw.githubusercontent.com/rayc2045/pokedex/main/data/PokeApi.json')
    const template = pokemonsTemplate()

    const pokemons = data.reduce((r, element) => {
      const pokemonsId = element.id
      const pokemonsZh = element.name.zh
      const pokemonsAttr = element.types.zh.join(', ')
      const pokemonsintro = element.entries.zh.join('\n')
      return {
        ...r,
        [pokemonsZh]: {
          name: pokemonsZh,
          id: pokemonsId,
          src: `https://pokedex-list.netlify.app/images/official-artwork/front_default/${pokemonsId}.png`,
          attr: pokemonsAttr,
          intro: pokemonsintro
        }
      }
    }, {})

    const userInput = event.message.text

    if (userInput === '隨機') {
      const responseContent = getRandomPokemonCommand(pokemons, template)
      await event.reply(responseContent)
    } else {
      const pokemon = pokemons[userInput]

      if (!pokemon) {
        template.body.contents[2].contents[0].contents[0].contents[0].text = '找不到這隻寶可夢！'
        template.body.contents[0].url = 'https://5b0988e595225.cdn.sohucs.com/images/20200410/4b27596efecd44e2b05cf3cd95798c5d.jpeg'

        const responseContent = [
          {
            type: 'flex',
            altText: '查詢結果',
            contents: template
          },
          {
            type: 'text',
            text: '檢查一下是不是打錯了？'
          }
        ]

        await event.reply(responseContent)
      } else {
        template.body.contents[2].contents[0].contents[0].contents[0].text = pokemon.name
        template.body.contents[0].url = pokemon.src
        template.body.contents[3].contents[0].text = pokemon.attr

        const responseContent = [
          {
            type: 'flex',
            altText: '查詢結果',
            contents: template
          },
          {
            type: 'text',
            text: `寶可夢介紹:\n${pokemon.intro}`
          }
        ]

        await event.reply(responseContent)
      }
    }
  } catch (error) {
    console.log(error)
  }
}

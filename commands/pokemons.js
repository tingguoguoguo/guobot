import axios from 'axios'
import pokemonsTemplate from '../templates/pokemons.js'
export default async (event) => {
  try {
    const { data } = await axios.get('https://raw.githubusercontent.com/rayc2045/pokedex/main/data/PokeApi.json')

    const template = pokemonsTemplate()
    // for (let i = 0; i <= 905; i += 1) {
    // template.body.contents[0].url = (`https://pokedex-list.netlify.app/images/official-artwork/front_default/${i + 1}.png`)
    // template.body.contents[2].contents[0].contents[0].contents[0].text = data.id
    // }
    // data.forEach(element => {
    //   const pokemonsId = element.id
    //   const pokemonsZh = element.name.zh
    // console.log(pokemonsId, pokemonsZh)
    // })
    const pokemons = data.reduce((r, element) => {
      const pokemonsId = element.id
      const pokemonsZh = element.name.zh
      const pokemonsAttr = element.types.zh.join(', ')
      const pokemonsintro = element.entries.zh.join(', ')
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
    const pokemon = pokemons[event.message.text]

    if (!pokemon) {
      template.body.contents[2].contents[0].contents[0].contents[0].text = '找不到這隻神奇寶貝 !'
      template.body.contents[0].url = 'https://cyberdefender.hk/wp-content/uploads/2021/07/404-01-scaled.jpg'
    } else {
      template.body.contents[2].contents[0].contents[0].contents[0].text = pokemon.name
      template.body.contents[0].url = pokemon.src
      template.body.contents[3].contents[0].text = pokemon.attr
    }

    const result1 = await event.reply({
      type: 'flex',
      altText: '查詢結果',
      contents: template
    })
    console.log(result1)
    const result2 = await event.reply({
      type: 'text',
      text: `神奇寶貝介紹：${pokemon.intro}`
    })
    console.log(result2)
  } catch (error) {
    console.log(error)
  }
}

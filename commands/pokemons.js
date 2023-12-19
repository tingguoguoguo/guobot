import axios from 'axios'
import * as cheerio from 'cheerio'
import pokemonsTemplate from '../templates/pokemons.js'
export default async (event) => {
  try {
    const { data } = await axios.get('https://pokedex-list.netlify.app/')
    const $ = cheerio.load(data)
    $('.pokemons .card').each(function () {
      const template = pokemonsTemplate()

      const image = $(this).find('img').attr('src')
      const imageUrl = new URL(image, 'https://pokedex-list.netlify.app/')
      const pokemonId = $(this).find('.pokemon-id').text()

      template.body.contents[0].url = imageUrl
      template.body.contents[2].contents[0].contents[0].contents[0].text = pokemonId
    })

    const result = await event.reply({
      type: 'flex',
      altText: '寶可夢',
      contents: 
    })
    console.log(result)
  } catch (error) {
    console.log(error)
  }
}

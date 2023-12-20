import axios from 'axios'
import * as cheerio from 'cheerio'
import pokemonsTemplate from '../templates/pokemons.js'
export default async (event) => {
  try {
    const { data } = await axios.get('https://pokedex-list.netlify.app/')
    const $ = cheerio.load(data)

    const template = pokemonsTemplate()

    template.body.contents[0].url = $('.square img').attr('src')
    template.body.contents[2].contents[0].contents[0].contents[0].text = $('.square img').attr('alt')

    console.log('Image URL:', $('.square img').attr('src'))
    console.log('Alt Text:', $('.square img').attr('alt'))

    const result = await event.reply({
      type: 'flex',
      altText: '寶可夢',
      contents: template
    })
    console.log(result)
  } catch (error) {
    console.log(error)
  }
}

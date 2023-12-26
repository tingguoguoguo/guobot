import axios from 'axios'
import pokemonsTemplate from '../templates/pokemons.js'// flex訊息模板
import getRandomPokemonCommand from './random.js' // 隨機指令

/* 抓取資料 */
export default async (event) => {
  try {
    const { data } = await axios.get('https://raw.githubusercontent.com/rayc2045/pokedex/main/data/PokeApi.json')

    /* 產生模板 */
    const template = pokemonsTemplate()

    /* 使用reduce把獲取的data轉換成小資料庫 */
    const pokemons = data.reduce((r, element) => { // reduce(迭代結果, 被迭代的元素)
      const pokemonsId = element.id // 寶可夢id
      const pokemonsZh = element.name.zh // 寶可夢中文名稱
      const pokemonsAttr = element.types.zh.join(', ') // 寶可夢屬性
      const pokemonsintro = element.entries.zh.join('\n') // 寶可夢介紹
      return { // return物件(小資料庫)
        ...r, // 展開之前全部迭代後的結果，用...展開並保留先前資料，不會被覆蓋
        [pokemonsZh]: { // 動態鍵值用[] (把變數當作key時)，把正在迭代的加入物件裡面(每一隻寶可夢)
          name: pokemonsZh,
          id: pokemonsId,
          src: `https://pokedex-list.netlify.app/images/official-artwork/front_default/${pokemonsId}.png`,
          attr: pokemonsAttr,
          intro: pokemonsintro
        }
      }
    }, {}) // 迭代初始值為空{}

    /* 使用者輸入的文字 */
    const userInput = event.message.text

    /* 輸入使用說明，直接返回(已啟用official manager自動回覆功能) */
    if (userInput === '使用說明') {
      return
    }

    /* 輸入隨機，執行隨機指令 */
    if (userInput === '隨機') {
      const responseContent = getRandomPokemonCommand(pokemons, template)
      await event.reply(responseContent)
    } else {
      const pokemon = pokemons[userInput] // pokemon為使用者輸入的key值(寶可夢名稱)
      /* 如果寶可夢名稱不在資料庫中 */
      if (!pokemon) {
        template.body.contents[2].contents[0].contents[0].contents[0].text = '找不到這隻寶可夢！'
        template.body.contents[0].url = 'https://5b0988e595225.cdn.sohucs.com/images/20200410/4b27596efecd44e2b05cf3cd95798c5d.jpeg'
        /* 把flex訊息和文字訊息包裹成陣列回覆給使用者 */
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

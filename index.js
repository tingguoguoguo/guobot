import 'dotenv/config'
import linebot from 'linebot'
import pokemons from './commands/pokemons.js'

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

bot.on('message', event => {
  console.log(event)
  if (event.message.type === 'text') {
    pokemons(event)
  }
})

bot.on('postback', event => {
  console.log(event.postback.data)
})

bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人啟動')
})

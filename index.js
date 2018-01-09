const TelegramBot = require('node-telegram-bot-api')

const TOKEN = '511849018:AAEZ9udbQ81l_FrtbN2tETazl4kR4eDQTKw'

const fs = require('fs')

const HelpText = 'Формулировка вопроса должна быть такой, чтобы шар мог ответить ДА или НЕТ.\n' +
    'Не задавайте один и тот же вопрос дважды в течение по крайней мере одного дня.\n' +
    'Вселенная даст вам ответ, но только если вы верите в такой способ его получения.'

const StartText = 'Задайте шару вопрос или встряхните.\n/help'

console.log('Bot has been started ...')

const bot = new TelegramBot(TOKEN, {
    polling: true
})

bot.on('message', (msg) => {
    const { id } = msg.chat
    const { text } = msg

    if(text === '/start')
    {
        sendStartMessage(id)
    }
    else if(text === '/help')
    {
        bot.sendMessage(id, HelpText).then( function(){ sendStartMessage(id) })
    }
    else
    {
        sendNewSticker(id)
    }
})

bot.on('callback_query', query => {
    sendNewSticker(query.message.chat.id)
})

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

function sendNewSticker(id) {
    bot.sendSticker(id, './src/stickers/' + getRandomArbitrary(1,21).toString() + '.webp', {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: 'Встряхнуть',
                        callback_data: 'Встряхнуть'
                    }
                ]
            ]
        }
    })
}

function sendStartMessage(id) {
    bot.sendMessage(id, StartText, {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: 'Встряхнуть',
                        callback_data: 'Встряхнуть'
                    }
                ]
            ]
        }
    })
}
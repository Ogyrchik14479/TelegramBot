const TelegramBot = require('node-telegram-bot-api')

const token = '5194907505:AAGNQW2XAYpDjz7nFHwn25a8mWnPbbfIlK0'

const bot = new TelegramBot(token, { polling: true })

const start = () => {

    bot.setMyCommands([
        {command: '/start', description: 'Приветствие'},
        {command: '/game', description: 'Начать игру'},
    ])

    let options = {
        reply_markup: JSON.stringify({
            resize_keyboard: true,
            inline_keyboard: [
                [{text: '1', callback_data: '1'},{text: '2', callback_data: '2'},{text: '3', callback_data: '3'}],
                [{text: '4', callback_data: '4'},{text: '5', callback_data: '5'},{text: '6', callback_data: '6'}],
                [{text: '7', callback_data: '7'},{text: '8', callback_data: '8'},{text: '9', callback_data: '9'}],
                [{text: '0', callback_data: '0'}]
            ],
        })
    }

    bot.on("message", async (msg) => {
        const chatId = msg.chat.id;
        const text = msg.text;

        if (text === '/start') {
            await bot.sendMessage(chatId, 'Привет мой господин!');
        }

        if (text === '/game') {
            await bot.sendMessage(chatId, 'Я загадал число от 0 до 9! Угадай, что загадал!', options);
        }
    })

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;

        const randomNumber = Math.floor(Math.random() * 10)

        if (data === randomNumber.toString()) {
            await bot.sendMessage(chatId, `Поздравляю, ты отгадал цифру ${randomNumber}`, options);
        } else {
            await bot.sendMessage(chatId, `К сожалению ты не угадал, бот загадал цифру ${randomNumber}`, options);
        }
    })
}

start()
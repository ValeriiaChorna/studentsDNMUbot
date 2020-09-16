const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const TelegramBot = require("node-telegram-bot-api");
const helper = require("./helpers");
const kbButtons = require("./keyboard-buttons");
const keyboards = require("./keyboards");

const TOKEN = process.env.TOKEN; //|| "YOUR_TELEGRAM_BOT_TOKEN";
const options = {
  webHook: {
    port: process.env.PORT,
  },
};
const url = `https://${process.env.HEROKU_APP_NAME}.herokuapp.com`;

// const bot = new TelegramBot(TOKEN, {
//   polling: true,
// });
const bot = new TelegramBot(TOKEN, options);

const photoMap1 = path.join(__dirname, `./img/map_1.jpg`);
const photoMap2 = path.join(__dirname, `./img/map_2.jpg`);

bot.setWebHook(`${url}/bot${TOKEN}`);
helper.logStart();
helper.initDatabase();

bot.onText(/\/start/, (message) => {
  const { id } = message.chat;

  bot.sendMessage(id, kbButtons.hi);
  bot.sendMessage(id, kbButtons.hi2, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: kbButtons.go,
            callback_data: "help",
          },
        ],
      ],
    },
  });
  bot.sendMessage(id, JSON.stringify(message));
});

bot.onText(/\/site/, (message) => {
  const { id } = message.chat;
  bot.sendMessage(id, `Щоб перейти на сайт клікни тут`, {
    reply_markup: {
      inline_keyboard: [[{ text: `Сайт універу`, url: "https://dnmu.edu.ua" }]],
    },
  });
});

bot.onText(/\/help/, (message) => {
  const { id } = message.chat;

  bot.sendMessage(id, `Обери...`, {
    reply_markup: {
      keyboard: keyboards.main_keyboard,
      one_time_keyboard: true,
      resize_keyboard: true,
    },
  });
});

bot.on("callback_query", (query) => {
  const { chat, message, text } = query.message;
  switch (query.data) {
    case "help":
      bot.sendMessage(chat.id, `Обери...`, {
        reply_markup: {
          keyboard: keyboards.main_keyboard,
          one_time_keyboard: true,
          resize_keyboard: true,
        },
      });
      break;
  }

  bot.answerCallbackQuery({ callback_query_id: query.id });
});

bot.on("message", (message) => {
  const { id } = message.chat;

  switch (message.text) {
    case kbButtons.main.sentMap:
      bot.sendPhoto(id, photoMap1);
      bot.sendPhoto(id, photoMap2);
      break;
    case kbButtons.main.sentListGroups:
      bot.sendMessage(id, `Обери...`, {
        reply_markup: { inline_keyboard: keyboards.oficGroups_keyBoard },
      });
      break;
    case kbButtons.main.sentTimetable:
      bot.sendMessage(
        id,
        `Натисніть, щоб подивитися разклад на сайті універу`,
        {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: kbButtons.main.sentTimetable,
                  url: "https://dnmu.edu.ua/ru/rozklad-zanyat-2019-20-n-r/",
                },
              ],
            ],
          },
        }
      );
      break;
    case kbButtons.main.sentSections:
      bot.sendMessage(id, `Обери...`, {
        reply_markup: { inline_keyboard: keyboards.section_keyBoard },
      });
      break;
    case kbButtons.main.sentOtherData:
      bot.sendMessage(id, `Обери...`, {
        reply_markup: {
          keyboard: keyboards.data_keyboard,
          resize_keyboard: true,
        },
      });
      break;
    case kbButtons.back:
      bot.sendMessage(id, `Головне меню.Обери...`, {
        reply_markup: {
          keyboard: keyboards.main_keyboard,
          one_time_keyboard: true,
          resize_keyboard: true,
        },
      });
      break;
    case kbButtons.data_menu.covid:
      bot.sendMessage(id, `Щоб перейті на офіційний сайт МОЗ натисніть`, {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: kbButtons.data_menu.covid,
                url: "https://moz.gov.ua/koronavirus-2019-ncov",
              },
            ],
          ],
        },
      });
      break;
    case kbButtons.data_menu.importantPlaces:
      bot.sendMessage(id, kbButtons.importantPlaces_messag, {
        parse_mode: "HTML",
      });
      break;
    case kbButtons.data_menu.advices:
      bot.sendMessage(id, kbButtons.advices, {
        parse_mode: "HTML",
      });
      break;
  }
});

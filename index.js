const TelegramBot = require("node-telegram-bot-api");
const config = require("./configs"); //"1210752272:AAGHdV4W7Cf9xz0FcpSwXtpYwaf2nLB6Ths"
const helper = require("./helpers");
const kbButtons = require("./keyboard-buttons");
const keyboards = require("./keyboards");
const bot = new TelegramBot(config.TOKEN, {
  polling: true,
});

helper.logStart();

//обработка команд (пример)
// bot.on("message", (message) => {
//   const { id } = message.chat;
//     bot
//       .sendMessage(id, debug(message))
//       .then(() => {
//         bot.sendMessage(id, "Привет, " + message.from.first_name);
//       })
//       .catch((err) => console.log(err));
// });

bot.onText(/\/start/, (message) => {
  const { id } = message.chat;
  bot.sendMessage(
    id,
    " Привіт! я помічник першокурсника ДНМУ. Я допоможу тобі розібратіся з дрібницями універу, щоб ти був прокачаним та не загубився."
  );
  bot.sendMessage(
    id,
    `Отже, Наш університет - це велика сім'я, яка об'єднує тих, хто  навчає та здобуває освіту.Якщо ти готовий, натисни "GO"`,
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: kbButtons.go,
              // url: "https://dnmu.edu.ua"
              callback_data: "help",
            },
          ],
        ],
      },
    }
  );
});

// bot.onText(/\/help (.+)/, (message, [source, match]) => {
//   const { id } = message.chat;
//   bot.sendMessage(id, debug(match));
// });

bot.onText(/\/site/, (message) => {
  const { id } = message.chat;
  //   bot.sendMessage(id, "https://dnmu.edu.ua", {
  //     disable_web_page_preview: false,
  //     // disable_notification: true;
  //   });
  bot.sendMessage(id, `Щоб перейти на сайт клікни тут`, {
    reply_markup: {
      inline_keyboard: [[{ text: `Сайт універу`, url: "https://dnmu.edu.ua" }]],
    },
  });
});

bot.onText(/\/help/, (message) => {
  const { id } = message.chat;
  //   if (message.text === "Закрити") {
  //     bot.sendMessage(id, "Закриваю, приходьте ще :)", {
  //       reply_markup: { remove_keyboard: true },
  //     });
  //   } else if (message.text === "?!Якщо загубився") {
  //   }

  bot.sendMessage(id, `Обери...`, {
    reply_markup: {
      keyboard: keyboards.main_keyboard,
      one_time_keyboard: true,
    },
  });
});

// bot.on("message", (message) => {
//   const { id } = message.chat;

//   bot.sendMessage(id, `Обери...`, {
//     reply_markup: {
//       inline_keyboard: [[{ text: `Сайт універу`, url: "https://dnmu.edu.ua" }]],
//     },
//   });
// });

// bot.on("callback_query", (query) => {
//     bot.answerCallbackQuery(query.id,`Message`) //alert
// });

bot.on("callback_query", (query) => {
  const { chat, message, text } = query.message;
  switch (query.data) {
    case "help":
      bot.sendMessage(chat.id, `Обери...`, {
        reply_markup: {
          keyboard: keyboards.main_keyboard,
          one_time_keyboard: true,
        },
      });
      break;
  }

  bot.answerCallbackQuery({ callback_query_id: query.id });
});

bot.on("inline_query", (query) => {
  //   bot.answerInlineQuery(query.id, [], {
  //     cache_time: 0,
  //   });
});

bot.on("message", (message) => {
  const { id } = message.chat;

  switch (message.text) {
    case kbButtons.main.sentMap:
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
        reply_markup: { keyboard: keyboards.data_keyboard },
      });
      break;
    case kbButtons.back:
      bot.sendMessage(id, `Головне меню.Обери...`, {
        reply_markup: {
          keyboard: keyboards.main_keyboard,
          one_time_keyboard: true,
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

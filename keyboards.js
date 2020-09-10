const kbButtons = require("./keyboard-buttons");

module.exports = {
  main_keyboard: [
    [
      {
        text: kbButtons.main.sentMap,
        callback_data: "sentMap",
      },
      {
        text: kbButtons.main.sentListGroups,
        callback_data: "sentListGroups",
      },
    ],
    [
      {
        text: kbButtons.main.sentTimetable,
        callback_data: "sentTimetable",
      },
      {
        text: kbButtons.main.sentSections,
        callback_data: "sentSections",
      },
      {
        text: kbButtons.main.sentOtherData,
        callback_data: "sentOtherData",
      },
    ],
  ],
  data_keyboard: [
    [
      {
        text: kbButtons.data_menu.importantPlaces,
        callback_data: "importantPlaces",
      },
      {
        text: kbButtons.data_menu.covid,
        callback_data: "covid",
      },
      {
        text: kbButtons.data_menu.advices,
        callback_data: "advices",
      },
    ],
    [
      {
        text: kbButtons.back,
        callback_data: "back",
      },
    ],
  ],
  section_keyBoard: [
    [
      {
        text: kbButtons.section_menu.volonter,
        // callback_data: "volonter",
        url: "https://dnmu.edu.ua/volonterskyj-sektor/",
      },
      {
        text: kbButtons.section_menu.cult_mass,
        // callback_data: "cult_mass",
        url: "https://t.me/joinchat/J7ZcCxtBwYkTqUaWDi8eWQ",
      },
    ],
    [
      {
        text: kbButtons.section_menu.sciencTeam,
        url: "https://t.me/sss_dnmu",
        // callback_data: "sciencTeam",
      },
      {
        text: kbButtons.section_menu.inform,
        callback_data: "inform",
      },
    ],
  ],
  oficGroups_keyBoard: [
    [
      {
        text: kbButtons.oficGroups_menu.news,
        url: "https://t.me/dnmurazom",
      },
      {
        text: kbButtons.oficGroups_menu.lector,
        url: "https://t.me/onlineLector",
      },
    ],
    [
      {
        text: kbButtons.oficGroups_menu.chat,
        url: "https://t.me/govorilkadnmu ",
      },
      {
        text: kbButtons.oficGroups_menu.elit,
        url: "https://t.me/memdnmu",
      },
      {
        text: kbButtons.oficGroups_menu.live,
        url: "https://t.me/dnmu_live",
      },
    ],
    [
      {
        text: kbButtons.oficGroups_menu.books,
        url: "https://t.me/ifnmu_book",
      },
    ],
  ],
};

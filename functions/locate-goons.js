const https = require("https");
const Discord = require("discord.js");
const CONFIG = require("../config.json");
const moment = require('moment');

module.exports = async function () {
  return new Promise((resolve) => {
    https
      .get(
        "https://gentle-anchorage-57300.herokuapp.com/goonDetectors/current",
        (resp) => {
          let data = "";

          resp.on("data", (chunk) => {
            data += chunk;
          });

          resp.on("end", () => {
            data = JSON.parse(data);
            data.lastReported = moment(data.lastReported);
            let embed = new Discord.EmbedBuilder()
              .setColor(CONFIG.COLOR)
              .setTitle("Localização dos Goons")
              .setAuthor({ name: 'Escape From Tarkov',  iconURL: CONFIG.AVATAR })
              .setImage(
                "https://www.futuregamereleases.com/wp-content/uploads/2022/04/tarkov-lighthouse-rogue-bosses.jpg"
              )
              .setDescription(
                "Última local onde os Bosses Goons foram vistos."
              )
              .addFields(
                { name: "Local", value: data.location },
                {
                  name: "Visto por último às",
                  value: data.lastReported.format('DD/MM/YYYY HH:mm:ss'),
                }
              );

            resolve(embed);
          });
        }
      )
      .on("error", (error) => {
        console.log("Error: " + error.message);
      });
  });
};

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('goons')
		.setDescription('Retorna o local da última localidade onde os Goons apareceram.'),
};
const handler = async (m, {conn}) => {
  m.reply(global.ComprarBot);
};
handler.command ='comprarbot',/^(ComprarBot|Comprar|comprar|ComprarBot)$/i;
export default handler;

global.ComprarBot = `
〔 *ASUBA BOT - Al* 〕

*BOT PARA GRUPO* :
> wa.me/5491156178758

*BOT PERZONALIZADO* :
> wa.me/5491156178758
`;

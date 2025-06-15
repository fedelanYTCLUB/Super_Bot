import {watchFile, unwatchFile} from 'fs';
import chalk from 'chalk';
import {fileURLToPath} from 'url';
import fs from 'fs'; 
import cheerio from 'cheerio';
import fetch from 'node-fetch';
import axios from 'axios';
import moment from 'moment-timezone';

//*─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─*

//BETA: Si quiere evitar escribir el número que será bot en la consola, agregué desde aquí entonces:
//Sólo aplica para opción 2 (ser bot con código de texto de 8 digitos)
global.botNumber = '' //Ejemplo: 525218138672

//*──ׄ✞ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─*

global.owner = [
  ['5491156178758', '🜲 𝗖𝗿𝗲𝗮𝗱𝗼𝗿 👻', true],
  ['584146277368', 'barboza', true]
];

//*─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─*

global.mods = []
global.suittag = ['5491156178758', '584146277368'] 
global.prems = []

//*─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─*

global.libreria = 'Baileys'
global.baileys = 'V 6.7.8'
global.vs = '2.0.0'
global.languaje = 'Español'
global.nameqr = 'black clover- Bot'
global.sessions = 'blackSession'
global.jadi = 'blackJadiBot'
global.blackJadibts = true

//*─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─*

global.packsticker = `♾ ━━━━━━━━\n├ ɓσƭ:\n├ ρяοριєταяιο:\n├ ƒєϲнα ∂є ϲяєαϲιόи:\n├ нοяα:\n♾━━━━━━━━`
global.packname = `ᥲsᥙᥒᥲᑲ᥆𝗍-ᥲᥣ  ☘`
global.author = `♾━━━━━━━━\n⇝͟͞ᥲsᥙᥒᥲᑲ᥆𝗍-ᥲᥣ☘͟ ⋆\n⇝ ۵-̱̅𝖿ᥱძᥱᥣᥲᥒᥡ𝗍-͞ˍ\n⇝ ${moment.tz('America/Los_Angeles').format('DD/MM/YY')}\n⇝ ${moment.tz('America/Los_Angeles').format('HH:mm:ss')} \n♾━━━━━━━━\n\n\n\nѕτιϲκєя ϐγ: ᥲsᥙᥒᥲᑲ᥆𝗍-ᥲᥣ  ☘͟ `;
global.wm = 'ᥲsᥙᥒᥲᑲ᥆𝗍-ᥲᥣ  ☘';
global.titulowm = 'ᥲsᥙᥒᥲᑲ᥆𝗍-ᥲᥣ  ☘';
global.igfg = '𝖿ᥱძᥱᥣᥲᥒᥡ𝗍'
global.botname = 'ᥲsᥙᥒᥲᑲ᥆𝗍-ᥲᥣ  ☘'
global.dev = '© ⍴᥆ᥕᥱrᥱძ ᑲᥡ the 𝖿ᥱძᥱᥣᥲᥒᥡ𝗍 ⚡'
global.textbot = 'ᥲsᥙᥒᥲᑲ᥆𝗍-ᥲᥣ   : ძᥱ᥎ᥱᥣ᥆⍴ᥱძ ᑲᥡ 𝖿ᥱძᥱᥣᥲᥒᥡ𝗍'
global.gt = '͟͞𝕭𝖑𝖆𝖈𝖐 𝕮𝖑𝖔𝖛𝖊𝖗 ☘͟͞';
global.namechannel = 'ᥲsᥙᥒᥲᑲ᥆𝗍-ᥲᥣ  / 𝖿ᥱძᥱᥣᥲᥒᥡ𝗍'

//*─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─*

global.moneda = 'monedas'

//• ↳ ◜𝑳𝑰𝑵𝑲𝑺  𝐓𝐇𝐄 𝐋𝐄𝐆𝐄𝐍𝐃𝐒 ™◞ • 🌿
global.gp4 = 'https://chat.whatsapp.com/FoVnxJ64gYV6EZcfNVQUfJ' //Grupo Oficial De black clover 
global.gp1 = 'https://chat.whatsapp.com/FoVnxJ64gYV6EZcfNVQUfJ' //Grupo 2
global.gp2 = 'https://chat.whatsapp.com/FoVnxJ64gYV6EZcfNVQUfJ'//
global.channel = 'https://whatsapp.com/channel/0029VbAfd7zDDmFXm5adcF31' //Canal Oficial
global.channel2 = 'https://whatsapp.com/channel/0029VbAfd7zDDmFXm5adcF31' //Canal test 
global.yt = 'https://www.youtube.com/@ElCarlos.87' //Canal De Youtube
global.md = 'https://github.com/thecarlos19/black-clover-MD' //Github Oficial
global.correo = ''
global.cn ='https://whatsapp.com/channel/0029VbAfd7zDDmFXm5adcF31';

//*─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─*

global.catalogo = fs.readFileSync('./src/catalogo.jpg');
global.estilo = { key: {  fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) }, message: { orderMessage: { itemCount : -999999, status: 1, surface : 1, message: packname, orderTitle: 'Bang', thumbnail: catalogo, sellerJid: '0@s.whatsapp.net'}}}
global.ch = {
ch1: '120363307694217288@newsletter',
}
global.multiplier = 70

//*─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─*

global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment   

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})

import { xpRange} from '../lib/levelling.js'

const textCyberpunk = (text) => {
  const charset = {
    a: 'ᴀ', b: 'ʙ', c: 'ᴄ', d: 'ᴅ', e: 'ᴇ', f: 'ꜰ', g: 'ɢ',
    h: 'ʜ', i: 'ɪ', j: 'ᴊ', k: 'ᴋ', l: 'ʟ', m: 'ᴍ', n: 'ɴ',
    o: 'ᴏ', p: 'ᴘ', q: 'ǫ', r: 'ʀ', s: 'ꜱ', t: 'ᴛ', u: 'ᴜ',
    v: 'ᴠ', w: 'ᴡ', x: 'x', y: 'ʏ', z: 'ᴢ'
}
  return text.toLowerCase().split('').map(c => charset[c] || c).join('')
}

let tags = {
  'main': textCyberpunk('sistema'),
  'group': textCyberpunk('grupos'),
  'serbot': textCyberpunk('sub bots'),
}

const defaultMenu = {
  before: `⚠️ 𝗔𝗟𝗘𝗥𝗧𝗔 𝗗𝗘 𝗦𝗜𝗦𝗧𝗘𝗠𝗔 ⚠️
┃ 💙 𝙸𝙽𝙸𝙲𝙸𝙰𝙽𝙳𝙾: 𝙱𝙻𝙲-𝚂𝚈𝚂.exe
┃ 💙 𝚄𝚂𝚄𝗔𝗥𝗜𝗢: %name
┃ 💙 𝙼𝙾𝙳𝙾: %mode
┃ 💙 𝙴𝚂𝚃𝙰𝙳𝙾: 𝗢𝗡𝗟𝗜𝗡𝗘 👻
╚═⫷🍭 𝗔𝗦𝗨𝗡𝗔_𝗕𝗢𝗧-𝗠𝗗 🍭⫸═╝

╭─[𝗘𝗦𝗧𝗔𝗗𝗢 𝗗𝗘 𝗨𝗦𝗨𝗔𝗥𝗜𝗢]─╮
│ 📊 𝗡𝗜𝗩𝗘𝗟: %level
│ ⚡ 𝗘𝗫𝗣: %exp / %maxexp
│ 🧮 𝗨𝗦𝗨𝗔𝗥𝗜𝗢𝗦: %totalreg
│ ⏱ 𝗧𝗜𝗘𝗠𝗣𝗢 𝗔𝗖𝗧𝗜𝗩𝗢: %muptime
╰──────────────────╯

🧬 *𝗠𝗢𝗗𝗢 𝗠𝗘𝗡𝗨 𝗔𝗖𝗧𝗜𝗩𝗔𝗗𝗢*
✦ Elige un comando para ejecutar protocolo.
✦ creador: *FedelanYT 👑*

%readmore
`.trimStart(),

  header: '\n╭─〔 🍭 %category 〕─╮',
  body: '―͟͞💙 %cmd\n',
  footer: '╰────────────────╯',
  after: '\n⌬ 𝗖𝗬𝗕𝗘𝗥 𝗠𝗘𝗡𝗨 ☠️ - Sistema ejecutado con éxito.'
}

let handler = async (m, { conn, usedPrefix: _p}) => {
  try {
    let name = await conn.getName(m.sender)
    let { exp, level} = global.db.data.users[m.sender]
    let { min, xp} = xpRange(level, global.multiplier)
    let totalreg = Object.keys(global.db.data.users).length
    let mode = global.opts["self"]? "Privado": "Público"
    let muptime = clockString(process.uptime() * 1000)

    let help = Object.values(global.plugins).filter(p =>!p.disabled).map(p => ({
      help: Array.isArray(p.help)? p.help: [p.help],
      tags: Array.isArray(p.tags)? p.tags: [p.tags],
}))

    for (let plugin of help) {
      for (let t of plugin.tags) {
        if (!(t in tags)) tags[t] = textCyberpunk(t)
}
}

    const { before, header, body, footer, after} = defaultMenu

    let text = [
      before,
...Object.keys(tags).map(tag => {
        const cmds = help
.filter(menu => menu.tags.includes(tag))
.map(menu => menu.help.map(cmd => body.replace(/%cmd/g, _p + cmd)).join('\n'))
.join('\n')
        return `${header.replace(/%category/g, tags[tag])}\n${cmds}\n${footer}`
}),
      after
    ].join('\n').replace(/%(\w+)/g, (_, key) => ({
      name,
      level,
      exp: exp - min,
      maxexp: xp,
      totalreg,
      mode,
      muptime,
      readmore: String.fromCharCode(8206).repeat(4001)
}[key] || ''))

    await conn.sendMessage(m.chat, {
      text: text,
      mentions: [m.sender]
}, { quoted: m})

} catch (e) {
    console.error(e)
    conn.reply(m.chat, '❎ Error al generar el menú del sistema.', m)
}
}

handler.command = ['menu', 'menú']
export default handler

function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
      }

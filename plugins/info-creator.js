import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
  let txt_owner = "`𝙷𝙾𝙻𝙰, 𝙴𝚂𝚃𝙴 𝙴𝚂 𝙴𝙻 𝙽𝚄𝙼𝙴𝚁𝙾 𝙳𝙴 𝙼𝙸 𝙲𝚁𝙴𝙰𝙳𝙾𝚁, 𝙲𝚄𝙰𝙻𝚀𝚄𝙸𝙴𝚁 𝙵𝙰𝙻𝙻𝙰 𝙾 𝚂𝙸 𝚀𝚄𝙸𝙴𝚁𝙴𝚂 𝙰𝙶𝚁𝙴𝙶𝙰𝚁 𝙴𝙻 𝙱𝙾𝚃 𝙰 𝚃𝚄 𝙶𝚁𝚄𝙿𝙾, 𝙿𝚄𝙴𝙳𝙴𝚂 𝙷𝙰𝙱𝙻𝙰𝚁𝙻𝙴`\n\n  𝐓𝐇𝐄 𝐂𝐀𝐑𝐋𝐎𝐒: +525544876071"
  try {
    let res = await fetch("https://files.catbox.moe/l1ahc0.jpg")
    let buffer = await res.buffer()
    await conn.sendFile(m.chat, buffer, 'thumbnail.jpg', txt_owner, m)
  } catch (e) {
    console.error(e)
    m.reply('❌ No se pudo enviar la imagen del creador. Intenta más tarde.')
  }
}

handler.help = ['owner']
handler.tags = ['main']
handler.command = ['owner', 'creator', 'creador', 'dueño']

export default handler
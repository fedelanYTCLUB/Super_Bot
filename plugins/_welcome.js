import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup || !m.messageStubParameters?.[0]) return !0

  const jid = m.messageStubParameters[0]
  const user = `@${jid.split('@')[0]}`
  const pp = await conn.profilePictureUrl(jid, 'image').catch(() => 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745522645448.jpeg')
  const img = await fetch(pp).then(r => r.buffer())
  const chat = global.db.data.chats[m.chat] || {}
  const total = m.messageStubType == 27 ? participants.length + 1 : participants.length - 1

  const contacto = {
    key: { participants: "0@s.whatsapp.net", remoteJid: "status@broadcast", fromMe: false, id: "Halo" },
    message: { contactMessage: { vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;Bot;;;\nFN:Bot\nTEL;waid=${jid.split('@')[0]}:${jid.split('@')[0]}\nEND:VCARD` } },
    participant: "0@s.whatsapp.net"
  }

  if (!chat.welcome) return

  if (m.messageStubType == 27) {
    const bienvenida = `
🟣 ASTA-BOT v2077 — Bienvenido

👤 Usuario: ${user}
📍 Grupo: ${groupMetadata.subject}
🔗 Estado: Conectado
👥 Miembros: ${total}

⌬ Usa *#help* para ver los comandos disponibles
`
    await conn.sendMini(m.chat, '🚀 CONEXIÓN ESTABLECIDA', 'ASTA-BOT', bienvenida, img, img, null, contacto)
  }

  if ([28, 32].includes(m.messageStubType)) {
    const despedida = `
🔻 ASTA-BOT v2077 — Nunca vuelvas

👤 Usuario: ${user}
📍 Grupo: ${groupMetadata.subject}
🔌 Estado: Desconectado
👥 Miembros: ${total}

⌬ Datos eliminados correctamente
`
    await conn.sendMini(m.chat, '⚠️ DESCONECTADO DEL SISTEMA', 'ASTA-BOT', despedida, img, img, null, contacto)
  }
}
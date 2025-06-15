import { WAMessageStubType } from '@whiskeysockets/baileys'

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return

  const fkontak = {
    key: {
      participants: '0@s.whatsapp.net',
      remoteJid: 'status@broadcast',
      fromMe: false,
      id: 'Halo'
    },
    message: {
      contactMessage: {
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
      }
    },
    participant: '0@s.whatsapp.net'
  }

  let chat = global.db.data.chats[m.chat]
  if (!chat || !chat.detect) return

  let usuario = `@${m.sender.split('@')[0]}`
  let pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || 'https://qu.ax/QGAVS.jpg'

  let nombre = `*${usuario}*\n✨️ Ha cambiado el nombre del grupo\n\n🌻 Ahora el grupo se llama:\n*${m.messageStubParameters?.[0] || ''}*`
  let foto = `*${usuario}*\n🚩 Ha cambiado la imagen del grupo`
  let edit = `*${usuario}*\n🌺 Ha permitido que ${m.messageStubParameters?.[0] === 'on' ? 'solo admins' : 'todos'} puedan configurar el grupo`
  let newlink = `🌸 El enlace del grupo ha sido restablecido por:\n*» ${usuario}*`
  let status = `El grupo ha sido ${m.messageStubParameters?.[0] === 'on' ? '*cerrado 🔒*' : '*abierto 🔓*'} por *${usuario}*\n\n💬 Ahora ${m.messageStubParameters?.[0] === 'on' ? '*solo admins*' : '*todos*'} pueden enviar mensajes`
  let admingp = `*@${m.messageStubParameters?.[0]?.split('@')[0]}* Ahora es admin del grupo 🥳\n\n💫 Acción hecha por:\n*» ${usuario}*`
  let noadmingp = `*@${m.messageStubParameters?.[0]?.split('@')[0]}* Deja de ser admin del grupo 😿\n\n💫 Acción hecha por:\n*» ${usuario}*`

  switch (m.messageStubType) {
    case WAMessageStubType.GROUP_CHANGE_SUBJECT: // 21
      await conn.sendMessage(m.chat, { text: nombre, mentions: [m.sender] }, { quoted: fkontak })
      break
    case WAMessageStubType.GROUP_CHANGE_ICON: // 22
      await conn.sendMessage(m.chat, { image: { url: pp }, caption: foto, mentions: [m.sender] }, { quoted: fkontak })
      break
    case WAMessageStubType.GROUP_CHANGE_INVITE_LINK: // 23
      await conn.sendMessage(m.chat, { text: newlink, mentions: [m.sender] }, { quoted: fkontak })
      break
    case WAMessageStubType.GROUP_CHANGE_SETTINGS: // 25
      await conn.sendMessage(m.chat, { text: edit, mentions: [m.sender] }, { quoted: fkontak })
      break
    case WAMessageStubType.GROUP_CHANGE_ANNOUNCE: // 26
      await conn.sendMessage(m.chat, { text: status, mentions: [m.sender] }, { quoted: fkontak })
      break
    case WAMessageStubType.PARTICIPANT_PROMOTE: // 29
      await conn.sendMessage(m.chat, {
        text: admingp,
        mentions: [m.sender, m.messageStubParameters?.[0]]
      }, { quoted: fkontak })
      break
    case WAMessageStubType.PARTICIPANT_DEMOTE: // 30
      await conn.sendMessage(m.chat, {
        text: noadmingp,
        mentions: [m.sender, m.messageStubParameters?.[0]]
      }, { quoted: fkontak })
      break
    default:
      // console.log({ messageStubType: m.messageStubType, messageStubParameters: m.messageStubParameters })
      break
  }
}
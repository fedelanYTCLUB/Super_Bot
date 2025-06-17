import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, text, args, command }) => {
   await m.react('👤');

    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    let name = await conn.getName(who);
    let edtr = `@${m.sender.split`@`[0]}`;
    let username = conn.getName(m.sender);

    // VCARD
    let list = [{
        displayName: "fede",
        vcard: `BEGIN:VCARD\nVERSION:3.0\nFN: fedelanyt\nitem1.TEL;waid=5491156178758:5491156178758\nitem1.X-ABLabel:Número\nitem2.EMAIL;type=INTERNET: fedelanyt20@gmail.com\nitem2.X-ABLabel:Email\nitem3.URL:nada\nitem3.X-ABLabel:Internet\nitem4.ADR:;; Argentina;;;;\nitem4.X-ABLabel:Region\nEND:VCARD`,
    }];

    await conn.sendMessage(m.chat, {
        contacts: {
            displayName: `${list.length} Contacto`,
            contacts: list
        },
        contextInfo: {
            externalAdReply: {
                showAdAttribution: true,
                title: 'hola ',
                body: dev,
                thumbnailUrl: 'https://files.catbox.moe/2a5tod.jpg',
                sourceUrl: 'https://github.com/',
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    }, {
        quoted: m
    });

    let txt = `👋 *Hola \`${username}\` este es*\n*el contacto de mi creador*`;

    await conn.sendMessage(m.chat, { text: txt });
};

handler.help = ['owner', 'creator'];
handler.tags = ['main'];
handler.command = /^(owner|creator|creador|dueño)$/i;

export default handler;

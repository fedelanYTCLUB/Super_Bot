import ws from 'ws'

let handler = async (m, { conn, usedPrefix }) => {
  let _muptime;
  let totalreg = Object.keys(global.db.data.users).length;
  let totalchats = Object.keys(global.db.data.chats).length;
  let vs = global.vs || '1.0.0';
  let pp = "https://files.catbox.moe/8lfoj3.jpg";

  // Tiempo de actividad
  if (process.send) {
    process.send('uptime');
    _muptime = await new Promise(resolve => {
      process.once('message', resolve);
      setTimeout(resolve, 1000);
    }) * 1000;
  }

  let muptime = clockString(_muptime || 0);

  // SubBots activos
  let users = [...new Set([...global.conns.filter((conn) => conn.user && conn.ws?.socket?.readyState !== ws.CLOSED)])];
  const chats = Object.entries(conn.chats).filter(([id, data]) => id && data.isChats);
  const groupsIn = chats.filter(([id]) => id.endsWith('@g.us'));
  const totalUsers = users.length;

  // Velocidad
  let old = performance.now();
  let neww = performance.now();
  let speed = neww - old;

  // Mensaje principal
  let blackclover= `
╭━━━━◇◇◇━━━━⬣
┃ ⚙️  *SISTEMA DE ESTADO*
┃ 🔰 *BLACK CLOVER BOT* ⚔️
╰━━━━◇◇◇━━━━⬣

👑 *Creador:* the-carlos
📟 *Prefijo:* [ ${usedPrefix} ]
📦 *Versión:* ${vs}

📊 *Usuarios registrados:* ${totalreg}
💬 *Total de chats:* ${chats.length}
📢 *Grupos:* ${groupsIn.length}
📩 *Privados:* ${chats.length - groupsIn.length}
🧪 *SubBots activos:* ${totalUsers || '0'}

🕰️ *Actividad:* ${muptime}
🚀 *Velocidad:* ${(speed * 1000).toFixed(0) / 1000}s
`.trim();

  await conn.sendFile(m.chat, pp, 'estado.jpg', blackclover, fkontak, null, rcanal);
};

handler.help = ['status'];
handler.tags = ['info'];
handler.command = ['estado', 'status', 'estate', 'state', 'stado', 'stats'];
handler.register = true;

export default handler;

// Función para convertir milisegundos a hh:mm:ss
function clockString(ms) {
  let h = Math.floor(ms / 3600000);
  let m = Math.floor(ms / 60000) % 60;
  let s = Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}
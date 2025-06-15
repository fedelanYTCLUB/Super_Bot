//código creado x The Carlos 👑
//no olvides dejar créditos 
let handler = async (m, { text, usedPrefix, command }) => {
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
  const regex = /^([a-zA-ZÀ-ÿñÑ\s]+)\.(\d{1,2})$/i
  const user = global.db.data.users[m.sender]

  if (user.registered === true) {
    return m.reply(`⚠️ Ya estás registrado, guerrero del Reino.
Usa *${usedPrefix}perfil* para ver tu grimorio.`)
  }

  if (!regex.test(text)) {
    return m.reply(`⚠️ Formato incorrecto. Usa: *${usedPrefix + command} Nombre.Edad*\n\nEjemplo:\n*${usedPrefix + command} Asta.18*`)
  }

  let [_, name, age] = text.match(regex)
  age = parseInt(age)

  if (age < 5 || age > 100) {
    return m.reply(`⚠️ Edad no válida. Debe estar entre 5 y 100 años.`)
  }

  // Datos aleatorios
  const generos = ['Masculino', 'Femenino']
  const paises = ['Clover', 'Diamond', 'Spade', 'Heart']
  const afinidades = ['🔥 Fuego', '💧 Agua', '🌪️ Viento', '🌱 Tierra', '⚡ Rayo', '🌑 Oscuridad', '🌞 Luz']
  const gender = generos[Math.floor(Math.random() * generos.length)]
  const country = paises[Math.floor(Math.random() * paises.length)]
  const afinidad = afinidades[Math.floor(Math.random() * afinidades.length)]
  const nivelMagico = Math.floor(Math.random() * 10) + 1
  const grimorioColor = gender === 'Masculino' ? '📕 Grimorio Carmesí' : '📘 Grimorio Índigo'

  // Guardar datos
  user.name = name.trim()
  user.age = age
  user.gender = gender
  user.country = country
  user.registered = true
  user.regTime = +new Date()
  user.afinidad = afinidad
  user.nivelMagico = nivelMagico

  // ⚔️ ANIMACIÓN CORTA ESTILO BLACK CLOVER ⚔️
  await m.reply(`🔮 *¡El maná responde a tu llamado, ${name.toUpperCase()}!*`)
  await delay(1000)

  await m.reply(`📕 *Un grimorio desciende desde lo alto del castillo mágico...*`)
  await delay(1000)

  await m.reply(`🔥 *¡Tu alma ha sido aceptada por las páginas del destino!*`)
  await delay(1000)

  await m.reply(`☠️ *𝑮𝒓𝒊𝒎𝒐𝒓𝒊𝒐 𝒐𝒃𝒕𝒆𝒏𝒊𝒅𝒐:* ${grimorioColor}
🌌 *Afinidad:* ${afinidad}
💠 *Nivel Mágico:* ${nivelMagico}
🏰 *Reino:* ${country}`)
  await delay(1000)

  await m.reply(`📖 *¡Tu grimorio está ligado a ti por el resto de tus días, guerrero del Reino!*`)
  await m.react('⚔️')
}

handler.command ='reg', /^reg(ister|istrar)?$/i
export default handler
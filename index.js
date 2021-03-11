//SC BY MHANKBARBAR
//RECODE BY HADS
//CANTUMIN NAMA OWNER AJG
//NUMPANG NAMA DOANG LU AJG
const {
    WAConnection,
    MessageType,
    Presence,
    Mimetype,
    GroupSettingChange
} = require('@adiwajshing/baileys')
const { color, bgcolor } = require('./lib/color')
const { wait, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./lib/functions')
const { fetchJson, fetchText } = require('./lib/fetcher')
const { recognize } = require('./lib/ocr')
const fs = require('fs')
const crypto = require('crypto')
const util = require('util')
const { exec, spawn, execSync } = require("child_process")
const fetch = require('node-fetch')
const tiktod = require('tiktok-scraper')
const ffmpeg = require('fluent-ffmpeg')
const moment = require('moment-timezone')
const speed = require('performance-now')
const google = require('google-it')
const brainly = require('brainly-scraper')
const { removeBackgroundFromImageFile } = require('remove.bg')
prefix = setting.prefix
blocked = []


const vcard = 'BEGIN:VCARD\n'
            + 'VERSION:3.0\n'
            + 'FN:Hads\n'
            + 'ORG:OwnerBot;\n'
            + 'TEL;type=CELL;type=VOICE;waid=6285716360512:+62 857-1636-0512\n'
            + 'END:VCARD'

function kyun(seconds){
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);

  //return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds)
  return `${pad(hours)}J ${pad(minutes)}M ${pad(seconds)}D`
}

async function starts() {
	const hads = new WAConnection()
	hads.logger.level = 'warn'
	console.log(banner.string)
	hads.on('qr', () => {
		console.log(color('[','white'), color('!','red'), color(']','white'), color(' Scan the qr code above'))
	})

	fs.existsSync('./self-bot.json') && hads.loadAuthInfo('./self-bot.json')
	hads.on('connecting', () => {
		start('2', 'Connecting...')
	})
	hads.on('open', () => {
		success('2', 'Connected')
	})
	await hads.connect({timeoutMs: 30*1000})
        fs.writeFileSync('./self-bot.json', JSON.stringify(hads.base64EncodedAuthInfo(), null, '\t'))

	hads.on('CB:Blocklist', json => {
            if (blocked.length > 2) return
	    for (let i of json[1].blocklist) {
	    	blocked.push(i.replace('c.us','s.whatsapp.net'))
	    }
	})

	hads.on('chat-update', async (hds) => {
		try {
            if (!hds.hasNewMessage) return
            hds = hds.messages.all()[0]
			if (!hds.message) return
			if (hds.key && hds.key.remoteJid == 'status@broadcast') return
			if (hds.key.fromMe) return
			global.prefix
			global.blocked
			const content = JSON.stringify(hds.message)
			const from = hds.key.remoteJid
			const type = Object.keys(hds.message)[0]
			const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
			const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
			const date = new Date().toLocaleDateString()
			const jam = moment.tz('Asia/Jakarta').format('HH:mm')
			body = (type === 'conversation' && hds.message.conversation.startsWith(prefix)) ? hds.message.conversation : (type == 'imageMessage') && hds.message.imageMessage.caption.startsWith(prefix) ? hds.message.imageMessage.caption : (type == 'videoMessage') && hds.message.videoMessage.caption.startsWith(prefix) ? hds.message.videoMessage.caption : (type == 'extendedTextMessage') && hds.message.extendedTextMessage.text.startsWith(prefix) ? hds.message.extendedTextMessage.text : ''
			budy = (type === 'conversation') ? hds.message.conversation : (type === 'extendedTextMessage') ? hds.message.extendedTextMessage.text : ''
			const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
			const args = body.trim().split(/ +/).slice(1)
			const isCmd = body.startsWith(prefix)

			const botNumber = hads.user.jid
			const ownerNumber = [`${setting.ownerNumber}@s.whatsapp.net`] // replace this with your number
			const isGroup = from.endsWith('@g.us')
			const totalchat = await hads.chats.all()
			const sender = isGroup ? hds.participant : hds.key.remoteJid
			const insom = from.endsWith('@g.us')
			const nameReq = insom ? hds.participant : hds.key.remoteJid
			pushname2 = hads.contacts[nameReq] != undefined ? hads.contacts[nameReq].vname || hads.contacts[nameReq].notify : undefined
			const groupMetadata = isGroup ? await hads.groupMetadata(from) : ''
			const groupName = isGroup ? groupMetadata.subject : ''
			const groupId = isGroup ? groupMetadata.jid : ''
			const groupMembers = isGroup ? groupMetadata.participants : ''
			const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
			const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
			const isGroupAdmins = groupAdmins.includes(sender) || false
			const isOwner = ownerNumber.includes(sender)
			const isUrl = (url) => {
			    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
			}
			const reply = (teks) => {
				hads.sendMessage(from, teks, text, {quoted:hds})
			}
			const apikey = setting.apiKey // get on https://leyscoders-api.herokuapp.com
			const sendMess = (hehe, teks) => {
				hads.sendMessage(hehe, teks, text)
			}
			const freply = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "𝗘𝗗𝗨𝗖𝗔𝗧𝗜𝗢𝗡 𝗕𝗢𝗧\n𝗠𝗔𝗗𝗘 𝗪𝗜𝗧𝗛 ❤", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/hds.jpeg')} } }
			const freply2 = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "𝗠𝗔𝗗𝗘 𝗪𝗜𝗧𝗛 ❤️", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/hds.jpeg')} } }

			const mentions = (teks, memberr, id) => {
				(id == null || id == undefined || id == false) ? hads.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : hads.sendMessage(from, teks.trim(), extendedText, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "𝗦𝗘𝗟𝗙-𝗘𝗗𝗨𝗖𝗔𝗧𝗜𝗢𝗡 𝗕𝗢𝗧", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/hds.jpeg')} } }, contextInfo: {"mentionedJid": memberr}})
			}

			colors = ['red','white','black','blue','yellow','green']
			const isMedia = (type === 'imageMessage' || type === 'videoMessage')
			const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
			const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
			const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
			const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
			if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			let authorname = hads.contacts[from] != undefined ? hads.contacts[from].vname || hads.contacts[from].notify : undefined	
			if (authorname != undefined) { } else { authorname = groupName }	
 	    
            function addMetadata(packname, author) {	// by Mhankbarbar
				if (!packname) packname = 'made by admin'; if (!author) author = 'made by admin';	
				author = author.replace(/[^a-zA-Z0-9]/g, '');	
				let name = `${author}_${packname}`
				if (fs.existsSync(`./stickers/${name}.exif`)) return `./stickers/${name}.exif`
				const json = {	
					"sticker-pack-name": packname,
					"sticker-pack-publisher": author,
				}
				const littleEndian = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00])	
				const bytes = [0x00, 0x00, 0x16, 0x00, 0x00, 0x00]	

				let len = JSON.stringify(json).length	
				let last	

				if (len > 256) {	
					len = len - 256	
					bytes.unshift(0x01)	
				} else {	
					bytes.unshift(0x00)	
				}	

				if (len < 16) {	
					last = len.toString(16)	
					last = "0" + len	
				} else {	
					last = len.toString(16)	
				}	

				const buf2 = Buffer.from(last, "hex")	
				const buf3 = Buffer.from(bytes)	
				const buf4 = Buffer.from(JSON.stringify(json))	

				const buffer = Buffer.concat([littleEndian, buf2, buf3, buf4])	

				fs.writeFile(`./stickers/${name}.exif`, buffer, (err) => {	
					return `./stickers/${name}.exif`	
				})	

			}
			if (budy.match('hlo')){
   var Hmm = fs.readFileSync('./lib/v:.mp3');
hads.sendMessage(from, Hmm, audio, { mimetype: 'audio/mp4', quoted : hds, ptt: true })
}
			switch(command) {
			case 'help':
				case 'menu':
myMonths = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
			myDays = ['Minggu','Senin','Selasa','Rabu','Kamis','Jum at','Sabtu'];
			var tgl = new Date();
			var day = tgl.getDate()
			bulan = tgl.getMonth()
			var thisDay = tgl.getDay(),
			thisDay = myDays[thisDay];
			var yy = tgl.getYear()
			var year = (yy < 1000) ? yy + 1900 : yy;
			const tanggal = `${thisDay},${day}/${myMonths[bulan]}/${year}`
const timstamp = speed();
const laatensi = speed() - timstamp
runtime = process.uptime()
	hads.sendMessage(from, `
\`\`\`Halo ${pushname2}👋\`\`\`
\`\`\`Silahkan Gunakan Botnya\`\`\`
\`\`\`Dengan Baik Ya..\`\`\`

┏━《 𝗘𝗗𝗨𝗖𝗔𝗧𝗜𝗢𝗡 𝗕𝗢𝗧︎ 》
┃
┣◪ 𝗜𝗡𝗙𝗢
┃ ❏ *Time :* \`\`\`${jam}\`\`\` *WIB*
┃ ❏ *Date :* \`\`\`${tanggal}\`\`\`
┃ ❏ *Runtime:* \`\`\`${kyun(runtime)}\`\`\`
┃ ❏ *Speed:* ${laatensi.toFixed(4)} _Second_
┃ ❏ *Prefix: 「 ${prefix} 」*
┃ ❏ *OWNER : 𝗛𝗔𝗗𝗦︎*
┃ ❏ *All Chat Bot:* \`\`\`${totalchat.length} Chat\`\`\`
┃ ❏ *NO:* ẉa.me/14132399925
┃
┣◪ *𝗜𝗦𝗟𝗔𝗠𝗜𝗖 𝗠𝗘𝗡𝗨*
┃
┣ ❏ ${prefix}doatahlil
┣ ❏ ${prefix}quran
┣ ❏ ${prefix}doaharian
┣ ❏ ${prefix}bacaansholat
┣ ❏ ${prefix}ayatkursi
┣ ❏ ${prefix}niatsholat
┣ ❏ ${prefix}asmaulhusna
┣ ❏ ${prefix}quotemuslim
┣ ❏ ${prefix}listsurah
┃
┣◪ *𝗜𝗡𝗙𝗢 & 𝗢𝗧𝗛𝗘𝗥𝗦 𝗠𝗘𝗡𝗨*
┃
┣ ❏ ${prefix}covidindo
┣ ❏ ${prefix}covidglobal
┣ ❏ ${prefix}nulis _teksnya_
┣ ❏ ${prefix}nulis _nama/kelas/teks_
┣ ❏ ${prefix}brainly _pertanyaan_
┣ ❏ ${prefix}kbbi _pertanyaan_
┣ ❏ ${prefix}infogempa
┣ ❏ ${prefix}jadwaltv _channel_
┣ ❏ ${prefix}wiki _query_
┣ ❏ ${prefix}kodepos _nama kota_
┣ ❏ ${prefix}kodebahasa
┃
┣◪ *𝗙𝗜𝗡𝗗 𝗠𝗘 𝗢𝗡 :*
┣ ❏ IG:https://tinyurl.com/y6wnrzes
┣ ❏ Fb:https://tinyurl.com/y93uuacm 
┣ ❏ Git:https://tinyurl.com/y7vfzd6q
┃
┣ ❏ *Support Me In A Way :*
┣ ❏ ${prefix}donasi
┃
┣ ❏ *Get Info By Type :*
┣ ❏ ${prefix}infobot
┃
┣◪ *SPECIALS THANKS TO :*
┣ ❏ \`\`\`Allah SWT\`\`\`
┣ ❏ \`\`\`Orang Tua\`\`\`
┣ ❏ \`\`\`Itsmeiky\`\`\`
┣ ❏ \`\`\`Penyedia Rest Api\`\`\`
┃
┗━《 𝗘𝗗𝗨𝗖𝗔𝗧𝗜𝗢𝗡 𝗕𝗢𝗧 》`, MessageType.text, {quoted: freply2})
			break
case 'owner':
				hads.sendMessage(from, {displayname: "jeff", vcard: vcard}, MessageType.contact, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "𝗖𝗢𝗡𝗧𝗔𝗖𝗧𝗦 𝗛𝗔𝗗𝗦", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/hds.jpeg')} } }, caption: 'Nih Ownerku...'})
				break
case 'infobot':
hads.sendMessage(from, `
*Bot dibuat dengan bahasa pemrograman JavaScript*
*Bot Gratis Dan Bebas Digunakan Oleh Kalian*
*Bot Masih Dalam Tahap Pengerjaan*

*Bot Ini Dikerjakan Oleh Hads*
*Jika Anda Berminat Untuk Berkontribusi Dalam Pengerjaan Bot*
*Silahkan Hubungi Hads Dengan Cara Ketik ${prefix}owner*`, MessageType.text, {quoted: freply})
break
case 'kodebahasa':
reply(`[❕] Loading`)
hads.sendMessage(from, `
List Kode Bahasa :

  af: Afrikaans
  sq: Albanian
  ar: Arabic
  hy: Armenian
  ca: Catalan
  zh: Chinese
  zh-cn: Chinese (Mandarin/China)
  zh-tw: Chinese (Mandarin/Taiwan)
  zh-yue: Chinese (Cantonese)
  hr: Croatian
  cs: Czech
  da: Danish
  nl: Dutch
  en: English
  en-au: English (Australia)
  en-uk: English (United Kingdom)
  en-us: English (United States)
  eo: Esperanto
  fi: Finnish
  fr: French
  de: German
  el: Greek
  ht: Haitian Creole
  hi: Hindi
  hu: Hungarian
  is: Icelandic
  id: Indonesian
  it: Italian
  ja: Japanese
  ko: Korean
  la: Latin
  lv: Latvian
  mk: Macedonian
  no: Norwegian
  pl: Polish
  pt: Portuguese
  pt-br: Portuguese (Brazil)
  ro: Romanian
  ru: Russian
  sr: Serbian
  sk: Slovak
  es: Spanish
  es-es: Spanish (Spain)
  es-us: Spanish (United States)
  sw: Swahili
  sv: Swedish
  ta: Tamil
  th: Thai
  tr: Turkish
  vi: Vietnamese
  cy: Welsh`, MessageType.text, {quoted: freply})
  break
case 'listsurah':
reply(`[❕] Loading`)
hads.sendMessage(from, `
1. Al-Fatihah الفاتحة
2. Al-Baqarah البقرة
3. Ali ‘Imran آل عمران
4. An-Nisa’ النّساء
5. Al-Ma’idah المآئدة
6. Al-An’am الانعام
7. Al-A’raf الأعراف
8. Al-Anfal الأنفال
9. At-Taubah التوبة
10. Yunus ينوس
11. Hud هود
12. Yusuf يسوف
13. Ar-Ra’d الرّعد
14. Ibrahim إبراهيم
15. Al-Hijr الحجر
16. An-Nahl النّحل
17. Al-Isra’ بني إسرائيل
18. Al-Kahf الكهف
19. Maryam مريم
20. Ta Ha طه
21. Al-Anbiya الأنبياء
22. Al-Hajj الحجّ
23. Al-Mu’minun المؤمنون
24. An-Nur النّور
25. Al-Furqan الفرقان
26. Asy-Syu’ara’ الشّعراء
27. An-Naml النّمل
28. Al-Qasas القصص
29. Al-‘Ankabut العنكبوت
30. Ar-Rum الرّوم
31. Luqman لقمان
32. As-Sajdah السّجدة
33. Al-Ahzab الْأحزاب
34. Saba’ سبا
35. Fatir فاطر
36. Ya Sin يس
37. As-Saffat الصّافات
38. Sad ص
39. Az-Zumar الزّمر
40. Al-Mu’min المؤمن
41. Fussilat فصّلت
42. Asy-Syura الشّورى
43. Az-Zukhruf الزّخرف
44. Ad-Dukhan الدّخان
45. Al-Jasiyah الجاثية
46. Al-Ahqaf الَأحقاف
47. Muhammad محمّد
48. Al-Fath الفتح
49. Al-Hujurat الحجرات
50. Qaf ق
51. Az-Zariyat الذّاريات
52. At-Tur الطّور
53. An-Najm النّجْم
54. Al-Qamar القمر
55. Ar-Rahman الرّحْمن
56. Al-Waqi’ah الواقعه
57. Al-Hadid الحديد
58. Al-Mujadilah المجادلة
59. Al-Hasyr الحشْر
60. Al-Mumtahanah الممتحنة
61. As-Saff الصّفّ
62. Al-Jumu’ah الجمعة
63. Al-Munafiqun المنافقون
64. At-Tagabun التّغابن
65. At-Talaq الطّلاق
66. At-Tahrim التّحريم
67. Al-Mulk الملك
68. Al-Qalam القلم
69. Al-Haqqah الحآقّة
70. Al-Ma’arij المعارج
71. Nuh نوح
72. Al-Jinn الجنّ
73. Al-Muzzammil المزمّل
74. Al-Muddassir المدشّر
75. Al-Qiyamah القيمة
76. Al-Insan الْاٍنسان
77. Al-Mursalat المرسلات
78. An-Naba’ النّبا
79. An-Nazi’at النّازعات
80. ‘Abasa عبس
81. At-Takwir التّكوير
82. Al-Infitar الانفطار
83. Al-Tatfif المطفّفين
84. Al-Insyiqaq الانشقاق
85. Al-Buruj البروج
86. At-Tariq الطّارق
87. Al-A’la الْأعلى
88. Al-Gasyiyah الغاشية
89. Al-Fajr الفجر
90. Al-Balad البلد
91. Asy-Syams الشّمس
92. Al-Lail الّيل
93. Ad-Duha الضحى
94. Al-Insyirah الانشراح
95. At-Tin التِّينِ
96. Al-‘Alaq العَلَق
97. Al-Qadr الْقَدْرِ
98. Al-Bayyinah الْبَيِّنَةُ
99. Az-Zalzalah الزلزلة
100. Al-‘Adiyat العاديات
101. Al-Qari’ah القارعة
102. At-Takasur التكاثر
103. Al-‘Asr العصر
104. Al-Humazah الهُمَزة
105. Al-Fil الْفِيلِ
106. Quraisy قُرَيْشٍ
107. Al-Ma’un الْمَاعُونَ
108. Al-Kausar الكوثر
109. Al-Kafirun الْكَافِرُونَ
110. An-Nasr النصر
111. Al-Lahab المسد
112. Al-Ikhlas الإخلاص
113. Al-Falaq الْفَلَقِ
114. An-Nas نَاس`, MessageType.text, {quoted: freply})
break
/*case 'quransurah':
			reply(`[❕] Loading`)
			surah = `${body.slice(12)}`
			anu = await fetchJson(`https://api.zeks.xyz/api/quran?no=${surah}&apikey=apivinz`)
			quran = `Surah Al-Qur\`an Nomer: *${surah}*\nSurah: *${anu.surah}*\nDiturunkan Dikota: *${anu.type}*\nJumlah Ayat: *${anu.jumlah_ayat}*\n\n*${anu.ket}\n=============================\n`
			for (let surah of anu.quran) {
			quran += `${surah.number}\n${surah.text}\n${surah.translation_id}\n=====================\n`
			}
			reply(quran.trim())
			break*/
case 'quran':
				if (args.length < 1) return reply(`surah + ayat berapa mana om? note: surah harus berupa nomor, contoh: quran 1|2`)
				ct = body.slice(7)
				ll1 = ct.split("|")[0];
                ll2 = ct.split("|")[1];
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://docs-api-zahirr.herokuapp.com/api/quran?surah=${ll1}&ayat=${ll2}&apikey=zahirgans`)
				teks = `➸ *Juz Ke* : ${anu.result.data.meta.juz}\n*➸ Text Arab :* ${anu.result.data.text.arab}\n*➸ Latin ID :* ${anu.result.data.text.transliteration.en}\n*➸ Arti ID :* ${anu.result.data.translation.id}\n*➸ Tafsir Pendek :* ${anu.result.data.tafsir.id.short}\n*➸ Tafsir Panjang :* ${anu.result.data.tafsir.id.long}\n*➸ Ayat Ke :* ${anu.result.data.surah.number}\n*➸ Nama Surah Arab Pendek :* ${anu.result.data.surah.name.short}\n*➸ Nama Surah Arab Panjang :* ${anu.result.data.surah.name.long}\n*➸ Nama Surah ID :* ${anu.result.data.surah.name.transliteration.id}\n*➸ Arti Nama Surah ID :* ${anu.result.data.surah.name.translation.id}\n*➸ Revelation Arab :* ${anu.result.data.surah.revelation.arab}\n*➸ Revelation ID :* ${anu.result.data.surah.revelation.id}\n*➸ Tafsir ID :* ${anu.result.data.surah.tafsir.id}`
				hads.sendMessage(from, teks, text, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "𝗘𝗗𝗨𝗖𝗔𝗧𝗜𝗢𝗡 𝗕𝗢𝗧\n𝗠𝗔𝗗𝗘 𝗪𝗜𝗧𝗛 ❤", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/hds.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
case 'quotes':
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://docs-api-zahirr.herokuapp.com/api/quotes/kanye?apikey=zahirgans`)
				hasil = `➸ *Author* : ${anu.result.author}\n*➸ Text EN :* ${anu.result.text_en}\n*➸ Text ID :* ${anu.result.text_id}`
				hads.sendMessage(from, hasil, text, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "𝗘𝗗𝗨𝗖𝗔𝗧𝗜𝗢𝗡 𝗕𝗢𝗧\n𝗠𝗔𝗗𝗘 𝗪𝗜𝗧𝗛 ❤", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/hds.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
case 'quotemuslim':
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://docs-api-zahirr.herokuapp.com/api/randomquote/muslim?apikey=zahirgans`)
				hasil = `*➸ Quote :* ${anu.result.text_id}`
				hads.sendMessage(from, hasil, text, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "𝗘𝗗𝗨𝗖𝗔𝗧𝗜𝗢𝗡 𝗕𝗢𝗧\n𝗠𝗔𝗗𝗘 𝗪𝗜𝗧𝗛 ❤", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/hds.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
case 'nulis':
				if (args.length < 1) return reply(`textnya mana om?`)
				ct = body.slice(6)
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://docs-api-zahirr.herokuapp.com/api/nulis?text=${ct}&apikey=zahirgans`)
				buffer = await getBuffer(anu.result.url)
				hads.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "𝗘𝗗𝗨𝗖𝗔𝗧𝗜𝗢𝗡 𝗕𝗢𝗧\n𝗠𝗔𝗗𝗘 𝗪𝗜𝗧𝗛 ❤", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/hds.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
/*case 'translate':
				if (args.length < 1) return reply(`apa yang mau di translate in dari b.indo ke b.inggris?`)
				reply(`[❕] Loading`)
				ct = body.slice(10)
				anu = await fetchJson(`https://docs-api-zahirr.herokuapp.com/api/translate?kata=${ct}&apikey=zahirgans`)
				hasil = `➸ *Bahasa IND* : ${anu.hasil}\n*➸ Bahasa ENG :* ${anu.hasil.result}`
				hads.sendMessage(from, hasil, text, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "𝗘𝗗𝗨𝗖𝗔𝗧𝗜𝗢𝗡 𝗕𝗢𝗧\n𝗠𝗔𝗗𝗘 𝗪𝗜𝗧𝗛 ❤", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/hds.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
case '8translate':
				    if (args.length < 1) return hads.sendMessage(from, 'Kode Bahasanya???', text, {quoted: freply})
				    if (args.length < 2) return hads.sendMessage(from, 'Text Yg Mau Di translate??', text, {quoted: freply})
				    ts = body.slice(11)
				    kode = ts.split("/")[0]
				    teks = ts.split("/")[1]
				    anu = await fetchJson(`https://api.arugaz.my.id/api/edu/translate?lang=${kode}&text=${teks}`)
				    reply(`[❕] Loading`)
				    translate = `Text Asli: *${body.slice(11)}*\n\nHasil: *${anu.text}*`
				    hads.sendMessage(from, translate, text, {quoted: freply})
				    break*/
case 'asmaulhusna':	
				hads.updatePresence(from, Presence.composing) 
				reply(`[❕] Loading`)
				asu = await fetchJson(`https://docs-api-zahirr.herokuapp.com/api/muslim/asmaulhusna?apikey=zahirgans`, {method: 'get'})
				teks = '=================\n'
				for (let i of asu.result.data) {
					teks += `*Nomor:* : ${i.index}\n*Latin* : ${i.latin}\n*Arab* : ${i.arabic}\n*Translate Indo* : ${i.translation_id}\n*Translate English* : ${i.translation_en}\n=================\n`
				}
				reply(teks)
				break
case 'kodepos':
				hads.updatePresence(from, Presence.composing) 
				if (args.length < 1) return reply(`kotanya mana bang?`)
				reply(`[❕] Loading`)
				ta = `${body.slice(8)}`
				asu = await fetchJson(`https://docs-api-zahirr.herokuapp.com/api/kodepos?kota=${ta}&apikey=zahirgans`)
				teks = '=================\n'
				for (let i of asu.result.data) {
					teks += `*Provinsi:* : ${i.province}\n*City* : ${i.city}\n*Kecamatan* : ${i.subdistrict}\n*Kota* : ${i.urban}\n*Kode Pos* : ${i.postalcode}\n=================\n`
				}
				reply(teks)
				break
/*case 'kisahnabi':
				reply(`[❕] Loading`)
				n = `${body.slice(11)}`
				anu = await fetchJson(`https://docs-api-zahirr.herokuapp.com/api/kisahnabi?nabi=${n}&apikey=zahirgans`)
				teks = `*HASIL*\n\n*➸ Nama Nabi :* ${anu.results.name}\n*➸ Lahir :* ${anu.result.thn_kelahiran}\n*➸ Umur :* ${anu.result.usia}\n*➸ Tempat :* ${anu.result.tmp}\n*➸ Kisah :* ${anu.result,description}`
				hads.sendMessage(from, teks, text, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "𝗦𝗘𝗟𝗙-𝗘𝗗𝗨𝗖𝗔𝗧𝗜𝗢𝗡 𝗕𝗢𝗧", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/hds.jpeg')} } }, caption: teks})
				break*/
case 'niatsholat':
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://docs-api-zahirr.herokuapp.com/api/muslim/niatshalat?apikey=zahirgans`, {method: 'get'})
				teks = '=================\n'
				for (let i of anu.result) {
				teks += `Sholat : ${i.name}\n*Arab* : ${i.arabic}\n*Latin* : ${i.latin}\n*Terjemah* : ${i.terjemahan}\n=================\n`
				}
				reply(teks.trim())
				break
/*case 'hadits':
				if (args.length < 1) return reply(`kitab + nomor nya mana om? contoh: hadits muslim|116`)
				ct = body.slice(8)
				ll1 = ct.split("|")[0];
                ll2 = ct.split("|")[1];
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://docs-api-zahirr.herokuapp.com/api/hadits?kitab=${ll1}&nomor=${ll2}&apikey=zahirgans`, { method: 'get'})
				teks = `➸ *Name Hadits* : ${anu.result.data.name}\n*➸ Number Hadits :* ${anu.result.data.contents.number}\n*➸ Arab :* ${anu.result.data.contents.arab}\n*➸ Latin :* ${anu.result.data.contents.id}`
				teks = `${anu.result}`
				hads.sendMessage(from, teks, text, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "𝗘𝗗𝗨𝗖𝗔𝗧𝗜𝗢𝗡 𝗕𝗢𝗧\n𝗠𝗔𝗗𝗘 𝗪𝗜𝗧𝗛 ❤", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/hds.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break*/
case 'donasi':
hads.sendMessage(from, `
┏━• *Support Me Friends*
┃ ❏ _Dana :_ 085717360512
┃ ❏ _Pulsa :_ 085716360512
┗━• *Thanks*`, MessageType.text, {quoted: freply})
break
/*case 'google':
                const googleQuery = body.slice(8)
                if(googleQuery == undefined || googleQuery == ' ') return reply(`*Hasil Pencarian : ${googleQuery}* tidak ditemukan`)
                google({ 'query': googleQuery }).then(results => {
                let vars = `_*Hasil Pencarian : ${googleQuery}*_\n`
                for (let i = 0; i < results.length; i++) {
                    vars +=  `\n═════════════════\n\n*Judul* : ${results[i].title}\n\n*Deskripsi* : ${results[i].snippet}\n\n*Link* : ${results[i].link}\n\n`
                }
                    reply(vars)
                }).catch(e => {
                    console.log(e)
                    hads.sendMessage(from, 'Google Error : ' + e);
                })
                break*/
case 'wiki':
                    if (args.length < 1) return reply('teks nya mana om?')
                    reply(`[❕] Loading`)
                   wiki = `${body.slice(6)}`
                    anu = await fetchJson(`https://tobz-api.herokuapp.com/api/wiki?q=${wiki}&apikey=BotWeA`, {method: 'get'})
                    if (anu.error) return reply('error')
                    wikii = `${anu.result}`
                    hads.sendMessage(from, wikii, text, {quoted: freply})
                    break
/*case 'wikipedia':
				if (args.length < 1) return reply('teks nya mana om?')
				reply(`[❕] Loading`)
				wiki = `${body.slice(6)}`
				anu = await fetchJson(`https://docs-api-zahirr.herokuapp.com/api/wikipedia?search=${wiki}&apikey=zahirgans`, {method: 'get'})
				if (anu.error) return reply(anu.error)
				wikii = `${anu.result}`
				hads.sendMessage(from, wikii, text, {quoted: freply})
				break*/
case 'jadwalsholat':
					if (args.length < 1) return reply('Masukan nama daerah!!')
					sholat = `${body.slice(14)}`
					anu = await fetchJson(`http://lolhuman.herokuapp.com/api/sholat/${sholat}?apikey=WEMPYGANSS`, {method: 'get'})
					reply(`[❕] Loading`)
					hasil = `• *Wilayah:* ${anu.result.wilayah}\n• *Tanggal:* ${anu.result.tanggal}\n• *imsak:* ${anu.result.imsak}\n• *subuh:* ${anu.result.subuh}\n• *terbit:* ${anu.result.terbit}\n• *dhuha:* ${anu.result.dhuha}\n• *dzuhur:* ${anu.result.dzuhur}\n• *ashar:* ${anu.result.ashar}\n• *maghrib:* ${anu.result.maghrib}\n• *isya:* ${anu.result.isya}`
					hads.sendMessage(from, hasil, text, {quoted: freply})
					break
case 'jadwaltv':
					hads.updatePresence(from, Presence.composing)
					if (args.length < 1)return reply('Nama Channelnya??')
					reply(`[❕] Loading`)
					jadwaltv = `${body.slice(10)}`
					anu = await fetchJson(`http://nzcha-apii.herokuapp.com/jadwaltv?channel=${jadwaltv}`, {method: 'get'})
					jtv = '===========================\n'
					for (let jdwl of anu.result){
					jtv += `• *Jam:* ${jdwl.jam} => *Tayangan:* ${jdwl.tayang}\n===========================\n`
					}
					reply(jtv.trim())
					break
/*case 'jadwalsholat':
				if (args.length < 1) return reply('kota nya mana kak?')
				f = `${body.slice(14)}`
					anu = await fetchJson(`https://tobz-api.herokuapp.com/api/jadwalshalat?q=${f}&apikey=BotWeA`, {method: 'get'})
					sholat = `Ashar : ${anu.result.Ashar}\nDzuhur : ${anu.result.dzuhur}\nMagrib : ${anu.result.maghrib}\nIsha : ${anu.result.isha}\nSubuh : ${anu.result.subuh}`
					hads.sendMessage(from, sholat, text, {quoted: freply})
					break
/*case 'sholat':
  loc = body.slice(7)
  if (args.length < 1) return reply('Masukan nama daerah')
  anu = await fetchJson(`https://docs-api-zahirr.herokuapp.com/api/jadwalshalat?kota=${loc}&apikey=zahirgans`, {method: 'get'})
  mbteks = `*SHALAT*\nDaerah : ${loc}\n‣ *Ashar* : ${i.ashr}\n‣ *Dhuha* : ${i.dhuha}\n‣ *Dzuhur* : ${i.dzuhur}\n‣ *Imsyak* : ${i.imsyak}\n‣ *Isya* : ${i.isya}\n‣ *Maghrib* : ${i.magrib}\n‣ *Subuh* : ${i.shubuh}`
  hads.sendMessage(from, mbteks, text, {quoted: freply  })
  break
case 'jadwalsholat4':
				if (args.length < 1) return reply(`kotanya mana bang?`)
				reply(`[❕] Loading`)
				s = `${body.slice(8)}`
				anu = await fetchJson(`https://docs-api-zahirr.herokuapp.com/api/jadwalshalat?kota=${s}&apikey=zahirgans`, {method: 'get'})
				teks = `${anu.result}`
				hads.sendMessage(from, teks, text, {quoted: freply})
				break*/
case 'bacaansholat':
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://docs-api-zahirr.herokuapp.com/api/muslim/bacaanshalat?apikey=zahirgans`, {method: 'get'})
				teks = '=================\n'
				for (let i of anu.result) {
				teks += `Bacaan : ${i.name}\n*Arab* : ${i.arabic}\n*Latin* : ${i.latin}\n*Terjemah* : ${i.terjemahan}\n=================\n`
				}
				reply(teks.trim())
				break
case 'infogempa':
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://docs-api-zahirr.herokuapp.com/api/infogempa?apikey=zahirgans`)
				hasil = `➸ *Waktu* : ${anu.result.Waktu}\n*➸ Lintang :* ${anu.result.Lintang}\n*➸ Bujur :* ${anu.result.Bujur}\n*➸ Magnitudo :* ${anu.result.Magnitudo}\n*➸ Kedalaman :* ${anu.result.Kedalaman}\n*➸ Wilayah :* ${anu.result.Wilayah}`
				hads.sendMessage(from, hasil, text, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "𝗘𝗗𝗨𝗖𝗔𝗧𝗜𝗢𝗡 𝗕𝗢𝗧\n𝗠𝗔𝗗𝗘 𝗪𝗜𝗧𝗛 ❤", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/hds.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
case 'doatahlil':
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://docs-api-zahirr.herokuapp.com/api/muslim/tahlil?apikey=zahirgans`, {method: 'get'})
				teks = '=================\n'
				for (let i of anu.result.data) {
				teks += `Title : ${i.title}\n*Arab* : ${i.arabic}\n*Terjemah* : ${i.translation}\n=================\n`
				}
				reply(teks.trim())
				break
case 'ayatkursi':
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://docs-api-zahirr.herokuapp.com/api/muslim/ayatkursi?apikey=zahirgans`)
				teks = `➸ *Arab* : ${anu.result.data.arabic}\n*➸ Latin :* ${anu.result.data.latin}\n*➸ Arti :* ${anu.result.data.translation}\n*➸ Tafsir :* ${anu.result.data.tafsir}`
				hads.sendMessage(from, teks, text, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "𝗘𝗗𝗨𝗖𝗔𝗧𝗜𝗢𝗡 𝗕𝗢𝗧\n𝗠𝗔𝗗𝗘 𝗪𝗜𝗧𝗛 ❤", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/hds.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
case 'doaharian':	
				hads.updatePresence(from, Presence.composing) 
				reply(`[❕] Loading`)
				asu = await fetchJson(`https://docs-api-zahirr.herokuapp.com/api/muslim/doaharian?apikey=zahirgans`, {method: 'get'})
				teks = '=================\n'
				for (let i of asu.result.data) {
					teks += `*Nama Doa:* : ${i.title}\n*Arab* : ${i.arabic}\n*Latin* : ${i.latin}\n*Translation* : ${i.translation}\n=================\n`
				}
				reply(teks)
				break
					case 'covidglobal':
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://docs-api-zahirr.herokuapp.com/api/covidworld?apikey=zahirgans`)
				teks = `➸ *Total Cases* : ${anu.result.totalCases}\n*➸ Recovered :* ${anu.result.recovered}\n*➸ Deaths :* ${anu.result.deaths}\n*➸ Active Cases :* ${anu.result.activeCases}\n*➸ Closed Cases :* ${anu.result.closedCases}\n*➸ Last Update :* ${anu.result.lastUpdate}`
				hads.sendMessage(from, teks, text, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "𝗘𝗗𝗨𝗖𝗔𝗧𝗜𝗢𝗡 𝗕𝗢𝗧\n𝗠𝗔𝗗𝗘 𝗪𝗜𝗧𝗛 ❤", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/hds.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
			case 'covidindo':	
				hads.updatePresence(from, Presence.composing) 
				reply(`[❕] Loading`)
				asu = await fetchJson(`https://docs-api-zahirr.herokuapp.com/api/covidindo?apikey=zahirgans`, {method: 'get'})
				teks = '=================\n'
				for (let i of asu.result) {
					teks += `*Kode Provinsi:* : ${i.attributes.Kode_Provi}\n*Provinsi* : ${i.attributes.Provinsi}\n*Total Positif* : ${i.attributes.Kasus_Posi}\n*Total Sembuh* : ${i.attributes.Kasus_Semb}\n*Total Meninggal* : ${i.attributes.Kasus_Meni}\n=================\n`
				}
				reply(teks)
				break
			case 'kbbi':			
				if (args.length < 1) return reply('Apa yang mau dicari di kbbi kak?')
				k = `${body.slice(6)}`
				anu = await fetchJson(`https://docs-api-zahirr.herokuapp.com/api/kbbi?kata=${k}&apikey=zahirgans`, {method: 'get'})
				reply('Menurut Kbbi:\n\n'+anu.result.arti)
				break
case 'nulis':
			if (args.length < 1) return reply(`Harus Nulis Apa Kak??`)
			reply('[❕] Loading')
					tulis = body.slice(7)
				  nama = tulis.split("/")[0];
					kelas = tulis.split("/")[1];
					isi = tulis.split("/")[2];
					nulis = await getBuffer(`https://api.zeks.xyz/api/magernulis?nama=${nama}&kelas=${kelas}&text=${isi}&tinta=4`, {method: 'get'})
					hads.sendMessage(from, nulis, image, {quoted: freply})
					break
			case 'brainly':
                    brien = body.slice(9)
					brainly(`${brien}`).then(res => {
					teks = '❉───────────────────────❉\n'
					for (let Y of res.data) {
						teks += `\n*「 _BRAINLY_ 」*\n\n*➸ Pertanyaan:* ${Y.pertanyaan}\n\n*➸ Jawaban:* ${Y.jawaban[0].text}\n❉───────────────────────❉\n`
					}
					hads.sendMessage(from, teks, text, {quoted: hds, detectLinks: false})
                        console.log(res)
                    })
                    break
                    case 'speed':
                case 'ping':
                const timestamp = speed();
                const latensi = speed() - timestamp 
                hads.sendMessage(from, `*Your Speed:* ${latensi.toFixed(4)} _Second_`, text, {quoted: freply})
                    break
                    case 'runtime':
				hads.updatePresence(from, Presence.composing) 
				runtime = process.uptime()
				wah = `-{ *𝙍𝙐𝙉𝙏𝙄𝙈𝙀* }-\n\n\`\`\`${kyun(runtime)}\`\`\``
                                hads.sendMessage(from, wah, text, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.com`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "𝙍𝙐𝙉𝙏𝙄𝙈𝙀", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1200, "width": 1100, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/hds.jpeg')} } }})
			        break
			        case 'chatlist':
			case 'cekchat':
				hads.updatePresence(from, Presence.composing)
				var itsme = `0@s.whatsapp.net`
				var split = `𝘾𝙀𝙆 𝘼𝙇𝙇-𝘾𝙃𝘼𝙏`
				var selepbot =         {
					contextInfo:   {
					participant: itsme,
					quotedMessage: {
					extendedTextMessage: {
					text: split,
				}
				}
				}
				}
				teks = `Total : ${totalchat.length}`
				hads.sendMessage(from, teks, MessageType.text, selepbot)
				break

                            }
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})
}
starts()
//SC BY MHANKBARBAR
//FREE WEB API BY ITSMEIKYXSEC404
//RECODE BY ITSMEIKYXSEC404 & RIZKYO
//CUMAN RECODE BANG

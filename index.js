const ytdl = require('ytdl-core')
const ffmpeg = require('fluent-ffmpeg')
const yts = require('yt-search')
const fs = require('fs')
const path = require('path')
const { stdin, stdout } = require('process')
// Vars
const file = 'list.txt.bk'

// Consts
const fCon = fs.readFileSync(path.join(__dirname, file)).toString('utf-8')
const IDs = fCon.split('\n');

(async function() {
	for (let i=0; i<IDs.length-1; i++) {
			console.log(IDs[i], i)
			await dl(i)
	}
})()

function dl(i) {
	return new Promise((resolve, reject) => {
		let stream = ytdl(IDs[i], {filter: "audioonly", quality: "highestaudio"})
		console.log('\n')
		stream.on('progress', (len, dl, tl) => {
			console.log(`(${i+1}/${IDs.length-1}) ${Math.floor((dl/tl)*100)}%`)
		})

		yts({ videoId: IDs[i] }).then(inf => {
			const { title, author } = inf
			ffmpeg(stream)
				.audioBitrate(128)
				.on('error', e => {
					console.error(e)
					reject()
				})
					.save(path.join(__dirname, "media", `${title}.mp3`))
					.on("end", () => {
					console.log(`Item ID: ${IDs[i]} done. (${i})`)
					resolve()
				})
		})
	})
}

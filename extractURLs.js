const yts = require("yt-search")
const fs = require("fs")
const path = require("path")

const listID = "PLziuWfy6w6HJVDkDvAX6qPdHkSfRg2EcB"
const fileName = "list.txt"
const fPath = path.join(__dirname, fileName)

fs.writeFileSync(fPath, '')

yts({listId: listID}).then(res => {
	let { videos } = res

	for (let i=0; i<videos.length; i++) {
		fs.appendFileSync(fPath, `${videos[i].videoId}`)
		if (i != videos.length - 1) fs.appendFileSync(fPath, "\n")
	}
})

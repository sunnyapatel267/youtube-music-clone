import express from 'express'
import cors from 'cors'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import youtube from './youtube.js'
import { addSong, createPlaylist, getCrediential, getPlaylist, getSongs, getUserPlaylist, insertCrediential } from './database.js'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
})

/**
 * works
 * 
 * http://localhost:8080/search?q=drake
 */
app.get('/search', async (req, res) => {
    const searchTerm = req.query.q

    try {
        const response = await youtube.searchVideos(searchTerm)
        const items = []

        response.items.forEach(item => {
            const videoId = item.id.videoId
            const title = item.snippet.title
            const thumbnailUrl = item.snippet.thumbnails.high.url
            const channelTitle = item.snippet.channelTitle

            const itemObject = {
                videoId: videoId,
                title: title,
                channelTitle: channelTitle,
                thumbnailUrl: thumbnailUrl
            }

            items.push(itemObject)
        })

        res.json(items)
    } catch(error) {
        console.error('Error searching videos:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

/**
 * works correctly
 */
app.post('/login', async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const user = await getCrediential(username)

    if(user.length == 0){
        res.status(401).send({message:'Unauthorized'})
        return
    }

    bcrypt.compare(password, user[0].password).then(function(result) {
        if(!result){
            res.status(401).send({message:'Unauthorized'})
            return
        }

        const secertKey = process.env.SECRET_KEY
        const token = jwt.sign({username}, secertKey, {expiresIn: '1h'})

        res.status(200).send({ token })
    })

})

/**
 * works correctly
 */
app.post('/signup', async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const firstName = req.body.firstName
    const lastName = req.body.lastName

    const check = await getCrediential(username)

    if(check.length > 0){
        res.status(401).send({message:'Unauthorized'})
        return
    }

    const saltRounds = 13
    bcrypt.hash(password, saltRounds).then(function(hash) {
        const insert = insertCrediential(username, hash, firstName, lastName)
        res.status(200).send({message: "Successful Login"})
    })
})

/**
 * works correctly
 */
app.get('/retrieve/playlist/:id', async (req, res) => {
    const playlistId = req.params.id

    const playlist = await getPlaylist(playlistId)

    res.json(playlist)
})

/**
 * works correctly
 */
app.post('/retrieve/playlists', async (req, res) => {
    const username = req.body.username

    const user = await getCrediential(username)

    if(user.length == 0){
        res.status(500).send({message:'Unauthorized'})
        return
    }

    const playlists = await getUserPlaylist(username)

    res.json(playlists)
})

/**
 * works correctly
 */
app.post('/create/playlist', async (req, res) => {
    const name = req.body.name
    const username = req.body.username

    const user = await getCrediential(username)

    if(user.length == 0){
        res.status(500).send({message:'Unauthorized'})
        return
    }

    const create = await createPlaylist(name, username)

    if(create.length == 0){
        res.status(500).send({message:'Unauthorized'})
        return
    }

    res.status(200).send({message: 'Successful'})
})

/**
 * works correctly
 */
app.get('/retrieve/songs/:id', async (req, res) => {
    const playlistId = req.params.id

    const songs = await getSongs(playlistId)

    res.json(songs)
})

/**
 * works correctly
 */
app.post('/add/song/:playlistId', async (req, res) => {
    const playlistId = req.params.playlistId

    const videoId = req.body.videoId
    const title = req.body.title
    const thumbnailUrl = req.body.thumbnailUrl
    const channelTitle = req.body.channelTitle

    const insert = await addSong(videoId, playlistId, title, thumbnailUrl, channelTitle)

    res.status(200).send({message: 'Successful'})
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.staus(500).send('Something broke!')
})

const port = 8080
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
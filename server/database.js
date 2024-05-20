import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()

const pool = mysql.createPool({
    host: process.env.HOST_MYSQL,
    user: process.env.USER_MYSQL,
    password: process.env.PASSWORD_MYSQL,
    database: process.env.DATABASE_MYSQL
}).promise()

export async function getCrediential(username){
    const [rows] = await pool.query(
        `SELECT * FROM login WHERE username = ?`, [username]
    )
    return rows
}

export async function insertCrediential(username, password, firstName, lastName){
    const [result] = await pool.query(
        `INSERT INTO login (username, password, firstName, lastName) VALUES (?,?,?,?)`, [username, password, firstName, lastName]
    )
    return result
}

export async function getUserPlaylist(username){
    const [rows] = await pool.query(
        `SELECT * FROM playlists WHERE username = ?`, [username]
    )
    return rows
} 

export async function getPlaylist(playlistId){
    const [rows] = await pool.query(
        `SELECT * FROM playlists WHERE playlistId = ?`, [playlistId]
    )
    return rows
}

export async function createPlaylist(name, username){
    const [result] = await pool.query(
        `INSERT INTO playlists (playlistName, username) VALUES (?,?)`, [name, username]
    )
    return result
}

export async function getSongs(playlistId){
    const [rows] = await pool.query(
        `SELECT * FROM songs WHERE playlistId = ?`, [playlistId]
    )
    return rows
}

export async function addSong(videoId, playlistId, title, thumbnailUrl, channelTitle){
    const [result] = await pool.query(
        `INSERT INTO songs (videoId, playlistId, title, thumbnailUrl, channelTitle) VALUES (?,?,?,?,?)`, [videoId, playlistId, title, thumbnailUrl, channelTitle]
    )

    return getSongs(result.insertId)
}


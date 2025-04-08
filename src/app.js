import express from 'express';
import fs from 'fs';
import hls from 'hls-server';
import path from 'path'
import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename)
const __dirname = path.resolve()

const app = express()

app.get('/',(req, res)=>{
    return res.status(200).sendFile(`${__dirname}/index.html`)
})

const server = app.listen(3000, ()=>{
    console.log("App is running on port 3000")
})

new hls(server, {
    provider:{
        exists: (req, cb)=>{
            const ext = req.url.split('.').pop()
            if(ext !== 'm3u8' && ext !== 'ts'){
                return cb(null, true)
            }
            fs.access(path.join(__dirname,req.url), fs.constants.F_OK, function(err){
                if(err){
                    console.log('File not exist', req.url)
                    return cb(null, false)
                }
                cb(null, true);
            })
        },
        getManifestStream: (req, cb)=>{
            const stream = fs.createReadStream(path.join(__dirname,req.url))
            cb(null, stream);
        },
        getSegmentStream: (req, cb)=>{
            const stream = fs.createReadStream(path.join(__dirname,req.url));
            cb(null, stream);
        }
    }
})
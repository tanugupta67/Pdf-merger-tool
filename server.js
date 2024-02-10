import express from 'express';
import multer from 'multer';
import {mergePdfs} from './test.js'
const app = express()
import path from 'path';
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const upload = multer({ dest: 'uploads/' })
app.use('/static', express.static('public'))
const port = 3000
const projectDir = path.dirname(__filename)
app.get('/', (req, res) => {
  res.sendFile(path.join(projectDir, "templates/index.html"))
})
// let num1=parseInt(getElementById("num").value);
app.post('/merge', upload.array('pdfs',2), async (req, res, next)=> {
  console.log(req.files)
  let d=await mergePdfs(path.join(projectDir, req.files[0].path), path.join(projectDir, req.files[1].path))
  res.redirect(`http://localhost:3000/static/${d}.pdf` )
console.log("sent");
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const app = express();
const {exec} = require('child_process');
app.use(cors());

app.use(express.static(__dirname + '/public'));

app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB limit§
}))



app.use(morgan('dev'));
 


const port = process.env.PORT || 3000


app.post('/convert-url', (req, res) => {
    console.log('HIT');
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {

            let file = req.files.file;
            let fname = file.name;
            let wstream = fs.createWriteStream(fname);
            let buffer = new Uint32Array();
            buffer = file.data;
                wstream.write(buffer, () => {
					var dir1 = '-p';
					var dir2 = 'public';
					if (fs.existsSync(dir1) || fs.existsSync(dir2)) {
						exec('nccopy -k classic '+ fname + ' public/classic_'+fname, (error, stdout, stderr) => {
							if (error) {
								console.log(`error: ${error.message}`); 
								return;
							}
							if (stderr) {
								console.log(`stderr: ${stderr}`);
								return;
							}
							console.log(`stdout: ${stdout}`);
							wstream.end();
							
							
							res.send("classic_" +fname );
		
						})
					} else {
						exec('mkdir -p public && nccopy -k classic '+ fname + ' public/classic_'+fname, (error, stdout, stderr) => {
							if (error) {
								console.log(`error: ${error.message}`); 
								return;
							}
							if (stderr) {
								console.log(`stderr: ${stderr}`);
								return;
							}
							console.log(`stdout: ${stdout}`);
							wstream.end();
							
							
							res.send("classic_" +fname );
		
						})
					}
                    
                })
        }
    } catch (err) {
        res.status(500).send(err);
    }
})

app.post('/clean', (req, res) => {
    exec('rm -rf *.nc public', (error) => {
        console.log(error)
    })
})




  

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
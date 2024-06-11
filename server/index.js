const express = require('express');
require('dotenv').config();
const cors = require('cors');
const User = require('./models/User')
const Post = require('./models/Post')
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer  = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs');

const app = express();
const salt = bcrypt.genSaltSync(10);
const SECRET_KEY = 'hsgVVBJNBuqh#@sd!';

app.use(cors({
    credentials:true,
    origin:'http://localhost:5173',
}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads',express.static(__dirname + '/uploads'));



async function connectDB() {
    const uri = "mongodb+srv://shakeelbinshahul:cowWOmt7Ln2IdEai@cluster0.yszhck9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  
    try {
      await mongoose.connect(uri);
      console.log('MongoDB connected successfully');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }
  
  connectDB();


app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    try {
        const userDoc = await User.create({
            username,password:bcrypt.hashSync(password,salt)
           })
           res.json(userDoc)  
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }

 
  });
  

app.post('/login',async (req,res) => {
    const {username,password} = req.body;
    const userDoc = await User.findOne({username});

    const passok = bcrypt.compareSync(password,userDoc.password);
    
    if (passok){
        //logged in
        jwt.sign({username,id:userDoc._id},SECRET_KEY, {} ,(err,token) => {
          if (err) throw err;
        //   res.json(token)
        // instead of above line just as json...we can parse it as cookie
        res.cookie('token',token).json('ok')
        })
    }else{
        res.status(400).json('wrong credentials')
    }
})

// app.get('/profile', (req, res) => {
//     const { token } = req.cookies;
  
//     if (!token) {
//       return res.status(401).json({ error: 'No token provided' });
//     }
  
//     jwt.verify(token, SECRET_KEY, (err, info) => {
//       if (err) {
//         console.error('JWT verification error:', err);
//         return res.status(403).json({ error: 'Failed to authenticate token' });
//       }
  
//       res.json(info);
//     });
//   });

app.get('/profile',(req,res) => {
    const token = req.cookies.token || req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
      }
    jwt.verify(token,SECRET_KEY, {},(err,info) => {
        if (err) throw err;
        res.json(info)
    })

})
  

app.post('/logout',(req,res) => {
    res.cookie('token','').json('ok')
})

//
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.status(401).json({ error: 'JWT must be provided' });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid JWT' });
    }
    req.user = user;
    next();
  });
}

app.post('/post',uploadMiddleware.single('file'),async(req,res) => {
    const { originalname, path } = req.file;
      const parts = originalname.split('.');
      const ext = parts[parts.length - 1];
      const newPath = path+'.'+ext
      fs.renameSync(path, newPath)

    //   const {token} = req.cookies;
      const {token} = req.cookies.token || req.headers.authorization;
      jwt.verify(token ,SECRET_KEY, {} , async(err, info) => {
        if(err) throw err;
        const {title,summary,content} = req.body;
        const postDoc = await Post.create ({
           title,
           summary,
           content,
           cover:newPath,
           author:info.id
        })
          res.json(postDoc);
       })

})


app.get('/post',async(req,res) => {
    res.json(
        await Post.find().populate('author',['username'])
        .sort({createdAt:-1})
        .limit(20)
    )
})

// app.get('/post/:id',async (req,res)=>{
//    const {id} = req.params;
//    const postDoc = await Post.findById(id).populate('author',['username']);
//    res.json(postDoc)
// })

app.put('/post', uploadMiddleware.single('file'), async (req, res) => {
    let newPath = null;
    if (req.file) {
        const { originalname, path } = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
    }

    const { token } = req.cookies;
    jwt.verify(token, SECRET_KEY, {}, async (err, info) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Token verification failed' });
        }

        const { id, title, summary, content } = req.body;

        try {
            const postDoc = await Post.findById(id);
            if (!postDoc) {
                return res.status(404).json({ error: 'Post not found' });
            }

            const isAuthor = postDoc.author.toString() === info.id;
            if (!isAuthor) {
                return res.status(403).json({ error: 'You are not the author of this post' });
            }

            postDoc.title = title;
            postDoc.summary = summary;
            postDoc.content = content;
            if (newPath) {
                postDoc.cover = newPath;
            }
            await postDoc.update({
                title,
                summary,
                content,
                cover: newPath ? newPath : postDoc.cover,
            });

            return res.json(postDoc);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Server error' });
        }
    });
});


app.listen(4100,() => {
    console.log(`App is successfully Running on Port 4100`)
})
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');
var app = express();
var mongoose = require('mongoose');

var Master = require('./models/master.js');
var Detail = require('./models/detail.js');
var User = require('./models/user.js');
var Post = require('./models/post.js');
var Post1 = require('./models/post1.js');
var Post2 = require('./models/post2.js');

//app.use(express.static('static'));
app.use(express.static('./dist/my-app'));

app.use(bodyParser.json());

app.use(cors());
app.options('*', cors());

app.get('/master/:id',  async(req, res) =>{
        
    var decode = jwt.decode(req.params.id,'123');
    var author = decode.sub
    var master = await Master.find({author})
    res.send(master);
});

app.get('/detail/:id',  async(req, res) =>{
    
var decode = jwt.decode(req.params.id,'123');
var author = decode.sub
var detail = await Detail.find({author})
res.send(detail);
});

app.get('/posts/:id',  async(req, res) =>{
        
    var decode = jwt.decode(req.params.id,'123');
    var author = decode.sub
    var posts = await Post.find({author})
    res.send(posts);
});

app.get('/posts1/:id',  async(req, res) =>{
        
    var decode = jwt.decode(req.params.id,'123');
    var author = decode.sub
    var posts = await Post1.find({author})
    res.send(posts);
});

app.get('/posts2/:id',  async(req, res) =>{
        
    var decode = jwt.decode(req.params.id,'123');
    var author = decode.sub
    var posts = await Post2.find({author})
    res.send(posts);
});


app.get('/recapposts/:id',  async(req, res) =>{

    var decode = jwt.decode(req.params.id,'123');
    var author = decode.sub    

    const ObjectId = mongoose.Types.ObjectId;    

    var posts = await Post.aggregate([{"$match":{"author":ObjectId(author)}},{"$group":{"_id":"$type","total":{"$sum":"$value"}}}])
    
    res.send(posts);
});

app.post('/master', (req, res)=>{

    var masterData = req.body    
    var decode = jwt.decode(req.body.token,'123')
    masterData.author = decode.sub

    var master = new Master(masterData)

    master.save((err, result)=>{
        if(err){
            console.error('Saving Post Error');
            return res.status(500).send({message: 'Saving Post Causing an error'});
        }

        res.sendStatus(200);
    })
})

app.post('/detail', (req, res)=>{
    
        var detailData = req.body    
        var decode = jwt.decode(req.body.token,'123')
        detailData.author = decode.sub
    
        var detail = new Detail(detailData)
    
        detail.save((err, result)=>{
            if(err){
                console.error('Saving Post Error');
                return res.status(500).send({message: 'Saving Post Causing an error'});
            }
    
            res.sendStatus(200);
        })
})

app.post('/post', (req, res)=>{

    var postData = req.body    
    var decode = jwt.decode(req.body.token,'123')
    postData.author = decode.sub

    var post = new Post(postData)

    post.save((err, result)=>{
        if(err){
            console.error('Saving Post Error');
            return res.status(500).send({message: 'Saving Post Causing an error'});
        }

        res.sendStatus(200);
    })
})

app.post('/post1', (req, res)=>{

    var postData = req.body    
    var decode = jwt.decode(req.body.token,'123')
    postData.author = decode.sub

    var post = new Post1(postData)

    post.save((err, result)=>{
        if(err){
            console.error('Saving Post Error');
            return res.status(500).send({message: 'Saving Post Causing an error'});
        }

        res.sendStatus(200);
    })
})

app.post('/post2', (req, res)=>{

    var postData = req.body    
    var decode = jwt.decode(req.body.token,'123')
    postData.author = decode.sub

    var post = new Post2(postData)

    post.save((err, result)=>{
        if(err){
            console.error('Saving Post Error');
            return res.status(500).send({message: 'Saving Post Causing an error'});
        }

        res.sendStatus(200);
    })
})

app.post('/register', function(req,res){
       
     var userData = req.body;
     console.log(userData);
     var user = new User(userData);

     user.save((err, newUser) =>{
        if(err){
            return res.status(401).send({message: 'Error Registering the User'})
        }else {
            var payload = { sub: newUser._id }

            var token = jwt.encode(payload, '123')
        
            res.status(200).send({token})
        }
    })
})

app.post('/login', async (req, res)=>{

    var userData = req.body;
    var user = await User.findOne({username: userData.username});
    
    if(!user){
        return res.status(401).send({message: 'Email or Password Invalid'})
    }

    bcrypt.compare(userData.password, user.password, (err, isMatch) =>{
        if(!isMatch){
            return res.status(401).send({message: 'Email or Password Invalid'})
        }
        
    var payload = { sub: user._id }

    var token = jwt.encode(payload, '123')

    res.status(200).send({token})
    })

})


app.post('/changepassword',  async(req, res) =>{
    
    console.log(req.body);

});

app.get('/stategroups/:id',  async(req, res) =>{
    
    var decode = jwt.decode(req.params.id,'123');
    var author = decode.sub    

    const ObjectId = mongoose.Types.ObjectId;    

    var posts = await Post1.aggregate([{"$match":{"author":ObjectId(author)}},{"$group":{"_id":{"$substr":["$description",0,1]},"names":{"$push":"$description"}}},{"$project":{"letter":"$_id","names":"$names","_id":0}},{"$sort":{"names":1}}])

    res.send(posts);
});

app.get('/descriptiongroups/:id',  async(req, res) =>{
    
    var decode = jwt.decode(req.params.id,'123');
    var author = decode.sub
    var detail = await Detail.find({author})
    detail = detail.map(function (a){ return a.description; });
    res.send(detail);
});

app.get('/whois/:id',  async(req, res) =>{

    var decode = jwt.decode(req.params.id,'123');
    var author = decode.sub

    const ObjectId = mongoose.Types.ObjectId;   

    var user = await User.findOne(ObjectId(author))
   
    res.send(user);
});

app.get('/master',function(req,res){res.redirect('http://localhost:4201/');})
app.get('/detail',function(req,res){res.redirect('http://localhost:4201/');})
app.get('/item1',function(req,res){res.redirect('http://localhost:4201/');})
app.get('/account',function(req,res){res.redirect('http://localhost:4201/');})



mongoose.connect('mongodb://localhost:27017/meanstack',(err)=>{
  if(!err){
      console.log('Connected to mongo Database');
  }
})

app.listen(4201, function(){
  console.log("Listening from 4201...");
});

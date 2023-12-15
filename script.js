const express = require('express') 
const app = express() 
const bodyParser = require('body-parser');
const Sequelize = require ( 'sequelize' );
var path = require('path'); 
 
app.use(express.static(path.join(__dirname, 'public'))); 
app.set('view engine', "hbs")


const sequelize = new Sequelize("john", "root", "",{
    dialect: 'mysql',
    host:'localhost',
});

const Blog = sequelize.define("blog",{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    data_p: {
        type: Sequelize.DATE,
        allowNull: false
    },
    theme: {
        type: Sequelize.STRING,
        allowNull: false
    },
    text: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

app.get("/", function(req, res) { 
    Blog.findAll({raw: true}).then(data=>{ 
        res.render("index.hbs", {blogs: data}) 
    }).catch(err=>console.log(err)) 
})

app.get("/", function(req, res) { 
    res.render("index.hbs") 
}) 

app.get("/", function(req, res) { 
    Blog.findAll({raw: true}).then(blogs=>{ 
        res.render("index.hbs", {blogs: blogs}) 
    }).catch(err=>console.log(err)) 
})


app.get("/works", function(req, res) { 
    Blog.findAll({raw: true}).then(blogs=>{ 
        res.render("works.hbs", {blogs: blogs}) 
    }).catch(err=>console.log(err)) 
})

app.get("/blogs", function(req, res) { 
    Blog.findAll({raw: true}).then(blogs=>{ 
        res.render("blogs.hbs", {blogs: blogs}) 
    }).catch(err=>console.log(err)) 
})


 
app.get("/work-detailed", function(req, res) { 
    res.render("work-detailed.hbs", {name: 'Banan'}) 
})




sequelize.sync().then(() => {
    app.listen(3000);
})
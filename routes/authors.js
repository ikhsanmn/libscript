const express = require('express')
const Author = require('../models/author')
const router = express.Router()

// Semua pengarang 
router.get('/', async (req, res) => {
    // res.render('authors/index')
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== ''){
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const authors = await Author.find(searchOptions)
        res.render('authors/index', { 
            authors: authors, 
            searchOptions: req.query
        })
    }
    catch {
        res.redirect('/')
    }
})

// membuat pengarang baru 
router.get('/new', (req, res) => {
    res.render('authors/new', { author: new Author() })
})

// membuat pengarang baru 
router.post('/', async (req, res) => {
    //res.send('Create')
    const author = new Author({
        name: req.body.name
    })
    try {
        const newAuthor = await author.save()
        // res.redirect('authors/${newAuthor.id}')
        res.redirect('authors')
    } catch {
        res.render('authors/new', {
                author: author,
                errorMessage: "Error creating Author"
            })
    }
    // author.save((err, newAuthor) => {
    //     if (err) {
    //         res.render('authors/new', {
    //             author: author,
    //             errorMessage: "Error creating Author"
    //         })
    //     } else {
    //         //res.redirect('authors/${newAuthor.id}')
    //         res.redirect('authors')
    //     }
    // })
    // res.send(req.body.name)
})
module.exports = router
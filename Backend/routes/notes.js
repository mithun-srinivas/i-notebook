const express = require('express');
const router = express.Router();

// const User = require('../models/Notes')

const fetchUser = require('../middleware/fetchUser');
const Notes = require('../models/Notes');


const { body, validationResult } = require('express-validator');

//Route01: Fetch All The Notes
router.get('/fetchallnotes',fetchUser,async (req, res) => {
    try {
        const notes = await Notes.find({user: req.user.id});

        res.json(notes)
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error')
    }
})


//Route02: Add Notes
router.post('/addNotes',fetchUser,[
    body('title').isLength({min: 3}),
    body('description').isLength({min: 5}),
],async (req, res) => {
    //If Errors Encountered
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log('done');
    //IF NO Errors
    const {title, description, tag} = req.body;
    try {
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error')
    }
})


//Route03: Update Notes
router.put('/updateNote/:id',fetchUser,async (req, res) => {

    //Create New Note Object
    try {
        const newNote = {}
        if(req.title){newNote.title = title}
        if(req.description){newNote.description = description}
        if(req.tag){newNote.tag = tag}

        //Find the note to be update & update

        let note = await Notes.findById(req.params.id)
        if(!note){
            return res.status(404).send('Access Denied')
        }
        if(note.user.toString() !== req.user.id){
            return res.status(401).send('Access Denied')
        }

        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})


        res.json(note);
    } catch (error) {
        console.error(error);
        res.status('500').send('Internal Server Error')
    }
})

//Route03: Delete Notes
router.delete('/deleteNote/:id',fetchUser,async (req, res) => {
    try {
        
        let note = await Notes.findById(req.params.id)
        if(!note){
            return res.status(404).send('Access Denied')
        }
        if(note.user.toString() !== req.user.id){
            return res.status(401).send('Access Denied')
        }

        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({"Done": "yes"})

    } catch (error) {
        console.error(error);
        res.status('500').send('Internal Server Error')
    }
})


module.exports = router;
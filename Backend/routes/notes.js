import express from 'express';
import fetchuser from '../middleware/fetchuser.js';
import Notes from '../models/Notes.js'
import expValidator from 'express-validator';
const {body, validationResult } = expValidator;

const router = express.Router();

//ROUTE: 1 Fetch all notes of the user Path-/notes/getNotes
router.get('/getNotes', fetchuser,async(req, res) => {
   
    const notes = await Notes.find({user: req.user.id});
    res.status(200).json(notes);
})

//ROUTE: 2 Add notes against userId Path-/notes/addNotes
router.post('/addNotes', fetchuser,
    [body('title', 'Enter atleast 3 characters.').isLength({min: 3}),
     body('description', 'Enter atleast 5 characters.').isLength({min: 5}),], async(req, res) => {

    const errors = validationResult(req.body);
    if(!errors.isEmpty())
        return res.status(400).json({errors: errors.array()});
    try
    {
        const note = await Notes.create({
            user: req.user.id,
            title: req.body.title,
            description: req.body.description,
            tag: req.body.tag,
            date: Date()
        })
        res.status(200).json(note);
    
    }
    catch(err){
        res.status(500).json({error: 'Some unexpected error has occured.', message: err.message}); 
        console.log(err);
    }
    
})

//ROUTE:3 Update existing note Path-/notes/updateNote
router.put('/updateNote', fetchuser, async(req, res) => {

        const {title, description, tag, id} = req.body; 
        const newNote = {};
        if(title)
            newNote.title = title;
        if(description)
            newNote.description = description;
        if(tag)
            newNote.tag = tag;

        try
        {
            let note = await Notes.findById(id);
            if(!note)
                return res.status(400).json('Note not found.');
            
            if(note.user.toString() !== req.user.id)
                return res.status(400).json('Not Allowed.');

            note = await Notes.findByIdAndUpdate(id, {$set: newNote}, {new: true});
            res.status(200).json(note);
        }
        catch(err){
            res.status(500).json({error: 'Some unexpected error has occured.', message: err.message}); 
            console.log(err);

        }
})

//ROUTE: 4 Delete note based on Note ID Path-/notes/deleteNote
router.delete('/deleteNote/:id', fetchuser, async(req, res) => {

    try
    {
        let note = await Notes.findById(req.params.id);

        if(!note)
            return res.status(400).json('Note not found.');
        if(req.user.id !== note.user.toString())
            return res.status(400).json('This operation is not authorized.');

        note = await Notes.findByIdAndDelete(req.params.id);
        res.status(200).json(`Note titled- ${note.title} has been successfully removed.`);

    }
    catch(err)
    {
        res.status(500).json({error: 'Some unexpected error has occured.', message: err.message}); 
        console.log(err);
    }
   
})


export default router;
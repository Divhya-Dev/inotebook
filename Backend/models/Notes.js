import mongoose from 'mongoose';
import User from './User.js';

const Notes = mongoose.model('notes', 
        {
        user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
        },
        title: {
                type: String,
                required: true
                }, 
        description: {
                type: String,
                required: true
        },
        tag: {
                type: String,
                default: 'general'
        }, 
        date: {
                type: String,
                default: Date.now
        },          
        
        });

        export default Notes;
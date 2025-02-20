import mongoose from 'mongoose';

const notesSchema = mongoose.model('notes', 
        {name: {
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

        export default notesSchema;
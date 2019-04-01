import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const petSchema = new Schema({
    _id : mongoose.Schema.Types.ObjectId,
    category: {
        category_id : mongoose.Schema.Types.ObjectId,
        name : {type: String, required: true},
    },
    name : {type: String, required: true},
    photoUrls: {type: String, required: true},
    status: {type: String, required: true},
    tags: {
        name: {type: String, required: true},
        tag_id : mongoose.Schema.Types.ObjectId,
    },
});
const Pet = mongoose.model('Pet', petSchema);
export default Pet;
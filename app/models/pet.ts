import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const petSchema = new Schema({
    _id : mongoose.Schema.Types.ObjectId,
    category: {
        category_id : mongoose.Schema.Types.ObjectId,
        name : String,
    },
    name : String,
    photoUrls: String,
    status: String,
    tags: {
        name: String,
        tag_id : mongoose.Schema.Types.ObjectId,
    },
});
const Pet = mongoose.model('Pet', petSchema);
export default Pet;
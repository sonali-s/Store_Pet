import Pet from '../../models/Pet';
import {PetRepository} from '../../repositories/PetRepository';
import chai from 'chai';
import sinon from 'sinon';
const expect = chai.expect;

describe('Pet Repository Test', () => {
    let stubPetModel;

    beforeEach( () => {
        stubPetModel = sinon.stub(Pet);
    });

    it('should return Pets from database', async () => {
        const Pets = [ {
            _id : 1234,
            category : {
                category_id : 9876,
                name : 'ANIMAL',
            },
            name : 'ANIMAL_NAME',
            photoUrls : 'PHOTO',
            status : 'AVAILABILITY',
            tags : {
                name : 'TAG_NAME',
                tag_id: 3456,
            },
        }];
        // console.log(Pets);
        await stubPetModel.find.returns(Pets);

        const response = await new PetRepository().getAllPets();
        sinon.assert.calledOnce(stubPetModel.find);
        expect(response).equals(Pets);
    });

});
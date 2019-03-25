import Pet from '../../models/Pet';
import {PetRepository} from '../../repositories/PetRepository';
import chai from 'chai';
import sinon from 'sinon';
const expect = chai.expect;

describe('Pet Repository Test', async () => {
    let stubPetModel;

    before( () => {
        stubPetModel = sinon.stub(Pet);
    });

    it('should return Pets from database', async () => {
        const pets = [ {
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
        await stubPetModel.find.returns(pets);

        const response = await new PetRepository().getAllPets();
        sinon.assert.calledOnce(stubPetModel.find);
        await expect(response).equals(pets);
    });
    
    it('should return a pet by ID from database', async () => {
        const pet = [ {
            _id : 'qssdmnwt12',
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
        await stubPetModel.findById.returns(pet);
        const response = await new PetRepository().getPetById(pet[0]._id);
        sinon.assert.calledOnce(stubPetModel.findById);
        await expect(response).equals(pet);
    });
    it('should return a pet by name from database', async () => {
        const pet = [ {
            _id : 'qssdmnwt12',
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
        await stubPetModel.find.returns(pet);
        const response = await new PetRepository().getPetByName(pet[0].name);
        sinon.assert.calledTwice(stubPetModel.find);
        await expect(response).equals(pet);
    });
    it('should create a pet in database', async () => {
        const pet = [ {
            _id : 'qssdmnwt12',
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
        await stubPetModel.create.returns(pet);
        const response = await new PetRepository().createPet(pet);
        sinon.assert.calledOnce(stubPetModel.create);
        await expect(response).equals(pet);
    });
    it('should delete a pet by ID from database', async () => {
        const pet = [ {
            _id : 'qssdmnwt12',
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
        await stubPetModel.findByIdAndDelete.returns(pet);
        const response = await new PetRepository().deletePet(pet[0]._id);
        sinon.assert.calledOnce(stubPetModel.findByIdAndDelete);
        await expect(response).equals(pet);
    });
    it('should update a pet by ID in database', async () => {
        const pet = [ {
            _id : 'qssdmnwt12',
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
        await stubPetModel.findByIdAndUpdate.returns(pet);
        const response = await new PetRepository().updatePet(pet[0]._id, pet);
        sinon.assert.calledOnce(stubPetModel.findByIdAndUpdate);
        await expect(response).equals(pet);
    });
});
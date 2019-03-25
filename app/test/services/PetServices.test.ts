import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import {PetRepository} from '../../repositories/PetRepository';
import PetService from '../../services/PetService';
chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Pet Service Test', () => {
    let stubPetRepository;
    let pets;

    beforeEach( () => {
        stubPetRepository = sinon.stub(new PetRepository());

        pets = [ {
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
    });

    describe('Pet Service to return all pets', async () => {
        it('should return pets from repository', async () => {
            stubPetRepository.getAllPets.returns(pets);
            const response = await new PetService(stubPetRepository).getAllPets();
            sinon.assert.calledOnce(stubPetRepository.getAllPets);
            expect(response).equals(pets);
        });

        it('should catch error', async () => {
            const error = new Error();
            await stubPetRepository.getAllPets.throws(error);
            await expect(new PetService(stubPetRepository).getAllPets()).to.be.rejected;
            sinon.assert.calledOnce(stubPetRepository.getAllPets);
        });
    });

    describe('Pet Service to return single pet by ID', async () => {
        it('should return a pet by ID from repository', async () => {
            stubPetRepository.getPetById.returns(pets);
            const response = await new PetService(stubPetRepository).getPetById(pets[0]._id);
            sinon.assert.calledOnce(stubPetRepository.getPetById);
            expect(response).equals(pets);
        });

        it('should catch error', async () => {
            const error = new Error();
            await stubPetRepository.getPetById.throws(error);
            await expect(new PetService(stubPetRepository).getPetById(pets[0]._id)).to.be.rejected;
            sinon.assert.calledOnce(stubPetRepository.getPetById);
        });
    });
    describe('Pet Service to return single pet by name', async () => {
        it('should return a pet by name from repository', async () => {
            stubPetRepository.getPetByName.returns(pets);
            const response = await new PetService(stubPetRepository).getPetByName(pets[0].name);
            sinon.assert.calledOnce(stubPetRepository.getPetByName);
            expect(response).equals(pets);
        });

        it('should catch error', async () => {
            const error = new Error();
            await stubPetRepository.getPetByName.throws(error);
            await expect(new PetService(stubPetRepository).getPetByName(pets[0].name)).to.be.rejected;
            sinon.assert.calledOnce(stubPetRepository.getPetByName);
        });
    });
    describe('Pet Service to create a new pet', async () => {
        it('should create a pet', async () => {
            stubPetRepository.createPet.returns(pets);
            const response = await new PetService(stubPetRepository).createPet(pets);
            sinon.assert.calledOnce(stubPetRepository.createPet);
            expect(response).equals(pets);
        });

        it('should catch error', async () => {
            const error = new Error();
            await stubPetRepository.createPet.throws(error);
            await expect(new PetService(stubPetRepository).createPet(pets)).to.be.rejected;
            sinon.assert.calledOnce(stubPetRepository.createPet);
        });
    });
    describe('Pet Service to delete a single pet by ID', async () => {
        it('should delete a pet by ID from the database', async () => {
            stubPetRepository.deletePet.returns(pets);
            const response = await new PetService(stubPetRepository).deletePet(pets[0]._id);
            sinon.assert.calledOnce(stubPetRepository.deletePet);
            expect(response).equals(pets);
        });

        it('should catch error', async () => {
            const error = new Error();
            await stubPetRepository.deletePet.throws(error);
            await expect(new PetService(stubPetRepository).deletePet(pets[0]._id)).to.be.rejected;
            sinon.assert.calledOnce(stubPetRepository.deletePet);
        });
    });
    describe('Pet Service to update a single pet by ID', async () => {
        let updatedPet = [ {
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
        it('should update a pet by ID from the database', async () => {
            stubPetRepository.updatePet.returns(pets);
            const response = await new PetService(stubPetRepository).updatePet(pets[0]._id, updatedPet);
            sinon.assert.calledOnce(stubPetRepository.updatePet);
            expect(response).equals(pets);
        });

        it('should catch error', async () => {
            const error = new Error();
            await stubPetRepository.updatePet.throws(error);
            await expect(new PetService(stubPetRepository).updatePet(pets[0]._id, updatedPet)).to.be.rejected;
            sinon.assert.calledOnce(stubPetRepository.updatePet);
        });
    });
});

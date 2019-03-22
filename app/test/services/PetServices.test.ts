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
            await stubPetRepository.getAllPets.throws(error);
            await expect(new PetService(stubPetRepository).getAllPets()).to.be.rejected;
            sinon.assert.calledOnce(stubPetRepository.getAllPets);
        });
    });
    
});

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import { PetRepository } from '../../repositories/PetRepository';
import AppConstants from '../../constants/AppConstant';
import PetService from '../../services/PetService';
import ServiceError from '../../errors/ServiceError';
chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Pet Service Test', () => {
    let stubPetRepository;
    let pets;

    beforeEach(() => {
        stubPetRepository = sinon.stub(new PetRepository());

        pets = [{
            "category": {
                "category_id": "5c7cf76b745dbe3f0888878f",
                "name": "Pug"
            },
            "tags": {
                "tag_id": "5c7cf76b745dbe3f08888790",
                "name": "DOG-20"
            },
            "_id": "5c7cf76b745dbe3f0888878e",
            "name": "Dino",
            "photoUrls": "https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwii9IWb5efgAhUZXSsKHYHEC6oQjRx6BAgBEAU&url=https%3A%2F%2Fwww.insidedogsworld.com%2F6-things-to-know-before-getting-a-siberian-husky%2F&psig=AOvVaw2KgF-xvRBQyaftgNplatmG&ust=1551764992991641",
            "status": "Available",
            "__v": 0,
        }];
    });

    describe('Pet Service to return all pets', async () => {
        it('should return pets from repository', async () => {
            stubPetRepository.getAllPets.returns(pets);
            const response = await new PetService(stubPetRepository).getAllPets();
            sinon.assert.calledOnce(stubPetRepository.getAllPets);
            expect(response).equals(pets);
        });
    });

    describe('Pet Service to return single pet by ID or name', async () => {
        it('should return a pet by ID or name from repository', async () => {
            stubPetRepository.searchBy.returns(pets);
            const response = await new PetService(stubPetRepository).searchBy(pets[0]._id, pets[0].name);
            sinon.assert.calledOnce(stubPetRepository.searchBy);
            expect(response).equals(pets);
        });
        it('should catch error', async () => {
            const error = new Error();
            await stubPetRepository.searchBy.throws(error);
            await expect(new PetService(stubPetRepository).searchBy(pets[0]._id, pets[0].name)).to.be.rejected;
            sinon.assert.calledOnce(stubPetRepository.searchBy);
        });
    });
    describe('Pet Service to create a new pet', async () => {
        it('should create a pet', async () => {
            stubPetRepository.createPet.returns(pets);
            const response = await new PetService(stubPetRepository).createPet(pets);
            sinon.assert.calledOnce(stubPetRepository.createPet);
            expect(response).equals(pets);
        });

        it('should catch internal server error', async () => {
            const error = new ServiceError(
                AppConstants.ERROR_CODES.ERR_INTERNAL_SERVER_ERROR,
                AppConstants.ERROR_MESSAGES.ERR_INTERNAL_SERVER_ERROR
            );
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
        let updatedPet = [{
            _id: 1234,
            category: {
                category_id: 9876,
                name: 'ANIMAL',
            },
            name: 'ANIMAL_NAME',
            photoUrls: 'PHOTO',
            status: 'AVAILABILITY',
            tags: {
                name: 'TAG_NAME',
                tag_id: 3456,
            },
        }];
        it('should update a pet by ID from the database', async () => {
            stubPetRepository.updatePet.returns(pets);
            const response = await new PetService(stubPetRepository).updatePet(pets[0]._id, updatedPet);
            sinon.assert.calledOnce(stubPetRepository.updatePet);
            expect(response).equals(pets);
        });
        it('should catch error NOT FOUND', async () => {
            const error = new ServiceError(
                AppConstants.ERROR_CODES.ERR_NOT_FOUND,
                AppConstants.ERROR_MESSAGES.ERR_NOT_FOUND
            );
            await stubPetRepository.updatePet.throws(error);    
            await expect(new PetService(stubPetRepository).updatePet(pets[0]._id, updatedPet)).to.be.rejected;
            sinon.assert.calledOnce(stubPetRepository.updatePet);
        });

        it('should catch error', async () => {
            const error = new Error();
            await stubPetRepository.updatePet.throws(error);
            await expect(new PetService(stubPetRepository).updatePet(pets[0]._id, updatedPet)).to.be.rejected;
            sinon.assert.calledOnce(stubPetRepository.updatePet);
        });
    });
});

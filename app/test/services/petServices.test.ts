import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import {PetRepository} from '../../repositories/petRepository';
import PetService from '../../services/petService';
chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Pet Service Test', () => {
    let stubPetRepository;
    let petService;
    let pets;

    beforeEach( () => {
        stubPetRepository = sinon.stub(new PetRepository());
        petService = new PetService(stubPetRepository);

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

    it('should return pets from repository', async () => {

        stubPetRepository.getAllPets.returns(pets);

        const response = await new PetService(stubPetRepository).getAllPets();

        sinon.assert.calledOnce(stubPetRepository.getAllPets);
        expect(response).equals(pets);
    });

    it('should catch error', async () => {
        const error = new Error();
        stubPetRepository.getAllPets.throws(error);
        await expect(petService.getAllPets()).to.be.rejected;
        // sinon.assert.calledOnce(stubIndustryRepository.create);
    });

});

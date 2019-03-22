import { PetRepository } from '../../repositories/PetRepository';
import PetService from '../../services/PetService';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
const expect = chai.expect;
import PetController from '../../controllers/PetController';
import locales from '../../locales/en.json';
import AppConstants from '../../constants/AppConstant';

chai.use(chaiAsPromised);

describe('Pet Controller Test', () => {
    let req;
    let stubPetService;
    let petController;
    let stubPetRepository;

    beforeEach(() => {
        stubPetRepository = sinon.stub(new PetRepository());
        stubPetService = sinon.stub(new PetService(stubPetRepository));
        petController = new PetController(stubPetService);
    });

    afterEach( () => {
        sinon.restore();
    })
    const res = { __(value) { return locales[value]; } };

    describe('Pet Controller to return all pets', async() => {
        it('should return pets', async () => {

            const successResponse = {
                status: 'SUCCESS',
                data: {
                    pets: [
                        {
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
                        },
                    ],
                },
            };

            const pets = [{
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

            await stubPetService.getAllPets.returns(pets);

            const stubSuccess = await sinon.stub(petController.appResponse, 'success').returns(successResponse);

            const response = await petController.getAllPets(req as any, res as any);

            sinon.assert.calledOnce(stubPetService.getAllPets);
            sinon.assert.calledOnce(stubSuccess);
            expect(response).to.be.a('object');
            expect(response.status).equal('SUCCESS');
            expect(response.data).to.be.a('object');
            expect(response.data.pets).to.be.an('array');
            expect(response.data.pets).deep.equals(pets);
            expect(response).equal(successResponse);
        });

        it('should throw error in case of service error', async () => {
            const failedResponse = {
                status: 'ERROR',
                data: {error: {code: 'ERR_INTERNAL_SERVER_ERROR', message: 'Internal Server Error', description: ''}},
            };
            const error = {
                code: AppConstants.ERROR_CODES.ERR_INTERNAL_SERVER_ERROR,
            };

            stubPetService.getAllPets.throws(error);

            const stubError = await sinon.stub(petController.appResponse, 'error')
            .returns(failedResponse);

            const response = await petController.getAllPets(req as any, res as any);
            sinon.assert.calledOnce(stubPetService.getAllPets);
            sinon.assert.calledOnce(stubError);
            expect(response).equal(failedResponse);
        });
    });

    describe('Pet Controller to return a pet by ID', async() => {
        req = {
            params: {id : '1234'}
        }
        it('should return single pet', async () => {

            const successResponse = {
                status: 'SUCCESS',
                data: {
                    pets: [
                        {
                            _id: '1234',
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
                        },
                    ],
                },
            };

            const pets = [{
                _id: '1234',
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

            await stubPetService.getPetById.returns(pets);
            const stubSuccess = await sinon.stub(petController.appResponse, 'success').returns(successResponse);

            const response = await petController.getPetById(req as any, res as any);
            
            sinon.assert.calledOnce(stubPetService.getPetById);
            sinon.assert.calledOnce(stubSuccess);
            expect(response).to.be.a('object');
            expect(response.status).equal('SUCCESS');
            expect(response.data).to.be.a('object');
            expect(response.data.pets).to.be.an('array');
            expect(response.data.pets).deep.equals(pets);
            expect(response).equal(successResponse);
        });

        it('should throw error in case of service error', async () => {
            const failedResponse = {
                status: 'ERROR',
                data: {error: {code: 'ERR_INTERNAL_SERVER_ERROR', message: 'Internal Server Error', description: ''}},
            };
            const error = {
                code: AppConstants.ERROR_CODES.ERR_INTERNAL_SERVER_ERROR,
            };

            stubPetService.getPetById.throws(error);

            const stubError = await sinon.stub(petController.appResponse, 'error')
            .returns(failedResponse);

            const response = await petController.getPetById(req as any, res as any);
            sinon.assert.calledOnce(stubPetService.getPetById);
            sinon.assert.calledOnce(stubError);
            expect(response).equal(failedResponse);
        });
    });
});

import { PetRepository } from '../../repositories/PetRepository';
import PetService from '../../services/PetService';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
const expect = chai.expect;
import PetController from '../../controllers/PetController';
import locales from '../../locales/en.json';
import AppConstants from '../../constants/AppConstant';
import ServiceError from '../../errors/ServiceError';

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

        it('should throw error in case of data not found', async () => {
            const failedResponse = {
                status: 'ERROR',
                data: {error: {code: 'ERR_NOT_FOUND', message: 'data not found', description: ''}},
            };
            const error = new ServiceError(
                AppConstants.ERROR_CODES.ERR_NOT_FOUND,
                AppConstants.ERROR_MESSAGES.ERR_NOT_FOUND
            );

            stubPetService.getAllPets.throws(error);

            const stubError = await sinon.stub(petController.appResponse, 'notFound')
            .returns(failedResponse);

            const response = await petController.getAllPets(req as any, res as any);
            sinon.assert.calledOnce(stubPetService.getAllPets);
            sinon.assert.calledOnce(stubError);
            expect(response).equal(failedResponse);
        });
        it('should throw error', async () => {
            const error = new Error();
            await stubPetService.getAllPets.throws(error);
            await expect(petController.getAllPets(req as any, res as any)).to.be.rejected;
        });
    });

    describe('Pet Controller to return a pet by ID and name', async() => {
        beforeEach( () => {
                req = {
                query: {petId : '5c7cf76b745dbe3f0888878e',
                        name : 'Dino'
                }
            }
        });
        it('should return single pet', async () => {

            const successResponse = {
                status: 'SUCCESS',
                data: {
                    result: [{
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
                        },
                    ],
                },
            };

            const pets = [{
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
                "__v": 0
            }];

            await stubPetService.searchBy.returns(pets);
            const stubSuccess = await sinon.stub(petController.appResponse, 'success')
            .returns(successResponse);

            const response = await petController.searchBy(req as any, res as any);
            
            sinon.assert.calledOnce(stubPetService.searchBy);
            sinon.assert.calledOnce(stubSuccess);
            expect(response).to.be.a('object');
            expect(response.status).equal('SUCCESS');
            expect(response.data).to.be.a('object');
            expect(response.data.result).to.be.an('array');
            expect(response.data.result).deep.equals(pets);
            expect(response).equal(successResponse);
        });
        it('should throw error in case of data not found', async () => {
            const failedResponse = {
                status: 'ERROR',
                data: {error: {code: 'ERR_NOT_FOUND', message: 'data not found', description: ''}},
            };
            const error = new ServiceError(
                AppConstants.ERROR_CODES.ERR_NOT_FOUND,
                AppConstants.ERROR_MESSAGES.ERR_NOT_FOUND
            );

            const stubError = await sinon.stub(petController.appResponse, 'notFound')
            .returns(failedResponse);
            
            stubPetService.searchBy.throws(error);
            
            const response = await petController.searchBy(req as any, res as any);
            sinon.assert.calledOnce(stubPetService.searchBy);
            sinon.assert.calledOnce(stubError);
            expect(response).equal(failedResponse);
        });
        it('should throw error', async () => {
            const error = new Error();
            await stubPetService.searchBy.throws(error);
            await expect(petController.searchBy(req as any, res as any)).to.be.rejected;
        });
    });
    describe('Pet Controller to create a new pet', async() => {
        beforeEach( () => {
            req = {  
                body: {
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
                }
            }
        });
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
            const pets = {};

            await stubPetService.createPet.returns(pets);
            
            const stubSuccess = await sinon.stub(petController.appResponse, 'success')
            .returns(successResponse);

            const response = await petController.createPet(req as any, res as any);

            sinon.assert.calledOnce(stubPetService.createPet);
            sinon.assert.calledOnce(stubSuccess);
            expect(response).to.be.a('object');
            expect(response.status).equal('SUCCESS');
            expect(response.data).to.be.a('object');
            expect(response.data.pets).to.be.an('array');
            expect(response).deep.equals(successResponse);
        });
        it('should throw error in case internal server error', async () => {
            const failedResponse = {
                status: 'ERROR',
                data: {error: {code: 'ERR_INTERNAL_SERVER_ERROR', message: 'internal server error', description: ''}},
            };
            const error = new ServiceError(
                AppConstants.ERROR_CODES.ERR_INTERNAL_SERVER_ERROR,
                AppConstants.ERROR_MESSAGES.ERR_INTERNAL_SERVER_ERROR
            );

            stubPetService.createPet.throws(error);

            const stubError = await sinon.stub(petController.appResponse, 'error')
            .returns(failedResponse);

            const response = await petController.createPet(req as any, res as any);
            sinon.assert.calledOnce(stubPetService.createPet);
            sinon.assert.calledOnce(stubError);
            expect(response).equal(failedResponse);
        });
        it('should throw error', async () => {
            const error = new Error();
            await stubPetService.createPet.throws(error);
            await expect(petController.createPet()).to.be.rejected;
        });
    });
    describe('Pet Controller to update an existing pet', async() => {
        
            
        
        it('should update a pet by ID', async () => {
            req = {
                params: { petId: '5c7cf76b745dbe3f0888878e'},  
                body: {
                    _id: '5c7cf76b745dbe3f0888878e',
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
                }
            }
            const successResponse = {
                status: 'SUCCESS',
                data: {
                    result: [{
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
                        },
                    ],
                },
            };

            const pets = [{
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
                "__v": 0
            }];

            await stubPetService.updatePet.returns(pets);
            
            const stubSuccess = await sinon.stub(petController.appResponse, 'success')
            .returns(successResponse);

            const response = await petController.updatePet(req as any, res as any);

            sinon.assert.calledOnce(stubPetService.updatePet);
            sinon.assert.calledOnce(stubSuccess);
            expect(response).to.be.a('object');
            expect(response.status).equal('SUCCESS');
            expect(response.data).to.be.a('object');
            expect(response.data.result).to.be.an('array');
            expect(response).deep.equals(successResponse);
        });

        
        it('should throw error in case of data not found', async () => {
            req = {
                params: { petId: '5c7df76b745dbe3f0888878e'},  
                body: {
                    _id: '5c7cf76b745dbe3f0888878e',
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
                }
            }
            const failedResponse = {
                status: 'ERROR',
                data: {error: {code: 'ERR_NOT_FOUND', message: 'data not found', description: ''}},
            };
            const error = new ServiceError(
                AppConstants.ERROR_CODES.ERR_NOT_FOUND,
                AppConstants.ERROR_MESSAGES.ERR_NOT_FOUND
            );

            stubPetService.updatePet.throws(error);

            const stubError = await sinon.stub(petController.appResponse, 'notFound')
            .returns(failedResponse);

            const response = await petController.updatePet(req as any, res as any);
            sinon.assert.calledOnce(stubPetService.updatePet);
            sinon.assert.calledOnce(stubError);
            expect(response).equal(failedResponse);
        });
        it('should throw error', async () => {
            const error = new Error();
            await stubPetService.updatePet.throws(error);
            await expect(petController.updatePet(req as any, res as any)).to.be.rejected;
        });
    });
    describe('Pet Controller to delete a pet by ID', async() => {
        req = {
            params : { petId : '5c7cf76b745dbe3f0888878e'}
        }
        it('should delete a single pet', async () => {

            const successResponse = {
                status: 'SUCCESS',
                data: 'Data deleted successfully',
            };

            const pets = [{
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
                "__v": 0
            }];

            await stubPetService.deletePet.returns(pets);
            
            const stubSuccess = await sinon.stub(petController.appResponse, 'success')
            .returns(successResponse);

            const response = await petController.deletePet(req as any, res as any);

            sinon.assert.calledOnce(stubPetService.deletePet);
            sinon.assert.calledOnce(stubSuccess);
            expect(response).to.be.a('object');
            expect(response.status).equal('SUCCESS');
            expect(response).deep.equals(successResponse);
        });
        it('should throw error in case of data not found', async () => {
            const failedResponse = {
                status: 'ERROR',
                data: {error: {code: 'ERR_NOT_FOUND', message: 'data not found', description: ''}},
            };
            const error = new ServiceError(
                AppConstants.ERROR_CODES.ERR_NOT_FOUND,
                AppConstants.ERROR_MESSAGES.ERR_NOT_FOUND
            );

            stubPetService.deletePet.throws(error);

            const stubError = await sinon.stub(petController.appResponse, 'notFound')
            .returns(failedResponse);

            const response = await petController.deletePet(req as any, res as any);
            sinon.assert.calledOnce(stubPetService.deletePet);
            sinon.assert.calledOnce(stubError);
            expect(response).equal(failedResponse);
        });
        it('should throw error', async () => {
            const error = new Error();
            await stubPetService.deletePet.throws(error);
            await expect(petController.deletePet(req as any, res as any)).to.be.rejected;
        });
    });
});

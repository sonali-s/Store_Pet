import * as express from 'express';
import * as petController from '../controllers/petController';

const petRouter: express.Application = express();

petRouter.route('/pets')
    .post(petController.addPet)
    .get(petController.allPets);

petRouter.route('/pets/ById/:petId')
    .get(petController.getPet);

petRouter.route('/pets/:petId')
    .put(petController.updatePet)
    .delete(petController.deletePet);

export default petRouter;

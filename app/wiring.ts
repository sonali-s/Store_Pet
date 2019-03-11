import {PetController} from '../app/controllers/petController';

import {PetService} from '../app/services/petService';

import {PetRepository} from '../app/repositories/petRepository';

class Wiring {
    public petController() {
        return new PetController(this.petService());
    }
    public petService() {
        return new PetService(this.petRepository());
    }
    public petRepository() {
        return new PetRepository();
    }
}

export default new Wiring();
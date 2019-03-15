import {PetController} from './controllers/PetController';
import {PetService} from './services/PetService';
import {PetRepository} from './repositories/PetRepository';

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
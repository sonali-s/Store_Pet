import PetRepository from './../repositories/petRepository';

export class PetService {
    private petRepository: PetRepository;

    public constructor(petRepository: PetRepository) {
        this.petRepository = petRepository;
    }

    public getAllPets = () => {
        try {
            return this.petRepository.getAllPets();
        } catch (error) {
            throw error;
        }
    }
}
export default PetService;

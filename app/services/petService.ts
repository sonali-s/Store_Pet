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
    public getPetById = (id: string) => {
        try {
            return this.petRepository.getPetById(id);
        } catch (error) {
            throw error;
        }
    }
}
export default PetService;

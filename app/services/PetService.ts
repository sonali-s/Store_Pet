import PetRepository from '../repositories/PetRepository';

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
    public createPet = (newPet: any) => {
        try {
            this.petRepository.createPet(newPet);
        } catch (error) {
            throw error;
        }
    }
    public deletePet = (id: string) => {
        try {
            return this.petRepository.deletePet(id);
        } catch (error) {
            throw error;
        }
    }
}
export default PetService;

import PetRepository from '../repositories/PetRepository';

export class PetService {
    private petRepository: PetRepository;

    public constructor(petRepository: PetRepository) {
        this.petRepository = petRepository;
    }

    public getAllPets = async () => {
        try {
            return await this.petRepository.getAllPets();
        } catch (error) {
            throw error;
        }
    }
    public getPetById = async (id: string) => {
        try {
            return await this.petRepository.getPetById(id);
        } catch (error) {
            throw error;
        }
    }
    public getPetByName = async (name: string) => {
        try {
            return await this.petRepository.getPetByName(name);
        } catch (error) {
            throw error;
        }
    }
    public createPet = async (newPet: any) => {
        try {
            return await this.petRepository.createPet(newPet);
        } catch (error) {
            throw error;
        }
    }
    public updatePet = async (id: string, updatedPet: any) => {
        try {
            return await this.petRepository.updatePet(id, updatedPet);
        } catch (error) {
            throw error;
        }
    }
    public deletePet = async (id: string) => {
        try {
            return await this.petRepository.deletePet(id);
        } catch (error) {
            throw error;
        }
    }
}
export default PetService;

import PetRepository from '../repositories/PetRepository';
import ServiceError from '../errors/ServiceError';
import AppConstant from '../constants/AppConstant';

export class PetService {
    private petRepository: PetRepository;

    public constructor(petRepository: PetRepository) {
        this.petRepository = petRepository;
    }

    public getAllPets = async () => {
            const result = await this.petRepository.getAllPets();
            if (result.length < 1 ) {
                throw new ServiceError(AppConstant.ERROR_CODES.ERR_NOT_FOUND,
                    AppConstant.ERROR_MESSAGES.ERR_NOT_FOUND);
            }
            return result;
    }
    public createPet = async (newPet: any) => {
        try {
            return await this.petRepository.createPet(newPet);
        } catch (error) {
            throw new ServiceError(AppConstant.ERROR_CODES.ERR_INTERNAL_SERVER_ERROR,
                AppConstant.ERROR_MESSAGES.ERR_INTERNAL_SERVER_ERROR);
        }
    }
    public updatePet = async (id: string, updatedPet: any) => {
        try {
            const result = await this.petRepository.updatePet(id, updatedPet);
            if(result === null) {
                throw new ServiceError(AppConstant.ERROR_CODES.ERR_NOT_FOUND,
                    AppConstant.ERROR_MESSAGES.ERR_NOT_FOUND);
            }
            return result;           
        } catch (error) {
            throw error;
        }
    }
    public deletePet = async (id: string) => {
        try {
            const result = await this.petRepository.deletePet(id);
            if(result === null) {
                throw new ServiceError(AppConstant.ERROR_CODES.ERR_NOT_FOUND,
                    AppConstant.ERROR_MESSAGES.ERR_NOT_FOUND);
            }
            return result;
        } catch (error) {
            throw error;
        }
    }
    public searchBy = async (id: string, name: string) => {
        try {
            const result = await this.petRepository.searchBy(id, name);
            if (result === null || Object.keys(result).length === 0) {
                throw new ServiceError(AppConstant.ERROR_CODES.ERR_NOT_FOUND,
                    AppConstant.ERROR_MESSAGES.ERR_NOT_FOUND);
            }           
            return result;
        } catch(error) {
            throw error;
        }
    }
}
export default PetService;

import Pet from './../models/pet';

export class PetRepository {

    // public createUser = async () => {
    //     return await Pet.save();
    // }

    // public getPetById = async (id: number) => {
    //     return await Pet.findById(id);
    // }
    public getAllPets = () => {
        return Pet.find();
    }
}

export default PetRepository;
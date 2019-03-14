import Pet from './../models/pet';

export class PetRepository {

    // public createUser = async () => {
    //     return await Pet.save();
    // }

    public getPetById = (id: string) => {
        return Pet.findById(id);
    }
    public getAllPets = () => {
        return Pet.find();
    }
}

export default PetRepository;
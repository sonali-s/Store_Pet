import Pet from '../models/Pet';

export class PetRepository {
    public getPetById = (id: string) => {
        return Pet.findById(id);
    }
    public getAllPets = () => {
        return Pet.find();
    }
    public createPet = (newPet: any) => {
        newPet.save();
    }
    public deletePet = (id: string) => {
        return Pet.findByIdAndDelete(id);
    }
    public updatePet = (id: string, updatedPet: any) => {
        return Pet.findByIdAndUpdate({_id : id}, {$set: updatedPet});
    }
}

export default PetRepository;
import Pet from '../models/Pet';

export class PetRepository {
    public getPetById = (id: string) => {
        return Pet.findById(id);
    }
    public getAllPets = () => {
        return Pet.find();
    }
    public getPetByName = (name: string) => {
        return Pet.find({name: {$regex: name}});
    }
    public createPet = (newPet: any) => {
        return Pet.create(newPet);
    }
    public deletePet = (id: string) => {
        return Pet.findByIdAndDelete(id);
    }
    public updatePet = (id: string, updatedPet: any) => {
        return Pet.findByIdAndUpdate({_id : id}, {$set: updatedPet});
    }
    public searchBy = (id: string, name: string) => {
        if (id === undefined)
            return Pet.find({name: name});
        else if (name === undefined)
            return Pet.findById(id);
        else
            return Pet.find({ _id: id, name: name } );
    }
}

export default PetRepository;
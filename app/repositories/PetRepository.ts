import Pet from '../models/Pet';

export class PetRepository {
    public getAllPets = () => {
        return Pet.find();
    }
    public createPet = (newPet: any) => {
        return Pet.create(newPet);
    }
    public deletePet = (id: string) => {
        return Pet.findByIdAndDelete(id);
    }
    public updatePet = (id: string, updatedPet: any) => {
        return Pet.findByIdAndUpdate({_id : id}, {$set: updatedPet}, {new: true});
    }
    public searchBy = (id: string, name: string) => {
        if (id === undefined)
            return Pet.find({name: {$regex: name}});
        else if (name === undefined)
            return Pet.find({_id: id});
        else {            
            return Pet.find({ _id: id, name: {$regex: name} } );
        }
    }
}

export default PetRepository;
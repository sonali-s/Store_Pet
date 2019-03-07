import {Request, Response} from 'express';
import Pet from './../models/pet';

// GET /pets gives all pets
export const allPets = (req: Request, res: Response) => {
    let pets;
    // tslint:disable-next-line:no-shadowed-variable
    pets = Pet.find((err: any, pets: any) => {
        if (err) {
            res.send(err);
        } else {
            res.send(pets);
        }
    });
};

// GET /pets/petId gives a pet by id
export let getPet = (req: Request, res: Response) => {
    Pet.findById(req.params.petId, (err: any, pets: any) => {
        if (err) {
            res.send(err);
        } else {
            res.send(pets);
        }
    });
};
// POST /pets lets insert a new pet
export let addPet = (req: Request, res: Response) => {
    const pet = new Pet(req.body);

    pet.save((err: any, pets: any) => {
        if (err) {
            res.send(err);
        } else {
            res.send(pets);
        }
    });
};

// PUT /pets/petId lets update a pet by id
export let updatePet = (req: Request, res: Response) => {
    Pet.findByIdAndUpdate(req.params.petId, req.body, (err: any, pets: any) => {
        if (err) {
            res.send(err);
        } else {
            res.send("Successfully updated the Pet details");
        }
    });
};

// DELETE /pets/petId lets delete a pet by id
export let deletePet = (req: Request, res: Response) => {
    Pet.deleteOne({_id: req.params.petId}, (err: any) => {
        if (err) {
            res.send(err);
        } else {
            res.send("Successfully deleted the pet details");
        }
    });
};
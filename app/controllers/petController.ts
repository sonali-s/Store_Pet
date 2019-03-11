import { Request, Response} from 'express';
import PetService from '../services/petService';
// import Pet from './../models/pet';

export class PetController {
    private petService: PetService;

    public constructor(petService: PetService) {
        this.petService = petService;
    }

    public getAllPets = async (req: Request, res: Response) => {
        try {
            const pets = await this.petService.getAllPets();
            res.status(200).json(pets);
        } catch (error) {
            res.status(500).send(error);
        }
    }
}

export default PetController;

// // GET /pets/petId gives a pet by id
// export let getPet = (req: Request, res: Response) => {
//     Pet.findById(req.params.petId, (err: any, pets: any) => {
//         if (err) {
//             res.send(err);
//         } else {
//             res.send(pets);
//         }
//     });
// };
// // POST /pets lets insert a new pet
// export let addPet = (req: Request, res: Response) => {
//     const pet = new Pet(req.body);

//     pet.save((err: any, pets: any) => {
//         if (err) {
//             res.send(err);
//         } else {
//             res.send(pets);
//         }
//     });
// };

// // PUT /pets/petId lets update a pet by id
// export let updatePet = (req: Request, res: Response) => {
//     Pet.findByIdAndUpdate(req.params.petId, req.body, (err: any, pets: any) => {
//         if (err) {
//             res.send(err);
//         } else {
//             res.send("Successfully updated the Pet details");
//         }
//     });
// };

// // DELETE /pets/d lets delete a pet by id
// export let deletePet = (req: Request, res: Response) => {
//     Pet.deleteOne({ _id: req.params.petId }, (err: any) => {
//         if (err) {
//             res.send(err);
//         } else {
//             res.send("Successfully deleted the pet details");
//         }
//     });
// };
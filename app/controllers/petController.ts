import { Request, Response} from 'express';
import AppConstants from '../constants/appConstant';
import BaseController from './../controllers/baseController';

import PetService from '../services/petService';
// import Pet from './../models/pet';

export class PetController extends BaseController {
    private petService: PetService;

    public constructor(petService: PetService) {
        super();
        this.petService = petService;
    }

    public getAllPets = async (req: Request, res: Response) => {
        try {
            const pets = await this.petService.getAllPets();
            return this.appResponse.success(res, {pets});
        } catch (error) {
            return this.appResponse.error(
                res,
                AppConstants.ERROR_CODES.ERR_INTERNAL_SERVER_ERROR,
                res.__(AppConstants.ERROR_MESSAGES.ERR_INTERNAL_SERVER_ERROR),
            );
        }
    }
    public getPetById = async (req: Request, res: Response) => {
        try {
            const id = req.params.petId;
            const pet = await this.petService.getPetById(id);
            return this.appResponse.success(res, {pet});
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
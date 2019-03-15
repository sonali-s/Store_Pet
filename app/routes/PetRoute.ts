import wiring from '../wiring';

export class Routes {
    public routes(app: any): void {
        app.get('/pets', wiring.petController().getAllPets);
        app.get('/pets/ById/:petId', wiring.petController().getPetById);
        app.get('/pets/:petName', wiring.petController().getPetByName);
        app.post('/pets', wiring.petController().createPet);
        app.delete('/pets/:petId', wiring.petController().deletePet);
        app.put('/pets/:petId', wiring.petController().updatePet);
    }
}
export default Routes;

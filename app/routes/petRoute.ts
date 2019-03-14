import wiring from './../wiring';

export class Routes {
    public routes(app: any): void {
        app.get('/pets', wiring.petController().getAllPets);
        app.get('/pets/ById/:petId', wiring.petController().getPetById);
    }
}
export default Routes;

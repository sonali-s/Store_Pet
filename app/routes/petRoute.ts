import wiring from './../wiring';

export class Routes {
    public routes(app: any): void {
        app.get('/pets', wiring.petController().getAllPets);
    }
}
export default Routes;

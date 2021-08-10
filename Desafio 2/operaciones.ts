export class Operaciones {
    private n1: number;
    private n2: number;
    private operation: string;

    constructor(n1:number, n2:number, operation:string) {
        this.n1 = n1;
        this.n2 = n2;
        this.operation = operation;
    }

    public resultado(){
        return new Promise((resolve, reject) => {
            switch (this.operation) {
                case 'sumar':
                    resolve(this.n1 + this.n2);
                    break;
                case 'restar':
                    resolve(this.n1 - this.n2);
                    break;
                default:
                    reject('Operacion no reconocida: Introducir sumar o restar!')
                    break;
            }
        })
    }
}
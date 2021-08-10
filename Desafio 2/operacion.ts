
const operacion = async (
    n1:number,
    n2:number,
    operation:string,
    ) => {
    const {Operaciones} = await import('./operaciones');
    try {
        let resultado = await new Operaciones(n1, n2, operation)
        return resultado.resultado()

    } catch (error) {
        return error;
    }
};


operacion(5,2,'sumar')
.then((value)=> console.log(`Operacion Suma realizada: Resultado ${value}`))
.catch((e)=> console.log(`Error: ${e}`))

operacion(5,2,'restar')
.then((value)=> console.log(`Operacion Resta realizada: Resultado ${value}`))
.catch((e)=> console.log(`Error: ${e}`))

operacion(5,2,'exp')
.then((value)=> console.log(`Operacion Exp realizada: Resultado ${value}`))
.catch((e)=> console.log(`Error: ${e}`))
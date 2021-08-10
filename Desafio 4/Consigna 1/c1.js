// import { Observable, fromEvent } from 'rxjs'
// import { filter, map } from 'rxjs/operators'

const { Observable, fromEvent } = rxjs

document.addEventListener('DOMContentLoaded', (e) => {
    let txtInput = document.querySelector('#txtInput');
    let txtMirror = document.querySelector('#txtMirror')

    const cleanInput = () => {
        txtInput.value = '';
        txtMirror.innerHTML = '';
        txtInput.disabled = true;
    }

    const observable = new Observable((subscriber) => {
        try {
            const keyInput = fromEvent(txtInput, 'keyup')
            keyInput.subscribe(e => {
                if (e.target.value === 'error') {
                    subscriber.error('Proceso finalizado por tipear "error" ')
                } else if (e.target.value === 'complete') {
                    subscriber.complete()
                } else {
                    subscriber.next()
                }
            })

            setTimeout(() => {
                subscriber.complete()
            }, 30000);
        } catch (err) {
            subscriber.error(err)
        }
    })

    const observer = {
        next: x => {
            const txt = txtInput.value.split('').reverse().join('');
            txtMirror.innerHTML = txt;
        },
        error: err => {
            cleanInput()
            console.log(err)
        },
        complete: () => {
            cleanInput()
            console.log('Proceso Finalizado por tipear "complete" o cumplir el plazo de 30 seg')
        }

    }

    observable.subscribe(observer)

})
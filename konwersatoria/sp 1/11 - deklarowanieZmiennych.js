/*
1. wywołanie niezadeklarowanej zmiennej zwraca: is not defined
2. wywołanie zmiennej bez wartości: undefined
*/

// Let, const
let x = 10
console.log(x)
/** let - 'następca' var, przypisane do funkcji, bloku, konstrukcji */
function letTest() {
    let x = 1
    if (true) {
        let x = 2 // different variable
        for (let x = 1; x < 11; x++) { //yet another variable
            log(x)
        }
        log(x) // 2
    }
    log(x) // 1
}

// let, const - wynosi jedynie deklarację! (błąd cannot access someVar before initialization
// console.log(PI)
const PI = 3.14

// let i const podlegają tzw. Temporal Dead Zone
// TDZ - kod od początku zakresu leksykalnego (tzw. scope, np. funkcja, ogólnie: {}) do deklaracj let/const
// 
// z MDN
{ // początek TDZ dla letVar
    const func = () => console.log(letVar); // 'użyte' przed let-em

    // func(); // wewnątrz TDZ
    let letVar = 3; // koniec TDZ
    func(); // już za TDZ
}


// tools
function log(...msgs) {
    let ret = msgs.join(', ')
    console.log(...msgs)
    return ret
}


// typy i wartości "puste"
let empty = undefined
let empty2 = null
const user = {
    name: 'tim',
    email: undefined
}
const json = JSON.stringify(user)

let name2 = null
// name2 = undefined
name2.length

typeof name2
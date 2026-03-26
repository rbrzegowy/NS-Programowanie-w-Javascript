// Przydatne metody konstruktora Object:

// Object.assign – kopiuje właściwości z obiektów źródłowych do docelowego
const merged = Object.assign({}, { a: 1 }, { b: 2 }, { c: 3 });

// Object.create – tworzy nowy obiekt z podanym prototypem
const proto = { greet() { return "hi"; } };
const obj = Object.create(proto);
// lub do czego jest częściej używane: 
// tworzy obiekt bez prototypu
const noProto = Object.create(null)


// Object.preventExtensions – blokuje dodawanie/usuwanie właściwości
const noExtend = Object.preventExtensions({ a: 1 });
// Object.seal - mocniejsze – dodatkowo oznacza wszystkie właściwości jako niekonfigurowalne  
const sealed = Object.seal({ a: 1 });
// Object.freeze – zamraża obiekt (robi shallow readonly)
const frozen = Object.freeze({ a: 1 });
// Sprawdzenie stanu obiektu
Object.isExtensible({});
Object.isFrozen(frozen);
Object.isSealed(sealed);


// Object.defineProperty – definiuje pojedynczą właściwość z deskryptorem
Object.defineProperty(obj, "id", { value: 1, writable: false, configurable: false, enumerable: true });

// Object.defineProperties – definiuje wiele właściwości naraz
Object.defineProperties(obj, {
  name: { value: "Jan", writable: true },
  age: { value: 30 }
});

// Object.hasOwn – sprawdza czy obiekt ma własną właściwość
Object.hasOwn({ a: 1 }, "a");

// Object.keys – zwraca tablicę nazw własnych właściwości
Object.keys({ a: 1, b: 2 });

// Object.values – zwraca tablicę wartości
Object.values({ a: 1, b: 2 });

// Object.entries – zwraca tablicę par [klucz, wartość]
Object.entries({ a: 1, b: 2 });

// Object.fromEntries – tworzy obiekt z tablicy par [key,value]
const obj2 = Object.fromEntries([["a", 1], ["b", 2]]);

// Object.is – porównanie wartości (lepsze niż === dla NaN i -0)
Object.is(NaN, NaN);


// Object.getOwnPropertyDescriptor – pobiera deskryptor właściwości
Object.getOwnPropertyDescriptor(obj2, "a");

// Object.getOwnPropertyDescriptors – pobiera wszystkie deskryptory
Object.getOwnPropertyDescriptors(obj2);

// Object.getOwnPropertyNames – zwraca wszystkie nazwy właściwości (także non-enumerable)
Object.getOwnPropertyNames(obj2);

// Object.getOwnPropertySymbols – zwraca symbole jako klucze
Object.getOwnPropertySymbols({ [Symbol("x")]: 1 });

// Object.getPrototypeOf – zwraca prototyp obiektu
Object.getPrototypeOf(obj);

// Object.setPrototypeOf – ustawia prototyp obiektu
Object.setPrototypeOf(obj2, proto);


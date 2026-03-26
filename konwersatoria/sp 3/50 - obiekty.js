// ------------
// Obiekty
// ------------

/* Wprowadzenie:
 co w javascript nie jest obiektem: liczby, teksty, boolean, undefined, symbol, bigint (prymitywy)
 ..prawie - liczby, teksty i boole mają metody (ale nie można ich zmieniać - zobacz )
obiekty są KOLEKCJAMI właściwości (trochę jak tablice asocjacyjne)
*/


// ----------------------
// Literał obiektu - JSON
// ----------------------

let pustyObiekt = {}

let oceny = { 'js': 2 }
let nazwisko = 'brzegowy'

const student = {
	imie: 'janek',
	nazwisko,
	wiek: 20,
	'wybrane-przedmioty': 'js',
	koledzy: {
		lista: ['krzychu', 'zdzichu', 'krycha']
	},
	czySpozywal: function () {
		return hour > 12
	},
	oceny
}




const studentString = JSON.stringify(student)


// student = {} // nie jest ok
student.wiek = 100 // jest ok:)

let klucz = 'wybrane-przedmioty'
student[klucz]
props = ['wiek', 'imie', 'koledzy']

// iteracja po obiekcie
for (let prop in props) {
	console.log(student[prop])
}




// Fabryka obiektów (z literału)
function zbudujStudenta(imie, nazwisko, wiek, wybranePrzedmioty, koledzy, oceny) {
	return {
		imie: imie,
		nazwisko: nazwisko,
		wiek: wiek,
		'wybrane-przedmioty': wybranePrzedmioty,
		koledzy: koledzy,
		czySpozywal: () => {
			return hour > 12 ? true : false
		},
		// wartość ze zmiennej o tej samej nazwie co klucz
		oceny
	}
}

let student2 = zbudujStudenta('janek', 'nowak', 20, ['js', 'c#'], { lista: [] }, { 'js': [4], 'c#': [3], 'filozofia': [5] });
let student3 = zbudujStudenta('kasia', 'kowal', 19, ['js', 'c#'], { lista: [] }, { 'js': [5], 'c#': [5], 'filozofia': [5] });
// let student3 = zbudujStudenta({ imie: 'kasia', nazwisko: 'kowal', wiek: 19, oceny: { 'js': [4] } });

let fabrykaLodow = function (rodzaj) {
	return {
		nazwa: 'lód', //fabryka wie co tworzy, nie przekazujemy w paramsach
		rodzaj,
		czymJestem: function () {
			return `jestem ${this.nazwa} ${this.rodzaj}`
		}
	}
}

let malinowy = fabrykaLodow('malinka')
console.log('[fabryka]', typeof malinowy, malinowy.czymJestem())


// ------------------------------------------------------------
// Obiekty z funkcji z użyciem 'new' - funkcja konstruktora
// ------------------------------------------------------------
function Samochod(marka, model, blachy) {
	this.marka = marka || 'none'
	this.model = model || 'null'
	this.blachy = blachy || 'zero'
	this.opiszMnie = function () {
		console.log(`[Samochod] Jestem ${this.marka} ${this.model}, numer rejestracyjny: ${this.blachy}`)
	}
}

let fiacik = new Samochod('fiat', '500', 'KR12312')
let opelek = new Samochod('opelek', '500', 'KR12312')
fiacik.opiszMnie()


// -----------
// Klasy
// -----------

const wybranePrzedmiotyName = 'wybrane-przedmioty'
class Student {
	#dataInstancji = new Date()
	#punktyZycia = 0

	wiek
	#zaleglosciWOplatach = 0

	get zaleglosciWOplatach() {
		if (this.#zaleglosciWOplatach > 0) {
			return 'Masz zaległości w wysokości:' + this.#zaleglosciWOplatach
		} else {
			return 'Brawo, jesteśmy na zero!'
		}
	}
	set zaleglosciWOplatach(val) {
		// walidacja
		this.#zaleglosciWOplatach = val * 100
	}

	// no setter = readonly
	get punktyZycia() {
		return this.#punktyZycia
	}
	// set punktyZycia(val) {
	// 	if (val < 100) {
	// 		this.#punktyZycia = val
	// 	}
	// }
	getPunktyZycia() {
		return this.#punktyZycia
	}

	constructor(imie, nazwisko, wiek, wybranePrzedmioty, koledzy, oceny) {
		this.imie = imie;
		this.nazwisko = nazwisko;
		this.wiek = wiek;
		this['wybrane-przedmioty'] = wybranePrzedmioty;
		// this[wybranePrzedmioty] = wybranePrzedmioty;
		this.koledzy = koledzy;
		this.oceny = oceny;

	}

	pobierzStanOplat = function () {
		if (this.#zaleglosciWOplatach > 0) {
			return 'Masz zaległości w wysokości:' + this.#zaleglosciWOplatach
		} else {
			return 'Brawo, jesteśmy na zero!'
		}
	}

	dataRejestracji() {
		return this.#dataInstancji.toLocaleString()
	}
	nawodnij(kwota) {
		this.#punktyZycia += +kwota
	}
}
const st4 = new Student('kasia', 'kowal', 19, ['js', 'c#'], { lista: [] }, { 'js': [5], 'c#': [5], 'filozofia': [5] })
st4.zaleglosciWOplatach = -1000

function Student2() {
	this.imie = imie;
	this.nazwisko = nazwisko;
	this.wiek = wiek;
	this.nawodnij = function (kwota) {
		this.#punktyZycia += +kwota
	}
}
const s1 = new Student2()

const x = [1, 3, 4]

// 	this.#punktyZycia += +kwota
// }

// console.log(stk.pobierzStanOplat())
console.log(st4.zaleglosciWOplatach)

// pobieranie właściwości obiektu
console.log(
	student.imie + ' ' + student.nazwisko
)
// korzystanie z wlasciwosci obiektu jak z tablicy asocjacyjnej
// const coChceszZObiektu = 'imie'
// student[coChceszZObiektu]
// student['wybrane-przedmioty']

// przekazywanie obiektów odbywa się zawsze przez referencję
let s2 = student


// przypisanie wartości i rozszerzanie obiektów
s2.jadl = false
s2.imie = 'zofia'
console.log('[ref]', student.imie, s2.jadl) // sprawdzenie referencji z poprzedniego punktu

// usuwanie właściwości obiektu
delete s2.jadl
console.log(student.jadl)


// hoisting klas
// klasy nie podlegają hoistingowi z powodu dziedziczenia (dziedziczenie jest 'liczone' w momencie deklaracji klasy)
// rozwinięcie punktu: https://developer.mozilla.org/pl/docs/Web/JavaScript/Reference/Classes

// const rybnik = new Miasto()
class Miasto {
	constructor(nazwa, szer, wys) {
		this.nazwa = nazwa
		this.szerGeog = szer
		this.dlGeog = wys
	}

	pobierzIloscMieszkancow() {
		return this.iloscMieszkancow
	}

	toString() {
		return `${this.nazwa}, położenie: ${this.szerGeog}, ${this.dlGeog}`;
	}
}
// lub: let Miasto = class {}

let krakow = new Miasto('Kraków', 50.3, 16.5)
console.log(krakow.nazwa)


// --------------------
// Dziedziczenie
// ---------------------
class Metropolia extends Miasto {
	constructor(nazwa, szer, wys, ilMieszkancow) {
		super(nazwa, szer, wys) // wywołanie konstruktora klasy nadrzędnej
		this.iloscMieszkancow = 10_000_000
	}


}

// heheszki
console.log(typeof Metropolia)

// właściwości, metody i bloki statyczne klas
class Polska {
	static stolica = 'Warszawa'
	static #miasta = ['Warszawa', 'Kraków', 'Wrocław', 'Gdańsk']

	static losujMiasto() {
		const indeksMiasta = Math.floor(Math.random() * 4)
		return this.#miasta[indeksMiasta]
	}

	static {
		console.log('A ten blok kodu wykona się jako pierwszy przy inicjalizacji klasy')
	}
}
console.log(Polska.stolica)
console.log(Polska.losujMiasto())

// ---------------------------------
// Dostęp do kolekcji właściwości
// ---------------------------------

// Pobranie kluczy obiektu
const keys = Object.keys(st4)

// Pobranie wartości właściwości obiektu
const values = Object.values(st4)

// Pobranie par klucz-wartość (w formie tablic)
const entries = Object.entries(st4)


// Sprawdzenie czy obiekt posiada właściwość o podanej nazwie (z wykluczeniem właściwości z prototypu)
const czyStudentMaImie = Object.hasOwn(st4, 'imie')
// lub  starsza wersja: st4.hasOwnProperty('imie')

// Stworzenie obiektu bez prototypu
const noProtoObject = Object.create(null)


// -----------------------
// Prototypy obiektów
// -----------------------

// prototypy to obiekty
// prototypem wszystkich obiektów jest obiekt Object.prototype (zastanawiałeś/aś się kiedyś skąd mamy mojObiekt.toString()? itd).
// A prototypem dla Object.prototype jest null:D
// prototypy obiektów są przechowywane we właściwości .__proto__ (można też pobrać z użyciem Object.getPrototypeOf())
// obiekty "dziedziczą" wszystkie metody i właściwości z obiektów w łańcuchy prototypów
// metody/właściwości prototypu moga zostać nadpisane w dziecku

// zmiana struktury prototypu skutkuje identyczną zmianą w obiektach powstałych na bazie tego prototypu

// Prototypem obiektu nie zawsze jest bezpośrednio Object.prototype.
// ...np. tablice powstają z obiekty Array.prototype (tu mamy find, filter, map etc)
// ....daty: now = new Date(). now.__proto__ to Date.prototype

// Tworzenie obiektów z konkretnego proto:
// (1) const child = Object.create(parent)
// (2) class {}
// (3) const x = new function() // funkcja konstruktora



// można redefiniować prototypy obiektów - forma dziedziczenia prototypowego
Samochod.prototype.silnik = 'benzyna'
console.log(fiacik.silnik)
// co tu się stało: js szukał właściwości 'silnik' w:
// 1. obiekcie fiacik - nie znalazł
// 2. prototypie obiektu fiacik (czyli w samochod) - nie znalazł
// 3. w prototypie samochod - znalazł.
// 4. gdyby nie znalazł - dotarłby do Object.prototype i potem do jego proto -> null
// Addon: Jeśli chcesz szukać jedynie we właściwościach nieodziedziczonych z prototypu, 
// sprawdzaj właściwości z użyciem:
console.log(Object.hasOwn(fiacik, 'silnik'))

const tab = [] /// tab.__proto__ -> Array.prototype



// Szybkie deep copy
// const studentString = JSON.stringify(student)
// const studentCopy = JSON.parse(studentString)


// --------------------
// Prototypy funkcji
// --------------------

// funkcje jako obiekty również posiadają swój prototyp: Function.prototype
// prototyp każdej funkcji jest dostępny w nazwaFunkcji.prototype (w odróżnieniu od mojObiekt.__proto__)

// jeżeli funkcji użyjemy jako konstruktora, jej .prototype stanie się __proto__ nowego obiektu
// const xiaocar = new Samochod()
// wtedy: xiaocar.__proto__ === Samochod.prototype
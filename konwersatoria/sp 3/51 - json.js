// -----------
// JSON
// -----------

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
	oceny: [{ 'js': 3 }]
}

const s2 = { ...student }

// serializacja obiektu do string
const jsonUser = JSON.stringify(user)

// deserializacja json-a ze stringa do obiektu
const newUser = JSON.parse(jsonUser)


// robiąc serializację i deserializację robimy "deep copy" obiektów (wartości, bez metod)
// const studentString = JSON.stringify(student)
// const studentCopy = JSON.parse(studentString)
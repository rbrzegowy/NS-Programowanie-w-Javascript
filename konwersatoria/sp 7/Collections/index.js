// Już poznane - [] i {}

document.addEventListener('DOMContentLoaded', () => {
  renderMapExample();
  renderSetExample();
  renderWeakMapExample();
  renderWeakSetExample();
});

// Map - zbiór par klucz-wartość. Główne cechy odróżniające Map od {}
// * kluczem może być praktycznie cokolwiek (np. boolean, inny obiekt, funkcja, symbol)
// * brak kluczy dla pustej mapy (vs prototype obiektu)
// * Map ma .size
// Map ma lepszą wydajność dla częstych zmian
// pełne porównanie Map do obiektu: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#objects_vs._maps
function renderMapExample() {
  // ustawianie wartości: .set()
  // pobieranie wartości. .get(), .entry, .keys, .values, .forEach, .groupBy()
  // usuwanie: .delete(), .clear()
  // sprawdzanie: .has()
  // ilość elementów: .size
  const rates = new Map();

  // * klucze zawsze w kolejności dodania
  // * kluczem może cokolwiek (np. liczba, string, inny obiekt, tablica, funkcja)
  rates.set('Cyberpunk 2077', 7);
  rates.set('Elden Ring', 9);
  rates.set("Baldur's Gate 3", 8);

  const lines = [];
  lines.push(`Liczba wpisów (ocen): ${rates.size}`);

  for (const [game, rate] of rates) {
    lines.push(`${game} ma ocenę ${rate}`);
  }

  // * Mapa jest wydajniejsza od obiektu (przy częstych dodaniach/usunięciach par klucz-wartość)
  // * Mapa się nie serializuje:( (brakuje jej .toJSON()) - trzeba dodać argument replacer do JSON.stringify i reviver do JSON.parse()
  const json = JSON.stringify(rates, mapReplacer);
  const parsed = JSON.parse(json, mapReviver);
  lines.push(`JSON.stringify(mapa): ${json}`);
  lines.push(`Po JSON.parse typ: ${parsed instanceof Map ? 'Map' : typeof parsed}`);

  printLines('#map-output', lines);
}

function renderSetExample() {
  // Set
  const whatever = new Set();
  // * zbiór unikalnych wartości dowolnego typu
  // porównanie czy wartość jest unikalna następuje z użyciem algorytmu SameValueZero (to samo co ===, z wyjątkiem NaN===NaN)
  // * wartości są przechowywane w kolejności dodania
  // * jest iterable (można iterować za pomocą pętli, użyć spread operator itd)
  // *
  // dodawanie: .add()
  whatever.add(1);
  whatever.add(1); // nie doda, już jest
  whatever.add('jeden');
  whatever.add('jeden'); // nie doda, już jest
  const arr = [1, 2, 3];
  whatever.add(arr);
  whatever.add([1, 2]);
  whatever.add([1, 2]); // ref do innej (identycznej co do wartości) tablicy
  whatever.add(() => {
    console.log('hello twice in set!');
  });
  whatever.add(() => {
    console.log('hello twice in set!');
  }); // j/w

  // sprawdzenie czy wartość istnieje
  // pobranie wielkości set-a
  // usuwanie - .delete, .clear
  whatever.delete(1);

  const lines = [];
  lines.push(`[.has] czy set ma "jeden"? ${whatever.has('jeden')}`);
  lines.push(`[.size] Rozmiar seta: ${whatever.size}`);
  lines.push(`[.values] Podgląd typów wartości w secie: ${[...whatever].map((value) => typeof value).join(', ')}`);

  // Set ma fajny zestaw metod do pracy na zbiorach - łączenie, część wspólna etc:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set#set_composition
  // .difference, .intersection, .union, .symmetricDifference, .isDisjointFrom, .isSubsetOf, .isSupersetOf
  printLines('#set-output', lines);
}

function renderWeakMapExample() {
  // WeakMap i WeakSet
  // WeakMap/Set rozwiązują problem "przywiązania" Map zawartości - łatwo o memory leak, gdy kluczem jest obiekt do którego istnieje referencje tylko z Map
  // WeakMap w takim przypadku usunie klucz i wartość
  const cache = new WeakMap();
  let user = { id: 1 };
  cache.set(user, {
    config: { theme: 'dark' },
  });

  const hasBeforeNull = cache.has(user);
  user = null;
  // efekt - user wskazuje na null, ale obiekt {id: 1} nadal istnieje w pamięci, bo jest kluczem w cache

  // nowy przykład WeakMap
  const sessionMeta = new WeakMap();
  const tab = { id: 'tab-1' };
  sessionMeta.set(tab, { openedAt: Date.now(), dirty: true });

  const lines = [];
  lines.push(`cache.has(user) przed user = null: ${hasBeforeNull}`);
  lines.push('Po user = null wpis jest kandydatem do usunięcia przez GC (nie da się tego wymusić ani podejrzeć natychmiast).');
  lines.push(`Czy sessionMeta ma tab? ${sessionMeta.has(tab)}`);
  lines.push(`sessionMeta.get(tab).dirty: ${sessionMeta.get(tab).dirty}`);

  printLines('#weakmap-output', lines);
}

function renderWeakSetExample() {
  // WeakSet - kolekcja "garbage-collectable" elementów. W praktyce - kolekcja obiektów i niezarejestrowanych symboli
  // WeakSet nie jest enumerowalny
  // Metody: .add, .has, .delete

  // WeakMap - klucze muszą być "garbage-collectable" (jak w WeakSet). Wartości mogą być dowolne, byle nie miały referencji do kluczy w WeakMap
  // WeakMap nie jest enumerowalny
  const visited = new WeakSet();
  const nodeA = { name: 'A' };
  const nodeB = { name: 'B' };

  visited.add(nodeA);
  visited.add(nodeB);
  visited.delete(nodeB);

  // nowy przykład WeakSet
  const activeForms = new WeakSet();
  const formRef = { id: 'login-form' };
  activeForms.add(formRef);

  const lines = [];
  lines.push(`Czy visited ma nodeA? ${visited.has(nodeA)}`);
  lines.push(`Czy visited ma nodeB po delete? ${visited.has(nodeB)}`);
  lines.push(`Czy activeForms ma formRef? ${activeForms.has(formRef)}`);
  lines.push('WeakSet nie ma forEach ani iteratora - nie można wypisać całej zawartości.');

  printLines('#weakset-output', lines);
}

function printLines(selector, lines) {
  const host = document.querySelector(selector);
  if (!host) {
    return;
  }

  host.innerHTML = '';
  for (const line of lines) {
    const row = document.createElement('p');
    row.className = 'demo-row';
    row.textContent = line;
    host.appendChild(row);
  }
}

function mapReplacer(key, value) {
  if (value instanceof Map) {
    return {
      __type: 'Map',
      entries: [...value],
    };
  }
  return value;
}

function mapReviver(key, value) {
  if (value && value.__type === 'Map') {
    return new Map(value.entries);
  }
  return value;
}


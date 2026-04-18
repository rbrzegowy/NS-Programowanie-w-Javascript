getElements()
updateSizeReadout()


// 1. pobieranie elementu/elementow ze struktury DOM
function getElements() {
  const okButton = document.querySelector('#ok')
  // stary sposób
  const cancelButton = window.document.getElementById('cancel')

  const sectionContainer = document.querySelector('.container')

  const imgList = document.querySelectorAll('.thumb')
  const priceList = document.getElementsByClassName('price')

  console.group('1. Pobieranie elementow i list')
  console.log('cancelButton:', cancelButton)
  console.log('sectionContainer:', sectionContainer)
  console.log('okButton:', okButton)
  console.log('imgList:', imgList)
  console.log('priceList:', priceList)
  console.groupEnd()
}

// 2. zamiana zawartosci elementu
function changeElementContent() {
  const target = document.querySelector('#content-box')
  const target2 = document.querySelector('#content-box2')
  if (!target || !target2) return

  // 1. innerHTML - pozwala na wstawienie fragmentu HTML-a
  target.innerHTML = '<h1>Rzeźbimy HTML-a z JS-a</h1>'

  // 2. textContent
  target2.textContent = 'textContent: <b>bezpieczny</b> tekst bez interpretacji znacznikow'
  // target2.innerText = 'textContent: <b>bezpieczny</b> tekst bez interpretacji znacznikow'
}

// 3. tworzenie nowego elementu
function createNewElement() {
  const box = document.querySelector('#create-box')
  if (!box) return

  const newOk = document.createElement('button')
  newOk.textContent = 'Nowy przycisk (createElement)'
  newOk.className = 'source-btn'
  box.appendChild(newOk)

  const container = document.createElement('div')
  container.className = 'thumb thumb-1'

  // ex
  // const newImg = document.createElement('img')
  // newImg.src = 'https://placeimg.com/200/200/animals'
  // container.appendChild(newImg)
  // const title = document.createElement('h3')
  // title.textContent = 'Nowy obrazek (createElement)'
  // container.appendChild(title)
  // box.appendChild(container)

  // lub
  // const branch = `
  //   <div class="thumb thumb-1">
  //     <img src="https://placeimg.com/200/200/animals" alt="Nowy obrazek (innerHTML)">
  //     <h3>Nowy obrazek (innerHTML)</h3>
  //   </div>
  // `
  // box.innerHTML += branch
}

// 4. kopia gałęzi DOM
function cloneElement() {
  const source = document.querySelector('#clone-source')
  const box = document.querySelector('#clone-box')
  if (!source || !box) return

  const okClone = source.cloneNode(true)
  okClone.id = ''
  okClone.textContent = `${source.textContent} (klon)`
  box.appendChild(okClone)
}

// 5. zmiana struktury DOM
function changeElementDescendants() {
  const box = document.querySelector('#descendants-box')
  if (!box) return

  const chipB = document.querySelector('#chip-b')
  // usunięcie lub podmiana elementu
  if (chipB && chipB.parentNode === box) {
    box.removeChild(chipB) // .replaceChild() analogicznie
  }
  const chipA = document.querySelector('#chip-a')
  // dodanie elementu
  box.appendChild(createDomChip('Element D (appendChild)')) //.prepend() analogicznie
  // przeniesienie elementu
  box.appendChild(chipA)
}

// 6. wstawianie przed elementem - jesli element istnieje w DOM -> zostanie przeniesiony
function changeSiblings() {
  const box = document.querySelector('#insert-box')
  const ref = document.querySelector('#insert-ref')
  const movable = document.querySelector('#insert-box .chip-to-move')
  if (!box || !ref || !movable) return

  ref.before(movable)
  ref.after(createDomChip('Nowy element'))
  // stary sposób
  // box.insertBefore(movable, ref)
  // box.insertBefore(createDomChip('Wstawiony element'), ref)
}

// 7. style css
function changeElementStyle() {
  const box = document.querySelector('#style-box')
  if (!box) return

  box.style.background = '#111827'
  box.style.color = '#f9fafb'
  box.style.marginTop = '10px'

  const computed = window.getComputedStyle(box)
  console.log('computed styles:', computed)
  document.querySelector('#style-log').textContent = `computed background: ${computed.backgroundColor}`
}

// klasy css
function changeElementClasses() {
  const box = document.querySelector('#style-box')
  if (!box) return

  // 1. className - do czyszczenia/nadpisywania
  box.className = 'demo-box style-target'

  // 2. classList - do manipulacji pojedynczymi klasami
  // box.classList.add('highlighted')
  box.classList.toggle('highlighted')
  document.querySelector('#style-log').textContent = `contains('highlighted'): ${box.classList.contains('highlighted')}`
}

// 8. zmiana atrybutow
function changeElementAttributes() {
  const btn = document.querySelector('#attr-btn')
  if (!btn) return

  const isDisabled = btn.getAttribute('disabled')
  isDisabled
    ? btn.removeAttribute('disabled')
    : btn.setAttribute('disabled', 'disabled')

  document.querySelector('#attr-log').textContent = `disabled: ${isDisabled}`
}

// 8. praca datasetami
// dataset to zestaw atrybutow data-* z HTML-a
function changeElementDataset() {
  const div = document.querySelector('#attr-div')
  if (!div) return

  document.querySelector('#attr-log').textContent = `dataset.id: ${div.dataset.id || 'brak'}, dataset.username: ${div.dataset.username || 'brak'}`
  console.log('dataset:', div.dataset)
}

// rozmiary elementu i viewport
// scrollWidth/scrollHeight - całość elementu (rownież niewidoczna część - np. z overflow: hidden)
// offsetWidth/offsetHeight - widoczna część elementu (z paddingiem i borderem)
// clientWidth/clientHeight - widoczna część elementu (bez bordera)
function updateSizeReadout() {
  const box = document.querySelector('#sizes-box')
  const output = document.querySelector('#sizes-output')
  if (!box || !output) return

  const sizeMap = {
    'window.innerWidth': window.innerWidth,
    'window.innerHeight': window.innerHeight,
    'offsetWidth': box.offsetWidth,
    'offsetHeight': box.offsetHeight,
    'clientWidth': box.clientWidth,
    'clientHeight': box.clientHeight,
    'scrollWidth': box.scrollWidth,
    'scrollHeight': box.scrollHeight,
  }

  output.innerHTML = Object.entries(sizeMap)
    .map(([key, value]) => `<dt>${key}</dt><dd>${value}px</dd>`)
    .join('')
}

function createDomChip(label, extraClass = '') {
  const chip = document.createElement('span')
  chip.className = `dom-chip ${extraClass}`.trim()
  chip.textContent = label
  return chip
}
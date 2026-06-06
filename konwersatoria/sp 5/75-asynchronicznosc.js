
setupCallbackDemo()
setupEventListenerDemo()
setupTimerDemo()
setupXhrDemo()
setupFetchPromiseDemo()
setupAsyncAwaitDemo()
setupPromiseCombinatorsDemo()
setupEventLoopDemo()
setupAbortDemo()
setupDebuggingDemo()


// ------------------
// 1 - callbacki
// ------------------
// warm up - image load in js
// mamy w html: <img src="https://picsum.photos/200/300" id="ob" />
const img = document.querySelector('#ob')
console.log(img.width)
const logo = new Image()

logo.addEventListener('load', logoLoaded)
logo.src = 'http://lorempixel.com/400/200/sports/'

console.log(`Image loaded, width: ${logo.width}`) //ups

function logoLoaded() {
  console.log(`Really loaded, width: ${logo.width}`)
  document.body.appendChild(logo)
}
// za pomocą callbackow odpowiedz: czy callback już nastąpił?
// jaki był wynik? a gdybym chciał poczekać na dwa callbacki?


function setupCallbackDemo() {
  const runBtn = document.querySelector('#cb-run')
  const clearBtn = document.querySelector('#cb-clear')
  const log = document.querySelector('#cb-log')

  function runLater(callback, delayMs) {
    logIt(log, `Planowanie callbacka (${delayMs} ms)`)
    setTimeout(() => callback(`Wykonano po ${delayMs} ms`), delayMs)
  }

  runBtn.addEventListener('click', () => {

    runLater(message => {
      logIt(log, `${message} @ ${nowTime()}`)
      throw new Error('Błąd w callbacku')
    }, 700)

  })

  clearBtn.addEventListener('click', () => {
    clearList(log)
  })
}
// ---------------------
// 2 - addEventListener
// ---------------------
function setupEventListenerDemo() {
  const area = document.querySelector('#event-area')
  const onceBtn = document.querySelector('#event-arm-once')

  const clearBtn = document.querySelector('#event-clear')
  const log = document.querySelector('#event-log')

  area.addEventListener('pointerenter', () => {
    area.classList.add('is-hot')
    logIt(log, `pointerenter @ ${nowTime()}`)
  })

  area.addEventListener('pointerleave', () => {
    area.classList.remove('is-hot')
    logIt(log, `pointerleave @ ${nowTime()}`)
  })

  area.addEventListener('click', () => {
    logIt(log, `click @ ${nowTime()}`)
  })

  onceBtn.addEventListener('click', () => {
    logIt(log, 'Dodano listener z { once: true }')
    area.addEventListener(
      'click',
      () => {
        logIt(log, `once-click odpalił się tylko raz @ ${nowTime()}`)
      },
      { once: true }
    )
  })

  clearBtn.addEventListener('click', () => {
    clearList(log)
  })
}

// ----------------
//  3 - timery
// ----------------
function setupTimerDemo() {
  const timeoutBtn = document.querySelector('#timer-timeout')
  const startBtn = document.querySelector('#timer-start')
  const stopBtn = document.querySelector('#timer-stop')
  const counter = document.querySelector('#timer-counter')
  const log = document.querySelector('#timer-log')

  let intervalId = null
  let timeoutId = null
  let tick = 0

  timeoutBtn.addEventListener('click', () => {
    logIt(log, `setTimeout start @ ${nowTime()}`)
    timeoutId = setTimeout(() => {
      logIt(log, `setTimeout callback @ ${nowTime()}`)
    }, 1000)
  })

  startBtn.addEventListener('click', () => {
    if (intervalId !== null) {
      logIt(log, 'setInterval już działa')
      return
    }

    logIt(log, `setInterval start @ ${nowTime()}`)
    intervalId = setInterval(() => {
      tick += 1
      counter.textContent = `Tick: ${tick}`
    }, 1000)
  })

  stopBtn.addEventListener('click', () => {
    if (intervalId === null) {
      logIt(log, 'Brak aktywnego interval')
      return
    }

    clearInterval(intervalId)
    // clearTimeout(timeoutId)
    intervalId = null
    logIt(log, `setInterval stop @ ${nowTime()}`)
  })
}

// ----------------
//  4 - xhr
// ----------------
// Debugowanie - Developer Tools->Network->XHR

function setupXhrDemo() {
  const runBtn = document.querySelector('#xhr-run')
  const stateLog = document.querySelector('#xhr-state-log')
  const out = document.querySelector('#xhr-json')

  runBtn.addEventListener('click', () => {
    clearList(stateLog)
    out.textContent = 'Ładowanie...'

    const xhr = new XMLHttpRequest()
    xhr.addEventListener('readystatechange', e => {
      logIt(stateLog, `readyState=${e.target.readyState}, status=${e.target.status}`)
    })

    // try-catch wewnątrz callbacka, bo błędy w async fn nie są łapane przez zewnętrzny try-catch
    xhr.addEventListener('load', e => {
      try {
        out.textContent = safeJson(JSON.parse(e.target.responseText))
      } catch (error) {
        out.textContent = `Błąd parsowania JSON: ${error.message}`
      }
    })

    xhr.addEventListener('error', () => {
      out.textContent = 'Błąd sieci podczas XHR'
    })

    xhr.addEventListener('progress', (e) => {
      console.log(`http progress change: ${e.target.position}/${e.target.totalSize}`)
    })

    xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos/1', true)
    xhr.send()
  })
}

// ---------------------
//  5 - Promise i fetch
// ---------------------
// 1. chcemy asynchroniczność obsługiwać czysto i płasko - np. tak:
// koniecPracy
//     .catch(nadgodzinki)
//     .then(odswiezSie)
//     .then(znajdzTransport)
//     .catch(znajdzRower)
//     .catch(piechotaDoLata)
//     .then(znajdzKnajpe)
//     .then(bawSieDobrze)
//     .then(wrocBezpiecznie)
//     .finally(policemanGoniMnie)

// 2. Budowanie własnych Promise()
const p = new Promise((resolve, reject) => {
  // Promise może zostać rozwiązana lub odrzucona - nigdy obydwa przypadki
  // rozwiązanie Promise: resolve(retVal)
  // odrzucenie Promise: reject(retVal)
  setTimeout(() => {
    console.log("Promise resolved, but .then not fired..:(");
    resolve("Promises are cool!");
  }, 2000);
  setTimeout(() => {
    console.log("Promise rejected");
    // we reject and return Error object - exception
    reject("Promises can be rejected");
  }, 1000);
});
// check
p.then((data) => console.log(data)).catch((e) => console.log(e));

// // 3. Chaining - łączenie kolejnych Promise
// // przykład - dekorowanie elementu
// function addBold(enl) {return new Promise()}
// function addItalic(el) {return new Promise()}
// function addUnderline(el) {return new Promise()}
// function addBackgroud(el,color) {return new Promise()}
// new Promise.resolve('some text')
//   .then(addBold)
//   .then(addItalic)
//   .then(addUnderline)
//   .then(el => addBackgroud(el, 'red'))
//   .then(el => console.log('got decorated element', el))

// // inny przykład - działanie na dużych tablicach (Array.map, .find, .sort, filter) bez czekania na wynik

// // 4. Tworzenie defaultowo rozwiązanych lub odrzuconych Promises

// const resolved = Promise.resolve("I'm optimist!");
// const rejected = Promise.reject("I'm pesimist");

// function customFetch(url) {
//   if (!url) {
//     return Promise.reject('asd')
//   }
//   return new Promise((res, rej) => {
//     /// ladowanie

//   })
// }

// 7. Brak w Promise: obietnica może być rozwiązana jedynie raz - więc nie sprawdza się w ciągłych procesach (TIP: Observables).

// złapiemy jedynie pierwszy click

// let licznik = 0
// let pr = new Promise((resolve, reject)=>
// {
//     btn.addEventListener('click', ()=>{
//         resolve('btn kliknięty')
//     })
//     setTimeout(()=>{
//         reject('nie zdążył')
//         }
//         ,10000)
// })

function setupFetchPromiseDemo() {
  const runBtn = document.querySelector('#fetch-promise-run')
  const log = document.querySelector('#fetch-promise-log')
  const out = document.querySelector('#fetch-promise-json')

  runBtn.addEventListener('click', () => {
    clearList(log)
    out.textContent = 'Ładowanie...'

    logIt(log, 'Start fetch')
    runBtn.disabled = true
    fetch('https://jsonplaceholder.typicode.com/users/1')
      .then(response => {
        logIt(log, `HTTP ${response.status}`)
        return response.json()

      })
      .then(data => {
        logIt(log, 'Dane przetworzone w then #2')
        out.textContent = safeJson(data)
      })
      .catch(error => {
        logIt(log, `Błąd: ${error.message}`)
        out.textContent = `Błąd: ${error.message}`
      })
      .finally(() => {
        logIt(log, 'finally: koniec łańcucha')
        runBtn.disabled = false
      })
  })
}

// ---------------------
//  6 - async / await
// ---------------------
function setupAsyncAwaitDemo() {
  const runBtn = document.querySelector('#async-await-run')
  const parallelBtn = document.querySelector('#async-parallel-run')
  const log = document.querySelector('#async-log')
  const out = document.querySelector('#async-json')

  runBtn.addEventListener('click', async () => {
    clearList(log)
    out.textContent = 'Ładowanie...'

    try {
      logIt(log, 'await fetch(post/1)')
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/1')
      const data = await response.json()
      logIt(log, 'await response.json() zakończone')
      out.textContent = safeJson(data)
    } catch (error) {
      logIt(log, `Błąd: ${error.message}`)
      out.textContent = `Błąd: ${error.message}`
    }
  })

  parallelBtn.addEventListener('click', async () => {
    clearList(log)
    out.textContent = 'Ładowanie równoległe...'

    try {
      logIt(log, 'Start Promise.all dla 2 requestów')
      const [todoResponse, userResponse] = await Promise.all([
        fetch('https://jsonplaceholder.typicode.com/todos/2'),
        fetch('https://jsonplaceholder.typicode.com/users/2'),
      ])
      const [todo, user] = await Promise.all([todoResponse.json(), userResponse.json()])
      logIt(log, 'Oba requesty zakończone')
      out.textContent = safeJson({ todo, user })
    } catch (error) {
      logIt(log, `Błąd: ${error.message}`)
      out.textContent = `Błąd: ${error.message}`
    }
  })
}

function makeTask(name, delay, shouldReject = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldReject) {
        reject(new Error(`${name}: reject po ${delay} ms`))
        return
      }
      resolve(`${name}: resolve po ${delay} ms`)
    }, delay)
  })
}

// ---------------------
//  7 - łączenie Promise
// ---------------------
function setupPromiseCombinatorsDemo() {
  const allBtn = document.querySelector('#comb-all')
  const allSettledBtn = document.querySelector('#comb-allsettled')
  const raceBtn = document.querySelector('#comb-race')
  const anyBtn = document.querySelector('#comb-any')
  const out = document.querySelector('#comb-output')

  allBtn.addEventListener('click', async () => {
    try {
      const result = await Promise.all([makeTask('A', 300), makeTask('B', 500), makeTask('C', 250)])
      out.textContent = safeJson(result)
    } catch (error) {
      out.textContent = error.message
    }
  })

  allSettledBtn.addEventListener('click', async () => {
    const result = await Promise.allSettled([makeTask('A', 300), makeTask('B', 350, true), makeTask('C', 200)])
    out.textContent = safeJson(result)
  })

  raceBtn.addEventListener('click', async () => {
    try {
      const result = await Promise.race([makeTask('A', 700), makeTask('B', 300), makeTask('C', 450)])
      out.textContent = safeJson(result)
    } catch (error) {
      out.textContent = error.message
    }
  })

  anyBtn.addEventListener('click', async () => {
    try {
      const result = await Promise.any([makeTask('A', 320, true), makeTask('B', 420), makeTask('C', 500, true)])
      out.textContent = safeJson(result)
    } catch (error) {
      out.textContent = safeJson(error.errors)
    }
  })
}

// ---------------------
//  8 - Event Loop
// ---------------------
function setupEventLoopDemo() {
  const runBtn = document.querySelector('#loop-run')
  const log = document.querySelector('#loop-log')

  runBtn.addEventListener('click', () => {
    clearList(log)
    logIt(log, '1. kod synchroniczny start')

    setTimeout(() => {
      logIt(log, '4. makrotask: setTimeout(0)')
    }, 0)

    Promise.resolve().then(() => {
      logIt(log, '2. mikrotask: Promise.then')
    })

    queueMicrotask(() => {
      logIt(log, '3. mikrotask: queueMicrotask')
    })

    logIt(log, '1b. kod synchroniczny koniec')
  })
}

// ---------------------
//  9 - AbortController
// ---------------------
function setupAbortDemo() {
  const startBtn = document.querySelector('#abort-start')
  const abortBtn = document.querySelector('#abort-now')
  const status = document.querySelector('#abort-status')
  const log = document.querySelector('#abort-log')

  let controller = null

  startBtn.addEventListener('click', async () => {
    controller = new AbortController()
    status.textContent = 'Żądanie uruchomione...'
    logIt(log, `start @ ${nowTime()}`)

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/photos/1', {
        signal: controller.signal,
      })
      const data = await response.json()
      status.textContent = `Sukces: ${data.title.slice(0, 36)}...`
      logIt(log, `sukces @ ${nowTime()}`)
    } catch (error) {
      if (error.name === 'AbortError') {
        status.textContent = 'Żądanie anulowane przez AbortController'
        logIt(log, `abort @ ${nowTime()}`)
      } else {
        status.textContent = `Błąd: ${error.message}`
        logIt(log, `błąd @ ${nowTime()}`)
      }
    }
  })

  abortBtn.addEventListener('click', () => {
    if (!controller) {
      status.textContent = 'Brak aktywnego kontrolera do anulowania'
      return
    }
    controller.abort()
  })
}

// ----------------------
// 10 - debugowanie async
// ----------------------
function setupDebuggingDemo() {
  const runBtn = document.querySelector('#debug-run-diagnostics')
  const clearBtn = document.querySelector('#debug-clear-log')
  const log = document.querySelector('#debug-log')
  const summary = document.querySelector('#debug-summary')
  const checklist = document.querySelectorAll('#debug-checklist input[type="checkbox"]')

  runBtn.addEventListener('click', () => {
    clearList(log)
    logIt(log, `Start diagnostyki @ ${nowTime()}`)

    const checkedCount = [...checklist].filter(item => item.checked).length
    const totalCount = checklist.length

    logIt(log, `Kroki checklisty: ${checkedCount}/${totalCount}`)
    logIt(log, '1) Network: sprawdź status, czas, payload oraz response')
    logIt(log, '2) Sources: breakpoint w callback/then/await')
    logIt(log, '3) Console: loguj URL, status, czas i ewentualny stack')

    Promise.resolve().then(() => {
      logIt(log, 'Mikrotask: Promise.then wykonany')
    })

    setTimeout(() => {
      logIt(log, 'Makrotask: setTimeout(0) wykonany')
      summary.textContent = `Diagnostyka zakończona. Uzupełniona checklista: ${checkedCount}/${totalCount}`
    }, 0)
  })

  clearBtn.addEventListener('click', () => {
    clearList(log)
    summary.textContent = 'Brak diagnostyki'
  })
}

function nowTime() {
  return new Date().toLocaleTimeString()
}

function logIt(listEl, text) {
  const li = document.createElement('li')
  li.textContent = text
  listEl.appendChild(li)
}

function clearList(listEl) {
  listEl.innerHTML = ''
}

function safeJson(data) {
  return JSON.stringify(data, null, 2)
}


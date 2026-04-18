"use strict"
// nasłuchiwanie na eventy z DOM: .addEVentListener
document.addEventListener("DOMContentLoaded", app)
// koniec nasłuchiwania: .removeEventListener("DOMContentLoaded", app)

//addEventListener przekazuje do callback-a obiekt Event

// wcześniej:
// element.onclick = () => { } //Brrr
// inline: <button onclick="console.log()"> Brrr^2

let canvas, brush, mouseX, mouseY
let isDragging = false
const select = selector => document.querySelector(selector)

function app() {
    canvas = select('#canvas')
    brush = select("#brush")

    // Brush should move in canvas coordinate space.
    canvas.appendChild(brush)

    select("#btn").addEventListener('click', centerBrush)

    brush.addEventListener('touchstart', onBrushDragStart)
    brush.addEventListener('mousedown', onBrushDragStart)

    brush.addEventListener('touchmove', onBrushDragMove)
    brush.addEventListener('mousemove', onBrushDragMove)

    brush.addEventListener('touchend', onBrushDragEnd)
    brush.addEventListener('mouseup', onBrushDragEnd)
    brush.addEventListener('mouseleave', onBrushDragEnd)
}

function centerBrush() {
    brush.style.top = (canvas.clientHeight - brush.offsetHeight) / 2 + 'px'
    brush.style.left = (canvas.clientWidth - brush.offsetWidth) / 2 + 'px'
}

function getPointer(ev) {
    if (ev.touches && ev.touches.length > 0) {
        return ev.touches[0]
    }
    return ev
}

function updateBrushPosition(ev) {
    const pointer = getPointer(ev)
    const canvasRect = canvas.getBoundingClientRect()

    // Nowa pozycja pędzla liczona względem środka pędzla
    mouseX = pointer.clientX - canvasRect.left - brush.offsetWidth / 2
    mouseY = pointer.clientY - canvasRect.top - brush.offsetHeight / 2

    // Ograniczamy ruch do powierzchni canvas
    const maxX = canvas.clientWidth - brush.offsetWidth
    const maxY = canvas.clientHeight - brush.offsetHeight

    mouseX = Math.max(0, Math.min(mouseX, maxX))
    mouseY = Math.max(0, Math.min(mouseY, maxY))

    // Ustawiamy pozycję pędzla
    brush.style.top = mouseY + 'px'
    brush.style.left = mouseX + 'px'
}

function onBrushDragStart(ev) {
    // Zapobiegamy "przeciąganiu" ekranu na mobile
    ev.preventDefault()
    isDragging = true
    this.classList.add('red')
    updateBrushPosition(ev)
}

function onBrushDragEnd() {
    if (!isDragging) {
        return
    }

    isDragging = false
    brush.classList.remove('red')
}

function onBrushDragMove(ev) {
    if (!isDragging) {
        return
    }

    ev.preventDefault()
    updateBrushPosition(ev)
    bTM(ev)
}

let licznik = 0

function bTM(e) {
    if (!isDragging) {
        return
    }

    const pointer = getPointer(e)
    const canvasRect = canvas.getBoundingClientRect()

    const top = pointer.clientY - canvasRect.top
    const left = pointer.clientX - canvasRect.left

    if (top < 0 || left < 0 || top > canvas.clientHeight || left > canvas.clientWidth) {
        return
    }

    let p = document.createElement('div')
    p.classList.add('pedzel')
    p.style.top = top + 'px'
    p.style.left = left + 'px'
    licznik++
    canvas.appendChild(p)
}

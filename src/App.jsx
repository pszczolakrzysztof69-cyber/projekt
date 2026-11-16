import { useState } from 'react'
import './App.css'
import Header from './components/Header.jsx'
import KartaSamochodu from './components/KartaSamochodu.jsx'

const auta = [
  ['Mazda MX-5', 'Lekki roadster z dużą frajdą z jazdy.'],
  ['Toyota Corolla', 'Niezawodny samochód do codziennego użytku.'],
  ['Ford Mustang', 'Amerykański klasyk z mocnym charakterem.'],
  ['BMW E30', 'Stare auto z dużym stylem i klasą.'],
  ['Volkswagen Golf GTI', 'Mały, szybki i bardzo lubiany przez kierowców.'],
  ['Porsche 911', 'Ikona sportowej motoryzacji.'],
  ['Audi A4', 'Elegancki sedan z dobrym komfortem.'],
  ['Peugeot 206', 'Prosty i popularny model z dużym serwisem.'],
  ['Renault Clio', 'Mniejsze auto, łatwe w codziennym życiu.'],
  ['Mercedes C-Class', 'Klasa premium z wysokim komfortem.'],
]

const cytaty = [
  'Dobrze naprawione auto to spokój kierowcy i oszczędność czasu.',
  'Najważniejsza jest regularna konserwacja i troska o szczegóły.',
  'W warsztacie liczy się dokładność, cierpliwość i doświadczenie.',
  'Dobry samochód nie musi być nowy, by był świetny w trasie.',
]

function App() {
  const [szukaj, ustawSzukaj] = useState('')
  const [motyw, ustawMotyw] = useState('jasny')
  const [imie, ustawImie] = useState(() => {
    const zapisane = localStorage.getItem('portal-uzytkownik')
    return zapisane || ''
  })

  const [cytat] = useState(() => cytaty[Math.floor(Math.random() * cytaty.length)])

  const autaFiltr = auta.filter(([nazwa]) =>
    nazwa.toLowerCase().includes(szukaj.toLowerCase()),
  )

  function przedstawSie() {
    const wpisane = window.prompt('Jak masz na imię?')

    if (wpisane === null) {
      return
    }

    const noweImie = wpisane.trim()

    if (!noweImie) {
      window.alert('Wpisz swoje imię.')
      return
    }

    localStorage.setItem('portal-uzytkownik', noweImie)
    ustawImie(noweImie)
  }

  function zmienMotyw() {
    ustawMotyw((poprzedni) => (poprzedni === 'jasny' ? 'ciemny' : 'jasny'))
  }

  return (
    <main className={`strona ${motyw === 'ciemny' ? 'ciemny' : 'jasny'}`}>
      <div className="kontener">
        <Header tytul="Portal o samochodach" />

        <section className="gora">
          <div>
            <p className="etykieta">Warsztat</p>
            <h2>Naprawa, tuning i dobra obsługa</h2>
          </div>
          <div className="akcje">
            <button onClick={zmienMotyw} className="button sekundarny">
              {motyw === 'ciemny' ? 'Jasny' : 'Ciemny'}
            </button>
            <button onClick={przedstawSie} className="button">
              Przedstaw się
            </button>
          </div>
        </section>

        {imie && <p className="powitanie">Witaj ponownie, {imie}!</p>}

        <div className="szukaj">
          <label htmlFor="search">Szukaj</label>
          <input
            id="search"
            type="text"
            value={szukaj}
            onChange={(event) => ustawSzukaj(event.target.value)}
            placeholder="np. Mazda"
          />
        </div>

        <div className="cytat">
          <p className="etykieta">Ciekawostka</p>
          <p>{cytat}</p>
        </div>

        <section className="lista">
          {autaFiltr.length > 0 ? (
            autaFiltr.map(([nazwa, opis]) => (
              <KartaSamochodu key={nazwa} nazwa={nazwa} opis={opis} />
            ))
          ) : (
            <p className="brak">Nie znaleziono samochodu.</p>
          )}
        </section>
      </div>
    </main>
  )
}

export default App

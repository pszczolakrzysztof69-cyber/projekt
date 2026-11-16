function KartaSamochodu({ nazwa, opis }) {
  return (
    <article className="karta">
      <span className="tag">Auto</span>
      <h3>{nazwa}</h3>
      <p>{opis}</p>
    </article>
  )
}

export default KartaSamochodu

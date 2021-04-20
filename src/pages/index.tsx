export default function Home(props) {
  return (
    <div>
      <h1>Index</h1>
      <p>{JSON.stringify(props.episodes)}</p>
    </div>
  )
}

export async function getStaticProps() {
  const response = await fetch('http://localhost:3333/episodes');
  const data = await response.json();

  return {
    props: { // dados a serem retornados
      episodes: data,
    },
    revalidate: 60 * 60 * 8, // Tempo que uma nova requisição será feita. No caso, de 8 em 8 horas
  }
}
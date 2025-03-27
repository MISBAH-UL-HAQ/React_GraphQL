import React from 'react';
import { useQuery, gql } from '@apollo/client';


const GET_GAMES = gql`
  query GetGames {
    games {
      id
      title
      genre
      developer
    }
  }
`;

export default function GetGames() {
  const { loading, error, data } = useQuery(GET_GAMES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Games List</h1>
      <ul>
        {data.games.map((game) => (
          <li key={game.id}>
            <strong>{game.title}</strong> - {game.genre} (by {game.developer})
          </li>
        ))}
      </ul>
    </div>
  );
}

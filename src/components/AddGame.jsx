import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const ADD_GAME = gql`
  mutation AddGame($title: String!, $genre: String!, $developer: String!) {
    addGame(title: $title, genre: $genre, developer: $developer) {
      id
      title
      genre
      developer
    }
  }
`;

export default function AddGame() {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [developer, setDeveloper] = useState("");

  
  const [addGame, { error }] = useMutation(ADD_GAME, {

  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addGame({ variables: { title, genre, developer } });
      alert("Game added successfully!");
      setTitle("");
      setGenre("");
      setDeveloper("");
    } catch (err) {
      console.error("Error adding game:", err);
      alert("Error adding game.");
    }
  };

  return (
    <div>
      <h2>Add a New Game</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Developer"
          value={developer}
          onChange={(e) => setDeveloper(e.target.value)}
          required
        />
        <button type="submit">Add Game</button>
      </form>
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}

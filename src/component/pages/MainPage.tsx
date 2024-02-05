// src/components/GameList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Header from 'component/block/Header/header';

interface Platform {
  name: string;
}

interface Genre {
  name: string;
}

interface RawgGame {
  id: number;
  name: string;
  platforms: { platform: Platform }[];
  genres: Genre[];
  background_image: string;
}

interface Game {
  id: number;
  name: string;
  platform: string;
  genre: string;
  background_image: string;
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 20px;
  width: 100%;
  height: auto;
  padding: 20px;
  margin-top: 3rem;
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100%;
  width: 10rem;
  overflow-y: auto;
  justify-content: flex-start;
  align-items: center;
  font-family: 'Pretendard-Bold';
`;

const Content = styled.div`
  width: 75rem;
  height: auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
`;

const tabStyles = `
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  border-radius: 5px;
`;

const Tab = styled.div<{ isActive: boolean }>`
  ${tabStyles}
  background-color: ${({ isActive }) => (isActive ? '#ddd' : 'transparent')};
  ${({ isActive }) => isActive && 'font-weight: bold;'}
`;

const GameItem = styled.li`
  list-style: none;
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  font-size: 0.8rem;
`;

const GameImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
  margin-top: 1rem;
`;

const throttle = (func: (...args: any[]) => void, delay: number) => {
  let timeout: NodeJS.Timeout | undefined;
  return function (...args: any[]) {
    if (!timeout) {
      timeout = setTimeout(() => {
        func(...args);
        timeout = undefined;
      }, delay);
    }
  };
};

const GameList = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('https://api.rawg.io/api/games', {
          params: {
            key: 'b72a35a54e904b01a822e381af60b766',
            page: page,
          },
        });
        const gamesDetails = response.data.results.map((game: RawgGame) => ({
          id: game.id,
          name: game.name,
          platform: game.platforms.map((platform) => platform.platform.name).join(', '),
          genre: game.genres.map((genre) => genre.name).join(', '),
          image: game.background_image,
        }));

        const informationGames = gamesDetails.filter((newGame: Game) => {
          return !games.some((prevGame: Game) => prevGame.id === newGame.id);
        });

        setGames((prevGames) => [...prevGames, ...informationGames]);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };
    fetchGames();
  }, [page, games, setGames]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const throttledHandleScroll = throttle(handleScroll, 200);

  useEffect(() => {
    window.addEventListener('scroll', throttledHandleScroll);
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [throttledHandleScroll]);

  const filteredGames = selectedPlatform
    ? games.filter((game) => game.platform.split(', ').includes(selectedPlatform))
    : games;

  return (
    <Container>
      <Header />
      <Sidebar>
        <Tab onClick={() => setSelectedPlatform(null)} isActive={!selectedPlatform}>
          All
        </Tab>
        <Tab onClick={() => setSelectedPlatform('PC')} isActive={selectedPlatform === 'PC'}>
          PC
        </Tab>
        <Tab
          onClick={() => setSelectedPlatform('PlayStation 5')}
          isActive={selectedPlatform === 'PlayStation 5'}
        >
          PlayStation 5
        </Tab>
        <Tab
          onClick={() => setSelectedPlatform('Xbox Series S/X')}
          isActive={selectedPlatform === 'Xbox Series S/X'}
        >
          Xbox Series S/X
        </Tab>
        <Tab
          onClick={() => setSelectedPlatform('Nintendo Switch')}
          isActive={selectedPlatform === 'Nintendo Switch'}
        >
          Nintendo Switch
        </Tab>
      </Sidebar>
      <Content>
      {filteredGames.map((game) => (
        <GameItem key={game.id}>
          <strong>{game.name}</strong>
          <span>{game.platform}</span>
          <span>{game.genre}</span>
          <GameImage src={game.background_image} alt={game.name} />
        </GameItem>
      ))}
      </Content>
    </Container>
  );
};

export default GameList;

import { createContext, useState, ReactNode, useContext } from 'react';

type Episode = {
   title: string;
   members: string;
   thumbnail: string;
   duration: number;
   url: string;
}

type PlayerContextData = {
   episodeList: Episode[];
   currentEpisodeIndex: number;
   isPlaying: boolean;
   play: (episode: Episode) => void;
   setPlayingState: (state: boolean) => void;
   tooglePlay: () => void;
   playList: (list: Episode[], index: number) => void;
   playNext: () => void;
   playPrevious: () => void;
   hasNext: boolean;
   hasPrevious: boolean;
   isLooping: boolean;
   toogleLoop: () => void;
   isShuffling: boolean;
   toogleShuffle: () => void;
   clearPlayerState: () => void;
};

export const PlayerContext = createContext({} as PlayerContextData);

type PlayerContextProviderProps = {
   children: ReactNode;
}

export function PlayerContextProvider({ children }: PlayerContextProviderProps) {
   const [episodeList, setEpisodeList] = useState([]);
   const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
   const [isPlaying, setIsPlaying] = useState(false);
   const [isLooping, setIsLooping] = useState(false);
   const [isShuffling, setIsShuffling] = useState(false);

   function play(episode: Episode) {
      setEpisodeList([episode]);
      setCurrentEpisodeIndex(0);
      setIsPlaying(true);
   }

   function playList(list: Episode[], index: number) {
      setEpisodeList(list);
      setCurrentEpisodeIndex(index);
      setIsPlaying(true);
   }

   function tooglePlay() {
      setIsPlaying(!isPlaying);
   }

   function toogleLoop() {
      setIsLooping(!isLooping);
   }

   function toogleShuffle() {
      setIsShuffling(!isShuffling);
   }

   function setPlayingState(state: boolean) {
      setIsPlaying(state);
   }

   function clearPlayerState() {
      setEpisodeList([]);
      setCurrentEpisodeIndex(0);
   }

   const hasPrevious = currentEpisodeIndex > 0;
   const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodeList.length;

   function playNext() {
      if (isShuffling) {
         const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length);
         
         setCurrentEpisodeIndex(nextRandomEpisodeIndex);

      } else if (hasNext) {
         return setCurrentEpisodeIndex(currentEpisodeIndex + 1);
      }

   }

   function playPrevious() {
      if (hasPrevious) {
         setCurrentEpisodeIndex(currentEpisodeIndex - 1);
      }
   }

   return (
      <PlayerContext.Provider
         value={{
            episodeList,
            currentEpisodeIndex,
            play,
            isPlaying,
            tooglePlay,
            setPlayingState,
            playList,
            playNext,
            playPrevious,
            hasNext,
            hasPrevious,
            isLooping,
            toogleLoop,
            toogleShuffle,
            isShuffling,
            clearPlayerState,
         }}
      >
         {children}
      </PlayerContext.Provider>
   )
}

export const usePlayer = () => {
   return useContext(PlayerContext);
}
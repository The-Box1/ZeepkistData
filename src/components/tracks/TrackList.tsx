import { SimpleGrid } from '@mantine/core';
import { useStore } from '@nanostores/preact';
import { h } from 'preact';
import { selectedTrackStore, shouldScollStore, zeepkistDataStore } from '../../store/Store';
import Track from './Track';
import { ScrollPosition, trackWindowScroll } from 'react-lazy-load-image-component';

function TrackList({ scrollPosition }: { scrollPosition: ScrollPosition }) {
  const zeepkistData = useStore(zeepkistDataStore);
  const selectedTrack = useStore(selectedTrackStore);
  const shouldScoll = useStore(shouldScollStore);
  if (!zeepkistData) return <></>;

  let children = zeepkistData.levels.map(track => <Track key={track.name} track={track} scrollPosition={scrollPosition} scrollIntoView={selectedTrack === track.name && shouldScoll} />).sort((a, b) => a.key.localeCompare(b.key));

  return (
    <>
      <SimpleGrid
        cols={1}
        breakpoints={[
          { minWidth: 1100, cols: 3, spacing: 'md' }
        ]}
      >
        {children}
      </SimpleGrid>
    </>
  );
}

export default trackWindowScroll(TrackList);
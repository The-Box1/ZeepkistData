import { Card, Text } from '@mantine/core';
import { h } from 'preact';
import { selectedTrackStore, shouldScollStore, TrackData } from '../../store/Store';
import { getHostUrl } from '../../Util';
import { LazyLoadImage, ScrollPosition } from 'react-lazy-load-image-component';
import { useRef } from "preact/hooks";

// Thumbnails are 1440 by 918
const ThumbnailSizeRatio = 918 / 1440;
const ThumbnailWidth = 340;

export default function Track({track, scrollPosition, scrollIntoView}: {
  track: TrackData;
  scrollPosition: ScrollPosition;
  scrollIntoView: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  let thumbnailSrc = getHostUrl() + '/images/levels/' + track.thumbnail + '.webp';

  if (scrollIntoView) ref.current?.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
    inline: 'center'
  });

  return (
    <div ref={ref} style={{ width: ThumbnailWidth, margin: 'auto' }}>
      <Card shadow="sm" p="lg" onClick={ () => { shouldScollStore.set(false); selectedTrackStore.set(track.name); } } style={{ cursor: 'pointer' }}>
        <Card.Section>
          <LazyLoadImage
            width={ThumbnailWidth}
            height={ThumbnailWidth * ThumbnailSizeRatio}
            src={thumbnailSrc}
            scrollPosition={scrollPosition}
          />
        </Card.Section>

        <Card.Section>
          <Text size="xl" align="center" style={{ margin: 10 }}>{track.name}</Text>
        </Card.Section>
      </Card>
    </div>
  );
}
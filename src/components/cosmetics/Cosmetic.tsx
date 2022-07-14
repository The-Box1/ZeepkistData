import { AspectRatio, Card, Text } from '@mantine/core';
import { h } from 'preact';
import { getHostUrl, simplifyCosmeticName } from '../../Util';
import { CosmeticData, selectedCosmeticStore, shouldScollStore } from '../../store/Store';
import { LazyLoadImage, ScrollPosition } from 'react-lazy-load-image-component';
import { useRef } from "preact/hooks";

// Thumbnails are 1920 by 1080
const ThumbnailSizeRatio = 1080 / 1920;
const ThumbnailWidth = 340;

export default function Cosmetic({cosmetic, scrollPosition, scrollIntoView}: {
  cosmetic: CosmeticData;
  scrollPosition: ScrollPosition;
  scrollIntoView: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  let thumbnailSrc = getHostUrl() + '/images/cosmetics/' + cosmetic.id + '.webp';

  let image = cosmetic.type === 'skin' ?
    <AspectRatio style={{ width: ThumbnailWidth, height: ThumbnailWidth * ThumbnailSizeRatio, backgroundColor: 'rgba(' + cosmetic.color + ')' }}></AspectRatio> :
    <LazyLoadImage
      width={ThumbnailWidth}
      height={ThumbnailWidth * ThumbnailSizeRatio}
      src={thumbnailSrc}
      scrollPosition={scrollPosition}
    />;

  if (scrollIntoView) ref.current?.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
    inline: 'center'
  });

  return (
    <div ref={ref} style={{ width: ThumbnailWidth, margin: 'auto' }}>
      <Card shadow="sm" p="lg" onClick={ () => { shouldScollStore.set(false); selectedCosmeticStore.set(cosmetic.id) } } style={{ cursor: 'pointer' }}>
        <Card.Section>
          {image}
        </Card.Section>

        <Card.Section>
          <Text size="xl" align="center" style={{ margin: 10 }}>{simplifyCosmeticName(cosmetic.name)}</Text>
        </Card.Section>
      </Card>
    </div>
  );
}
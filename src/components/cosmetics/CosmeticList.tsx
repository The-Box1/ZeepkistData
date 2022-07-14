import { SimpleGrid } from '@mantine/core';
import { useStore } from '@nanostores/preact';
import { h } from 'preact';
import { selectedCosmeticStore, shouldScollStore, zeepkistDataStore } from '../../store/Store';
import Cosmetic from './Cosmetic';
import { ScrollPosition, trackWindowScroll } from 'react-lazy-load-image-component';

function CosmeticList({ scrollPosition }: { scrollPosition: ScrollPosition }) {
  const zeepkistData = useStore(zeepkistDataStore);
  const selectedCosmetic = useStore(selectedCosmeticStore);
  const shouldScoll = useStore(shouldScollStore);
  if (!zeepkistData) return <></>;

  let hats = zeepkistData.cosmetics.hats.map(hat => {
    hat.type = 'hat';
    return <Cosmetic cosmetic={hat} scrollPosition={scrollPosition} scrollIntoView={selectedCosmetic === hat.id && shouldScoll} />
  });

  let zeepkists = zeepkistData.cosmetics.zeepkists.map(zeepkist => {
    zeepkist.type = 'zeepkist';
    return <Cosmetic cosmetic={zeepkist} scrollPosition={scrollPosition} scrollIntoView={selectedCosmetic === zeepkist.id && shouldScoll} />
  });

  let skins = zeepkistData.cosmetics.skins.map(skin => {
    skin.type = 'skin';
    return <Cosmetic cosmetic={skin} scrollPosition={scrollPosition} scrollIntoView={selectedCosmetic === skin.id && shouldScoll} />
  });

  let cosmetics = [ ...hats, ...zeepkists, ...skins ];

  return (
    <>
      <SimpleGrid
        cols={1}
        breakpoints={[
          { minWidth: 1100, cols: 3, spacing: 'md' }
        ]}
      >
        {cosmetics}
      </SimpleGrid>
    </>
  );
}

export default trackWindowScroll(CosmeticList);
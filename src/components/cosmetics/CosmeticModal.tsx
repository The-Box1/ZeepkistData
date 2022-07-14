import { Image, Modal, Grid, AspectRatio } from '@mantine/core';
import { useStore } from '@nanostores/preact';
import { h } from 'preact';
import { CosmeticData, displayStore, DisplayType, HatData, selectedCosmeticStore, selectedTrackStore, shouldScollStore, SkinData, ZeepkistData, zeepkistDataStore } from '../../store/Store';
import { getCosmeticUrl, getHostUrl, simplifyCosmeticName } from '../../Util';

export default function CosmeticModal() {
  const zeepkistData = useStore(zeepkistDataStore);
  const selectedCosmetic = useStore(selectedCosmeticStore);

  if (!zeepkistData) return <></>;

  let cosmetic: CosmeticData = zeepkistData.cosmetics.hats[0];
  if (selectedCosmetic.includes('Hat ')) {
    cosmetic = zeepkistData.cosmetics.hats.find(hat => hat.id === selectedCosmetic) as HatData;
    cosmetic.type = 'hat';
  } else if (selectedCosmetic.includes('Zeepkist ')) {
    cosmetic = zeepkistData.cosmetics.zeepkists.find(zeepkist => zeepkist.id === selectedCosmetic) as ZeepkistData;
    cosmetic.type = 'zeepkist';
  } else if (selectedCosmetic.includes('Skin ')) {
    cosmetic = zeepkistData.cosmetics.skins.find(skin => skin.id === selectedCosmetic) as SkinData;
    cosmetic.type = 'skin';
  }

  let thumbnailSrc = getHostUrl() + '/images/cosmetics/' + cosmetic.id + '.webp';

  let image = cosmetic.type === 'skin' ?
    <AspectRatio ratio={1920/1080} style={{ width: '100%', backgroundColor: 'rgba(' + cosmetic.color + ')' }}></AspectRatio> :
    <Image
      src={thumbnailSrc}
      alt={simplifyCosmeticName(cosmetic.name)}
    />;

  let capitalizeString = (letters: string) => {
    return letters.charAt(0).toUpperCase() + letters.slice(1);
  }

  if (cosmetic.unlockedBy.startsWith('Players ')) cosmetic.unlockedBy = 'Players <redacted>';

  let unlockedBy = <>{cosmetic.unlockedBy}</>;
  if (cosmetic.unlockedBy.startsWith('Level')) unlockedBy = <span onClick={() => {
    displayStore.set(DisplayType.tracks);
    shouldScollStore.set(true);
    selectedTrackStore.set(cosmetic.unlockedBy.split(', ')[0]);
  }} style={{cursor: 'pointer'}}>{cosmetic.unlockedBy}</span>;

  return (
    <Modal
      opened={true}
      onClose={ () => selectedCosmeticStore.set('') }
      title={<span onClick={() => navigator.clipboard.writeText(getCosmeticUrl(cosmetic.type, cosmetic.id))} style={{cursor: 'pointer'}}>{simplifyCosmeticName(cosmetic.name)}</span>}
      centered
      size="xl"
    >
      <Grid columns={2}>
        <Grid.Col span={1}>
          {image}
        </Grid.Col>
        <Grid.Col span={1}>
          Type: {capitalizeString(cosmetic.type)}<br />
          Name: {simplifyCosmeticName(cosmetic.name)}<br />
          Unlocked By: {unlockedBy}<br /><br />
          Family: {cosmetic.family}<br />
          Id: {cosmetic.id}
        </Grid.Col>
      </Grid>
    </Modal>
  );
}
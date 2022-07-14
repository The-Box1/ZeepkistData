import { Image, Modal, Grid, Accordion } from '@mantine/core';
import { useStore } from '@nanostores/preact';
import { ComponentChildren, h } from 'preact';
import { CosmeticData, displayStore, DisplayType, selectedCosmeticStore, selectedTrackStore, shouldScollStore, TrackData, zeepkistDataStore } from '../../store/Store';
import { getHostUrl, simplifyCosmeticName, getTrackUrl } from '../../Util';

export default function TrackModal() {
  const zeepkistData = useStore(zeepkistDataStore);
  const selectedTrack = useStore(selectedTrackStore);

  if (!zeepkistData) return <></>;

  const track = zeepkistData.levels.find(level => level.name === selectedTrack) as TrackData;

  let thumbnailSrc = getHostUrl() + '/images/levels/' + track.thumbnail + '.webp';

  function getCosmetic(cosmetic: string): CosmeticData {
    if (cosmetic.startsWith('Hat ')) return zeepkistData.cosmetics.hats.find(hat => hat.id === cosmetic) as CosmeticData;
    if (cosmetic.startsWith('Zeepkist ')) return zeepkistData.cosmetics.zeepkists.find(zeepkist => zeepkist.id === cosmetic) as CosmeticData;
    if (cosmetic.startsWith('Skin ')) return zeepkistData.cosmetics.skins.find(skin => skin.id === cosmetic) as CosmeticData;
    return zeepkistData.cosmetics.hats[0];
  }

  function listRewards(rewards: string[]) {
    return rewards.map<ComponentChildren>(reward => {
      let cosmetic = getCosmetic(reward);
      return <span onClick={() => {
        displayStore.set(DisplayType.cosmetics);
        shouldScollStore.set(true);
        selectedCosmeticStore.set(cosmetic.id);
      }} style={{cursor: 'pointer'}}>{simplifyCosmeticName(cosmetic.name)}</span>
    }).reduce((prev, curr) => [ prev, ', ', curr ]);
  }

  return (
    <Modal
      opened={true}
      onClose={ () => selectedTrackStore.set('') }
      title={<span onClick={() => navigator.clipboard.writeText(getTrackUrl(track.name))} style={{cursor: 'pointer'}}>{track.name}</span>}
      centered
      size="xl"
    >
      <Grid columns={2}>
        <Grid.Col span={1}>
          <Image
            src={thumbnailSrc}
            alt={track.name}
          />
        </Grid.Col>
        <Grid.Col span={1}>
          <Accordion iconPosition="right" multiple>
            <Accordion.Item label="Finish Times">
              Bronze: {track.bronzeTime.toFixed(1)} s<br />
              Silver: {track.silverTime.toFixed(1)} s<br />
              Gold: {track.goldTime.toFixed(1)} s<br />
              Author: {track.authorTime.toFixed(1)} s<br />
            </Accordion.Item>
            <Accordion.Item label="Unlocks">
              { track.finishRewards.length > 0 && <>Finish: {listRewards(track.finishRewards)}<br /></> }
              { track.bronzeRewards.length > 0 && <>Bronze: {listRewards(track.bronzeRewards)}<br /></> }
              { track.silverRewards.length > 0 && <>Silver: {listRewards(track.silverRewards)}<br /></> }
              { track.goldRewards.length > 0 && <>Gold: {listRewards(track.goldRewards)}<br /></> }
              { track.authorRewards.length > 0 && <>Author: {listRewards(track.authorRewards)}<br /></> }
            </Accordion.Item>
          </Accordion>
        </Grid.Col>
      </Grid>
    </Modal>
  );
}
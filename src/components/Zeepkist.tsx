import { h } from 'preact';
import { AppShell, Button, Center, Header, useMantineTheme } from '@mantine/core';
import { useEffect, useMemo, useState } from 'preact/hooks';
import TrackModal from './tracks/TrackModal';
import CosmeticModal from './cosmetics/CosmeticModal';
import TrackList from './tracks/TrackList';
import CosmeticList from './cosmetics/CosmeticList';
import { getHostUrl } from '../Util';
import { displayStore, DisplayType, selectedCosmeticStore, selectedTrackStore, shouldScollStore, zeepkistDataStore } from '../store/Store';
import { useStore } from '@nanostores/preact';



export default function Zeepkist() {
  const theme = useMantineTheme();

  const [ shownInitialModal, setShownInitialModal ] = useState(false);

  const zeepkistData = useStore(zeepkistDataStore);
  const display = useStore(displayStore);
  const selectedTrack = useStore(selectedTrackStore);
  const selectedCosmetic = useStore(selectedCosmeticStore);

  useEffect(() => {
    (async () => {
      let response = await fetch(getHostUrl() + '/data.json');
      let data = await response.json();
      zeepkistDataStore.set(data);
    })();
  }, []);

  if (zeepkistData) {
    if (!shownInitialModal) {
      const params = new URLSearchParams(window.location.search);
      let displayType = params.get('display');

      if (displayType === 'tracks') displayStore.set(DisplayType.tracks);
      else if (displayType === 'cosmetics') displayStore.set(DisplayType.cosmetics);

      let item = params.get('item');
      if (item) {
        if (displayType === 'tracks' && zeepkistData.levels.find(level => level.name === item)) {
          shouldScollStore.set(true);
          selectedTrackStore.set(item);
        } else if (
          (params.get('type') === 'hat' && zeepkistData.cosmetics.hats.find(hat => hat.id === item)) ||
          (params.get('type') === 'zeepkist' && zeepkistData.cosmetics.zeepkists.find(zeepkist => zeepkist.id === item)) ||
          (params.get('type') === 'skin' && zeepkistData.cosmetics.skins.find(skin => skin.id === item))
        ) {
          shouldScollStore.set(true);
          selectedCosmeticStore.set(item);
        }
      }

      setShownInitialModal(true);
    }
  }

  let modal = <></>;
  if (display === DisplayType.tracks && selectedTrack !== '') modal = <TrackModal />
  else if (display === DisplayType.cosmetics && selectedCosmetic !== '') modal = <CosmeticModal />

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colors.dark[8]
        }
      }}
      header={
        <Header p="md">
          <Center>
            <Button mx={10} onClick={() => { displayStore.set(DisplayType.tracks) }} variant={display === DisplayType.tracks ? 'filled' : 'outline'}>Tracks</Button>
            <Button mx={10} onClick={() => { displayStore.set(DisplayType.cosmetics) }} variant={display === DisplayType.cosmetics ? 'filled' : 'outline'}>Cosmetics</Button>
          </Center>
        </Header>
      }
    >
      <Center>
        {modal}
        {display === DisplayType.tracks ? <TrackList /> : <CosmeticList />}
      </Center>
    </AppShell>
  );
}
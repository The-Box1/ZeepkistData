import { atom } from 'nanostores';

export interface AllZeepkistData {
  levels: TrackData[];
  cosmetics: CollectiveCosmeticData;
}

export interface TrackData {
  name: string,
  bronzeTime: number,
  silverTime: number,
  goldTime: number,
  authorTime: number,
  finishRewards: string[],
  bronzeRewards: string[],
  silverRewards: string[],
  goldRewards: string[],
  authorRewards: string[],
  thumbnail: string
}

export interface CollectiveCosmeticData {
  hats: HatData[];
  zeepkists: ZeepkistData[];
  skins: SkinData[];
}

export interface BaseCosmeticData {
  type: 'hat' | 'zeepkist' | 'skin';
  family: string;
  name: string;
  id: string;
  unlockedBy: string;
}

export interface HatData extends BaseCosmeticData {
  type: 'hat';
}

export interface ZeepkistData extends BaseCosmeticData {
  type: 'zeepkist';
}

export interface SkinData extends BaseCosmeticData {
  type: 'skin';
  color: string;
}

export type CosmeticData = HatData | ZeepkistData | SkinData;

export enum DisplayType {
  tracks,
  cosmetics
}

export const zeepkistDataStore = atom<AllZeepkistData>();

export const displayStore = atom<DisplayType>(DisplayType.tracks);

export const selectedTrackStore = atom<string>('');
export const selectedCosmeticStore = atom<string>('');

export const shouldScollStore = atom<boolean>(false);
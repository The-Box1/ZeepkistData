export function simplifyCosmeticName(name: string) {
  name = name.replace(/Soapbox_DLC\d+?_/, '');
  name = name.replace(/Soapbox_V\d+?_/, '');
  name = name.replace(/Soapbox_/, '');

  name = name.replace(/Hat_DLC\d+?_/, '');
  name = name.replace(/Hat_V\d+?_/, '');
  name = name.replace(/Hat_/, '');

  // Order of replacement matters

  return name;
}

export function getHostUrl() {
  return import.meta.env.PROD ? 'https://zeepkist.thebox1.dev' : '/dev'
}

export function getTrackUrl(id: string) {
  return encodeURI(window.location.origin + '?display=tracks&item=' + id)
}

export function getCosmeticUrl(type: string, id: string) {
  return encodeURI(window.location.origin + '?display=cosmetics&type=' + type + '&item=' + id);
}
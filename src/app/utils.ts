import { environment } from 'src/environments/environment';

export function itemImageUrl(item: any, size = null) {
  const apiUrl = environment.api_url;
  let imgSrc = 'https://via.placeholder.com/500';
  if (item && item.image && item.image.length > 0) {
    imgSrc = size && item.image.formats[size] ? apiUrl + item.image.formats[size].url : apiUrl + item.image[0].url;
  }

  return imgSrc;
}
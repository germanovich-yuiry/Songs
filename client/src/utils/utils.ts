import { Theme } from "../app/providers/ThemeProvide";

export const setStyle = (theme: Theme, styleLightTheme: string, styleDarkTheme: string) => {
  if (theme === Theme.DARK) {
    return styleDarkTheme;
  } else {
    return styleLightTheme;
  }
};

export const prepareText = (text: string) => {
  const result = text.slice(0, 1).concat(text.slice(1).toLowerCase()).replace(/_/, ' ')
  return result
}

export const imgError = (event: React.SyntheticEvent<HTMLImageElement, Event>, avatar: string) => {
  const img = event.target as HTMLImageElement
  img.src = avatar
}

export const convertDate = (date: Date) => {
  const result = new Date(date)
    .toLocaleDateString('ru-RU', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
    .replace('г.', '');
  return result;
};

export const convertToTooltip = (date: Date) => {
  const result = new Date(date)
    .toLocaleDateString('ru-RU', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    })
    .replace(',', '');
    return result;
}

export const convertTopicDate = (date: Date) => {
  const result = new Date(date)
    .toLocaleDateString('ru-RU', {
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    })
    .replace(' в ', ', ');
  return result;
};

export const setLikes = (item: number, fn: (number: number) => void, props:number) => {
  item === props ? fn(item + 1): fn(item -1)
}

export const getPreviousRoute = (currentUrl: string): string => {
  const urlPieceArray = currentUrl.split('/');
  return `/${urlPieceArray[urlPieceArray.length - 2]}`;
};

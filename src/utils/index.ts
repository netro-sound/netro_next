export function classNames(...classes: any[]): string {
  return classes.filter(Boolean).join(' ');
}

export function concatAPIUrl(url: string | undefined): string {
  return `${process.env.NEXT_PUBLIC_API_URL}${url ?? ''}`;
}
export function concatSSRUrl(url: string | undefined): string {
  return `${process.env.NEXT_PUBLIC_SSR_URL}${url ?? ''}`;
}

export function clamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max);
}

export function generateID(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function objectFormData(obj: any): FormData {
  const formData = new FormData();

  Object.keys(obj).forEach((key) => {
    formData.append(key, obj[key]);
  });

  return formData;
}

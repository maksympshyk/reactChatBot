declare module "dom-to-image-more" {
  export interface DomToImageOptions {
    quality?: number;
    bgcolor?: string;
    style?: Record<string, string>;
    filter?: (node: HTMLElement) => boolean;
  }

  export function toPng(
    node: HTMLElement,
    options?: DomToImageOptions
  ): Promise<string>;
  export function toJpeg(
    node: HTMLElement,
    options?: DomToImageOptions
  ): Promise<string>;
  export function toBlob(
    node: HTMLElement,
    options?: DomToImageOptions
  ): Promise<Blob>;
  export function toPixelData(
    node: HTMLElement,
    options?: DomToImageOptions
  ): Promise<number[]>;

  const domtoimage: {
    toPng: typeof toPng;
    toJpeg: typeof toJpeg;
    toBlob: typeof toBlob;
    toPixelData: typeof toPixelData;
  };

  export default domtoimage;
}

export interface WPImage {
  ID: number;
  id: number;
  title: string;
  filename: string;
  url: string;
  alt: string;
  width: number;
  height: number;
  sizes?: Record<string, string | number>;
}

export interface WPLink {
  title: string;
  url: string;
  target: string;
}

export interface CounterItem {
  acf_fc_layout: string;
  counter_number: string;
  counter_suffix: string;
  counter_text: string;
}

export interface HomePageACF {
  section_1_heading: string;
  section_1_description: string;
  appstore: WPImage;
  google_play: WPImage;
  estimate_button_text: string;
  estimate_button_link: WPLink;
  background_image: WPImage;
  pop_img_1?: WPImage;
  pop_img_2?: WPImage;
  pop_img_3?: WPImage;
  section2_background?: WPImage;
  counter?: CounterItem[];
}

export interface WPPage {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string; protected?: boolean };
  acf: HomePageACF;
}

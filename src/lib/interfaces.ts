export interface Resource {
  title: string;
  description: string;
  url: string;
  tags: Tag[];
  og_preview: string | undefined;
}

export interface Tag {
  name: string;
  color?: string;
}

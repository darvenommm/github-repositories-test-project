declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: Record<string, string>;
  export default classes;
}

declare module '*.module.sass' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.css' {
  export default undefined;
}

declare module '*.scss' {
  export default undefined;
}

declare module '*.sass' {
  export default undefined;
}

declare module '*.png' {
  const imageSrc: string;
  export default imageSrc;
}

declare module '*.jpg' {
  const imageSrc: string;
  export default imageSrc;
}

declare module '*.jpeg' {
  const imageSrc: string;
  export default imageSrc;
}

declare module '*.gif' {
  const imageSrc: string;
  export default imageSrc;
}

declare module '*.avif' {
  const imageSrc: string;
  export default imageSrc;
}

declare module '*.webp' {
  const imageSrc: string;
  export default imageSrc;
}

declare module '*.txt' {
  const text: string;
  export default text;
}

declare module '*.svg' {
  const Svg: React.FunctionComponent<React.SVGProps<SVGElement>>;
  export default Svg;
}

declare module '*.svg?url' {
  const svgSrc: string;
  export default svgSrc;
}

declare const __IS_PROD__: boolean;
declare const __IS_DEV__: boolean;
declare const __GITHUB_URL__: string;
declare const __GITHUB_TOKEN__: string;

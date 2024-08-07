type StringBoolean = 'true' | 'false';

export type BuildMode = 'development' | 'production';
export type NeedOpening = StringBoolean;

export interface IBuildPaths {
  entry: string;
  output: string;
  public: string;
  src: string;
}

export interface IBuildOptions {
  mode: BuildMode;
  isDevelopment: boolean;
  isProduction: boolean;
  port: number;
  paths: IBuildPaths;
  needOpening: boolean;
}

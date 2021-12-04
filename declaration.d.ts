declare module "*.vue";
declare module "rollup-plugin-typescript";

declare module NodeJS {
  interface Global {
    performance: any;
  }
}

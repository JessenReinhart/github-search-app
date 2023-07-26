// jsdom-global.d.ts
declare interface NodeJS {
  Global: NodeJS.Global & typeof globalThis;
}

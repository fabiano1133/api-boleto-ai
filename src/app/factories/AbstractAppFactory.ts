import { App } from "@/app";

export abstract class AbstractAppFactory {
  abstract create(): App;
}

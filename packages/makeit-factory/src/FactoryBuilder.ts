import type { FactoryDefinitionFn } from "./types";
import { RESERVED_STATE_KEYS, FACTORY_DEFINITION_STATE_KEY } from "./constants";

export class FactoryBuilder<Model extends object> {
  private _definitions: Record<string, FactoryDefinitionFn<Model>> = {};
  private _states = new Set<string>();

  constructor(definitions: Record<string, FactoryDefinitionFn<Model>>) {
    this._definitions = definitions;
  }

  get definedStatesKeys() {
    return Object.keys(this._definitions);
  }

  // TODO: make "name" more specific with types. Like "active" | "disabled" | "freeAccount" | "premium" ...
  useState(name: string) {
    if (RESERVED_STATE_KEYS.includes(name)) {
      throw new Error(`Cannot use "${name}" state.`);
    }

    this._states.add(name);
    return this;
  }

  make(override?: FactoryDefinitionFn<Model>) {
    const define = FACTORY_DEFINITION_STATE_KEY in this._definitions && this._definitions[FACTORY_DEFINITION_STATE_KEY];

    if (!define) {
      throw new Error("Factory Definition is not set. Please create a definition with 'defineFactory(() => ({}))'");
    }

    let object = Array.from(this._states)
      .reduce((data, stateName) => {
        if (!(stateName in this._definitions)) {
          console.warn(`"${stateName} does not exists. Please define it."`)
          return data;
        }

        const state = this._definitions[stateName];
        data = Object.assign(data, state())

        return data;
      }, define());

    if (override) object = Object.assign(Object.create(null), object, override())

    return object as Model;
  }

  makeMany(count: number, override?: FactoryDefinitionFn<Model>) {
    return (new Array(count))
      .fill(null)
      .map(() => this.make(override));
  }
}
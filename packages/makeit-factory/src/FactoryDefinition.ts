import { FACTORY_DEFINITION_STATE_KEY } from './constants';
import type { FactoryDefinitionFn } from "./types";
import { FactoryBuilder } from './FactoryBuilder';

export class FactoryDefinition<Model extends object>{
  private statesDefinitions: Record<string, FactoryDefinitionFn<Model>> = {}

  constructor(definition: () => Model) {
    if (!definition)
      throw new Error("Please provide a definition function for the factory.");


    this.statesDefinitions[FACTORY_DEFINITION_STATE_KEY] = definition;
  }

  defineState(name: string, definition: FactoryDefinitionFn<Model>) {
    if (name in this.statesDefinitions)
      throw new Error(`"${name}" state is already defined.`);

    this.statesDefinitions[name] = definition;
    return this;
  }

  getFactory() {
    return new FactoryBuilder<Model>(this.statesDefinitions);
  }
}
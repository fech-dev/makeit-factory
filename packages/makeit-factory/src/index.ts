import { FactoryDefinition } from './FactoryDefinition';

export function defineFactory<Model extends object>(definition: () => Model) {
  return new FactoryDefinition(definition);
}
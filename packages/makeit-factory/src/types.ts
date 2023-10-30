export type FactoryDefinitionFn<Model extends object> = () => Model | Partial<Model>

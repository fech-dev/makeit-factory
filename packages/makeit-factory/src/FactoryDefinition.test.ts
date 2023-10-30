import { it, expect, describe } from 'vitest'
import { FactoryDefinition } from './FactoryDefinition'
import { FactoryBuilder } from './FactoryBuilder';

describe('FactoryDefinition Class', () => {
  it('should throw an error if definition is not provided', () => {
    // @ts-expect-error
    expect(() => new FactoryDefinition()).toThrow();
  })

  it('should throw an error if the state is already defined', () => {
    const definition = new FactoryDefinition(() => ({}))

    expect(() => {
      definition.defineState('active', () => ({ active: true }))
      definition.defineState('active', () => ({ active: true }))
    }).toThrow();
  })

  it('should be chainable', () => {
    const definition = new FactoryDefinition(() => ({}))

    expect(definition.defineState('test', () => ({ test: true }))).toBeInstanceOf(FactoryDefinition)
  })

  it('should return a FactoryBuilder instance', () => {
    type Test = {
      test: boolean,
      active?: boolean
    }
    const definition = new FactoryDefinition<Test>(() => ({ test: true }))
    definition.defineState('active', () => ({ active: true }))

    const factoryBuilder = definition.getFactory();
    expect(factoryBuilder).toBeInstanceOf(FactoryBuilder);
  })
})
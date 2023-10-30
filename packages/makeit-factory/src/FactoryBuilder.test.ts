import { faker } from '@faker-js/faker';
import { defineFactory } from '../src';
import { it, expect, describe, expectTypeOf } from 'vitest'
import { FactoryBuilder } from './FactoryBuilder';

type User = {
  name: string,
  email: string,
  active?: boolean
  subscription: string
}

describe('FactoryBuilder Class', () => {

  it('should create the model object from the definition', () => {
    const userFactory = defineFactory<User>(() => ({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      subscription: 'free'
    })).getFactory();

    const user = userFactory.make();

    expect(user.name).toBeDefined()
    expect(user.email).toBeDefined()
  })

  it('should create the model object with a state modifier', () => {
    const userFactory = defineFactory<User>(() => ({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      subscription: 'free'
    }))
      .defineState('active', () => ({ active: true }))
      .defineState('disabled', () => ({ active: false }))
      .getFactory();

    const user = userFactory.useState('active').make();

    expectTypeOf(user).toEqualTypeOf<User>();
    expect(user.active).toBe(true)
  })

  it('should create 5 model objects', () => {
    const userFactory = defineFactory<User>(() => ({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      active: faker.datatype.boolean(),
      subscription: faker.helpers.arrayElement(['free', 'premium'])
    }))
      .defineState('premium', () => ({ subscription: 'premium' }))
      .getFactory();

    const users = userFactory.makeMany(5);

    expect(users).toHaveLength(5);
    expectTypeOf(users).toEqualTypeOf<User[]>();
  })
})
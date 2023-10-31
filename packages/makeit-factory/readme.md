# MakeIt Factory

## Installation

```bash
npm install --save-dev makeit-factory
```

```bash
pnpm add -D makeit-factory
```

```bash
yarn add -D makeit-factory
```


## Examples

### Define UserFactory
```ts 
// database/factories/UserFactory.ts

import { defineFactory } from 'makeit-factory'

export const UserFactory = defineFactory(() => ({
    name: faker.pearson.fullName(),
    email: faker.internet.email(),
    active: faker.datatype.boolean()
  }))
    .defineState('active', () => ({ active: true }))
    .defineState('disabled', () => ({ active: false }))
    .getFactory();
```

### Seeding your database
```ts 
// database/seeders/UserSeeder.ts

import { UserFactory } from '../factories/UserFactory'

export default async () => {
  const activeUsers = UserFactory.useState('active').makeMany(5);
  const disabledUsers = UserFactory.useState('disabled').makeMany(5);
  const users = [...activeUsers, ...disabledUsers];


  //seed your db with your orm of choice
  await prisma.user.create({data: users});
 
}
```

### Usage in tests
```ts 
// tests/users.test.ts

import { describe, it, expect } from 'vitest'
import request from 'supertest';
import { UserFactory } from '../database/factories/UserFactory'

describe('User API', () => {
  it('should respond with a list of users', async () => {
    const users = UserFactory.makeMany(10);
    await prisma.user.create({ data: users });

    const response = await request.get('/api/users').send();
    expect(response.body).toHaveProp('data');
    expect(response.body.data).toHaveLength(10);
  });
})
```


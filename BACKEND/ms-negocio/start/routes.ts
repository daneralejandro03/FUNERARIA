/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

import './routes/employee'

import './routes/administrator'

import './routes/customer'

import './routes/service'

import './routes/site'

import './routes/wakeroom'

import './routes/owner'

import './routes/beneficiarie'

import './routes/headline'

import './routes/plan'

import './routes/subscription'

import './routes/pay'

import './routes/notification'

import './routes/transfer'

import './routes/burial'

import './routes/cremation'

import './routes/serviceplan'

import './routes/comment'

import './routes/chat'

import './routes/message'

import './routes/executionservice'

import './routes/grave'

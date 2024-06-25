const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('invalid users are not created', () => {
    test('username must be at least 3 characters long', async () => {
        const newUser = {
            username: 'ab',
            name: 'test',
            password: 'test'
        }
        const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
        expect(response.body.error).toContain('Username must be at least 3 characters long')
    })
    test('password must be at least 3 characters long', async () => {
        const newUser = {
            username: 'test',
            name: 'test',
            password: 'ab'
        }
        const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
        expect(response.body.error).toContain('Password must be at least 3 characters long')
    })
    test('username, name and password must be provided', async () => {
        const newUser = {
            username: 'test',
            name: 'test'
        }
        const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
        expect(response.body.error).toContain('Invalid user data')
    })
}
)


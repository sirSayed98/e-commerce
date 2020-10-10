const bcrypt = require('bcryptjs')
const users = [
    {
        name: 'Admin User',
        email: 'admin@admin.com',
        password: bcrypt.hashSync('123456', 10),
        role: 'admin',
    },
    {
        name: 'John Doe',
        email: 'john@example.com',
        role: 'user',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Jane Doe',
        email: 'Jane@example.com',
        role: 'user',
        password: bcrypt.hashSync('123456', 10),
    },
]


module.exports = users;
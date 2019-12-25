module.exports = (app) => {
    const user = require('../controllers/user.controller.js');

    // Create a new User
    app.post('/user', user.create);

    // Retrieve all Users   
    app.get('/users', user.findAll);

    // Retrieve a single User with userId
    app.get('/user/:userId', user.findOne);

    // Update a User with userId
    app.put('/user/:userId', user.update);

    // Delete a User with 
    app.delete('/user/:userId', user.delete);
}

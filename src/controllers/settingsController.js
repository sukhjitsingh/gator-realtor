const queriesController = require('../controllers/queriesController');
const bcrypt = require('bcryptjs');

module.exports.modify = (req, res) => {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let phoneNumber = req.body.phoneNumber;
    let newPassword = req.body.newPassword;
    let email = req.body.email;

    if (newPassword) {
        req.checkBody('newPassword', 'password is required(must be minimum 8 characters)').notEmpty().isLength(8, 20);
        req.checkBody('newPassword2', 'Password do not match').equals(req.body.newPassword);
    }
    let errors = req.validationErrors();

    if (errors) {
        res.render('accountSettings', {
            errors: errors
        });
    } else {

        queriesController.getUser(req.user.id)
            .then(user => {
                let defaultFName = user[0].firstName;
                let defaultLName = user[0].lastName;
                let defaultEmail = user[0].email;
                let defaultPhoneNumber = user[0].phoneNumber;
                let defaultPsswd = user[0].password;

                if (firstName) {
                    defaultFName = firstName;
                }
                if (lastName) {
                    defaultLName = lastName;
                }
                if (phoneNumber) {
                    defaultPhoneNumber = phoneNumber;
                }
                if (newPassword) {
                    const salt = bcrypt.genSaltSync();
                    defaultPsswd = bcrypt.hashSync(newPassword, salt);
                }


                if (email) {
                    queriesController.isRegistered(email)
                        .then(userArr => {
                            if (userArr.length !== 0) {
                                req.flash('error', 'Account with such Email already exist, please choose different one');
                                res.redirect('/fa17g11/settings');
                            } else {
                                defaultEmail = email;
                                queriesController.updateUserInfo(user[0].id, defaultFName, defaultLName, defaultEmail,
                                    defaultPhoneNumber, defaultPsswd)
                                    .then(results => {
                                        req.flash('success_msg', 'Profile was updated successfully');
                                        res.redirect('/fa17g11/settings');
                                    })
                                    .catch((err) => {
                                        return res.send(err);
                                    });
                            }
                        })
                        .catch((err) => {
                            return res.send(err);
                        });
                } else {
                    queriesController.updateUserInfo(user[0].id, defaultFName, defaultLName, defaultEmail,
                        defaultPhoneNumber, defaultPsswd)
                        .then(results => {
                            req.flash('success_msg', 'Profile was updated successfully');
                            res.redirect('/fa17g11/settings');
                        })
                        .catch((err) => {
                            return res.send(err);
                        });
                }
            });
    }
};

module.exports.loadInfo = (request, response) => {
    queriesController.loadInfo(request.user.id)
        .then(results => {
            response.render('accountSettings', {results})
        })
        .catch((err) => {
            return response.send(err);
        });
    response.title('Account Settings')
};

module.exports.deleteAccount = (request, response) => {

    queriesController.deleteAccount(request.user.id)
        .then((user) => {
            response.redirect('/fa17g11/login');
            request.logout();
            request.session.destroy();
        })
        .catch((err) => {
            console.log(err);
            request.flash('error', 'Account was not deleted');
            response.render('accountSettings');
        });
};
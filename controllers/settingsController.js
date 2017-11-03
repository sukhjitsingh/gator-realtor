module.exports.modify = function (req, res) {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let phoneNumber = req.body.phoneNumber;
    let newPassword = req.body.newPassword;

    req.checkBody('firstName', 'First name is required').notEmpty();
    req.checkBody('lastName', ' Last Name is required').notEmpty();
    req.checkBody('email', 'email is required').notEmpty();
    req.checkBody('email', 'email is not valid').isEmail();
    req.checkBody('phoneNumber', 'phone number is required').notEmpty();
    if (newPassword) {
        req.checkBody('newPassword', 'password is required(must be minimum 8 characters)').notEmpty().isLength(8, 20);
        req.checkBody('newPassword2', 'Password do not match').equals(req.body.newPassword);
    }
    let errors = req.validationErrors();

    if(errors){
        res.render('accountSettings', {
            errors:errors
        });
    }else {
        agent({
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
        });

        if (firstName) {
            agent({firstName: firstName});
        }
        if (lastName) {
            agent({lastName: 'undefined'});
        }
        if (email) {
            agent({email: email});
        }
        if (newPassword ) {
            agent({password: newPassword});
        }

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(agent.password, salt, function (err, hash) {
                if (err) {
                    return res.send(err);
                }
                agent.password = hash;
            });
        });
        req.flash('success_msg', 'Profile was updated successfully');
        res.redirect('accountSettings');
        agent.save((err) => {
            if (err) {
                return res.send(err);
            }
        });
    }
};
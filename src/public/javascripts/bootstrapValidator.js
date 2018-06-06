$(document).ready(function () {
  $('#contactForm').bootstrapValidator({
    container: '#messages',
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      fullName: {
        validators: {
          notEmpty: {
            message: 'The full name is required and cannot be empty'
          }
        }
      },
      firstName: {
        validators: {
          notEmpty: {
            message: 'First Name is required and cannot be empty'
          },
          stringLength: {
            min: 3,
            message: 'First Name must be more than 3 characters long'
          }
        }
      },
      lastName: {
        validators: {
          notEmpty: {
            message: 'Last Name is required and cannot be empty'
          },
          stringLength: {
            min: 3,
            message: 'Last Name must be more than 3 characters long'
          }
        }
      },
      email: {
        validators: {
          notEmpty: {
            message: 'The email address is required and cannot be empty'
          },
          emailAddress: {
            message: 'The email address is not valid'
          }
        }
      },
      username: {
        validators: {
          notEmpty: {
            message: 'Username is required and cannot be empty'
          },
          stringLength: {
            min: 8,
            message: 'Username must be greater than 8 characters long'
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: 'Password is required and cannot be empty'
          },
          stringLength: {
            min: 8,
            message: 'Password must be greater than 8 characters long'
          }
        }
      },
      passwordMatch: {
        validators: {
          notEmpty: {
            message: 'Password is required and cannot be empty'
          },
          stringLength: {
            min: 8,
            message: 'Password must be greater than 8 characters long'
          }
        }
      }
    }
  });
});
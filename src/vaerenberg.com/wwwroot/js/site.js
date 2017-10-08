$(document).ready(function () {
    $('#contact_form').bootstrapValidator({

        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            name: {
                validators: {
                    stringLength: {
                        min: 1,
                        max: 50,
                        message: 'Please enter no more than 50 characters'
                    },
                    notEmpty: {
                        message: 'Please enter your name'
                    }
                }
            },
            email: {
                validators: {
                    notEmpty: {
                        message: 'Please enter your email address'
                    },
                    emailAddress: {
                        message: 'Please enter a valid email address'
                    }
                }
            },
            message: {
                validators: {
                    stringLength: {
                        min: 1,
                        max: 500,
                        message: 'Please enter no more than 500 characters'
                    },
                    notEmpty: {
                        message: 'Please enter a message'
                    }
                }
            }
        }
    })
        .on('success.form.bv', function (e) {

            e.preventDefault();

            var $form = $(e.target);
            var validator = $form.data('bootstrapValidator');

            var request = $.ajax({
                url: 'api/contact',
                method: "POST",
                data: $form.serialize()
            });

            request.done(function () {
                $('#error_message').addClass('hidden');
                $('#success_message').removeClass('hidden');
                validator.resetForm();
            });

            request.fail(function (xhr) {
                $('#success_message').addClass('hidden');
                $('#error_message').html("Oops... something went wrong: " + xhr.statusText + " (" + xhr.status + ") " + xhr.responseText);
                $('#error_message').removeClass('hidden');
                validator.resetForm();
            });
        });
});
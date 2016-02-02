using System.Threading.Tasks;
using Newtonsoft.Json;
using Vaerenberg.Controllers;
using Vaerenberg.Models;
using Vaerenberg.Services;
using Xunit;
using System;
using Moq;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;

namespace vaerenberg.tests
{
    public class ContactTests
    {
        [Fact]
        public async Task Contact_WithValidRequest_SendsMessageThroughEmailService()
        {
            // arrange 
            var request = new ContactRequest { Name = "a", Email = "a@a.net", Message = "aaa" };
            var emailService = new Moq.Mock<IEmailService>();
            var sut = new ContactController(emailService.Object);

            // act
            await sut.Post(request);

            // assert
            emailService.Verify(service =>
                service.Send(
                    "bart@vaerenberg.com",
                    "Message from vaerenberg.com",
                    JsonConvert.SerializeObject(request)
                ), Times.Once);
        }

        [Fact]
        public void Contact_WithoutName_IsInvalid()
        {
            // arrange 
            var request = new ContactRequest { Email = "a@a.net", Message = "aaa" };

            // act
            var results = ValidateModel(request);

            // assert
            Assert.Equal("Name", results[0].MemberNames.First());
        }

        [Fact]
        public void Contact_WithNameTooLong_IsInvalid()
        {
            // arrange 
            var request = new ContactRequest
            {
                Name = new string('a', 1000),
                Email = "a@a.net",
                Message = "aaa"
            };

            // act
            var results = ValidateModel(request);

            // assert
            Assert.Equal("Name", results[0].MemberNames.First());
        }

        [Fact]
        public void Contact_WithInvalidEmail_IsInvalid()
        {
            // arrange 
            var request = new ContactRequest { Name = "a", Email = "a@a", Message = "aaa" };

            // act
            var results = ValidateModel(request);

            // assert
            Assert.Equal("Email", results[0].MemberNames.First());
        }

        [Fact]
        public void Contact_WithoutEmail_IsInvalid()
        {
            // arrange 
            var request = new ContactRequest { Name = "a", Message = "aaa" };

            // act
            var results = ValidateModel(request);

            // assert
            Assert.Equal("Email", results[0].MemberNames.First());
        }

        [Fact]
        public void Contact_WithoutMessage_IsInvalid()
        {
            // arrange 
            var request = new ContactRequest { Name = "a", Email = "a@a.net", Message = "" };

            // act
            var results = ValidateModel(request);

            // assert
            Assert.Equal("Message", results[0].MemberNames.First());
        }

        private IList<ValidationResult> ValidateModel(object model)
        {
            var results = new List<ValidationResult>();
            var context = new ValidationContext(model, null, null);
            Validator.TryValidateObject(model, context, results, true);
            return results;
        }
    }
}

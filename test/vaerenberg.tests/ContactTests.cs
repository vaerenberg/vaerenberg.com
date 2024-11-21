using System.Threading.Tasks;
using Vaerenberg.Controllers;
using Vaerenberg.Models;
using Vaerenberg.Services;
using Xunit;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;

namespace Vaerenberg.tests;

public class ContactTests
{
    [Fact]
    public async Task Contact_WithValidRequest_SendsMessageThroughEmailService()
    {
        // arrange 
        var request = new ContactRequest { Name = "a", Email = "a@a.net", Message = "aaa" };
        var emailService = new FakeEmailService();
        var sut = new ContactController(emailService);

        // act
        await sut.Post(request);

        // assert
        Assert.Equal(1, emailService.SendCallCount);
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
        var request = new ContactRequest { Name = "a", Email = "a@a@a", Message = "aaa" };

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

    private static List<ValidationResult> ValidateModel(object model)
    {
        var results = new List<ValidationResult>();
        var context = new ValidationContext(model, null, null);
        Validator.TryValidateObject(model, context, results, true);
        return results;
    }
}

public class FakeEmailService : IEmailService
{
    public int SendCallCount { get; set; }
    public Task Send(string recipient, string subject, string body)
    {
        SendCallCount++;
        return Task.CompletedTask;
    }
}

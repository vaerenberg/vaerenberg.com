using Microsoft.AspNetCore.Mvc;
using Vaerenberg.Controllers;
using Xunit;

namespace Vaerenberg.tests;

public class ResearchTests
{
    [Fact]
    public void GetIndex_RedirectsToResearchGate()
    {
        // arrange
        var sut = new ResearchController();

        // act
        var result = sut.Index() as RedirectResult;

        // assert
        Assert.Equal("https://www.researchgate.net/profile/Bart_Vaerenberg", result.Url);
        Assert.False(result.Permanent);
    }
}

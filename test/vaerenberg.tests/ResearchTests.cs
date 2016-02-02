using System.Threading.Tasks;
using Newtonsoft.Json;
using Vaerenberg.Controllers;
using Vaerenberg.Models;
using Vaerenberg.Services;
using Xunit;
using Microsoft.AspNet.Mvc;

namespace vaerenberg.tests
{
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
            Assert.NotNull(result);
            Assert.Equal("https://www.researchgate.net/profile/Bart_Vaerenberg", result.Url);
            Assert.False(result.Permanent);
        }
    }
}

using System;
using API.Data;
using API.Extensions;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;

namespace API.Helpers;

public class LogUserActivity : IAsyncActionFilter
{
    public async Task OnActionExecutionAsync(
        ActionExecutingContext context,
        ActionExecutionDelegate next
    )
    {
        //next is the action executing inside of our controller
        //context gives us access to the http context
        var resultContext = await next();

        // no reason to continue if unauthorized
        if (context.HttpContext.User.Identity?.IsAuthenticated != true)
            return;

        var memberId = resultContext.HttpContext.User.GetMemberId();

        var dbContext =
            resultContext.HttpContext.RequestServices.GetRequiredService<AppDbContext>();

        await dbContext
            .Members.Where(u => u.Id == memberId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(member => member.LastActive, DateTime.UtcNow)
            );
    }
}

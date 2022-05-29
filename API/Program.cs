using Application.Activities;


var builder = WebApplication.CreateBuilder(args);

// add services to container

builder.Services.AddControllers(options =>
            {
                var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
                options.Filters.Add(new AuthorizeFilter(policy));
            })
                .AddFluentValidation(config =>
            {
                config.RegisterValidatorsFromAssemblyContaining<Create>();
            });
builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);

// Configue the http request pipeline

var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();

if (app.Environment.IsDevelopment())
{
    // app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Activity Planner v1"));
}

// app.UseHttpsRedirection();

// app.UseRouting();

//Will look for the wwwroot-folder that is called index.html
app.UseDefaultFiles();
//Will look for the static files
app.UseStaticFiles();

app.UseCors("CorsPolicy");

app.UseAuthentication();
app.UseAuthorization();


app.MapControllers();
app.MapHub<ChatHub>("/chat");
app.MapFallbackToController("Index", "Fallback");

AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);


using var scope = app.Services.CreateScope();

var services = scope.ServiceProvider;

try
{
    var context = services.GetRequiredService<DataContext>();
    var userManager = services.GetRequiredService<UserManager<AppUser>>();
    await context.Database.MigrateAsync();
    await Seed.SeedData(context, userManager);
}

catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occured during migration");
}

await app.RunAsync();
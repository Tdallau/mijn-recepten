using System;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;

namespace mijn_recepten
{
    class ConfigurationManager
    {
        public static IConfiguration AppSetting { get; set; }
        public ConfigurationManager(IHostingEnvironment env)
        {
            Console.WriteLine(env.EnvironmentName);
            AppSetting = new ConfigurationBuilder()
                    .SetBasePath(Directory.GetCurrentDirectory())
                    .AddJsonFile($"appsettings.{env.EnvironmentName}.json")
                    // .AddJsonFile("appsettings.json")
                    .AddEnvironmentVariables()
                    .Build();
        }
    }
}
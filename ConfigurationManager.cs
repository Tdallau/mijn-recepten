using System;
using System.IO;
using Microsoft.Extensions.Configuration;

namespace mijn_recepten
{
    static class ConfigurationManager
    {
        public static IConfiguration AppSetting { get; }
        static ConfigurationManager()
        {
            AppSetting = new ConfigurationBuilder()
                    .SetBasePath(Directory.GetCurrentDirectory())
                    .AddJsonFile("appsettings.production.json")
                    .AddJsonFile("appsettings.json")
                    .AddEnvironmentVariables()
                    .Build();
        }
    }
}
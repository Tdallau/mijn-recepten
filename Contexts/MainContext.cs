using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using mijn_recepten.Models.DB;

namespace mijn_recepten.Contexts
{
    public class MainContext : DbContext
    {
        //this is actual entity object linked to the test in our DB
        public DbSet<Recipe> recipes { get; set; }
        public DbSet<Link> links { get; set; }
        public DbSet<Ingredient> ingredients { get; set; }
        public DbSet<User> users { get; set; }
        public DbSet<Favorite> favorites { get; set; }
        public MainContext(DbContextOptions<MainContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<User>()
                .HasIndex(u => u.email)
                .IsUnique();
        }
    }
}
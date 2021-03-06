using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using mijn_recepten.Models.DB;

namespace mijn_recepten.Contexts
{
    public class MainContext : DbContext
    {
        //this is actual entity object linked to the test in our DB
        public DbSet<Recipe> Recipes { get; set; }
        public DbSet<Link> Links { get; set; }
        public DbSet<Ingredient> Ingredients { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Favorite> Favorites { get; set; }
        public MainContext(DbContextOptions<MainContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();
        }
    }
}
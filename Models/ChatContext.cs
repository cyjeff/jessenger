using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace CSChat.Models
{
    public class MyDatabaseContext : DbContext
    {
        public MyDatabaseContext (DbContextOptions<MyDatabaseContext> options)
            : base(options)
        {
        }

        public DbSet<CSChat.Models.Chat> Chat { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Chat>()
                .Property(b => b.UpdateTime)
                .HasDefaultValueSql("getdate()");
            modelBuilder.Entity<Chat>().HasData(
                new { ChatId = 1, User = "admin", Text = "hello" },
                new { ChatId = 2, User = "admin", Text = "world" }
                );
        }
    }
}

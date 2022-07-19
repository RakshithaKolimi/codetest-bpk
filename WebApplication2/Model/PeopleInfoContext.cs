using Microsoft.EntityFrameworkCore;

namespace WebApplication2.Model
{
    public class PeopleInfoContext : DbContext
    {
        public PeopleInfoContext(DbContextOptions<PeopleInfoContext> options) : base(options) { }
        public DbSet<PeopleInfo> peopleInfos { get; set; }

    }
}


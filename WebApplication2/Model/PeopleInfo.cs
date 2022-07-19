using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication2.Model
{
    public class PeopleInfo
    {
        [Key]
        public Guid Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        

        public string LastName { get; set; } = string.Empty;

        public string City { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;


    }
}

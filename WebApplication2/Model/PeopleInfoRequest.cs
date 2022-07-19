using System.ComponentModel.DataAnnotations;

namespace WebApplication2.Model
{
    public class PeopleInfoRequest
    {
        [Required]
        public string LastName { get; set; } = string.Empty;
        [Required]

        public string FirstName { get; set; } = string.Empty;
        [Required]

        public string City { get; set; } = string.Empty;
        [Required]
        [Phone]
        public string PhoneNumber { get; set; } = string.Empty;

    }
}

        
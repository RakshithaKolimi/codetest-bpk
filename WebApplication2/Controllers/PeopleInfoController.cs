
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication2.Model;


namespace WebApplication2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleInfoController : ControllerBase
    {

        List<PeopleInfo> info = new List<PeopleInfo>();
        private readonly PeopleInfoContext _context;
        public PeopleInfoController(PeopleInfoContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> Get()
        {
            return Ok(await _context.peopleInfos.ToListAsync());
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<List<PeopleInfo>>> GetInfo(Guid Id)
        {
            var person = await _context.peopleInfos.FindAsync(Id);
            if (person == null)
                return BadRequest("Person Not Found");
            return Ok(await _context.peopleInfos.ToListAsync());
        }
        [HttpPost]
        public async Task<ActionResult<List<PeopleInfo>>> AddInfo(PeopleInfoRequest i)
        {
            var request = new PeopleInfo()
            {
                Id = Guid.NewGuid(),
                LastName = i.LastName,
                FirstName = i.FirstName,
                City = i.City,
                PhoneNumber = i.PhoneNumber
            };
            await _context.peopleInfos.AddAsync(request);
            await _context.SaveChangesAsync();
            return Ok(await _context.peopleInfos.ToListAsync());
        }
       [HttpPut("{Id}")]
        public async Task<ActionResult<List<PeopleInfo>>> UpdateInfo(PeopleInfoRequest request,Guid Id)
        {
            var person = await _context.peopleInfos.FirstOrDefaultAsync(p => p.Id == Id);
            if (person == null)
                return BadRequest("Person Not Found");
            person.FirstName = request.FirstName;
            person.LastName = request.LastName;
            person.PhoneNumber = request.PhoneNumber;
            person.City= request.City;
            await _context.SaveChangesAsync();
            return Ok(await _context.peopleInfos.ToListAsync());
        }
        [HttpDelete("{Id}")]
        public async Task<ActionResult<List<PeopleInfo>>> DeleteInfo (Guid Id)
        {
            var person = await _context.peopleInfos.FirstOrDefaultAsync(p => (p.Id) == Id);
            if (person == null)
                return BadRequest("Person Not Found");
            _context.peopleInfos.Remove(person);
            await _context.SaveChangesAsync();
            return Ok(await _context.peopleInfos.ToListAsync());
        }


        }
}

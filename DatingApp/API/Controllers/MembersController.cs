using API.Data;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class MembersController(IMemberRepository memberRepository) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Member>>> GetMembers()
        {
            var members = await memberRepository.GetMembersAsync();
            return Ok(members);
        }

        [HttpGet("{id}")] // localhost:5000/api/members/bob-id
        public async Task<ActionResult<Member>> GetMember(string id)
        {
            var member = await memberRepository.GetMemberByIdAsync(id);
            if (member == null)
            {
                return NotFound();
            }

            return Ok(member);
        }

        [HttpGet("{id}/photos")]
        public async Task<ActionResult<IReadOnlyList<Photo>>> GetPhotosByMemberId(string id)
        {
            var photos = await memberRepository.GetPhotosByMemberIdAsync(id);
            return Ok(photos);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateMember(Member updatedMember)
        {
            var member = await memberRepository.GetMemberByIdAsync(updatedMember.Id);
            if (member == null)
                return NotFound();
            member.DisplayName = updatedMember.DisplayName;
            member.Description = updatedMember.Description;
            member.City = updatedMember.City;
            member.Country = updatedMember.Country;
            member.ImageUrl = updatedMember.ImageUrl;
            member.LastActive = DateTime.UtcNow;
            memberRepository.Update(member);
            return NoContent();
        }
    }
}

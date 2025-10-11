using System.Security.Claims;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class MembersController(IMemberRepository memberRepository, IPhotoService photoService)
        : BaseApiController
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
        public async Task<ActionResult> UpdateMember(MemberUpdateDto updatedMember)
        {
            var id = User.GetMemberId();
            var member = await memberRepository.GetMemberByIdForUpdateAsync(id);
            if (member == null)
                return NotFound("Member not found");
            member.DisplayName = updatedMember.DisplayName ?? member.DisplayName;
            member.City = updatedMember.City ?? member.City;
            member.Country = updatedMember.Country ?? member.Country;
            member.Description = updatedMember.Description ?? member.Description;
            member.AppUser.DisplayName = updatedMember.DisplayName ?? member.AppUser.DisplayName; //sync display name between Member and AppUser

            //memberRepository.Update(member);//optional
            if (await memberRepository.SaveAllAsync())
                return NoContent();
            return BadRequest("Failed to update member");
        }

        [HttpPost("add-photo")]
        public async Task<ActionResult<Photo>> AddPhoto([FromForm] IFormFile file)
        {
            var memberId = User.GetMemberId();
            var member = await memberRepository.GetMemberByIdForUpdateAsync(memberId);
            if (member == null)
                return NotFound();

            var result = await photoService.AddPhotoAsync(file);
            if (result.Error != null)
                return BadRequest(result.Error.Message);

            var photo = new Photo
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId,
                MemberId = memberId,
            };

            if (member.ImageUrl is null)
            {
                member.ImageUrl = photo.Url;
                member.AppUser.ImageUrl = photo.Url;
            }

            member.Photos.Add(photo);
            if (await memberRepository.SaveAllAsync())
                return photo;
            return BadRequest("Problem adding photo");
        }
    }
}

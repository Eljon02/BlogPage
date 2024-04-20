using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BlogPage.Data;
using BlogPage.Models;


namespace BlogPage.Controllers
{

    [Route("Api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CommentController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Get All Articles

        // Get Articles By Id

        // Put (Edit) Article

        // Post (Add) New Article
        [HttpPost]

        public async Task<ActionResult<Comment>> PostComment(Comment comment){

            if (_context.Comments == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Articles'  is null.");
            }
            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetComment", new { id = comment.CommentId }, comment);
        }

        // Delete Article
    }
}

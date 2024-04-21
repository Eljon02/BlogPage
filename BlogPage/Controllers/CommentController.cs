using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BlogPage.Data;
using BlogPage.Models;
using AutoMapper.QueryableExtensions;
using BlogPage.Models.DTOs;
using AutoMapper;

namespace BlogPage.Controllers
{

    [Route("Api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public CommentController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // Get All Comments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CommentDto>>> GetComments()
        {
            if (_context.Comments == null)
            {
                return NotFound();
            }
            return await _context.Comments.OrderBy(x => x.CreatedAt).ProjectTo<CommentDto>(_mapper.ConfigurationProvider).ToListAsync();
        }

        // Get Comments By Id

        [HttpGet("{id}")]
        public async Task<ActionResult<CommentDto>> GetComment(Guid id)
        {
            if (_context.Comments == null)
            {
                return NotFound();
            }
            var comment = await _context.Comments.ProjectTo<CommentDto>(_mapper.ConfigurationProvider).FirstOrDefaultAsync(x => x.CommentId == id);

            if (comment == null)
            {
                return NotFound();
            }

            return comment;
        }

        // Get Comment by BlogId

        [HttpGet("blog/{articleId}")]
        public async Task<ActionResult<IEnumerable<CommentDto>>> GetCommentsByArticleID(Guid articleId)
        {
            if (_context.Comments == null)
            {
                return NotFound();
            }
            return await _context.Comments
                    .Where(x => x.Article.ArticleId == articleId)
                    .OrderBy(x => x.CreatedAt)
                    .ProjectTo<CommentDto>(_mapper.ConfigurationProvider)
                    .ToListAsync();
        }

        // Put (Edit) Comment
        [HttpPut("{id}")]
        public async Task<IActionResult> PutArticle(Guid id, Comment comment)
        {
            if (id != comment.CommentId)
            {
                return BadRequest();
            }

            _context.Entry(comment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CommentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // Post (Add) New Comment
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

        // Delete Comment


        private bool CommentExists(Guid id)
        {
            return (_context.Comments?.Any(e => e.CommentId == id)).GetValueOrDefault();
        }
    }
}

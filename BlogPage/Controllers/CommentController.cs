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
            var comment = await _context.Comments
                .Include(c => c.Article) // Include the article
                .ProjectTo<CommentDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.CommentId == id);

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
<<<<<<< HEAD
        public async Task<IActionResult> PutArticle(Guid id, Comment comment)
=======
        public async Task<IActionResult> PutComment(Guid id, CommentDto commentDto)
>>>>>>> 7e7de2847d8bb480456fce15850b2d28351e7215
        {
            if (id != commentDto.CommentId)
            {
                return BadRequest();
            }

            var existingComment = await _context.Comments.Include(c => c.Article).FirstOrDefaultAsync(c => c.CommentId == id);

            if (existingComment == null)
            {
                return NotFound();
            }

            // Update comment fields
            existingComment.Body = commentDto.Body;

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
        public async Task<ActionResult<Comment>> PostComment([FromBody] Comment comment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var article = await _context.Articles.FindAsync(comment.Article.ArticleId);
            if (article == null)
            {
                return NotFound("Article not found");
            }

            // Ensure that the article property of the comment is set correctly
            comment.Article = article;

            // Set the creation time
            comment.CreatedAt = DateTime.UtcNow;

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

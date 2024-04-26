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
using Microsoft.AspNetCore.Authorization;

namespace BlogPage.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticlesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly IUserAccessor _userAccessor;

        public ArticlesController(ApplicationDbContext context, IMapper mapper, IUserAccessor userAccessor)
        {
            _context = context;
            _mapper = mapper;
            _userAccessor = userAccessor;
        }

        // Get All Articles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ArticleDto>>> GetArticles()
        {
          if (_context.Articles == null)
          {
              return NotFound();
          }
            return await _context.Articles.ProjectTo<ArticleDto>(_mapper.ConfigurationProvider).ToListAsync();
        }

        // Get Articles By Id
        [HttpGet("{id}")]
        public async Task<ActionResult<ArticleDto>> GetArticle(Guid id)
        {
          if (_context.Articles == null)
          {
              return NotFound();
          }
            var article = await _context.Articles.ProjectTo<ArticleDto>(_mapper.ConfigurationProvider).FirstOrDefaultAsync(x => x.ArticleId == id);

            if (article == null)
            {
                return NotFound();
            }

            return article;
        }

        // Get articles via query
        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<ArticleDto>>> SearchArticles([FromQuery] string searchTerm)
        {
            if (string.IsNullOrEmpty(searchTerm))
            {
                return BadRequest("Search term cannot be empty.");
            }

            var matchingArticles = await _context.Articles
                .Where(a => EF.Functions.Like(a.Title, $"%{searchTerm}%")
//                            ||  EF.Functions.Like(a.Content, $"%{searchTerm}%")
                            )
                .ProjectTo<ArticleDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            return Ok(matchingArticles);
        }

        // Put (Edit) Article
        [Authorize(Roles ="Administrator")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutArticle(Guid id, Article article)
        {
            if (id != article.ArticleId)
            {
                return BadRequest();
            }

            var newArticle = await _context.Articles.FindAsync(id);
            _mapper.Map(article, newArticle);

            try
            {
                var result = await _context.SaveChangesAsync() > 0;
                if (result) return NoContent();
                return BadRequest("Problem updating article!");
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ArticleExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

        }

        // Post (Add) New Article
        [Authorize(Roles = "Administrator")]
        [HttpPost]
        public async Task<ActionResult<Article>> PostArticle(Article article)
        {
          if (_context.Articles == null)
          {
              return Problem("Entity set 'ApplicationDbContext.Articles'  is null.");
          }
            var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUserName());

            article.User = user;

            _context.Articles.Add(article);
            var result  =await _context.SaveChangesAsync() > 0;

            if(result) return Ok(_mapper.Map<ArticleDto>(article));

            return BadRequest("Problem adding article!");
        }

        // Delete Article
        [Authorize(Roles = "Administrator")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteArticle(Guid id)
        {
            if (_context.Articles == null)
            {
                return NotFound();
            }
            var article = await _context.Articles.FindAsync(id);
            if (article == null)
            {
                return NotFound();
            }

            _context.Articles.Remove(article);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ArticleExists(Guid id)
        {
            return (_context.Articles?.Any(e => e.ArticleId == id)).GetValueOrDefault();
        }
    }
}

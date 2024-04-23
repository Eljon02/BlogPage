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
    public class CategoriesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public CategoriesController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // Get All Categories
        [HttpGet]
        public ActionResult<IEnumerable<CategoryDto>> GetCategories()
        {
            var categories = _context.Categories.ToList();
            var categoryDtos = _mapper.Map<List<CategoryDto>>(categories);
            return Ok(categoryDtos);
        }

        // Get categories By Id
        [HttpGet("{id}")]
        public ActionResult<CategoryDto> GetCategory(int id)
        {
            var category = _context.Categories.Find(id);

            if (category == null)
            {
                return NotFound();
            }

            var categoryDto = _mapper.Map<CategoryDto>(category);
            return Ok(categoryDto);
        }


        // POST: api/categories
        [HttpPost]
        public ActionResult<CategoryDto> CreateCategory(CategoryDto categoryDto)
        {
            var category = _mapper.Map<Category>(categoryDto);
            _context.Categories.Add(category);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetCategory), new { id = category.CategoryId }, categoryDto);
        }

        // PUT: api/categories/{id}
        [HttpPut("{id}")]
        public IActionResult UpdateCategory(Guid id, CategoryDto categoryDto)
        {
            if (id != categoryDto.CategoryId)
            {
                return BadRequest();
            }

            var category = _mapper.Map<Category>(categoryDto);

            _context.Entry(category).State = EntityState.Modified;
            _context.SaveChanges();

            return NoContent();
        }

        // DELETE: api/categories/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteCategory(int id)
        {
            var category = _context.Categories.Find(id);

            if (category == null)
            {
                return NotFound();
            }

            _context.Categories.Remove(category);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
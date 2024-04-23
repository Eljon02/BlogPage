namespace BlogPage.Models.DTOs
{
    public class CategoryDto
    {

        public Guid CategoryId { get; set; }
        public string CategoryName { get; set; }

        public ICollection<Category> Categories { get; set; } = new List<Category>();

    }
}



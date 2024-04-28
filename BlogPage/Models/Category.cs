namespace BlogPage.Models
{
    public class Category
    {
        public Guid CategoryId { get; set; }
        public string CategoryName { get; set; }
        public Article? Article {  get; set; }
    }
}

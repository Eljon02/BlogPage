namespace BlogPage.Models
{
    public class Article
    {
        public Guid ArticleId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public DateTime PublicationDate { get; set; } = DateTime.Now;
        public string[]? Tags { get; set; }
        public ICollection<Comment> Comments { get; set; } = new List<Comment>();
        public ICollection<Category> Categories { get; set; } = new List<Category>();
        public Photo? Photo { get; set; }
    }
}

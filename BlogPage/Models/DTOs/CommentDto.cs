namespace BlogPage.Models.DTOs
{
    public class CommentDto
    {
        public Guid CommentId { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Body { get; set; }
    }
}

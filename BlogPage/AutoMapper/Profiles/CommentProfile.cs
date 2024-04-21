namespace BlogPage.AutoMapper.Profiles
{
    public class CommentProfile
    {
        public Guid Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Body { get; set; }
    }
}

﻿using System.Reflection.Metadata;

namespace BlogPage.Models
{
    public class Comment
    {
        public int CommentId { get; set; }
        public string Body { get; set; }
        public Article Article { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
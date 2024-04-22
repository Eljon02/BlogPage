using AutoMapper;
using BlogPage.Models.DTOs;
using BlogPage.Models;
using System.Reflection.Metadata;

namespace BlogPage.AutoMapper.Mapping
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Comment, Profiles.CommentProfile>();

            CreateMap<Article, ArticleDto>()
                .ForMember(d => d.Comments, o => o.MapFrom(a => a.Comments));

            CreateMap<Comment, CommentDto>();
        }
    }
}


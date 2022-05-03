using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            //MAPPING FROM, MAPPING TO
            CreateMap<Activity, Activity>();
        }
    }
}
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using HiringChallenge.API.Domain.Models;

namespace HiringChallenge.API.Domain.Repositories
{
    public interface IGithubRepoRepository
    {
        Task<IEnumerable<GithubRepository>> GetReposAsync();
        Task<GithubRepository> FindRepoByIdAsync(Guid repoId);
        Task<GithubRepository> FindRepoByGithubIdAsync(long repositoryId);
        void CreateRepo(GithubRepository repo);
        void DeleteRepo(GithubRepository repo);
    }
}
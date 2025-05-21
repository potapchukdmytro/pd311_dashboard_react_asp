using Microsoft.AspNetCore.Http;

namespace pd311_web_api.BLL.Services.Storage
{
    public interface IStorageService
    {
        Task<string?> UploadFileAsync(IFormFile file, string containerName, string path);
        Task<string?> UploadImageAsync(IFormFile image, string path);
        Task DeleteFileAsync(string containerName, string filePath);
        Task DeleteImageAsync(string filePath);
    }
}

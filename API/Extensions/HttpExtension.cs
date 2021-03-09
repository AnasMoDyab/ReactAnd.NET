using System.Text.Json;
using Microsoft.AspNetCore.Http;

namespace API.Extensions
{
    public static class HttpExtension
    {
        public static void AddPaginationHeader(this HttpResponse response, 
                int currentPage, int itemPerPage, int totalItem, int totalPage )
        {
            var paginationHeader = new
            {
                currentPage,
                itemPerPage,
                totalItem,
                totalPage
            };

            response.Headers.Add("Pagination", JsonSerializer.Serialize(paginationHeader));
           

        }
    }
}
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace CSChat.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string flag)
        {
            await Clients.All.SendAsync("ReceiveMessage", flag);
        }
    }
}
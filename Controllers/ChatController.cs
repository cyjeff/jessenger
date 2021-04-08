using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

using Microsoft.EntityFrameworkCore;
using CSChat.Models;

namespace CSChat.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChatController : Controller
    {
        private readonly MyDatabaseContext _context;

        public ChatController(MyDatabaseContext context)
        {
            _context = context;
        }

        // GET api/Chat
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Chat>>> GetAllChat()
        {
            var items = _context.Chat.OrderByDescending(u => u.ChatId).Take(50).OrderBy(u=>u.ChatId);
            return await items.ToListAsync();
            //return await _context.Chat.ToListAsync();
        }

        // GET: api/Chat/id
        [HttpGet("{ChatId}")]
        public async Task<ActionResult<Chat>> GetChat(int ChatId)
        {
            var chatItem = await _context.Chat.FindAsync(ChatId);
            if (chatItem == null)
            {
                return NotFound();
            }
            return chatItem;
        }
        
        // POST api/Chat
        [HttpPost]
        public async Task<ActionResult<Chat>> PostChat(Chat Chat)
        {
            _context.Chat.Add(Chat);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetChat), new { ChatId = Chat.ChatId }, Chat);
        }
    }
}

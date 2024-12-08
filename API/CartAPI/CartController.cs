using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;



using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using VO;
using DAO;
using BLL;


namespace Services
{
    [Route("Cart/[action]")]
    [ApiController]
    public  class CartController : ControllerBase
    {
        private readonly DAOClass _dao;
        private readonly ILogger<CartController> _logger;

        private DAOClass Dao { get { return _dao; } }

        public CartController(ILogger<CartController> logger)
        {
            _dao = new();
            _logger = logger;
        }


        [HttpGet]
        public ActionResult<CartResponse> GetById(int id)
        {
            CartResponse response = new();

            try
            {
                response.Cart = new BLL.CartBLL(Dao).CartGetById(id);
                response.IsSuccess = true;
            }
            catch (Exception ex)
            {
                response.Error = Utilities.ErrorHandler.Handler(ex);
                _logger.LogError($"Error en CartsController {nameof(GetById)}: ${ex.Message}");
            }

            return response;
        }


        [HttpGet]
        public ActionResult<CartResponse> GetAll() {
            CartResponse response = new();

            try {
                response.Carts = new BLL.CartBLL(Dao).CartGetAll();
                response.IsSuccess = true;

            }catch(Exception ex){ 
                response.Error = Utilities.ErrorHandler.Handler(ex);
                _logger.LogError($"Error en CartsController {nameof(GetAll)}: ${ex.Message}");

            }

            return response;
        }


        [HttpGet]
        public ActionResult<CartItemResponse> GetItems(int id)
        {
            CartItemResponse response = new();

            try
            {
                response.CartItems = new BLL.CartBLL(Dao).CartGetItems(id);
                response.IsSuccess = true;
            }
            catch (Exception ex)
            {
                response.Error = Utilities.ErrorHandler.Handler(ex);
                _logger.LogError($"Error en CartsController {nameof(GetItems)}: ${ex.Message}");
            }

            return response;
        }

        [HttpGet]
        public ActionResult<CartItemResponse> GetItem(int cart_id, int item_id)
        {
            CartItemResponse response = new();

            try
            {
                List<CartItem> cartItems = new BLL.CartBLL(Dao).CartGetItems(cart_id);
                response.CartItem = cartItems.FirstOrDefault((cartItem) => cartItem.Id == item_id);
                response.IsSuccess = true;
            }
            catch (Exception ex)
            {
                response.Error = Utilities.ErrorHandler.Handler(ex);
                _logger.LogError($"Error en CartsController {nameof(GetItems)}: ${ex.Message}");
            }

            return response;
        }

        [HttpDelete]
        public ActionResult<CartResponse> Delete(int id)
        {
            CartResponse response = new();

            try
            {
                response.IsSuccess = new BLL.CartBLL(Dao).ExecuteDBAction(eDbAction.Delete, new Cart { Id = id });
            }
            catch (Exception ex)
            {
                response.Error = Utilities.ErrorHandler.Handler(ex);
                _logger.LogError($"Error en ProductController {nameof(Delete)}: ${ex.Message}");
            }

            return response;
        }

    }
}

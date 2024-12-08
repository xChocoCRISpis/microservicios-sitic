using DAO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VO;
using BLL;



namespace Services
{
    [ApiController]
    [Route("Cart_Items/[action]")]
    public class CartItemController:ControllerBase
    {
        private readonly DAOClass _dao;
        private readonly ILogger<CartItemController> _logger;

        private DAOClass Dao { get { return _dao; } }

        public CartItemController(ILogger<CartItemController> logger)
        {
            _dao = new();
            _logger = logger;
        }


        [HttpGet]
        public ActionResult<CartItemResponse> GetById(int id)
        {
            CartItemResponse response = new();

            try
            {
                response.CartItem = new BLL.CartBLL(Dao).CartItemGetById(id);
                response.IsSuccess = true;
            }
            catch (Exception ex)
            {
                response.Error = Utilities.ErrorHandler.Handler(ex);
                _logger.LogError($"Error en CartItemController {nameof(GetById)}: ${ex.Message}");
            }

            return response;
        }



        [HttpGet]
        public ActionResult<CartItemResponse> GetAll()
        {
            CartItemResponse response = new();

            try
            {
                response.CartItems = new BLL.CartBLL(Dao).CartItemGetAll();
                response.IsSuccess = true;
            }
            catch (Exception ex)
            {
                response.Error = Utilities.ErrorHandler.Handler(ex);
                _logger.LogError($"Error en CartItemController {nameof(GetById)}: ${ex.Message}");
            }

            return response;
        }


        [HttpPost]
        public ActionResult<CartItemResponse> Insert(CartItemInsertRequest request)
        {
            CartItemResponse response = new();

            try
            {

                response.IsSuccess = new BLL.CartBLL(Dao).ExecuteDBAction(eDbAction.Insert, request.CartItem);
            }
            catch (Exception ex)
            {
                response.Error = Utilities.ErrorHandler.Handler(ex);
                _logger.LogError($"Error en ProductController {nameof(Insert)}: ${ex.Message}", ex);
            }

            return response;
        }


        [HttpPut]
        public ActionResult<CartItemResponse> Update(CartItemUpdateRequest req) {
            CartItemResponse response = new();

            try
            {
                response.IsSuccess = new BLL.CartBLL(Dao).ExecuteDBAction(eDbAction.Update, req.CartItem);
            }
            catch (Exception ex) {
                response.Error = Utilities.ErrorHandler.Handler(ex);
                _logger.LogError($"Error en ProductController {nameof(Update)}: {ex.Message}", ex);
            }
            return response;
        }


        [HttpDelete]
        public ActionResult<CartItemResponse> Delete(int id) {

            CartItemResponse response = new CartItemResponse();

            try
            {
                response.IsSuccess = new CartBLL(Dao).ExecuteDBAction(eDbAction.Delete, new CartItem{ Id = id});
            }
            catch (Exception ex) {
                response.Error = Utilities.ErrorHandler.Handler(ex); 
                _logger.LogError($"Error en ProductController {nameof(Delete)}: {ex.Message}", ex);
            }
            return response;
        }
    }
}

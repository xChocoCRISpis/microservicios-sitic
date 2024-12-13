using DAO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VO;

namespace Services
{
    [ApiController]
    [Route("OrderItem/[action]")]
    public class OrderItemController:ControllerBase
    {
        private readonly DAOClass _dao;
        private readonly ILogger<OrderController> _logger;

        private DAOClass Dao { get { return _dao; } }

        public OrderItemController(ILogger<OrderController> logger)
        {
            _dao = new();
            _logger = logger;
        }



        [HttpGet]
        public ActionResult<OrderItemResponse> GetAll()
        {
            OrderItemResponse response = new();

            try
            {
                response.OrderItems = new BLL.OrderBLL(Dao).OrderItemGetAll();
                response.IsSuccess = true;
            }
            catch (Exception ex)
            {
                response.Error = Utilities.ErrorHandler.Handler(ex);
                _logger.LogError($"Error en OrderController {nameof(GetAll)}: ${ex.Message}");
            }

            return response;
        }



        [HttpGet]
        public ActionResult<OrderItemResponse> GetById(int id)
        {
            OrderItemResponse response = new();

            try
            {
                response.OrderItem = new BLL.OrderBLL(Dao).OrderItemGetById(id);
                response.IsSuccess = true;
            }
            catch (Exception ex)
            {
                response.Error = Utilities.ErrorHandler.Handler(ex);
                _logger.LogError($"Error en OrderController {nameof(GetById)}: ${ex.Message}");
            }

            return response;
        }


        [HttpPut]
        public ActionResult<OrderItemResponse> Update(OrderItemUpdate orderItem)
        {
            OrderItemResponse response = new();

            try
            {
                
                response.IsSuccess = new BLL.OrderBLL(Dao).ExecuteDBAction(eDbAction.Update, orderItem);
            }
            catch (Exception ex)
            {
                response.Error = Utilities.ErrorHandler.Handler(ex);
                _logger.LogError($"Error en OrderController {nameof(GetAll)}: ${ex.Message}");
            }

            return response;
        }




        [HttpDelete]
        public ActionResult<OrderItemResponse> Delete(int id)
        {
            OrderItemResponse response = new();

            try
            {
                //Crear un objeto anonimo para usarlo de parámetro
                response.IsSuccess = new BLL.OrderBLL(Dao).ExecuteDBAction(eDbAction.Delete,new OrderItem {Id = id });
            }
            catch (Exception ex)
            {
                response.Error = Utilities.ErrorHandler.Handler(ex);
                _logger.LogError($"Error en OrderController {nameof(GetAll)}: ${ex.Message}");
            }

            return response;
        }
    }
}

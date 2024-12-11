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
    [Route("Order/[action]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly DAOClass _dao;
        private readonly ILogger<OrderController> _logger;

        private DAOClass Dao { get { return _dao; } }

        public OrderController(ILogger<OrderController> logger)
        {
            _dao = new();
            _logger = logger;
        }


        [HttpGet]
        public ActionResult<OrderResponse> GetById(int id)
        {
            OrderResponse response = new();

            try
            {
                response.Order = new BLL.OrderBLL(Dao).OrderGetById(id);
                response.IsSuccess = true;
            }
            catch (Exception ex)
            {
                response.Error = Utilities.ErrorHandler.Handler(ex);
                _logger.LogError($"Error en OrderController {nameof(GetById)}: ${ex.Message}");
            }

            return response;
        }


        [HttpGet]
        public ActionResult<OrderResponse> GetAll()
        {
            OrderResponse response = new();

            try
            {
                response.Orders = new BLL.OrderBLL(Dao).OrderGetAll();
                response.IsSuccess = true;

            }
            catch (Exception ex)
            {
                response.Error = Utilities.ErrorHandler.Handler(ex);
                _logger.LogError($"Error en OrderController {nameof(GetAll)}: ${ex.Message}");

            }

            return response;
        }



        [HttpPost]
        public ActionResult<OrderResponse> Insert(OrderInsertRequest request) {

            OrderResponse response = new();

            try
            {
                response.IsSuccess = new BLL.OrderBLL(Dao).ExecuteDBAction(eDbAction.Insert, request.Order);
            }
            catch (Exception ex) {
                _logger.LogError($"Error en OrderController {nameof(Insert)}: ${ex.Message}");

            }

            return response;

        }

        [HttpPut]
        public ActionResult<OrderResponse> Update(OrderUpdateRequest request)
        {

            OrderResponse response = new();

            try
            {
                response.IsSuccess = new BLL.OrderBLL(Dao).ExecuteDBAction(eDbAction.Insert, request.Order);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error en OrderController {nameof(Update)}: ${ex.Message}");

            }

            return response;

        }


        [HttpDelete]
        public ActionResult<OrderResponse> Delete(int id)
        {
            OrderResponse response = new();

            try
            {
                response.IsSuccess = new BLL.OrderBLL(Dao).ExecuteDBAction(eDbAction.Delete, new Cart { Id = id });
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

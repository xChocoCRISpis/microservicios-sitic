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
        public ActionResult<OrderItemsResponse> ByIdOrderItems(int id)
        {
            OrderItemsResponse response = new();

            try
            {
                Order order = new BLL.OrderBLL(Dao).OrderGetById(id);
                List<OrderItem> orderItems = new BLL.OrderBLL(Dao).OrderGetItems(id);

                response.Order = MapOrderWithItems(order, orderItems);
                response.IsSuccess = true;
            }
            catch (Exception ex)
            {
                response.Error = Utilities.ErrorHandler.Handler(ex);
                _logger.LogError($"Error en OrderController {nameof(ByIdOrderItems)}: {ex.Message}");
            }

            return response;
        }

        [HttpGet]
        public ActionResult<OrderItemsResponse> AllOrdersItems()
        {
            OrderItemsResponse response = new();

            try
            {
                // Traer la lista de ordenes
                List<Order> orders = new BLL.OrderBLL(Dao).OrderGetAll();

                // Traer los items de cada orden y mapearlos correctamente
                foreach (Order order in orders)
                {
                    List<OrderItem> orderItems = new BLL.OrderBLL(Dao).OrderGetItems(order.Id);
                    response.Orders.Add(MapOrderWithItems(order, orderItems));
                }

                response.IsSuccess = true;
            }
            catch (Exception ex)
            {
                response.Error = Utilities.ErrorHandler.Handler(ex);
                _logger.LogError($"Error en OrderController {nameof(AllOrdersItems)}: {ex.Message}");
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
                response.IsSuccess = new BLL.OrderBLL(Dao).ExecuteDBAction(eDbAction.Update, request.Order);
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
                response.IsSuccess = new BLL.OrderBLL(Dao).ExecuteDBAction(eDbAction.Delete, new Order { Id = id });
            }
            catch (Exception ex)
            {
                response.Error = Utilities.ErrorHandler.Handler(ex);
                _logger.LogError($"Error en ProductController {nameof(Delete)}: ${ex.Message}");
            }

            return response;
        }




        private OrderItems MapOrderWithItems(Order order, List<OrderItem> items)
        {
            return new OrderItems
            {
                Id = order.Id,
                Total_Price = order.Total_Price,
                Status = order.Status,
                Created_At = order.Created_At,
                Updated_At = order.Updated_At,
                Items = items
            };
        }
    }
}

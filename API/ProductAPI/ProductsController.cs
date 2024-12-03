using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DAO;
using Microsoft.Extensions.Logging;
using VO;
using Helpers;
using DAO.Utilities;
using VO.Request;
using static VO.Models.StaticDefinitions;

namespace ProductAPI
{
    [Route("Prodcut/[action]")]
    [ApiController]
    class ProductsController : ControllerBase
    {
        private readonly DAOClass _dao;
        private readonly ILogger<ProductsController> _logger;

        private ProductsController(ILogger<ProductsController> logger)
        {
            _dao = new();
            _logger = logger;
        }

        [HttpGet]
        public ActionResult<ProductResponse> GetById(int id)
        {
            ProductResponse response = new();
            try
            {
                response.Product = new BLL.ProductBLL(DAO).GetById(id);

            }
            catch (Exception ex) {
                response.Error = Utilities.ErrorHandler.Handler(ex);
                _logger.LogError($"Error en ProductController {nameof(GetById)}: {ex.Message}");
            }
            return response;
        }

        [HttpGet]
        public ActionResult<ProductResponse> GetAll()
        {
            ProductResponse response = new();
            try
            {
                response.Product = new BLL.ProductBLL(DAO).GetAll();

            }
            catch (Exception ex)
            {
                response.Error = Utilities.ErrorHandler.Handler(ex);
                _logger.LogError($"Error en ProductController {nameof(GetById)}: {ex.Message}");
            }
            return response;
        }


        [HttpPost]
        public ActionResult<ProductResponse> Insert()
        {
            ProductResponse response = new();
            try
            {
                response.Product = new BLL.ProductBLL(DAO).Insert();

            }
            catch (Exception ex)
            {
                response.Error = Utilities.ErrorHandler.Handler(ex);
                _logger.LogError($"Error en ProductController {nameof(GetById)}: {ex.Message}");
            }
            return response;
        }


        [HttpPut]
        public ActionResult<ProductResponse> Update(ProductRequest request)
        {
            ProductResponse response = new();
            try
            {
                response.IsSuccess = new BLL.ProductBLL(DAO).ExecuteDbAction(eDbAction.Update, request.Products);

            }
            catch (Exception ex)
            {
                response.Error = Utilities.ErrorHandler.Handler(ex);
                _logger.LogError($"Error en ProductController {nameof(GetById)}: {ex.Message}");
            }
            return response;
        }


        [HttpDelete]
        public ActionResult<ProductResponse> Delete(int id)
        {
            ProductResponse response = new();
            try
            {
                response.IsSuccess = new BLL.ProductBLL(DAO).ExecuteDbAction(eDbAction.Delete, new() { id  = id});

            }
            catch (Exception ex)
            {
                response.Error = Utilities.ErrorHandler.Handler(ex);
                _logger.LogError($"Error en ProductController {nameof(GetById)}: {ex.Message}");
            }
            return response;
        }
    }
}

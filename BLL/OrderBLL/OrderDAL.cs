using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Utilities;
using VO;


namespace DAL
{
    internal class OrderDAL
    {

        private readonly DAO.DAOClass _dao = null;

        internal DAO.DAOClass Dao{ get { return _dao; } }


        internal OrderDAL(DAO.DAOClass dao) { 
            _dao = dao;
        }


        internal DataTable OrderGetAll() {
            return _dao.QueryInformation($"{Schema.Orders}.{Procedures.GetAll}");
        }

        internal DataTable OrderGetItems(int id)
        {
            using (SqlCommand sqlCommand = new())
            {
                SqlParameterCollection parameters = sqlCommand.Parameters;
                parameters.Add("@Id", SqlDbType.Int).Value = id;
                return _dao.QueryInformation($"{Schema.Orders}.{Procedures.GetItems}", parameters);
            }
        }

        internal DataTable OrderGetById(int id) {
            using (SqlCommand sqlCommand = new()) {
                SqlParameterCollection parameters = sqlCommand.Parameters;
                parameters.Add("@Id", SqlDbType.Int).Value = id;
                return _dao.QueryInformation($"{Schema.Orders}.{Procedures.GetById}",parameters);
            }
        }


        internal DataTable OrderItemGetAll() {
            return _dao.QueryInformation($"{Schema.OrderItems}.{Procedures.GetAll}");
        }

        internal DataTable OrderItemGetById(int id) {
            using (SqlCommand sqlCommand = new()) { 
                SqlParameterCollection parameters = sqlCommand.Parameters;
                parameters.Add("@Id",SqlDbType.Int).Value=id;

                return _dao.QueryInformation($"{Schema.OrderItems}.{Procedures.GetById}",parameters);
            }
        }


        internal bool OrderInsert(OrderInsert order)
        {
            try
            {

                if (order.Id == null)
                    order.Id = 0;

                SqlParameterCollection parameters = Utilities.CommonUtils.AddParametersFromObject<OrderInsert>(order);

                parameters["@Cart_Id"].Direction = ParameterDirection.Input;
                parameters["@Id"].Direction = ParameterDirection.Output;

                var result = _dao.ExecuteProcedureWithIdentity($"{Schema.Orders}.{Procedures.Insert}", parameters);

                return result > 0 && Dao.Identity > 0;

            }
            catch (Exception ex)
            {
                throw new Exception($"Error en OrderDal {ex.Message}");   
            }
        }


        internal bool OrderDelete(int id)
        {
            using (SqlCommand sqlCommand = new())
            {
                SqlParameterCollection parameters = sqlCommand.Parameters;
                parameters.Add("@Id", SqlDbType.Int).Value = id;

                return _dao.ExecuteProcedure($"{Schema.Orders}.{Procedures.Delete}", parameters) > 0;

            }
        }

        internal bool OrderItemDelete(int id) {
            using (SqlCommand sqlCommand = new()) {
                SqlParameterCollection parameters = sqlCommand.Parameters;
                parameters.Add("@Id", SqlDbType.Int).Value = id;


                return _dao.ExecuteProcedure($"{Schema.OrderItems}.{Procedures.Delete}", parameters) > 0;
            }
        }

        internal bool OrderUpdate(OrderUpdate order) {
            try
            {
           

                SqlParameterCollection parameters = Utilities.CommonUtils.AddParametersFromObject<OrderUpdate>(order);
                return _dao.ExecuteProcedure($"{Schema.Orders}.{Procedures.Update}", parameters) > 0;


            }
            catch (Exception ex)
            {
                throw new Exception($"Error en OrderDal {ex.Message}");
            }
        }


        internal bool OrderItemUpdate(OrderItemUpdate orderItem)
        {
            try
            {
                SqlParameterCollection parameters = Utilities.CommonUtils.AddParametersFromObject<OrderItemUpdate>(orderItem);

                return _dao.ExecuteProcedure($"{Schema.OrderItems}.{Procedures.Update}", parameters) > 0;
            }
            catch (Exception ex) {
                throw new Exception($"Error en OrderDal {ex.Message}");

            }
        }
    }
}

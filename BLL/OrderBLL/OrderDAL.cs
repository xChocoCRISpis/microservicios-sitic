using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
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

        internal DataTable OrderGetById(int id) {
            using (SqlCommand sqlCommand = new()) {
                SqlParameterCollection parameters = sqlCommand.Parameters;
                parameters.Add("@Id", SqlDbType.Int).Value = id;
                return _dao.QueryInformation($"{Schema.Orders}.{Procedures.GetById}",parameters);
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
                throw new Exception($"Error en OrderDal {ex.Message}  \n $\"Cart_Id: {{order.Cart_Id}} \\n Id: {{order.Id}}\"");   
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

        internal bool OrderUpdate(OrderUpdate order) {
            try
            {
                //Convertir a 0 para evitar errores
                if(order.Total_Price == null)
                    order.Total_Price = 0;

                SqlParameterCollection parameters = Utilities.CommonUtils.AddParametersFromObject<OrderUpdate>(order);

                parameters["@Id"].Direction = ParameterDirection.Input;
                parameters["@Status"].Direction = ParameterDirection.Input;
                parameters["@Total_Price"].Direction = ParameterDirection.Input;

                var result = _dao.ExecuteProcedureWithIdentity($"{Schema.Orders}.{Procedures.Update};", parameters);

                return result > 0 && Dao.Identity > 0;

            }
            catch (Exception ex)
            {
                throw new Exception($"Error en OrderDal {ex.Message}");
            }
        }
    }
}

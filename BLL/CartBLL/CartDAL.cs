using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using VO;
using System.Data.SqlClient;


namespace DAL
{
    internal class CartDAL
    {
        #region Variables & Properties
        private readonly DAO.DAOClass _dao = null;

        internal DAO.DAOClass Dao { get { return _dao; } }
        #endregion

        #region Constructors
        internal CartDAL(DAO.DAOClass dao)
        {
            _dao = dao;
        }
        #endregion

        #region Methods Carts
        internal DataTable CartGetById(int id)
        {
            using (SqlCommand sqlCommand = new())
            {
                SqlParameterCollection parameters = sqlCommand.Parameters;
                parameters.Add("@Id", SqlDbType.Int).Value = id;
                return _dao.QueryInformation($"{Schema.Carts}.{Procedures.GetById}", parameters);
            }
        }


        internal DataTable CartGetAll()
        {
            return _dao.QueryInformation($"{Schema.Carts}.{Procedures.GetAll}");
        }

        internal DataTable CartGetItems(int id) {
            using (SqlCommand sqlCommand = new()) {
                SqlParameterCollection parameters = sqlCommand.Parameters;
                parameters.Add("@Id", SqlDbType.Int).Value=id;
                return _dao.QueryInformation($"{Schema.Carts}.{Procedures.GetItems}", parameters);
            }
        }

        
        internal bool CartDelete(int id)
        {
            using (SqlCommand sqlCommand = new())
            {
                SqlParameterCollection parameters = sqlCommand.Parameters;
                parameters.Add("@Id", SqlDbType.Int).Value = id;
                return _dao.ExecuteProcedure($"{Schema.Carts}.{Procedures.Delete}", parameters) > 0;
            }
        }
        #endregion



        #region Methods Cart_item
        internal DataTable CartItemsGetById(int id) {
            using (SqlCommand sqlCommand = new())
            {
                SqlParameterCollection parameters = sqlCommand.Parameters;
                parameters.Add("@Id", SqlDbType.Int).Value = id;
                return _dao.QueryInformation($"{Schema.CartItems}.{Procedures.GetById}", parameters);
            }
        }

        internal DataTable CartItemsGetAll() {
            return _dao.QueryInformation($"{Schema.CartItems}.{Procedures.GetAll}");
        }

        //No se porque da error cuando no hay stock, pero es lo de menos
        internal bool CartItemsInsert(CartItemInsert cartItem)
        {
            try
            {
                SqlParameterCollection parameters = Utilities.CommonUtils.AddParametersFromObject<CartItemInsert>(cartItem);
                //Definir como InOut
                parameters["@Cart_Id"].Direction = ParameterDirection.InputOutput;
                parameters["@Id"].Direction = ParameterDirection.Output;

                var result = _dao.ExecuteProcedureWithIdentity($"{Schema.CartItems}.{Procedures.Insert}", parameters);
                return result > 0 && Dao.Identity > 0;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error en CartsDal {ex.Message} ");
            }
        }

        internal bool CartItemsUpdate(CartItemUpdate cartItem)
        {
            SqlParameterCollection parameters = Utilities.CommonUtils.AddParametersFromObject<CartItemUpdate>(cartItem);
            return _dao.ExecuteProcedure($"{Schema.CartItems}.{Procedures.Update}", parameters) > 0;
        }

        internal bool CartItemsDelete(int id)
        {
            using (SqlCommand sqlCommand = new())
            {
                SqlParameterCollection parameters = sqlCommand.Parameters;
                parameters.Add("@Id", SqlDbType.Int).Value = id;
                return _dao.ExecuteProcedure($"{Schema.CartItems}.{Procedures.Delete}", parameters) > 0;
            }
        }
        #endregion

    }
}

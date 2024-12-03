using Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VO;

namespace DAL
{
    internal class ProductDAL
    {
        private readonly DAO.DAOClass _dao = null;

        internal DAO.DAOClass Dao { get { return _dao; } }

        internal ProductDAL(DAO.DAOClass dao) {
            _dao = dao;
        }



        internal DataTable GetByID(int id)
        {
            using (SqlCommand sqlCommand = new()) { 
                SqlParameterCollection parameters = sqlCommand.Parameters;
                parameters.Add("@Id",SqlDbType.Int).Value = id;
                return _dao.QueryInformation($"{Schema.Products}.{¨Procedures.GetById}", parameters);
            }
        }
    }
}

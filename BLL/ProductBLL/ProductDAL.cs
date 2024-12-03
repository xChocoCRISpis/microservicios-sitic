using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection.Metadata;
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

        /// <summary>
        /// Metódo para usar el Schema Products con el prcedure GetById
        /// </summary>

        internal DataTable GetByID(int id)
        {
            using (SqlCommand sqlCommand = new()) { 
                SqlParameterCollection parameters = sqlCommand.Parameters;
                parameters.Add("@Id",SqlDbType.Int).Value = id;
                return _dao.QueryInformation($"{Schema.Products}.{Procedures.GetById}", parameters);
            }
        }

        ///<summary>
        ///Metódo para realizar el Schema Products mediante el procedure GetAll
        ///</summary>
        internal DataTable GetAll() {
            return _dao.QueryInformation($"{Schema.Products}.{Procedures.GetAll}");
        }

        /// <summary>
        /// Metódo que inserta en la base de datos
        /// </summary>
        /// return Retorna si se inserto en la Db
        internal bool Insert(Product product) {
            //Uso de la librería de utilities de VO para extraer los parametro del objeto
            //Y asignarles un tipo de SQLServer
            SqlParameterCollection parameters = Utilities.CommonUtils.AddParametersFromObject<Product>(product);
            //Obtengo la salida del parametro ID del procedure 
            parameters["@Id"].Direction = ParameterDirection.Output;

            return (_dao.ExecuteProcedureWithIdentity($"{Schema.Products}.{Procedures.Insert}", parameters) > 0)
                ? Dao.Identity > 0 : false;
        }

        internal bool Update(Product product) {
            SqlParameterCollection parameters = 
                Utilities.CommonUtils.AddParametersFromObject<Product>(product);
            return _dao.ExecuteProcedure($"{Schema.Products}.{Procedures.Update}", parameters) > 0;
        }

        internal bool Delete(int id) {
            using (SqlCommand sqlCommand = new()) { 
                SqlParameterCollection parameters = sqlCommand.Parameters;
                parameters.Add("@Id",SqlDbType.Int).Value=id;
                return _dao.ExecuteProcedure($"{Schema.Products}.{Procedures.Delete}", parameters) > 0;
            }
        }
    }
}

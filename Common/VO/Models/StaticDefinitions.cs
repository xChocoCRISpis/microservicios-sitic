using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VO.Models
{
    public class StaticDefinitions
    //Una vez declarado un valor, sigue consecutivamente
    {
        public enum eStockStatus
        {
            IN_STOCK = 1,
            OUT_OF_STOCK,
            LOW_STOCK
        }

        public enum eDbAction
        {
            Insert = 1,
            Update = 2,
            Delete = 3,
        }

        public enum eErrorType
        {
            None = 0, //ninguno
            NotFound = 1, // no se encotró registro
            Format, //error de conversion
            Sql, //sql
            Validation, //error controlado
            Connection, //error de conexión por protocolos o algo
            Timeout, //tiempo de respuesta
            Unknown = 500 //indefinido
        }

        //Representaciones
        ///<summary>
        /// Representa los esquemas que se manejan en este microservicio
        ///</summary>


        public class Schema
        {
            /// <summary>
            /// Esquema products
            /// </summary>
            public static readonly string Products = "Products";

            /// <summary>
            /// Product_Configurations
            /// </summary>
            public static readonly string ProductConfiguration = "Product_Configurations";

            /// <summary>
            /// Carts
            /// </summary>
            public static readonly string Carts = "Carts";

            /// <summary>
            /// Cart_Items
            /// </summary>
            public static readonly string CartItems = "Carts_Items";

            /// <summary>
            /// Orders
            /// </summary>
            public static readonly string Orders = "Orders";

            /// <summary>
            /// Order_Items
            /// </summary>
            public static readonly string OrderItems = "Order_Items";
        }

        ///<summary>
        /// Representa los procedimientos almacenados de la base de datos que se manejan en este microservicio
        ///</summary>
        public class Procedures
        {
            /// <summary>
            /// Procedimiento para insertar
            /// </summary>
            public static readonly string Insert = "Insert";

            /// <summary>
            /// Procedimiento para actualizar
            /// </summary>
            public static readonly string Update = "Update";

            /// <summary>
            /// Procedimiento para eliminar
            /// </summary>
            public static readonly string Delete = "Delete";

            /// <summary>
            /// Procedimiento para traer por id
            /// </summary>
            public static readonly string GetById = "GetById";

            /// <summary>
            /// Procedimiento para traer todo
            /// </summary>
            public static readonly string GetAll = "GetAll";

        }

    }
}

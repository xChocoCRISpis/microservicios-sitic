using DAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;
using VO;
using Utilities;

namespace BLL
{
    public class CartBLL
    {
        #region Variables & properties
        CartDAL _dal;

        private DAO.DAOClass Dao { get { return _dal?.Dao; } }
        #endregion

        #region Constructors
        public CartBLL(DAO.DAOClass dao) : base()
        {
            _dal = new(dao);
        }
        #endregion

        #region Methods Carts
        public Cart CartGetById(int id)
        {
            Cart cart= null;
            using (DataTable dt = _dal.CartGetById(id))
            {
                if (dt?.Rows?.Count > 0)
                    cart = CommonUtils.ConvertToObject<Cart>(dt.Rows[0]);
            }
            return cart;
        }

        public List<Cart> CartGetAll()
        {
            using (DataTable dt = _dal.CartGetAll())
                return CommonUtils.ConvertDataTableToList<Cart>(dt);
        }


        public CartItem CartItemGetById(int id) { 
            CartItem cartItem = null;

            using (DataTable dt = _dal.CartItemsGetById(id)) {
                if (dt?.Rows?.Count > 0)
                    cartItem = CommonUtils.ConvertToObject<CartItem>(dt.Rows[0]);
            }
            return cartItem;
        }

        public List<CartItem> CartItemGetAll() {
            List<CartItem> cartsItems = null;

            using (DataTable dt = _dal.CartItemsGetAll()) {
                if (dt?.Rows?.Count > 0)
                    cartsItems = CommonUtils.ConvertDataTableToList<CartItem>(dt);

            }
            return cartsItems;
        }

        public List<CartItem> CartGetItems(int id) {
            List<CartItem> cartItems = null;

            using (DataTable dt = _dal.CartGetItems(id)) {
                if (dt?.Rows?.Count > 0)
                    cartItems = CommonUtils.ConvertDataTableToList<CartItem>(dt);
            }

            return cartItems;
        }


        public bool ExecuteDBAction(eDbAction action, object entity = null)
        {
            bool ok;

            // Validación de entrada
            if (entity == null)
            {
                throw new ArgumentException($"Error en ExecuteDbAction, no se ha pasado un objeto válido");
            }

            try
            {
                // Determinación del tipo de entidad y acción
                ok = entity switch
                {
                    Cart cart => action switch
                    {
                        eDbAction.Delete => CartDelete(cart.Id),
                        _ => throw new ArgumentException($"Acción no válida para Cart: {action}")
                    },
                    CartItemInsert cartItem => action switch
                    {
                        eDbAction.Insert => CartItemsInsert(cartItem),
                        _ => throw new ArgumentException($"Acción no válida para CartItem: {action}")
                    },
                    CartItemUpdate cartitem => action switch { 
                        eDbAction.Update => CartItemsUpdate(cartitem),
                        _ => throw new ArgumentException($"Acción no válida para CartItem: {action}")

                    },
                    CartItem cartItem => action switch
                    {
                        eDbAction.Delete => CartItemsDelete(cartItem.Id),
                        _ => throw new ArgumentException($"Acción no válida para CartItem: {action}")
                    },
                    _ => throw new ArgumentException($"Tipo de objeto no soportado: {entity.GetType().Name}")
                };
            }
            catch (Exception ex)
            {
                throw new Exception($"Error en ExecuteDbAction: {ex.Message}", ex);
            }

            return ok;
        }


        #endregion

        #region Private methods
        private bool CartDelete(int id)
        {
            DAO.DAOClass dao = Dao;
            return TransactionUtils.ExecuteWithTransaction(ref dao, () =>
            {
                return _dal.CartDelete(id);
            });
        }


        private bool CartItemsInsert(CartItemInsert cartItem) {
            DAO.DAOClass dao = Dao;

            return TransactionUtils.ExecuteWithTransaction(ref dao, () =>
            {
                return _dal.CartItemsInsert(cartItem);
            });
        }

        private bool CartItemsUpdate(CartItemUpdate cartItem) {
            DAO.DAOClass dao = Dao;

            return TransactionUtils.ExecuteWithTransaction(ref dao, () =>
            {
                return _dal.CartItemsUpdate(cartItem);
            });
        }


        private bool CartItemsDelete(int id) {
            DAO.DAOClass dao = Dao;

            return TransactionUtils.ExecuteWithTransaction(ref dao, () =>
            {
                return _dal.CartItemsDelete(id);
            }); 
        }
        #endregion
    }
}

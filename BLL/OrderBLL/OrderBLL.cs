﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;
using DAL;
using DAO;
using Utilities;
using VO;

namespace BLL
{
    public class OrderBLL
    {
        OrderDAL _dal;

        private DAOClass Dao { get { return _dal?.Dao; } }

        public OrderBLL(DAOClass dao) : base() {
            _dal = new(dao);
        }

        public Order OrderGetById(int id) { 
            Order order = null;

            using (DataTable dt = _dal.OrderGetById(id)) {
                if (dt?.Rows?.Count > 0) {
                    order = CommonUtils.ConvertToObject<Order>(dt.Rows[0]);
                }
                return order;
            }

        }

        public OrderItem OrderItemGetById(int id) { 
            OrderItem orderItem = null;

            using (DataTable dt = _dal.OrderItemGetById(id)) {
                if (dt?.Rows?.Count > 0) {
                    orderItem = CommonUtils.ConvertToObject<OrderItem>(dt.Rows[0]);
                }
                return orderItem;
            }
        }


        public List<OrderItem> OrderGetItems(int id)
        {
            List<OrderItem> orderItem = null;

            using (DataTable dt = _dal.OrderGetItems(id))
            {
                return CommonUtils.ConvertDataTableToList<OrderItem>(dt);
            }
        }


        public List<Order> OrderGetAll() {
            using (DataTable dt = _dal.OrderGetAll()) {
                return CommonUtils.ConvertDataTableToList<Order>(dt);
            }
        }

    


        public List<OrderItem> OrderItemGetAll() {
            using (DataTable dt = _dal.OrderItemGetAll())
            {
                return CommonUtils.ConvertDataTableToList<OrderItem>(dt);
            }
        }

        //Factory para devolver los valores de las consultas
        public bool ExecuteDBAction(eDbAction action, object obj = null) {
            bool ok;

            if(obj == null)
                throw new ArgumentException($"Error en ExecuteDbAction, no se ha pasado un objeto válido");

            try
            {
                ok = obj switch {
                    Order order => action switch {
                        eDbAction.Delete => OrderDelete(order.Id),
                        _ => throw new ArgumentException($"Acción no válida para Order: {action}")
                    },
                    OrderInsert orderInsert => action switch {
                        eDbAction.Insert => OrderInsert(orderInsert),
                        _ => throw new ArgumentException($"Acción no válida para Order: {action}")
                    },
                    OrderUpdate orderUpdate => action switch {
                        eDbAction.Update => OrderUpdate(orderUpdate),
                        _ => throw new ArgumentException($"Acción no válida para Order: {action}")
                    },
                    OrderItem orderItem => action switch {
                        eDbAction.Delete => OrderItemDelete(orderItem.Id),
                        _ => throw new ArgumentException($"Acción no válida para OrderItem: {action}")

                    },
                    OrderItemUpdate orderItemUpdate => action switch {
                        eDbAction.Update => OrderItemUpdate(orderItemUpdate),
                        _ => throw new ArgumentException($"Acción no válida para OrderItem: {action}")

                    },
                    _ => throw new ArgumentException($"Tipo de objeto no soportado: {obj.GetType().Name}")
                };
            }
            catch (Exception ex) {
                throw new Exception($"Error en ExecuteDbAction: {ex.Message} ", ex);

            }
            return ok;
        }


        private bool OrderInsert(OrderInsert order) {
            DAOClass dao = Dao;

            return TransactionUtils.ExecuteWithTransaction(ref dao, () =>
            {
                return _dal.OrderInsert(order);
            });
        }
        private bool OrderUpdate(OrderUpdate order)
        {
            DAOClass dao = Dao;

            return TransactionUtils.ExecuteWithTransaction(ref dao, () =>
            {
                return _dal.OrderUpdate(order);
            });
        }

        private bool OrderDelete(int id)
        {
            DAOClass dao = Dao;

            return TransactionUtils.ExecuteWithTransaction(ref dao, () =>
            {
                return _dal.OrderDelete(id);
            });
        }


        private bool OrderItemDelete(int id) {
            DAOClass dao = Dao;

            return TransactionUtils.ExecuteWithTransaction(ref dao, () =>
            {
                return _dal.OrderItemDelete(id);
            });
        }

        private bool OrderItemUpdate(OrderItemUpdate orderItem) { 
            DAOClass dao = Dao;

            return TransactionUtils.ExecuteWithTransaction(ref dao, () =>
            {
                return _dal.OrderItemUpdate(orderItem);
            });
        }

    }
}

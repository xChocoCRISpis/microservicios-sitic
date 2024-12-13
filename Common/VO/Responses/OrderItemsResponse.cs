using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace VO
{
    [DataContract]
    public class OrderItemsResponse : Response
    {
        [DataMember(EmitDefaultValue = false)]
        public OrderItems Order { get; set; }



        //No sé porque pero daba errores si no lo instanciaba :(
        [DataMember(EmitDefaultValue = false)]
        public List<OrderItems> Orders { get; set; } = new List<OrderItems>();
    }

    [DataContract]
    public class OrderItems:Order
    {
        [DataMember(EmitDefaultValue =false)]
        public List<OrderItem> Items { get; set; }
    }
}

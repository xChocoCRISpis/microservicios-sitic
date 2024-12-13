using System;
using System.Collections.Generic;
using System.Diagnostics.Contracts;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace VO
{
    [DataContract]
    public class OrderItemUpdateRequest : Request
    {
        [DataMember(EmitDefaultValue =false)]
        public OrderItemUpdate OrderItem { get; set; }
    }

    [DataContract]
    public class OrderItemUpdate {
        [DataMember(EmitDefaultValue =false)]
        public int Id { get; set; }

        [DataMember(EmitDefaultValue =false)]
        public int Quantity { get; set; }
    }
}

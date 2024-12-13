using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace VO {
    [DataContract]
    public class OrderItemResponse : Response
    {
        [DataMember(EmitDefaultValue = false)]
        public OrderItem OrderItem { get; set; }

        [DataMember(EmitDefaultValue = false)]
        public List<OrderItem> OrderItems { get; set; }

        
    }
}

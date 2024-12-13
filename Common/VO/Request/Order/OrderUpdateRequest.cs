using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace VO
{
    [DataContract]

    public class OrderUpdateRequest : Request
    {
        [DataMember(EmitDefaultValue = false)]
        public OrderUpdate Order { get; set; }
    }

    [DataContract]
    public class OrderUpdate {
        [DataMember(EmitDefaultValue = false)]
        public int Id { get; set; }

        [DataMember(EmitDefaultValue = false)]
        public eOrderStatus Status { get; set; }
         
        [DataMember(EmitDefaultValue = false)]
        public double Total_Price { get; set; }

    }

}

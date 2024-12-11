using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace VO
{
    [DataContract]
    public class OrderResponse:Response
    {
        [DataMember(EmitDefaultValue = false)]
        public Order Order { get; set; }

        [DataMember(EmitDefaultValue =false)]
        public List<Order> Orders { get; set; }
    }
}

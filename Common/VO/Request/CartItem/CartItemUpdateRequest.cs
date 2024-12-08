using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace VO
{
    [DataContract]
    public class CartItemUpdateRequest
    {
        [DataMember(EmitDefaultValue = false)]
        public CartItemUpdate CartItem { get; set; }
    }



    [DataContract]
    public class CartItemUpdate
    {
        [DataMember(EmitDefaultValue = false)]
        public int Id { get; set; }


        [DataMember(EmitDefaultValue = false)]
        public int Quantity { get; set; }
    }
}

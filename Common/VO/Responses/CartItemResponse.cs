using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace VO
{
    [DataContract]
    public class CartItemResponse : Response
    {
        [DataMember(EmitDefaultValue = false)]
        public CartItem CartItem { get; set; }

        [DataMember(EmitDefaultValue = false)]
        public List<CartItem> CartItems{get; set;} 
    }
}

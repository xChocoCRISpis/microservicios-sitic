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
    public class CartItemInsertRequest
    {
        [DataMember(EmitDefaultValue = false)]
        public CartItemInsert CartItem { get; set; }
    }

    [DataContract]
    public class CartItemInsert
    {
        [DataMember(EmitDefaultValue = false)]
        public  int Id { get; set; }

        [DataMember(EmitDefaultValue = false,IsRequired = false)]
        public int Cart_Id { get; set; }

        [DataMember(EmitDefaultValue = false)]
        public int Product_Id { get; set; }

        [DataMember(EmitDefaultValue = false)]
        public int Quantity { get; set; }
    }
}

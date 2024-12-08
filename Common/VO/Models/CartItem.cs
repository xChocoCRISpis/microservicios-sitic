using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace VO
{
    [DataContract]
    public class CartItem
    {
        [DataMember(EmitDefaultValue = false)]
        public virtual int Id { get; set; }

        [DataMember(EmitDefaultValue = false)]
        public virtual int Cart_Id { get; set; }

        [DataMember(EmitDefaultValue = false)]
        public virtual int Product_Id { get; set; }

        [DataMember(EmitDefaultValue = false)]
        public virtual int Quantity { get; set; }

        [DataMember(EmitDefaultValue = false)]
        public virtual double Price { get; set; }

        [DataMember(EmitDefaultValue = false)]
        public virtual DateTime Created_At { get; set; }

        [DataMember(EmitDefaultValue = false)]
        public virtual DateTime Updated_At { get; set; }
    }
}

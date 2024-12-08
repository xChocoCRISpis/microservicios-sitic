using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace VO
{
    [DataContract]
    public class CartRequest : Request
    {
        [DataMember(EmitDefaultValue =false)]
        public Cart Cart { get; set; }
    }
}

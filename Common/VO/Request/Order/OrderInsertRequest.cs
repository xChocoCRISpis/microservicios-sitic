using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace VO
{
    [DataContract]
    public class OrderInsertRequest:Request{
        [DataMember(EmitDefaultValue = false)]
        public OrderInsert Order { get; set; }
    }

    [DataContract]
    public class OrderInsert {

        [DataMember(EmitDefaultValue = false)]
        public int Cart_Id { get; set; }

        [DataMember(EmitDefaultValue = false)]
        public int Id { get; set; }
    }



}

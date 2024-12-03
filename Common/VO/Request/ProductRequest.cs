using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;
using VO.Models;

namespace VO.Request
{
    [DataContract]
    public class ProductRequest : Request
    {
        [DataMember(EmitDefaultValue = false)]

        public Product products { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace VO.Models
{
    [DataContract]
    public class Orders
    {
        [DataMember(EmitDefaultValue = false)]
        public int Id { get; set; }

        [DataMember(EmitDefaultValue = false)]
        public double TotalPrice { get; set; }

        [DataMember(EmitDefaultValue = false)]
        public string Status { get; set; }

        [DataMember(EmitDefaultValue = false)]
        public DateTime CreatedAt { get; set; }

        [DataMember(EmitDefaultValue = false)]
        public DateTime UpdatedAt { get; set; }
    }
}

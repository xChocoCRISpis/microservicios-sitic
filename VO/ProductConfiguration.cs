using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace VO
{
    [DataContract]
    public class ProductConfiguration
    {
        [DataMember(EmitDefaultValue =false)]
        public int Id { get; set; }

        [DataMember(EmitDefaultValue = false)]
        public int ProductId { get; set; }

        [DataMember(EmitDefaultValue = false)]
        public string ConfigurationName { get; set; }

        [DataMember(EmitDefaultValue = false)]
        public string Value { get; set; }

        [DataMember(EmitDefaultValue = false)]
        public DateTime CreatedAt { get; set; }

        [DataMember(EmitDefaultValue = false)]
        public DateTime UpdatedAt { get; set; }

    }
}

﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace VO
{
    [DataContract]
    public class Cart
    {
        [DataMember(EmitDefaultValue = false)]
        public int Id { get; set; }

        [DataMember(EmitDefaultValue = false)]
        public DateTime Created_At { get; set; }

        [DataMember(EmitDefaultValue = false)]
        public DateTime Updated_At { get; set; }
    }
}

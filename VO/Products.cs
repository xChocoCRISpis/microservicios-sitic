using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static VO.StaticDefinitions;



//Libreria de serialización
using System.Runtime.Serialization;

namespace VO
{
    //Es un decorador obligatorio por la librería de serializacion
    [DataContract]
    public class Products
    {
        //Vacio tare el valor por defecto para definir una respuesta
        //[DataMember]

        [DataMember(EmitDefaultValue = false)]
        public int Id { get; set; }

        [DataMember(EmitDefaultValue = false)]
        public string Name { get; set; }

        [DataMember(EmitDefaultValue = false)]
        public string Description { get; set; }

        [DataMember(EmitDefaultValue = false)]
        public double Price { get; set; }

        [DataMember(EmitDefaultValue = false)]
        public int CurrentStock { get; set; }

        [DataMember(EmitDefaultValue = false)]
        public int MaxStock { get; set; }

        [DataMember(EmitDefaultValue = false)]
        public int MinStock { get; set; }

        [DataMember(EmitDefaultValue = false)]
        public eStockStatus StockStatusId { get; set; } 

        [DataMember(EmitDefaultValue = false)]
        public string ImagePath { get; set; }

        [DataMember(EmitDefaultValue = false)]
        public DateTime CreatedAt { get; set; }

        [DataMember(EmitDefaultValue = false)]
        public DateTime UpdateAt { get; set; }
    }
}

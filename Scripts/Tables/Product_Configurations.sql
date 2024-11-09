USE dbSitiCommerce;
GO

-- Verifica si la tabla Product_Configurations ya existe en la base de datos
IF NOT EXISTS (SELECT 1 FROM dbo.sysobjects WHERE id = object_id(N'[dbo].[Product_Configurations]') AND OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
	/* Creación de la tabla Product_Configurations */
	CREATE TABLE [dbo].[Product_Configurations]
	(
		[id] INT NOT NULL PRIMARY KEY IDENTITY(1,1),        -- Identificador único de la configuración
		[product_id] INT NOT NULL,                          -- Relación con el producto
		[configuration_name] VARCHAR(255) NOT NULL,         -- Nombre de la configuración (e.g., color, tamaño)
		[value] VARCHAR(255) NOT NULL,                      -- Valor de la configuración (e.g., rojo, grande)
		[created_at] VARCHAR(255),                          -- Fecha de creación de la configuración
		[updated_at] DATETIME DEFAULT GETDATE(),             -- Fecha de última actualización de la configuración

		FOREIGN KEY ([product_id]) REFERENCES [dbo].[products]([id])
	)
END

-- Agregar o actualizar el comentario para la tabla Product_Configurations
IF EXISTS (SELECT * FROM ::fn_listextendedproperty ('MS_Description', 'SCHEMA', 'dbo', 'table', 'Product_Configurations', NULL, NULL))
BEGIN
  EXEC sys.sp_updateextendedproperty 
    'MS_Description', 'Tabla que almacena configuraciones de productos, como color o tamaño', 
    'SCHEMA', 'dbo', 'table', 'Product_Configurations'
END 
ELSE
BEGIN
  EXEC sys.sp_addextendedproperty 
    'MS_Description', 'Tabla que almacena configuraciones de productos, como color o tamaño', 
    'SCHEMA', 'dbo', 'table', 'Product_Configurations'
END
GO

-- Agregar comentarios para las columnas de la tabla Product_Configurations

-- Comentario para la columna id
IF NOT EXISTS(SELECT * FROM ::fn_listextendedproperty ('MS_Description', 'SCHEMA', 'dbo', 'table', 'Product_Configurations', 'column', 'id'))
	EXEC sp_addextendedproperty 
    'MS_Description', 'Identificador único de la configuración', 
    'Schema', [dbo], 'table', [Product_Configurations], 'column', [id]

-- Comentario para la columna product_id
IF NOT EXISTS(SELECT * FROM ::fn_listextendedproperty ('MS_Description', 'SCHEMA', 'dbo', 'table', 'Product_Configurations', 'column', 'product_id'))
	EXEC sp_addextendedproperty 
    'MS_Description', 'Relación con el producto', 
    'Schema', [dbo], 'table', [Product_Configurations], 'column', [product_id]

-- Comentario para la columna configuration_name
IF NOT EXISTS(SELECT * FROM ::fn_listextendedproperty ('MS_Description', 'SCHEMA', 'dbo', 'table', 'Product_Configurations', 'column', 'configuration_name'))
	EXEC sp_addextendedproperty 
    'MS_Description', 'Nombre de la configuración (e.g., color, tamaño)', 
    'Schema', [dbo], 'table', [Product_Configurations], 'column', [configuration_name]

-- Comentario para la columna value
IF NOT EXISTS(SELECT * FROM ::fn_listextendedproperty ('MS_Description', 'SCHEMA', 'dbo', 'table', 'Product_Configurations', 'column', 'value'))
	EXEC sp_addextendedproperty 
    'MS_Description', 'Valor de la configuración (e.g., rojo, grande)', 
    'Schema', [dbo], 'table', [Product_Configurations], 'column', [value]

-- Comentario para la columna created_at
IF NOT EXISTS(SELECT * FROM ::fn_listextendedproperty ('MS_Description', 'SCHEMA', 'dbo', 'table', 'Product_Configurations', 'column', 'created_at'))
	EXEC sp_addextendedproperty 
    'MS_Description', 'Fecha de creación de la configuración', 
    'Schema', [dbo], 'table', [Product_Configurations], 'column', [created_at]

-- Comentario para la columna updated_at
IF NOT EXISTS(SELECT * FROM ::fn_listextendedproperty ('MS_Description', 'SCHEMA', 'dbo', 'table', 'Product_Configurations', 'column', 'updated_at'))
	EXEC sp_addextendedproperty 
    'MS_Description', 'Fecha de última actualización de la configuración', 
    'Schema', [dbo], 'table', [Product_Configurations], 'column', [updated_at]

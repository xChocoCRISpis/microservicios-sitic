USE dbSitiCommerce;
GO

-- Verifica si la tabla Orders ya existe en la base de datos
IF NOT EXISTS (SELECT 1 FROM dbo.sysobjects WHERE id = object_id(N'[dbo].[Orders]') AND OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
	/* Creación de la tabla Orders */
	CREATE TABLE [dbo].[Orders]
	(
		[id] INT NOT NULL PRIMARY KEY IDENTITY(1,1),         -- Identificador único de la orden
		[total_price] DECIMAL(20,2) NOT NULL,                -- Precio total del pedido
		[status] VARCHAR(50) NOT NULL,                       -- Estado del pedido (e.g., Enviado, pendiente)
		[created_at] DATETIME NOT NULL DEFAULT GETDATE(),    -- Fecha de creación del pedido
		[updated_at] DATETIME NOT NULL DEFAULT GETDATE()     -- Fecha de última actualización del pedido
	)
END

-- Agregar o actualizar el comentario para la tabla Orders
IF EXISTS (SELECT * FROM ::fn_listextendedproperty ('MS_Description', 'SCHEMA', 'dbo', 'table', 'Orders', NULL, NULL))
BEGIN
  EXEC sys.sp_updateextendedproperty 
    'MS_Description', 'Tabla que almacena los detalles de cada pedido', 
    'SCHEMA', 'dbo', 'table', 'Orders'
END 
ELSE
BEGIN
  EXEC sys.sp_addextendedproperty 
    'MS_Description', 'Tabla que almacena los detalles de cada pedido', 
    'SCHEMA', 'dbo', 'table', 'Orders'
END
GO

-- Agregar comentarios para las columnas de la tabla Orders

-- Comentario para la columna Id
IF NOT EXISTS(SELECT * FROM ::fn_listextendedproperty ('MS_Description', 'SCHEMA', 'dbo', 'table', 'Orders', 'column', 'Id'))
BEGIN
	EXEC sp_addextendedproperty 
    'MS_Description', 'Identificador único de la orden', 
    'Schema', [dbo], 'table', [Orders], 'column', [Id]
END

-- Comentario para la columna Total_Price
IF NOT EXISTS(SELECT * FROM ::fn_listextendedproperty ('MS_Description', 'SCHEMA', 'dbo', 'table', 'Orders', 'column', 'Total_Price'))
BEGIN
	EXEC sp_addextendedproperty 
    'MS_Description', 'Precio total del pedido', 
    'Schema', [dbo], 'table', [Orders], 'column', [Total_Price]
END

-- Comentario para la columna Status
IF NOT EXISTS(SELECT * FROM ::fn_listextendedproperty ('MS_Description', 'SCHEMA', 'dbo', 'table', 'Orders', 'column', 'Status'))
BEGIN
	EXEC sp_addextendedproperty 
    'MS_Description', 'Estado del pedido (e.g., Enviado, pendiente)', 
    'Schema', [dbo], 'table', [Orders], 'column', [Status]
END

-- Comentario para la columna Created_At
IF NOT EXISTS(SELECT * FROM ::fn_listextendedproperty ('MS_Description', 'SCHEMA', 'dbo', 'table', 'Orders', 'column', 'Created_At'))
BEGIN
	EXEC sp_addextendedproperty 
    'MS_Description', 'Fecha de creación del pedido', 
    'Schema', [dbo], 'table', [Orders], 'column', [Created_At]
END

-- Comentario para la columna Updated_At
IF NOT EXISTS(SELECT * FROM ::fn_listextendedproperty ('MS_Description', 'SCHEMA', 'dbo', 'table', 'Orders', 'column', 'Updated_At'))
BEGIN
	EXEC sp_addextendedproperty 
    'MS_Description', 'Fecha de última actualización del pedido', 
    'Schema', [dbo], 'table', [Orders], 'column', [Updated_At]
END

USE dbSitiCommerce;
GO

-- Verifica si la tabla Order_Items ya existe en la base de datos
IF NOT EXISTS (SELECT 1 FROM dbo.sysobjects WHERE id = object_id(N'[dbo].[Order_Items]') AND OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
	/* Creación de la tabla Order_Items */
	CREATE TABLE [dbo].[Order_Items]
	(
		[id] INT NOT NULL PRIMARY KEY IDENTITY(1,1),      -- Identificador único del item del pedido
		[order_id] INT NOT NULL,                          -- Relación con la orden
		[product_id] INT NOT NULL,                        -- Relación con el producto
		[quantity] INT NOT NULL,                          -- Cantidad del producto en el pedido
		[price] DECIMAL(18,2) NOT NULL,                   -- Precio del producto en el momento de añadirlo al pedido
		[created_at] DATETIME DEFAULT GETDATE(),          -- Fecha de creación del item del pedido
		[updated_at] DATETIME DEFAULT GETDATE(),           -- Fecha de última actualización del item en el pedido

		FOREIGN KEY([order_id]) REFERENCES [dbo].[Orders]([id]),
		FOREIGN KEY([product_id]) REFERENCES [dbo].[Products]([id])
	)
END

-- Agregar o actualizar el comentario para la tabla Order_Items
IF EXISTS (SELECT * FROM ::fn_listextendedproperty ('MS_Description', 'SCHEMA', 'dbo', 'table', 'Order_Items', NULL, NULL))
BEGIN
  EXEC sys.sp_updateextendedproperty 
    'MS_Description', 'Tabla que almacena los detalles de cada producto en una orden', 
    'SCHEMA', 'dbo', 'table', 'Order_Items'
END 
ELSE
BEGIN
  EXEC sys.sp_addextendedproperty 
    'MS_Description', 'Tabla que almacena los detalles de cada producto en una orden', 
    'SCHEMA', 'dbo', 'table', 'Order_Items'
END
GO

-- Agregar comentarios para las columnas de la tabla Order_Items

-- Comentario para la columna id
IF NOT EXISTS(SELECT * FROM ::fn_listextendedproperty ('MS_Description', 'SCHEMA', 'dbo', 'table', 'Order_Items', 'column', 'id'))
BEGIN
	EXEC sp_addextendedproperty 
    'MS_Description', 'Identificador único del item del pedido', 
    'Schema', [dbo], 'table', [Order_Items], 'column', [id]
END

-- Comentario para la columna order_id
IF NOT EXISTS(SELECT * FROM ::fn_listextendedproperty ('MS_Description', 'SCHEMA', 'dbo', 'table', 'Order_Items', 'column', 'order_id'))
BEGIN
	EXEC sp_addextendedproperty 
    'MS_Description', 'Relación con la orden', 
    'Schema', [dbo], 'table', [Order_Items], 'column', [order_id]
END

-- Comentario para la columna product_id
IF NOT EXISTS(SELECT * FROM ::fn_listextendedproperty ('MS_Description', 'SCHEMA', 'dbo', 'table', 'Order_Items', 'column', 'product_id'))
BEGIN
	EXEC sp_addextendedproperty 
    'MS_Description', 'Relación con el producto', 
    'Schema', [dbo], 'table', [Order_Items], 'column', [product_id]
END

-- Comentario para la columna quantity
IF NOT EXISTS(SELECT * FROM ::fn_listextendedproperty ('MS_Description', 'SCHEMA', 'dbo', 'table', 'Order_Items', 'column', 'quantity'))
BEGIN
	EXEC sp_addextendedproperty 
    'MS_Description', 'Cantidad del producto en el pedido', 
    'Schema', [dbo], 'table', [Order_Items], 'column', [quantity]
END

-- Comentario para la columna price
IF NOT EXISTS(SELECT * FROM ::fn_listextendedproperty ('MS_Description', 'SCHEMA', 'dbo', 'table', 'Order_Items', 'column', 'price'))
BEGIN
	EXEC sp_addextendedproperty 
    'MS_Description', 'Precio del producto en el momento de añadirlo al pedido', 
    'Schema', [dbo], 'table', [Order_Items], 'column', [price]
END

-- Comentario para la columna created_at
IF NOT EXISTS(SELECT * FROM ::fn_listextendedproperty ('MS_Description', 'SCHEMA', 'dbo', 'table', 'Order_Items', 'column', 'created_at'))
BEGIN
	EXEC sp_addextendedproperty 
    'MS_Description', 'Fecha de creación del item del pedido', 
    'Schema', [dbo], 'table', [Order_Items], 'column', [created_at]
END

-- Comentario para la columna updated_at
IF NOT EXISTS(SELECT * FROM ::fn_listextendedproperty ('MS_Description', 'SCHEMA', 'dbo', 'table', 'Order_Items', 'column', 'updated_at'))
BEGIN
	EXEC sp_addextendedproperty 
    'MS_Description', 'Fecha de última actualización del item en el pedido', 
    'Schema', [dbo], 'table', [Order_Items], 'column', [updated_at]
END

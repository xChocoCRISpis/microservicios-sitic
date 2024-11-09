USE dbSitiCommerce;
GO

-- Verifica si la tabla Cart_Items ya existe en la base de datos
IF NOT EXISTS (SELECT 1 FROM dbo.sysobjects WHERE id = object_id(N'[dbo].[Cart_Items]') AND OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
	/* Creación de la tabla Cart_Items */
	CREATE TABLE [dbo].[Cart_Items]
	(
		[id] INT NOT NULL PRIMARY KEY IDENTITY(1,1),      -- Identificador único del item del carrito
		[cart_id] INT NOT NULL,                           -- Relación con el carrito
		[product_id] INT NOT NULL,                        -- Relación con el producto
		[quantity] INT NOT NULL,                          -- Cantidad del producto en el carrito
		[price] DECIMAL(18,2) NOT NULL,                   -- Precio del producto en el momento de añadirlo al carrito
		[created_at] DATETIME DEFAULT GETDATE(),          -- Fecha de creación del item del carrito
		[updated_at] DATETIME DEFAULT GETDATE(),          -- Fecha de última actualización del item del carrito

		FOREIGN KEY (cart_id) REFERENCES [dbo].[Carts]([id]),            -- Clave foránea a la tabla Carts
		FOREIGN KEY (product_id) REFERENCES [dbo].[Products]([Id])       -- Clave foránea a la tabla Products
	)
END

-- Agregar o actualizar el comentario para la tabla Cart_Items
IF EXISTS (SELECT * FROM ::fn_listextendedproperty ('MS_Description', 'SCHEMA', 'dbo', 'table', 'Cart_Items', NULL, NULL))
BEGIN
  EXEC sys.sp_updateextendedproperty 
    'MS_Description', 'Tabla que almacena los detalles de los productos en cada carrito de compras', 
    'SCHEMA', 'dbo', 'table', 'Cart_Items'
END 
ELSE
BEGIN
  EXEC sys.sp_addextendedproperty 
    'MS_Description', 'Tabla que almacena los detalles de los productos en cada carrito de compras', 
    'SCHEMA', 'dbo', 'table', 'Cart_Items'
END
GO

-- Agregar comentarios para las columnas de la tabla Cart_Items

-- Comentario para la columna id
IF NOT EXISTS(SELECT * FROM ::fn_listextendedproperty ('MS_Description', 'SCHEMA', 'dbo', 'table', 'Cart_Items', 'column', 'id'))
BEGIN
	EXEC sp_addextendedproperty 
    'MS_Description', 'Identificador único del item del carrito', 
    'Schema', [dbo], 'table', [Cart_Items], 'column', [id]
END

-- Comentario para la columna cart_id
IF NOT EXISTS(SELECT * FROM ::fn_listextendedproperty ('MS_Description', 'SCHEMA', 'dbo', 'table', 'Cart_Items', 'column', 'cart_id'))
BEGIN
	EXEC sp_addextendedproperty 
    'MS_Description', 'Relación con el carrito', 
    'Schema', [dbo], 'table', [Cart_Items], 'column', [cart_id]
END

-- Comentario para la columna product_id
IF NOT EXISTS(SELECT * FROM ::fn_listextendedproperty ('MS_Description', 'SCHEMA', 'dbo', 'table', 'Cart_Items', 'column', 'product_id'))
BEGIN
	EXEC sp_addextendedproperty 
    'MS_Description', 'Relación con el producto', 
    'Schema', [dbo], 'table', [Cart_Items], 'column', [product_id]
END

-- Comentario para la columna quantity
IF NOT EXISTS(SELECT * FROM ::fn_listextendedproperty ('MS_Description', 'SCHEMA', 'dbo', 'table', 'Cart_Items', 'column', 'quantity'))
BEGIN
	EXEC sp_addextendedproperty 
    'MS_Description', 'Cantidad del producto en el carrito', 
    'Schema', [dbo], 'table', [Cart_Items], 'column', [quantity]
END

-- Comentario para la columna price
IF NOT EXISTS(SELECT * FROM ::fn_listextendedproperty ('MS_Description', 'SCHEMA', 'dbo', 'table', 'Cart_Items', 'column', 'price'))
BEGIN
	EXEC sp_addextendedproperty 
    'MS_Description', 'Precio del producto en el momento de añadirlo al carrito', 
    'Schema', [dbo], 'table', [Cart_Items], 'column', [price]
END

-- Comentario para la columna created_at
IF NOT EXISTS(SELECT * FROM ::fn_listextendedproperty ('MS_Description', 'SCHEMA', 'dbo', 'table', 'Cart_Items', 'column', 'created_at'))
BEGIN
	EXEC sp_addextendedproperty 
    'MS_Description', 'Fecha de creación del item del carrito', 
    'Schema', [dbo], 'table', [Cart_Items], 'column', [created_at]
END

-- Comentario para la columna updated_at
IF NOT EXISTS(SELECT * FROM ::fn_listextendedproperty ('MS_Description', 'SCHEMA', 'dbo', 'table', 'Cart_Items', 'column', 'updated_at'))
BEGIN
	EXEC sp_addextendedproperty 
    'MS_Description', 'Fecha de última actualización del item del carrito', 
    'Schema', [dbo], 'table', [Cart_Items], 'column', [updated_at]
END

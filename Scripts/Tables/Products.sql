USE dbSitiCommerce;
GO

-- Verifica si la tabla Products ya existe en la base de datos
IF NOT EXISTS (SELECT 1 FROM dbo.sysobjects WHERE id = object_id(N'[dbo].[Products]') AND OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
	/* Creación de la tabla Products */
	CREATE TABLE [dbo].[Products]
	(
		[id] INT NOT NULL PRIMARY KEY IDENTITY(1,1),       -- Identificador principal de la tabla
		[name] VARCHAR(255) NOT NULL,                      -- Nombre del producto
		[description] TEXT NOT NULL,                       -- Descripción detallada del producto
		[price] DECIMAL(18,2) NOT NULL,                    -- Precio del producto
		[current_stock] INT NOT NULL,                      -- Existencia actual del producto
		[max_stock] INT NOT NULL,                          -- Existencia máxima del producto
		[min_stock] INT NOT NULL,                          -- Existencia mínima del producto
		[stock_status_id] INT NULL,                    -- Relación con la tabla Stock_Status
		[image_path] VARCHAR(255),                         -- Ruta de la imagen
		[created_at] DATETIME DEFAULT GETDATE(),           -- Fecha de creación del producto
		[update_at] DATETIME DEFAULT GETDATE(),            -- Fecha de la última actualización del producto

		FOREIGN KEY ([stock_status_id]) REFERENCES [dbo].[stock_status]([id])
	)
END

-- Agregar o actualizar el comentario para la tabla Products
IF EXISTS (SELECT * FROM ::fn_listextendedproperty ('MS_Description', 'SCHEMA', 'dbo', 'table', 'Products', NULL, NULL))
BEGIN
  EXEC sys.sp_updateextendedproperty 
    'MS_Description', 'Almacena la información básica de los productos, así como la existencia actual y su control', 
    'SCHEMA', 'dbo', 'table', 'Products'
END 
ELSE
BEGIN
  EXEC sys.sp_addextendedproperty 
    'MS_Description', 'Almacena la información básica de los productos, así como la existencia actual y su control', 
    'SCHEMA', 'dbo', 'table', 'Products'
END
GO

-- Agregar comentarios para las columnas de la tabla Products

-- Comentario para la columna Id
IF NOT EXISTS(SELECT * FROM ::fn_listextendedproperty ('MS_Description', 'SCHEMA', 'dbo', 'table', 'Products', 'column', 'Id'))
	EXEC sp_addextendedproperty 
    'MS_Description', 'Identificador principal de la tabla', 
    'Schema', [dbo], 'table', [Products], 'column', [Id]

-- Comentario para la columna Name
IF NOT EXISTS(SELECT * FROM ::fn_listextendedproperty ('MS_Description', 'SCHEMA', 'dbo', 'table', 'Products', 'column', 'Name'))
	EXEC sp_addextendedproperty 
    'MS_Description', 'Nombre del producto', 
    'Schema', [dbo], 'table', [Products], 'column', [Name]

-- Comentario para la columna Description
IF NOT EXISTS(SELECT * FROM ::fn_listextendedproperty ('MS_Description', 'SCHEMA', 'dbo', 'table', 'Products', 'column', 'Description'))
	EXEC sp_addextendedproperty 
    'MS_Description', 'Descripción detallada del producto', 
    'Schema', [dbo], 'table', [Products], 'column', [Description]

-- Comentario para la columna Price
IF NOT EXISTS(SELECT * FROM ::fn_listextendedproperty ('MS_Description', 'SCHEMA', 'dbo', 'table', 'Products', 'column', 'Price'))
	EXEC sp_addextendedproperty 
    'MS_Description', 'Precio del producto', 
    'Schema', [dbo], 'table', [Products], 'column', [Price]

-- Comentario para la columna Current_Stock
IF NOT EXISTS(SELECT * FROM ::fn_listextendedproperty ('MS_Description', 'SCHEMA', 'dbo', 'table', 'Products', 'column', 'Current_Stock'))
	EXEC sp_addextendedproperty 
    'MS_Description', 'Existencia actual del producto', 
    'Schema', [dbo], 'table', [Products], 'column', [Current_Stock]

-- Comentario para la columna Max_Stock
IF NOT EXISTS(SELECT * FROM ::fn_listextendedproperty ('MS_Description', 'SCHEMA', 'dbo', 'table', 'Products', 'column', 'Max_Stock'))
	EXEC sp_addextendedproperty 
    'MS_Description', 'Existencia máxima del producto', 
    'Schema', [dbo], 'table', [Products], 'column', [Max_Stock]

-- Comentario para la columna Mix_Stock
IF NOT EXISTS(SELECT * FROM ::fn_listextendedproperty ('MS_Description', 'SCHEMA', 'dbo', 'table', 'Products', 'column', 'Mix_Stock'))
	EXEC sp_addextendedproperty 
    'MS_Description', 'Existencia mínima del producto', 
    'Schema', [dbo], 'table', [Products], 'column', [Mix_Stock]

-- Comentario para la columna Stock_Status_Id
IF NOT EXISTS(SELECT * FROM ::fn_listextendedproperty ('MS_Description', 'SCHEMA', 'dbo', 'table', 'Products', 'column', 'Stock_Status_Id'))
	EXEC sp_addextendedproperty 
    'MS_Description', 'Relación con la tabla Stock_Status', 
    'Schema', [dbo], 'table', [Products], 'column', [Stock_Status_Id]

-- Comentario para la columna Image_Path
IF NOT EXISTS(SELECT * FROM ::fn_listextendedproperty ('MS_Description', 'SCHEMA', 'dbo', 'table', 'Products', 'column', 'Image_Path'))
	EXEC sp_addextendedproperty 
    'MS_Description', 'Ruta de la imagen del producto', 
    'Schema', [dbo], 'table', [Products], 'column', [Image_Path]

-- Comentario para la columna Created_At
IF NOT EXISTS(SELECT * FROM ::fn_listextendedproperty ('MS_Description', 'SCHEMA', 'dbo', 'table', 'Products', 'column', 'Created_At'))
	EXEC sp_addextendedproperty 
    'MS_Description', 'Fecha de creación del producto', 
    'Schema', [dbo], 'table', [Products], 'column', [Created_At]

-- Comentario para la columna Update_At
IF NOT EXISTS(SELECT * FROM ::fn_listextendedproperty ('MS_Description', 'SCHEMA', 'dbo', 'table', 'Products', 'column', 'Update_At'))
	EXEC sp_addextendedproperty 
    'MS_Description', 'Fecha de la última actualización del producto', 
    'Schema', [dbo], 'table', [Products], 'column', [Update_At]

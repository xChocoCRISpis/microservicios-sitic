IF NOT EXISTS (SELECT 1 FROM dbo.sysobjects WHERE id = object_id(N'[dbo].[NombreTabla]') AND OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
	/* Create Tables */
	CREATE TABLE [dbo].[Products]
	(
		[Id] INT NOT NULL PRIMARY KEY IDENTITY(1,1), -- identificador principal de la tabla
		[Name] VARCHAR(255) NOT NULL, -- nombre del producto
		[Description] TEXT NOT NULL, -- descripcion del producto (detallada)
		[Price] DECIMAL (18,2) NOT NULL, -- precio del producto
		[Current_Stock] INT NOT NULL, -- existencia actual del producto
		[Max_Stock] INT NOT NULL, -- existencia maxima del producto
		[Mix_Stock] INT NOT NULL, -- existencia minima del producto
		[Stock_Status_Id] INT NOT NULL,	-- relacion con la tabla stock status
		[Image_Path] VARCHAR(255), -- ruta de la imagen
		[Created_At] DATETIME DEFAULT GETDATE(), --fecha de creacion del producto
		[Update_At] DATETIME DEFAULT GETDATE() -- fecha de la última actualizacion del prodcuto
	)
END



/* Create Table Comments */
IF EXISTS (SELECT * FROM ::fn_listextendedproperty ('MS_Description', 'SCHEMA', 'dbo', 'table', 'Products', NULL, NULL))
BEGIN
  EXEC sys.sp_updateextendedproperty 'MS_Description', 'Almacena la informacion básica de los producto, así como la existencia actual y su control', 'SCHEMA', 'dbo', 'table', 'Products'
END 
ELSE
BEGIN
  EXEC sys.sp_addextendedproperty 'MS_Description', 'Almacena la informacion básica de los producto, así como la existencia actual y su control', 'SCHEMA', 'dbo', 'table', 'Products'
END
GO



/*  Comentarios para las columnas */
IF NOT EXISTS(SELECT * FROM ::fn_listextendedproperty ('MS_Description', 'SCHEMA', 'dbo', 'table', 'products', 'column', 'Id'))
	EXEC sp_addextendedproperty 'MS_Description', 'Identificador principal de la tabla', 'Schema', [dbo], 'table', [products], 'column', [Id]

IF NOT EXISTS(SELECT * FROM ::fn_listextendedproperty ('MS_Description', 'SCHEMA', 'dbo', 'table', 'products', 'column', 'Name'))
	EXEC sp_addextendedproperty 'MS_Description', 'Nombre del producto', 'Schema', [dbo], 'table', [products], 'column', [Name]

IF NOT EXISTS(SELECT * FROM ::fn_listextendedproperty ('MS_Description', 'SCHEMA', 'dbo', 'table', 'products', 'column', 'Description'))
	EXEC sp_addextendedproperty 'MS_Description', 'Descripción del producto (detallada)', 'Schema', [dbo], 'table', [products], 'column', [Description]

IF NOT EXISTS(SELECT * FROM ::fn_listextendedproperty ('MS_Description', 'SCHEMA', 'dbo', 'table', 'products', 'column', 'Price'))
	EXEC sp_addextendedproperty 'MS_Description', 'Precio del producto', 'Schema', [dbo], 'table', [products], 'column', [Price]

IF NOT EXISTS(SELECT * FROM ::fn_listextendedproperty ('MS_Description', 'SCHEMA', 'dbo', 'table', 'products', 'column', 'Current_Stock'))
	EXEC sp_addextendedproperty 'MS_Description', 'Existencia actual del producto', 'Schema', [dbo], 'table', [products], 'column', [Current_Stock]

IF NOT EXISTS(SELECT * FROM ::fn_listextendedproperty ('MS_Description', 'SCHEMA', 'dbo', 'table', 'products', 'column', 'Max_Stock'))
	EXEC sp_addextendedproperty 'MS_Description', 'Existencia máxima del producto', 'Schema', [dbo], 'table', [products], 'column', [Max_Stock]

IF NOT EXISTS(SELECT * FROM ::fn_listextendedproperty ('MS_Description', 'SCHEMA', 'dbo', 'table', 'products', 'column', 'Mix_Stock'))
	EXEC sp_addextendedproperty 'MS_Description', 'Existencia mínima del producto', 'Schema', [dbo], 'table', [products], 'column', [Mix_Stock]

IF NOT EXISTS(SELECT * FROM ::fn_listextendedproperty ('MS_Description', 'SCHEMA', 'dbo', 'table', 'products', 'column', 'Stock_Status_Id'))
	EXEC sp_addextendedproperty 'MS_Description', 'Relación con la tabla stock status', 'Schema', [dbo], 'table', [products], 'column', [Stock_Status_Id]

IF NOT EXISTS(SELECT * FROM ::fn_listextendedproperty ('MS_Description', 'SCHEMA', 'dbo', 'table', 'products', 'column', 'Image_Path'))
	EXEC sp_addextendedproperty 'MS_Description', 'Ruta de la imagen', 'Schema', [dbo], 'table', [products], 'column', [Image_Path]

IF NOT EXISTS(SELECT * FROM ::fn_listextendedproperty ('MS_Description', 'SCHEMA', 'dbo', 'table', 'products', 'column', 'Created_At'))
	EXEC sp_addextendedproperty 'MS_Description', 'Fecha de creación del producto', 'Schema', [dbo], 'table', [products], 'column', [Created_At]

IF NOT EXISTS(SELECT * FROM ::fn_listextendedproperty ('MS_Description', 'SCHEMA', 'dbo', 'table', 'products', 'column', 'Update_At'))
	EXEC sp_addextendedproperty 'MS_Description', 'Fecha de la última actualización del producto', 'Schema', [dbo], 'table', [products], 'column', [Update_At]

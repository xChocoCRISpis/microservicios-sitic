USE dbSitiCommerce;
GO

-- Verifica si la tabla Carts ya existe en la base de datos
IF NOT EXISTS (SELECT 1 FROM dbo.sysobjects WHERE id = object_id(N'[dbo].[Carts]') AND OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
	/* Creaci�n de la tabla Carts */
	CREATE TABLE [dbo].[Carts]
	(
		[id] INT NOT NULL PRIMARY KEY IDENTITY(1,1),  -- Identificador �nico del carrito
		[created_at] DATETIME DEFAULT GETDATE() NOT NULL,       -- Fecha de creaci�n del carrito
		[updated_at] DATETIME DEFAULT GETDATE() NOT NULL      -- Fecha de �ltima actualizaci�n del carrito
	)
END

-- Agregar o actualizar el comentario para la tabla Carts
IF EXISTS (SELECT * FROM ::fn_listextendedproperty ('MS_Description', 'SCHEMA', 'dbo', 'table', 'Carts', NULL, NULL))
BEGIN
  EXEC sys.sp_updateextendedproperty 
    'MS_Description', 'Tabla que almacena la informaci�n de los carritos de compras', 
    'SCHEMA', 'dbo', 'table', 'Carts'
END 
ELSE
BEGIN
  EXEC sys.sp_addextendedproperty 
    'MS_Description', 'Tabla que almacena la informaci�n de los carritos de compras', 
    'SCHEMA', 'dbo', 'table', 'Carts'
END
GO

-- Agregar comentarios para las columnas de la tabla Carts

-- Comentario para la columna id
IF NOT EXISTS(SELECT * FROM ::fn_listextendedproperty ('MS_Description', 'SCHEMA', 'dbo', 'table', 'Carts', 'column', 'id'))
BEGIN
	EXEC sp_addextendedproperty 
    'MS_Description', 'Identificador �nico del carrito', 
    'Schema', [dbo], 'table', [Carts], 'column', [id]
END

-- Comentario para la columna created_at
IF NOT EXISTS(SELECT * FROM ::fn_listextendedproperty ('MS_Description', 'SCHEMA', 'dbo', 'table', 'Carts', 'column', 'created_at'))
BEGIN
	EXEC sp_addextendedproperty 
    'MS_Description', 'Fecha de creaci�n del carrito', 
    'Schema', [dbo], 'table', [Carts], 'column', [created_at]
END

-- Comentario para la columna updated_at
IF NOT EXISTS(SELECT * FROM ::fn_listextendedproperty ('MS_Description', 'SCHEMA', 'dbo', 'table', 'Carts', 'column', 'updated_at'))
BEGIN
	EXEC sp_addextendedproperty 
    'MS_Description', 'Fecha de �ltima actualizaci�n del carrito', 
    'Schema', [dbo], 'table', [Carts], 'column', [updated_at]
END

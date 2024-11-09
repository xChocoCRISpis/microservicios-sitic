USE dbSitiCommerce;
GO

-- Verifica si la tabla StockStatus ya existe
IF NOT EXISTS (SELECT 1 FROM dbo.sysobjects WHERE id = object_id(N'[dbo].[Stock_Status]') AND OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
	/* Creación de la tabla StockStatus */
	CREATE TABLE [dbo].[Stock_Status]
	(
		[id] INT NOT NULL PRIMARY KEY IDENTITY(1,1), -- Identificador único de cada estado de stock
		[status_name] INT NOT NULL, -- Nombre del estado del stock
		[key] VARCHAR(255) -- Clave o identificador alternativo para el estado de stock
	)
END

/* Agregar comentario para la tabla StockStatus */
IF EXISTS (SELECT * FROM ::fn_listextendedproperty ('MS_Description', 'SCHEMA', 'dbo', 'table', 'Stock_Status', NULL, NULL))
BEGIN
  EXEC sys.sp_updateextendedproperty 'MS_Description', 'Tabla que almacena los diferentes estados del stock', 'SCHEMA', 'dbo', 'table', 'Stock_Status'
END 
ELSE
BEGIN
  EXEC sys.sp_addextendedproperty 'MS_Description', 'Tabla que almacena los diferentes estados del stock', 'SCHEMA', 'dbo', 'table', 'Stock_Status'
END
GO

/* Agregar comentarios para las columnas de la tabla StockStatus */

/* Comentario para la columna id */
IF NOT EXISTS(SELECT * FROM ::fn_listextendedproperty ('MS_Description', 'SCHEMA', 'dbo', 'table', 'Stock_Status', 'column', 'id'))
	EXEC sp_addextendedproperty 'MS_Description', 'Identificador único de cada estado de stock', 'Schema', [dbo], 'table', [Stock_Status], 'column', [id]

/* Comentario para la columna status_name */
IF NOT EXISTS(SELECT * FROM ::fn_listextendedproperty ('MS_Description', 'SCHEMA', 'dbo', 'table', 'Stock_Status', 'column', 'status_name'))
	EXEC sp_addextendedproperty 'MS_Description', 'Nombre del estado del stock', 'Schema', [dbo], 'table', [Stock_Status], 'column', [status_name]

/* Comentario para la columna key */
IF NOT EXISTS(SELECT * FROM ::fn_listextendedproperty ('MS_Description', 'SCHEMA', 'dbo', 'table', 'Stock_Status', 'column', 'key'))
	EXEC sp_addextendedproperty 'MS_Description', 'Clave o identificador alternativo para el estado de stock', 'Schema', [dbo], 'table', [Stock_Status], 'column', [key]

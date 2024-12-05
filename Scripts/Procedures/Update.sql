USE dbSitiCommerce;
GO

IF EXISTS(SELECT 1 FROM sys.objects WHERE object_id = OBJECT_ID(N'[Products].[Update]'))
BEGIN
	DROP PROCEDURE [Products].[Update];
END;
GO

CREATE PROCEDURE [Products].[Update]
	@Id INT,
	@Name VARCHAR(255),
	@Description TEXT,
	@Price DECIMAL(18,2),
	@CurrentStock INT,
	@MaxStock INT,
	@MinStock INT,
	@ImagePath VARCHAR(255)
WITH ENCRYPTION
AS
BEGIN
	UPDATE Products SET
	Name = @Name,
	Description =@Description,
	Price =@Price,
	Current_Stock =@CurrentStock,
	Max_Stock =@MaxStock,
	min_stock =@MinStock,
	Image_Path =@ImagePath
	WHERE Products.Id = @Id;
END;
GO
EXEC sp_recompile N'[Products].[Update]'
GO
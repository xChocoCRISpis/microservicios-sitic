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
	@Current_Stock INT,
	@Max_Stock INT,
	@Min_Stock INT,
	@Image_Path VARCHAR(255)
WITH ENCRYPTION
AS
BEGIN
	UPDATE Products SET
	Name = @Name,
	Description =@Description,
	Price =@Price,
	Current_Stock =@Current_Stock,
	Max_Stock =@Max_Stock,
	min_stock =@Min_Stock,
	Image_Path =@Image_Path
	WHERE Products.Id = @Id;
END;
GO
EXEC sp_recompile N'[Products].[Update]'
GO
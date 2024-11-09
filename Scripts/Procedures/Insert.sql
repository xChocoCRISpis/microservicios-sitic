USE dbSitiCommerce;
GO

IF EXISTS(SELECT 1 FROM sys.objects WHERE object_id = OBJECT_ID(N'[Products].[Insert]'))
BEGIN
	DROP PROCEDURE [Products].[Insert];
END;
GO

CREATE PROCEDURE [Products].[Insert]
	@Name VARCHAR(255),
	@Description TEXT,
	@Price DECIMAL(18,2),
	@Current_Stock INT,
	@Max_Stock INT,
	@Mix_Stock INT,
	@Image_Path VARCHAR(255)
WITH ENCRYPTION
AS
BEGIN
	INSERT INTO Products ([Name],[Description],Price,Current_Stock,Max_Stock,Mix_Stock,Image_Path)
	VALUES (@Name,@Description,@Price,@Current_Stock,@Max_Stock,@Mix_Stock,@Image_Path)
END;
GO
EXEC sp_recompile N'[Products].[Insert]'
GO